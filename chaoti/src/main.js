// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Mint from "mint-ui"
import axios from 'axios'
import common from './utils/common'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
// mintui样式导入
import 'mint-ui/lib/style.css'
import 'vant/lib/vant-css/index.css'
// require styles
import 'swiper/dist/css/swiper.css'
import './assets/stylus/index.styl'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { Dialog } from 'vant'
Vue.use(Dialog)
Vue.use(VueAwesomeSwiper)
// 导入api
import './api/api'
// 应用mintui
Vue.use(Mint)
Vue.use(Vant)

// 将所有的请求加加上account_token
axios.interceptors.request.use(config => {
    // 让每个请求携带token--['token']为自定义key
    const account_token = window.localStorage.getItem('account_token')
    // const account_token = common.getCookie('account_token')
    // if(account_token) Object.assign(config.headers, { 'account_token': account_token})
    let url = config.url
    let curUrl = ''
    console.log(url.includes('login'))
    if (!url.includes('login')) {
        if(url.includes('?')) {
            url = url.replace('?', '&')
            const list = url.split('&')
            for (const [index, item] of list.entries()) {
                if(index === 0) {
                    curUrl += list[0] + '?account_token=' + account_token
                } else {
                    curUrl += '&' + item
                }
            }
            url = curUrl
        } else {
            url += '?account_token=' + account_token
        }
    }
    config.url = url
    return config
},error =>{
    Promise.reject(error)
})
axios.interceptors.response.use(response => response,error => {
   const {status} =  error.response
   if (status === 403 || status === 401) {
    const {fullPath, query} = router.history.current
    // common.delCookie('account_token')
    window.localStorage.removeItem('account_token')
    if (query.redirect) return
    router.replace({
        path: '/login',
        query: { redirect: fullPath }
    })
    if (status === 401) {
        Dialog.alert({
            title: '提示',
            message: '亲，您还不是超体用户哦！'
        })
    }
    // if (!isFirstLogin) {
    //     isFirstLogin++
    //     router.replace({
    //         path: '/login',
    //         query: { redirect: fullPath }
    //     })
    // }
   }
})
// 挂在axios
Vue.prototype.$axios = axios
// Vue.config.productionTip = false
// Vue.prototype.HOST = '/api'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
