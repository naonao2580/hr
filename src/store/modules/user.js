import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

const state = {
    // 初始化是读取本地token，存储到vuex
    token: getToken()
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
    }
}

const actions = {
    async login(context, data) {
        // 调用api的接口
        const res = await login(data)
        context.commit('setToken', res)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}