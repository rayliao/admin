import { RouteConfig } from 'react-router'

export default (store: Store): RouteConfig => ({
    path: '/posts/:id',
    name: 'postDetail',
    breadcrumbName: 'Posts Detail',
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
})