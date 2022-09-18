import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import nProgress from 'nprogress'

// 白名单
const whiteList = ['/login'] // no redirect whitelist

// 配置前置路由守卫
router.beforeEach(async(to, from, next) => {
    // 开启进度条
    NProgress.start()

    // 判断是否有token
    if (store.getters.token) {
        // 有token判断是否要访问/login
        if (to.path === '/login') {
            // 直接跳到主业
            next('/')
        } else {
            // 这里通行才能获取用户资料
            if (!store.getters.userId) {
                await store.dispatch('user/getUserInfo')
            }
            next()
        }
    } else {
        // 判断是否在白名单
        if (whiteList.indexOf(to.path) > -1) {
            next()
        } else {
            next('/login')
        }
    }
    // 关闭进度条
    NProgress.done()
})


// 配置后置路由守卫
router.afterEach(() => {
    // 关闭进度条
    NProgress.done()
})