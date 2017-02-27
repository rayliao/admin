import * as React from 'react'
import createTable, { Cell } from '../../components/Table'

declare interface PaperProps {
}
declare interface PaperState { }
declare interface Paper {
    id: string
    title: string
}
const Table = createTable<Paper>()
class Paper extends React.Component<PaperProps, PaperState> {
    render() {
        return <Table
            columns={[
                {
                    title: 'No.',
                    dataIndex: 'id',
                    width: 100,
                    render(id) {
                        return <Cell link={`/posts/${id}`}>#{id}</Cell>
                    }
                },
                {
                    title: 'Title',
                    dataIndex: 'title',
                    width: 200,
                    render(title, item) {
                        return <span>{item.title}</span>
                    }
                },
            ]}
            model="paper"
            url="/posts"
        />
    }
}

export default Paper
