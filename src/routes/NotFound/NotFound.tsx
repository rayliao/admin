import * as React from 'react'
import { Link } from 'react-router'
const QueueAnim = require('rc-queue-anim')
import { Button } from 'antd'
interface NotFoundProps { };

interface NotFoundState { };

class NotFound extends React.Component<NotFoundProps, NotFoundState> {

    render() {
        return <div >
            <QueueAnim
                type={['scale', 'top']}
                style={{ width: 600, margin: '0 auto', paddingTop: '10%' , textAlign: 'center'}}
            >
                <h1 key="1" style={{fontSize: 62}}>404</h1>
                <p key="2" style={{margin: '20px 0', fontSize: 20}}>没有找到你请求的资源</p>
                <Button type="primary" size="large" key="3" ghost>
                    <Link to="/">返回首页</Link>
                </Button>
            </QueueAnim>
        </div>
    }
}

export default NotFound