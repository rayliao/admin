export default [
    {
        key: 'dashboard',
        name: '开奖管理',
        icon: 'laptop',
        child: [
            {
                key: 'drawingTimes',
                name: '开奖日期',
            },
            {
                key: 'drawingHistory',
                name: '开奖历史',

            }
        ],
    },
    {
        key: 'csa',
        name: '图纸采集',
        icon: 'camera-o',
        clickable: false,
        child: [
            {
                key: 'list',
                name: '图纸数据'
            },
            {
                key: 'add',
                name: '采集源管理'
            }
        ]
    },
    {
        key: 'ui',
        name: '图纸管理',
        icon: 'picture',
        clickable: false,
        child: [
            {
                key: 'papers',
                name: '图纸列表'
            },
            {
                key: 'album',
                name: '图纸采集'
            }
        ]
    },
    {
        key: 'setting',
        name: '网站管理',
        icon: 'setting',
        child: [
            {
                key: 'feedback',
                name: '用户反馈'
            },
            {
                key: 'info',
                name: '综合资料'
            },
            {
                key: 'notice',
                name: '公告列表'
            },
            {
                key: 'posts',
                name: '资讯管理'
            }
        ]
    }
]
