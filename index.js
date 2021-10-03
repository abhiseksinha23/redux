const redux = require('redux');
const reduxlogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxlogger.createLogger();


const buy_cake = 'buy_cake';
const buy_iceCream = 'buy_iceCream';

function buyCake() { //action creater functions
    return {
        type: buy_cake,
        info: 'This is an action'
    };
}

function buyIceCream() {
    return {
        type: buy_iceCream
    }
}


// initial state
//
const initialState = {
    cake: 10,
    iceCream: 20
}

const cakeState = {
    cake: 10
}

const iceCreamState = {
        iceCream: 20
    }
    // const reducer = (state = initialState, action) => { // reducer function
    //
    //   switch (action.type) {
    //     case buy_cake:
    //     console.log(action.info);
    //     return { //actions
    //       ...state,
    //       cake: state.cake - 1
    //     }  // return the state or the updated new state object
    //     default: return state;
    //   }
    // }

const cakeReducer = (state = cakeState, action) => {

    switch (action.type) {
        case buy_cake:
            return {
                ...state,
                cake: state.cake - 1
            }
        default:
            return state;
    }
}

const IceCreamReducer = (state = iceCreamState, action) => {

    switch (action.type) {
        case buy_iceCream:
            return {
                ...state,
                iceCream: state.iceCream - 1
            }
        default:
            return state;
    }
}


// const hi = ()=>{
//   console.log("hi");
// }

// stores
//  console.log(buyCake());
// hi();

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: IceCreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger)); //creating the store
console.log("initial state : ", store.getState()); // getState() -> gives the current states object in the store

const unsubscribe = store.subscribe(() => { // subscribe -> application subscribe the redux store
    // console.log("updated state : ", store.getState()); // subscribe -> it takes a listener function -> which id called everytime there is change in state or store
}); // subscribe -> returns a func to unsubscribe

store.dispatch(buyCake()); // dispatch -> takes actions as parameter
store.dispatch(buyCake()); // it performs the actions in the store
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

console.log("current Cakes : ", store.getState().cake.cake); //This is how cam access the state object with multiple reducers
console.log("current IceCreams : ", store.getState().iceCream.iceCream);

unsubscribe(); // unsubscribe -> unsubscribe the store from the application