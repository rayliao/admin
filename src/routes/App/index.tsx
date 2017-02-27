import * as React from 'react'

import { Layout, Menu, Icon, Dropdown, BackTop, Button } from 'antd'

const { Header, Sider, Content, Footer } = Layout
const SubMenu = Menu.SubMenu
/** store side collapsed state in localStorage key */
const collapseKey = 'collapse'

import { Link } from 'react-router'
const QueueAnim = require('rc-queue-anim')
import { loadMenu, getUser, logout } from './service'

import { connect } from 'react-redux'

import { RouteComponentProps } from 'react-router'

import { removeAuth } from '../../utils/authentication'

/**
 * import styles
 */
import './index.css'

import Bread from '../../components/Bread'
declare interface MenuProps {
    key: string,
    name: string,
    icon: string,
    child: [MenuProps],
}
declare interface AppProps extends RouteComponentProps<any, any> {
    httpStatus: {}
    menus: [MenuProps]
    loadConfig: Function
    getUser: Function
    logout: Function
    user: {}

}

export class AppLayout extends React.Component<AppProps, any> {
    state = {
        collapsed: !!localStorage.getItem(collapseKey),
    }

    componentWillMount() {
        this.props.getUser()
    }

    componentDidMount() {
        this.props.loadConfig()
    }
    componentWillReceiveProps(nextProps: AppProps) {
        const { user } = nextProps
        if (!user) {            
            nextProps.router.replace('/login')
        }
    }
    logout = () => {        
        removeAuth()
        this.props.logout()
    }
    toggle = () => {
        const collapsed = !this.state.collapsed

        this.setState({
            collapsed,
        },            () => {
            // store it in localStorage
            localStorage.setItem(collapseKey, collapsed ? 'yes' : '')
        })
    }
    /**
     * find nested Component
     * 
     * @returns
     * 
     * @memberOf AppLayout
     */
    findNestedComponent() {
        let result

        const findNestedProp = (props) => {
            if (props.children !== null) {
                result = props.children
                findNestedProp(props.children.props)
            }
        }

        findNestedProp(this.props)

        const NestedComponent = result ? React.cloneElement(result, {
            x: 1
        }) : result
        return NestedComponent
        /*const key = new Date().getTime()
        return <QueueAnim type={['right', 'bottom']} delay={100}>
            <div key={`nested-component-${key}`}>{NestedComponent}</div>
        </QueueAnim>*/
    }
    render() {
        const { collapsed } = this.state
        const { menus } = this.props
        return (
            <QueueAnim className="app-layout" delay={300} type={['left', 'right']}>
                <Layout key="sider">

                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                    >
                        <div className="logo" />
                        <Menu theme="dark" mode={collapsed ? 'vertical' : 'inline'} defaultSelectedKeys={['1']}>
                            {

                                menus.map(m => <SubMenu
                                    key={m.key}
                                    title={
                                        <span>
                                            <Icon type={m.icon} />
                                            <span className="nav-text" title={m.name}>{m.name}</span>
                                        </span>
                                    }
                                >
                                    {
                                        m.child.map(mc => <Menu.Item key={mc.key}><span>
                                            <Link to={mc.key}>{mc.name}</Link>
                                        </span></Menu.Item>)}
                                </SubMenu>)}
                        </Menu>
                    </Sider>

                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <Icon
                                className="trigger"
                                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                            <div className="header">

                                <Dropdown
                                    overlay={
                                        <Menu>
                                            <Menu.Item key="1">
                                                <Button
                                                    icon="poweroff"
                                                    onClick={() => this.logout()}
                                                > 退出登录
                                                </Button>
                                            </Menu.Item>
                                        </Menu>}
                                >
                                    <div>
                                        <Icon type="user" />
                                        管理员
                                </div>
                                </Dropdown>
                            </div>

                        </Header>
                        <Content style={{ margin: '0 24px' }}>
                            <Bread routes={this.props.routes} params={this.props.params} />
                            {
                                this.findNestedComponent()
                            }
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            版权所有 © 2016 MarkSix
                    </Footer>
                    </Layout>
                </Layout>
                <BackTop />
            </QueueAnim>
        )
    }
}

const mapStateToProps = (state) => {
    const { menus, httpStatus, user } = state.get('app').toJS()
    return {
        menus,
        httpStatus,
        user,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        loadConfig: () => dispatch(loadMenu()),
        getUser: () => dispatch(getUser()),
        logout: () => dispatch(logout()),
        dispatch,
    }
}
export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(AppLayout)