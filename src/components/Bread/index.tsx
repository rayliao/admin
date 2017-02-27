import * as React from 'react'
import { Breadcrumb, Icon } from 'antd'
import { Link } from 'react-router'

function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1
    const { breadcrumbName } = route
    // keep it simple and easy to use
    if (last) {
        // update document title use the last route name 
        document.title = breadcrumbName
    }
    return last ? <span>{breadcrumbName}</span>
        : <Link to={`/${paths.join('/')}`}>
            {route.path === '/' && <Icon type="home" />}
            {breadcrumbName}
        </Link>
}

declare interface BreadProps {
    routes: any
    params: any
}
declare interface BreadState { }
class Bread extends React.Component<BreadProps, BreadState> {
    render() {
        const { routes, params } = this.props
        return (
            <div className="bread">
                <Breadcrumb style={{ margin: '12px 0' }} routes={routes} params={params} itemRender={itemRender} />
            </div>
        )
    }
}

export default Bread
