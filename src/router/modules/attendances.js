import layout from '@/layout'

export default {
    path: '/attendances', // 路由地址
    name: 'attendances', // 路由的name属性
    component: layout,
    children: [{
        path: '', // 二级路由啥都不写  ，不但有layout  还有approvals
        component: () =>
            import ('@/views/attendances'),
        meta: {
            title: '考勤', // 侧挡行读取这里的title属性
            icon: 'skill'
        }
    }]
}