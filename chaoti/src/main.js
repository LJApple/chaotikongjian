// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Mint from "mint-ui"
import axios from 'axios'
// mintui样式导入
import 'mint-ui/lib/style.css'
// require styles
import 'swiper/dist/css/swiper.css'
import './assets/stylus/index.styl'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper)
// 导入api
import './api/api'
// 应用mintui
Vue.use(Mint)
// 将所有的请求加加上account_token
axios.interceptors.request.use(config => {
    // 让每个请求携带token--['token']为自定义key
    console.log('config', config)
    const account_token = window.localStorage.getItem('account_token')
    Object.assign(config.headers, { 'account_token': account_token}, {'Content-Type':'application/json;charset=UTF-8'})
    return config
},error =>{
    Promise.reject(error)
})
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
axios.interceptors.response.use(response => response,error => {
   const {status} =  error.response
   const {fullPath} = router.history.current
   if (status === 403) {
    window.localStorage.removeItem('account_token')
    router.replace({
        path: '/login',
        query: { redirect: fullPath }
    })
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
