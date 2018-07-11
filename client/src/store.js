import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const middleware = applyMiddleware(thunk);

export default createStore(
  reducers,
  compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);
