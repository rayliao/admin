import { RouteConfig } from 'react-router'
/*
 *
 * DrawingTimes route
 *
 */
export default (store: Store): RouteConfig => ({
    path: '/drawingTimes',
    name: 'drawingTimes',
    breadcrumbName: 'drawingTimes',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            // inject reducer to the store on key 'drawingTimes'
            const reducer = require('./service').default
            store.injectReducer({
                key: 'drawingTimes',
                reducer,
            })
            // load DrawingTimes component
            const DrawingTimes = require('./DrawingTimes').default
            // Return component
            cb(null, DrawingTimes)
        })
    },
}) 