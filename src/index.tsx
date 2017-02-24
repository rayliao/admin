import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, browserHistory  } from 'react-router'
import { Provider } from 'react-redux'
import { Map } from 'immutable'
import './index.css';

import configureRoutes from './routes'
import configureStore from './utils/configureStore'

const initialState = Map()
const asyncReducers = {}
const routes = configureRoutes()
const store = configureStore(initialState, asyncReducers, {})

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);
