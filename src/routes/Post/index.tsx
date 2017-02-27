import { RouteConfig } from 'react-router'

export default (store: Store): RouteConfig => ({
    path: 'posts',
    name: 'posts',
    breadcrumbName: 'Posts',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            // inject reducer
            const reducer = require('./service').default
            store.injectReducer({
                key: 'posts',
                reducer,
            })
            // load component
            const Post = require('./Post').default
            // Return component
            cb(null, Post)
        })
    },
    getChildRoutes(location, cb) {
        require.ensure([], (require) => {
            cb(null, [
                require('./Detail').default(store)
            ])
        })
    },
})