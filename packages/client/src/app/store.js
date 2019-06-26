import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { reducers as commonReducers } from '../common'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && process.env.NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

export const store = createStore(
  combineReducers({ ...commonReducers }),
  // composeEnhancers(applyMiddleware(thunk))
);

export default store;
