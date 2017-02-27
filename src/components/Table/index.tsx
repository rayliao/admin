import * as React from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Table, } from 'antd'
import { TableProps } from 'antd/lib/table/Table'

import { load, init } from './service'
export { default as Cell } from '../Cell';
interface MyTableProps<T> extends TableProps<T> {
    /**
     * Auto generated a No column
     * 
     * @type {boolean}
     * @memberOf MyTableProps
     */
    autoNo?: boolean
    /**
     * the url of the data source
     * 
     * @type {string}
     * @memberOf MyTableProps
     */
    url: string
    /**
     * the namespace of the current table,make it unique
     * 
     * @type {string}
     * @memberOf MyTableProps
     */
    model: string
    load?: typeof load
    init?: typeof init
    /**
     * form params 
     * 
     * @type {*}
     * @memberOf MyTableProps
     */
    params?: any

    scroll?: any

    pageSize?: number
    [key: string]: any
}
export default function createTable<T>() {

    /**
     * try to use generic Table Component 
     */
    const MyTable = Table as new (props: MyTableProps<T>) => Table<T>

    class TableComponent extends React.Component<MyTableProps<T>, any> {
        static defaultProps = {
            autoNo: true,
            pageSize: 12
            // scroll: { y: 600 }
        }
        componentDidMount() {
            const { model, params } = this.props
            if (this.props.init) {
                this.props.init(model).then(() => this.load(params))
            }
        }
        load = (data) => {
            const { model, url } = this.props
            if (this.props.load) {
                this.props.load(url, model, data, )
            }
        }
        getEntites = () => {
            const { model } = this.props
            const entites = this.props[model] || []
            return entites
        }

        getNo = (index) => {
            const { pageSize } = this.props
            const { pageCurrent = 0 } = this.state.data || { pageCurrent: 0 }
            return (pageSize && pageSize * pageCurrent) + index + 1
        }
        getColumns = () => {
            const { columns, autoNo } = this.props
            const displayNoKey = 'auto-no'
            if (!columns) {
                return []
            }
            if (autoNo && columns[0] && columns[0].key !== displayNoKey) {
                /**
                 * 添加No列到最前面
                 */
                columns.unshift({
                    title: 'No',
                    key: displayNoKey,
                    width: 100,
                    render: (r, c, index) => {
                        return ++index// this.getNo(index)
                    },
                })
            }

            return columns.map((c, i) => {
                // eslint-disable-next-line
                c.key = c.key || c.dataIndex || `tb-${i}`
                return c
            })
        }
        render() {

            const dataSource = this.getEntites()
            /**
             * Don't pass custom props to Ant Table Component
             */
            const {
                autoNo,
                url,
                model,
                posts,
                load,
                init,
                columns,
                empty,
                pageSize,
                ...antTableProps
            } = this.props

            let pagination

            if (pageSize) {
                /**
                 * if dataSource.length lg pageSize we need pagination or nope.
                 */
                pagination = dataSource.length > pageSize ? {
                    pageSize,
                    total: dataSource.length,
                    size: 'default'
                } : false
            }
            return <MyTable
                size="middle"
                dataSource={dataSource}
                bordered
                loading={!dataSource.length}
                rowKey="ID"
                columns={this.getColumns()}
                pagination={pagination}
                {...antTableProps}
            />
        }
    }
    const mapStateToProps = (state) => {
        /**
         * get whole table state 
         */
        return state.get('table').toJS()
    }
    function mapDispatchToProps(dispatch) {
        return {
            load: (url, model, data) => dispatch(load(url, model, data)),
            init: model => dispatch(init(model)),
        }
    }
    return connect<any, any, MyTableProps<T>>(mapStateToProps, mapDispatchToProps)(TableComponent)
}