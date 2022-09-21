// 公司设置相关api
import request from '@/utils/request'

// 获取所有角色列表
export const getRoleList = params => request({
    url: '/sys/role',
    method: 'get',
    params
})

// 获取公司信息
export const getCompanyInfo = id => request({
    url: `/company/${id}`,
    method: 'get'
})

// 根据ID删除角色   
export const delRole = id => request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
})

// 根据ID更新角色
export const editRole = data => request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
})

// 根据ID获取角色详情
export const getRole = id => request({
    url: `/sys/role/${id}`,
    method: 'get'
})

// 添加角色
export const addRole = data => request({
    url: '/sys/role',
    method: 'post',
    data
})