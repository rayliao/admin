import * as React from 'react'
import { connect } from 'react-redux'
import { Table, } from 'antd'
import { loadPosts } from './service'

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
        const columns = [
            {
                title: 'Title',
                dataIndex: 'title'
            },
            {
                title: 'Body',
                dataIndex: 'body'
            },
        ]
        return <MyTable dataSource={posts} columns={columns} bordered loading={!posts.length} />
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