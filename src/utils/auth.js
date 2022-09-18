import Cookies from 'js-cookie'

const TokenKey = 'hrsaas_ihrm_token'
const timeKey = 'hrsaas_timestampl'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

// 设置时间戳
export function setTimeStampl() {
    return Cookies.set(timeKey, Date.now())
}

// 获取时间戳
export function getTimeStampl() {
    return Cookies.get(timeKey)
}