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

type Routes = (store: Store) => RouteConfig
interface options {
  /**
   * @type {(Routes | RouteConfig)}
   * 
   */
  routes: Routes | RouteConfig
  initialState?
  asyncReducers?: {}
  history?: History
  rootReducer?: Function
  /**
   * @type {Function}
   */
  render?: Function
}
interface Render {
  store
  routes: RouteConfig
  history?: History
}

const defaultRender = ({store, routes, history} : Render) => <Provider store={store}>  
    <Router history={history}>
      {routes}
    </Router>
  </Provider>

/**
 * configure routes and others then start the app immediately
 * @param {options} options 
 * @param {string} target the target render to
 */
const hake = (
  {
    routes,
    initialState = Map(),
    asyncReducers = {},
    history = browserHistory,
    rootReducer,
    render = defaultRender
  }: options,
  target = 'root'
) => {

  /**
   * configure store
   */
  const store = configureStore(initialState, asyncReducers, rootReducer)
  /**
   * sync history with immutable support
   */
  const appHistory = syncHistoryWithStore(history, store, {
    selectLocationState(state: any) {
      return state.get('routing').toJS()
    }
  })
  /**
   * call routes with param store if it's a function 
   */
  if (typeof routes === 'function') {
    routes = routes(store)
  }
  /**
   * render params 
   */
  const renderParams = { store, routes, history: appHistory }
  /**
   * render 
   */
  const appRender = render(renderParams)

  /**
   * here we go
   */
  ReactDOM.render(appRender, document.getElementById(target))

}

hake({
  asyncReducers: { table: tableReducer },
  rootReducer: logoutReducer,
  routes: store => configureRoutes(store),
})