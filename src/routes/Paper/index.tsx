import { RouteConfig } from 'react-router'

export default (store: Store): RouteConfig => ({
    path: 'papers',
    name: 'papers',
    breadcrumbName: 'papers',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {           
            // load component
            const Paper = require('./Paper').default
            // Return component
            cb(null, Paper)
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