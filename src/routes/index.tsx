import { RouteConfig } from 'react-router'

export const createRoutes = (): [RouteConfig] => {
    return [
        {
            path: '/',
            /**
             * get app component sync
             * 
             * @param {any} nextState
             * @param {any} cb
             */
            getComponent(nextState, cb) {
                // load component
                const App = require('./App').default
                // return component
                cb(null, App)
            }
        }
    ]
}

export default createRoutes