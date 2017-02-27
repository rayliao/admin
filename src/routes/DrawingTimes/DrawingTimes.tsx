/*
 *
 * DrawingTimes
 *
 */

import * as React from 'react'
import { connect } from 'react-redux'
import { Button, } from 'antd'
// const ButtonGroup = Button.Group
import Page from '../../components/Page'
import DrawingForm from './DrawingForm'

import { add } from './service'
declare interface DrawingTimesProps {
    children?: React.ReactNode
    add: Function
}
declare interface DrawingTimesState { }
import createTable from '../../components/Table'
declare interface DrawingTime {
    ID: number
    Year: number
    Period: number
    DrawingTime: string
}
const Table = createTable<DrawingTime>()
class DrawingTimes extends React.Component<DrawingTimesProps, DrawingTimesState> {
    state = {
        visible: false,
    }
    showModal = () => {
        this.setState({ visible: true })
    }
    handleCancel = () => {
        this.setState({ visible: false })
    }
    handleCreate = () => {
        const form = this['form']
        form.validateFields((err, values) => {
            if (err) {
                return
            }

            console.log('Received values of form: ', values)
            form.resetFields()
            this.setState({ visible: false })
        })
    }
    saveFormRef = (form) => {
        this['form'] = form
    }
    componentDidMount() {
        // this.props.loadPost()
    }
    add = () => {

    }
    render() {
        return <Page>
            <Page.Header style={{ marginTop: 20 }}>
                <Button type="primary" icon="plus" size="large" onClick={this.showModal}>新增开奖日期</Button>
            </Page.Header>
            <Page.Content>
                <DrawingForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <Table
                    autoNo={false}
                    model="drawingTime"
                    url="/IMarkSix/DrawingTimeList"
                    columns={[
                        {
                            title: '年份',
                            dataIndex: 'Year'
                        },
                        {
                            title: '期号',
                            dataIndex: 'Period'
                        },
                        {
                            title: '开奖时间',
                            dataIndex: 'DrawingTime'
                        },
                        {
                            title: '操作',
                            render(id, item) {
                                return <Button type="primary" icon="delete" ghost>删除</Button>
                            }
                        }
                    ]}

                />
            </Page.Content>
        </Page>
    }
}

const mapStateToProps = (state) => {
    const drawingTimes = state.get('drawingTimes').toJS()
    return drawingTimes
}

function mapDispatchToProps(dispatch) {
    return {
        add: data => dispatch(add(data)),
        dispatch,
    }
}
declare interface TStateProps { }
declare interface TDispatchProps { }
declare interface TOwnProps { }

export default connect<TStateProps, TDispatchProps, TOwnProps>(mapStateToProps, mapDispatchToProps)(DrawingTimes)
