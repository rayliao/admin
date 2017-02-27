import * as React from 'react'

import Header from './Header'
import Content from './Content'

declare interface PageProps extends React.HTMLProps<HTMLDivElement> { }
declare interface PageState { }

class Page extends React.Component<PageProps, PageState> {
    /**
     * config header area
     * 
     * @static
     * 
     * @memberOf Page
     */
    static Header = Header
    /**
     * content area 
     * 
     * @static
     * 
     * @memberOf Page
     */
    static Content = Content
    render() {
        return (
            <div {...this.props} />
        )
    }
}

export default Page
