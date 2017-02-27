// We only need to import the modules necessary for initial render
/// <reference path="../../typings/index.d.ts" />

import { RouteConfig } from 'react-router'

import Dashboard from './Dashboard'
import NotFound from './/NotFound'
import Login from './Login'
import { isAuthorized } from '../utils/authentication'

export const createRoutes = (store: Store): [RouteConfig] => {
    return [
        {
            path: '/',
            breadcrumbName: '首页',
            onEnter(nextState, replace, callback) {

                if (!isAuthorized()) {
                    replace('/login')
                }

                if (callback) {
                    callback()
                }
            },
            /**
             * default Route
             */
            indexRoute: Dashboard(store),
            /**
             * get app component sync
             * 
             * @param {any} nextState 
             * @param {any} cb 
             */
            getComponent(nextState, cb) {
                // inject reducer
                const reducer = require('./App/service').default
                store.injectReducer({
                    key: 'app',
                    reducer,
                })
                // load component
                const App = require('./App').default
                // Return component
                cb(null, App)
            },
            getChildRoutes(location, cb) {
                require.ensure([], (require) => {
                    cb(null, [
                        /**
                         * load child routes async,put top level route below
                         */
                        require('./Post').default(store),
                        require('./Paper').default(store),
                        require('./DrawingTimes').default(store),

                    ])
                })
            },
        },
        Login(store),
        /**
         * NotFound
         */
        NotFound(store)
    ]
}

export default createRoutes
