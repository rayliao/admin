import * as React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Table, } from 'antd'
import { loadPosts } from './service'
import Page from '../../components/Page'

interface Post {
    title: string
    body: string
    id: number
    key: string
}
interface PostProps<T> {
    posts: T[]
    loadPosts: Function
};

interface PostState { };
/**
 * try to use generic Table Component 
 */
const MyTable = Table as new (props: PostProps<Post>) => Table<Post>
import { TableColumnConfig } from 'antd/lib/table/Table'

class Post extends React.Component<PostProps<Post>, PostState> {
    componentDidMount() {
        this.props.loadPosts()
    }

    render() {
        const posts = this.props.posts.map(p => {
            // Table need a unique key
            p.key = p.id.toString()
            return p
        })
        const columns: TableColumnConfig<Post>[] = [
            {
                title: 'No.',
                dataIndex: 'id',
                width: 100,
                render(id) {
                    return <Link to={`/posts/${id}`}>#{id}</Link>
                }
            },
            {
                title: 'Title',
                dataIndex: 'title',
                render(title, item) {
                    return <span>{item.title}</span>
                }
            },
            {
                title: 'Body',
                dataIndex: 'body'
            },
        ]
        return <Page>
            <Page.Header title="POSTS - 2122" style={{background: '#FF5722', color: '#fff', padding: 24}}>
                <h3>Demo  Demo  Demo .....</h3>
            </Page.Header>
            <Page.Content>
                <MyTable dataSource={posts} columns={columns} bordered loading={!posts.length} />
            </Page.Content>
        </Page>
    }
}
const mapStateToProps = (state) => {
    const { posts } = state.get('posts').toJS()
    return {
        posts
    }
}
function mapDispatchToProps(dispatch) {
    return {
        loadPosts: data => dispatch(loadPosts()),
        dispatch,
    }
}
export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Post)