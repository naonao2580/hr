import layout from '@/layout'

export default {
    path: '/permission', // 路由地址
    name: 'permission', // 路由的name属性
    component: layout,
    children: [{
        path: '', // 二级路由啥都不写  ，不但有layout  还有approvals
        component: () =>
            import ('@/views/permission'),
        meta: {
            title: '权限管理', // 侧挡行读取这里的title属性
            icon: 'lock'
        }
    }]
}