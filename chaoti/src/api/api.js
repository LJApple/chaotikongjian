import Vue from 'vue'
const serverUrl = '/api/' // 本地调试时 
// const serverUrl = 'http://139.159.163.177:1002/api/'  // 打包部署上线时 
const api = {
    login: `${serverUrl}login`, // 登录接口  
    upload: `${serverUrl}upload/uploadfile` // 上传  
}
Vue.prototype.$api = api