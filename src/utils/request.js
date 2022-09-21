// 引入axios
import axios from "axios";
import store from "@/store";
import router from "@/router";
import { Message } from "element-ui";
import { getTimeStampl } from "./auth";

// 定义超时时间
const timeOut = 7200


// 创建实例
const service = axios.create({
    // npm run dev 运行开发环境时 ，值为/api ，启动反向代理 ，跨域获取数据
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000 // 超时时间
})

// 请求拦截
service.interceptors.request.use(config => {
    // 统一注入token
    if (store.getters.token) {
        // 手动判断token超时
        if (isTimeOut()) {
            store.dispatch('user/logout') // 清除token  
            router.push('/login') // 跳转登录页
            return Promise.reject(new Error('登录超时了'))
        }
        config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截
service.interceptors.response.use(response => {
    const { data, message, success } = response.data // 结构数据

    // 判断success返回值,执行操作
    if (success) {
        return data
    } else {
        Message.error(message)
        return Promise.reject(new Error(message)) // 跳出then，进入catch
    }
}, error => {
    // token 超时被动处理
    if (error.response && error.response.data && error.response.data.code === 10002) {
        store.dispatch('user/logout') // 清除token
        router.push('/login') // 跳转登录页
    } else {
        Message.error(error.message)
    }
    return Promise.reject(error)
})

// 超时逻辑
function isTimeOut() {
    let currentTime = Date.now() // 当前时间戳
    let timeStampl = getTimeStampl() // 缓存时间戳
    return (currentTime - timeStampl) / 1000 > timeOut // 时间差
}

// 导出
export default service