import { RouteConfig } from 'react-router'

export default (store: Store): RouteConfig => ({
    breadcrumbName: '控制面板',

    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            // inject reducer
            // const reducer = require('./service').default
            // store.injectReducer({
            //     key: 'dashboard',
            //     reducer,
            // })
            // load component
            const Dashboard = require('./Dashboard').default
            // Return component
            cb(null, Dashboard)
        })
    },
})