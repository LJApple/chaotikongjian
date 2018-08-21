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
import vueCookie from 'vue-cookie'

// 禁用移动端三百毫秒延迟
// 应用mintui
Vue.use(Mint)
Vue.use(vueCookie)
// 挂在axios
Vue.prototype.$axios = axios

// Vue.config.productionTip = false
Vue.prototype.HOST = '/api'

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
      if (vueCookie.get('account_token')) { // 判断当前的token是否存在
          next()
      } else {
          next({
          path: '/login',
          query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
     }
  }
  else {
      next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
