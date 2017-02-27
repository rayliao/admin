import * as React from 'react'
import { Modal, Form, Input, } from 'antd'
const FormItem = Form.Item
interface FProps {
    visible: boolean
    onCancel: any
    onCreate: any
    form?: any
}
class F extends React.Component<FProps, any> {
    render() {
        const { visible, onCancel, onCreate, form } = this.props
        const { getFieldDecorator } = form
        const alignProps = { labelCol: { span: 4 }, wrapperCol: { span: 14 } }
        return (
            <Modal
                maskClosable={false}
                visible={visible}
                title="新增开奖日期"
                okText="确认添加"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form horizontal>
                    <FormItem label="年份" {...alignProps}>
                        {getFieldDecorator('year', {
                            rules: [{ required: true, message: '请输入年份' }],
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem label="期号" {...alignProps}>
                        {getFieldDecorator('period', {
                            rules: [{ required: true, message: '请输入期号' }],
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem label="开奖时间" {...alignProps}>
                        {getFieldDecorator('drawingtime', {
                            rules: [{ required: true, message: '请输入开奖时间' }],
                        })(
                            <Input />
                            )}
                    </FormItem>
                </Form>
            </Modal>
        )

    }
}

const CollectionCreateForm = Form.create()(F)

export default CollectionCreateForm