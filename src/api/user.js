import request from '@/utils/request'

export const login = data => request({
    url: '/sys/login',
    method: 'post',
    data
})

// 获取用户信息
export function getInfo(token) {
    return request({
        url: '/sys/profile',
        method: 'post'
    })

}
// 获取用户头像
export function getUserDetailById(id) {
    return request({
        url: `/sys/user/${id}`,
        method: 'get'
    })
}


export function logout() {

}