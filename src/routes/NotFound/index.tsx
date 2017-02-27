import { RouteConfig } from 'react-router'

export default (store: Store): RouteConfig => ({
    path: '*',
    name: 'notfound',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            // load component
            const NotFound = require('./NotFound').default
            // Return component
            cb(null, NotFound)
        })
    },
})