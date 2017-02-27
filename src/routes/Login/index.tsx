import { RouteConfig } from 'react-router'

export default (store: Store): RouteConfig => ({
    path: '/login',
    name: 'login',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            // inject reducer
            const reducer = require('./service').default
            store.injectReducer({
                key: 'login',
                reducer,
            })
            // load component
            const Login = require('./Login').default
            // Return component
            cb(null, Login)
        })
    },
    getChildRoutes(location, cb) {
        require.ensure([], (require) => {
            cb(null, [
               // require('./Detail').default(store)
            ])
        })
    },
})