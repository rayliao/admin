import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Router, browserHistory, RouteConfig } from 'react-router'
import { History } from 'history'

import { Map } from 'immutable'

import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import tableReducer from './components/Table/service'
import { logoutReducer } from './routes/App/service'
import configureRoutes from './routes'
import configureStore from './utils/configureStore'

import 'antd/dist/antd.css'

interface Render {
  store
  routes: RouteConfig
  history?: History
}

const render = ({store, routes, history} : Render) => <Provider store={store}>  
    <Router history={history}>
      {routes}
    </Router>
  </Provider>

/**
 * configure store
 */
const store = configureStore(Map(), {table: tableReducer}, logoutReducer)

let history: History = browserHistory

const appHistory = syncHistoryWithStore(history, store, {
  selectLocationState(state: any) {
    return state.get('routing').toJS()
  }
})

const routes = configureRoutes(store)

const renderParams = { store, routes, history: appHistory }

ReactDOM.render(render(renderParams), document.getElementById('root'))
