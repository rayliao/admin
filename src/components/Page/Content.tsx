import * as React from 'react'

declare interface ContentProps  extends React.HTMLProps<HTMLDivElement> { }
declare interface ContentState { }
class Content extends React.Component<ContentProps, ContentState> {
    render() {
        return (
            <div style={{ background: '#fff', padding: '24px', marginTop: 16 }} {...this.props} />
        )
    }
}

export default Content
