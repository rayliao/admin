import * as React from 'react'

import { Row, Col, Card } from 'antd'
import Page from '../../components/Page'

interface DashboardProps { };

interface DashboardState { };

class Dashboard extends React.Component<DashboardProps, DashboardState> {
    render() {
        return <Page>
            <Page.Header>
                <Row gutter={20}>
                    <Col span={6}>
                        <Card bordered={false} loading >1</Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false} loading >2</Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false} loading >3</Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false} loading >4</Card>
                    </Col>
                </Row>
            </Page.Header>
            <Page.Content>
                <Row gutter={20}>
                    <Col span={6}>
                        <Card bordered={false} loading >1</Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false} loading >2</Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false} loading >3</Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false} loading >4</Card>
                    </Col>
                </Row>
            </Page.Content>
            <Page.Content style={{ background: 'transparent', marginTop: 16 }}>
                <Row gutter={20}>
                    <Col span={8}>
                        <Card bordered={false} loading >2</Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false} loading >3</Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false} loading >4</Card>
                    </Col>
                </Row>
            </Page.Content>

        </Page>
    }
}

export default Dashboard