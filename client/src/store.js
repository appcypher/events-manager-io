import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger'; // NOTE: logger is a function in redux-logger v3
import thunk from 'redux-thunk';
import reducers from './reducers';

const middleware = applyMiddleware(thunk, logger);

export default createStore(reducers, middleware);
