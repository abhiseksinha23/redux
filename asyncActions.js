const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default; // redux-thunk is the middleware used for making async calls
// or defining the async action creaters in redux -> can return a function from action creater rather than just an action object only
const axios = require('axios');

const initialState = {
    loading: false,
    users: [],
    error: ''
};

const Fetch_user_request = 'Fetch_user_request';
const Fetch_user_success = 'Fetch_user_success';
const Fetch_user_failure = 'Fetch_user_failure';


const fetchUsersRequest = () => {
    return {
        type: Fetch_user_request
    }
}

const fetchUsersSuccess = users => {
    return {
        type: Fetch_user_success,
        payload: users
    }
}

const fetchUsersFailure = error => {
    return {
        type: Fetch_user_failure,
        payload: error
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Fetch_user_request:
            return {
                ...state,
                loading: true
            }
        case Fetch_user_success:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: ''
            }
        case Fetch_user_failure:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }
        default:
            return state
    }
}

const fecthUsers = () => {
    return function(dispatch) { //dispatching the actions
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const users = response.data.map(user => { return { id: user.id, name: user.name } })
                dispatch(fetchUsersSuccess(users));
            })
            .catch(error => {
                dispatch(fetchUsersFailure(error.message));
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
const unsubscribe = store.subscribe(() => { console.log(store.getState()) });

store.dispatch(fecthUsers());