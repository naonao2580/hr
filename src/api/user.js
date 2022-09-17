import request from '@/utils/request'

export const login = data => request({
    url: '/sys/login',
    method: 'post',
    data
})

export function getInfo(token) {

}

export function logout() {

}