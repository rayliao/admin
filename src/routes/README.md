# ROUTES 路由

> 路由入口文件 `/routes/index.ts`，包含了一级菜单的配置信息，二级菜单全部使用异步加载的方式来实现 `code-splitting`，二级菜单的路由配置在所属目录下

```sh
├───routes
│   ├───Dashboard
│   ├───NotFound
│   └───Post
│   ...
```

**require.ensure**: 异步加载路由 `getChildRoutes`
```js

import { RouteConfig } from 'react-router'

export default (store: Store): RouteConfig => ({
    path: 'posts',
    name: 'posts',
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

```
