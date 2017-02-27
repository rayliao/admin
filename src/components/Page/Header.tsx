import * as React from 'react'

declare interface HeaderProps {
    children?: React.ReactNode
    title?: string
    style?: React.CSSProperties
    className?: string
}
declare interface HeaderState { }
class Header extends React.Component<HeaderProps, HeaderState> {
    render() {
        const { title, children, ...props } = this.props
        return (
            <div {...props}>
                {title && <div style={{ marginBottom: 8 }}><h3>{title}</h3></div>}
                {children}
            </div>
        )
    }
}

export default Header
