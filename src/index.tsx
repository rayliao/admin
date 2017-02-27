// import * as React from 'react'
// import * as ReactDOM from 'react-dom'
import hake from 'hake'

import 'antd/dist/antd.css'

/**
 * routes
 */
import configureRoutes from './routes'
import tableReducer from './components/Table/service'
import { logoutReducer } from './routes/App/service'

hake({
  asyncReducers: { table: tableReducer },
  rootReducer: logoutReducer,
  routes: store => configureRoutes(store),
})