import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import App from './containers/App';
import store from './store';

ReactDOM.render(
  <Provider store={store} >
    <Router history={createBrowserHistory()}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app'),
);
