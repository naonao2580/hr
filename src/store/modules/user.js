import { getToken, setToken, removeToken, setTimeStampl } from '@/utils/auth'
import { login, getInfo, getUserDetailById } from '@/api/user'

const state = {
    // 初始化是读取本地token，存储到vuex
    token: getToken(),
    // 存放用户对象
    userInfo: {}
}

const mutations = {
    // 修改vuex数据，同步到本地
    setToken(state, token) {
        state.token = token
        setToken(token)
    },
    // 删除vuex数据，同步到本地
    removeToken(state) {
        state.token = null
        removeToken()
    },
    // 修改用户对象
    setUserInfo(state, res) {
        state.userInfo = res
    },
    // 删除用户信息
    removeUserInfo(state) {
        state.userInfo = {}
    }
}

const actions = {
    // 调用登录接口
    async login(context, data) {
        const res = await login(data)
        context.commit('setToken', res) // 登录存储token
        setTimeStampl() // 登录存储时间戳
    },
    // 调用获取用户信息接口
    async getUserInfo(context) {
        const res = await getInfo()
        const baseInfo = await getUserDetailById(res.userId)
        const obj = {...res, ...baseInfo }
        context.commit('setUserInfo', obj)
        return res
    },
    // 退出登录
    logout(context) {
        context.commit('removeToken') // 删除token        
        context.commit('removeUserInfo') // 删除用户资料
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}