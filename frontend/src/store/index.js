import {combineReducers, applyMiddleware, compose} from 'redux'
import { createStore} from 'redux'
import thunk from 'redux-thunk';
import sessionReducer from './session';
import spotsReducer from './spots';



const rootReducer = combineReducers({
    session:sessionReducer,
    spots: spotsReducer
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk)
} else {
    const logger = require('redux-logger').default
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger))
}

// In production mode, the enhancer is created using the applyMiddleware function from the redux library, which applies the thunk middleware to the store. thunk is a middleware that allows Redux actions to return functions instead of just objects, which can be useful for asynchronous actions.

// In development mode, the enhancer is created using the composeEnhancers function, which is a Redux DevTools extension that allows for advanced debugging of Redux applications. It is only available in development mode, and is not needed for production builds. In addition to thunk, the logger middleware is also applied, which logs Redux actions and state changes to the console.

// Overall, this code sets up a Redux store enhancer that applies middleware to the store based on the environment, which allows for more flexible and efficient handling of Redux actions and state changes.

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer)
};
export default configureStore