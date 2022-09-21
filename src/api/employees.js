// 获取员工数据
import request from '@/utils/request'

// 获取员工简单列表
export const getEmployeeSimple = () => request({
    url: '/sys/user/simple',
    method: 'get'
})