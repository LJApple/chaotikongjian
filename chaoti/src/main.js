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
import './assets/stylus/index.styl'
// 导入api
import './api/api'
// 应用mintui
Vue.use(Mint)
// 将所有的请求加加上account_token
axios.interceptors.request.use(config => {
    // 让每个请求携带token--['token']为自定义key
    const account_token = window.sessionStorage.getItem('account_token')
    Object.assign(config.headers, { 'account_token': account_token })
        return config
    },error =>{
        Promise.reject(error)
    }
)
axios.interceptors.response.use(response => response,error => {
    console.log('error', error)
})
// 挂在axios
Vue.prototype.$axios = axios
// Vue.config.productionTip = false
Vue.prototype.HOST = '/api'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
