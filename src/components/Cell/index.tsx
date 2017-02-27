import * as React from 'react'
import { Link } from 'react-router'

declare interface CellProps {
    children?: React.ReactNode
    /**
     * text align prop
     * 
     * @type {('left' | 'center' | 'right')}
     * @memberOf CellProps
     */
    textAlign?: 'left' | 'center' | 'right'
    /**
     * be sure this is a currency Cell, if true will add different color based on its value
     * 
     * @type {boolean}
     * @memberOf CellProps
     */
    currency?: number
    /**
     * render as Link element 
     * 
     * @type {boolean}
     * @memberOf CellProps
     */
    link?: string
}
declare interface CellState { }
class Cell extends React.Component<CellProps, CellState> {
    getChildren = () => {
        const { currency, children } = this.props

        if (currency !== undefined) {
            let color = currency >= 0 ? '#4caf50' : '#f44336'
            return <div style={{ color }}>{children}</div>
        }
        return children
    }
    render() {
        let { textAlign, link, currency } = this.props
        /**
         * If the Cell is a currency Cell and no textAlign , make it right default
         */
        if (currency !== undefined && !textAlign) {
            textAlign = 'right'
        }
        return (
            <div style={{ textAlign }}>
                {link ? <Link to={link} >{this.getChildren()}</Link> : this.getChildren()}
            </div>
        )
    }
}

export default Cell
