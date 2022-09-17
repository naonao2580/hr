// 引入axios
import axios from "axios";
import { Message } from "element-ui";


// 创建实例
const service = axios.create({
    // npm run dev 运行开发环境时 ，值为/api ，启动反向代理 ，跨域获取数据
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000 // 超时时间
})

// 请求拦截
service.interceptors.request.use()

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
    Message.error(error.message)
    return Promise.reject(error)
})

// 导出
export default service