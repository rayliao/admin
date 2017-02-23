import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, browserHistory  } from 'react-router'
import './index.css';

import configureRoutes from './routes'

const routes = configureRoutes()


ReactDOM.render(
  <Router history={browserHistory}>
    {routes}
  </Router>,
  document.getElementById('root')
);
