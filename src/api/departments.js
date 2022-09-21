// 组织架构api
import request from '@/utils/request'

// 获取组织架构
export const getDepartments = () => request({
    url: '/company/department',
    method: 'get'
})

// 根据id删除部门
export const delDepartments = id => request({
    url: `/company/department/${id}`,
    method: 'DELETE'
})

// 新增部门
export const addDepartments = data => request({
    url: '/company/department',
    method: 'POST',
    data
})

// 根据id修改部门
export const editDepartments = (data) => request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
})

// 根据ID查询部门详情
export const getDepartDetail = id => request({
    url: `/company/department/${id}`,
    method: 'get'
})