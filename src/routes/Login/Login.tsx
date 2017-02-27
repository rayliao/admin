import * as React from 'react'

import { Button, Row, Form, Icon, Input } from 'antd'

const FormItem = Form.Item
/**
 * import form type definitions
 */
import { WrappedFormUtils } from 'antd/lib/form/Form'
const QueueAnim = require('rc-queue-anim')

import './login.css'
import { connect } from 'react-redux'
import { login } from './service'

import { saveAuth } from '../../utils/authentication'

declare interface LoginProps {
    children?: React.ReactNode
    login: Function
    form: WrappedFormUtils
    user: {
        Token: string
    }
    router: any
}
declare interface LoginState { }

class Login extends React.Component<LoginProps, LoginState> {
    componentWillReceiveProps(nextProps: LoginProps) {
        if (nextProps.user !== null) {
            saveAuth(nextProps.user)
            nextProps.router.replace('/')
        }
    }

    /**
     * handle field check 
     * if pass then dispatch login action and check status
     * 
     * @memberOf Login
     */
    handleValidate = () => {
        const {
            login,
            form: {
                validateFields
            }
        } = this.props
        validateFields((errors, values) => {
            if (!errors) {
                login(values)
            }
        })
    }

    render() {
        const {
            form: {
                getFieldDecorator,
            }
        } = this.props
        return (<QueueAnim className="login-form" type={['left', 'right']}>
            <div className="logo" key="logo">
                <span>LOGO</span>
            </div>
            <div key="form">
                <Form>
                    <FormItem hasFeedback>
                        {
                            getFieldDecorator('username', {
                                initialValue: 'admin',
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写用户名'
                                    }
                                ]
                            })(<Input
                                size="large"
                                onPressEnter={this.handleValidate}
                                placeholder="用户名"
                                addonBefore={<Icon type="user" />}
                            />)
                        }
                    </FormItem>
                    <FormItem hasFeedback>
                        {
                            getFieldDecorator('pwd', {
                                initialValue: '123456',
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写密码'
                                    },
                                    {
                                        min: 6,
                                        message: '最少六位数'
                                    }
                                ]
                            })(<Input
                                size="large"
                                type="password"
                                onPressEnter={this.handleValidate}
                                placeholder="密码"
                                addonBefore={<Icon type="lock" />}
                            />)
                        }
                    </FormItem>
                    <Row>
                        <Button type="primary" size="large" onClick={this.handleValidate} loading={false}>登录</Button>
                    </Row>
                </Form>
            </div>
        </QueueAnim>
        )
    }
}
const mapStateToProps = (state) => {
    const { user } = state.get('login').toJS()
    return {
        user
    }
}
function mapDispatchToProps(dispatch) {
    return {
        login: user => dispatch(login(user)),
        dispatch,
    }
}
export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Form.create()(Login))