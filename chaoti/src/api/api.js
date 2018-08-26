import Vue from 'vue'
const serverUrl = '/api/' // 本地调试时 
// const serverUrl = 'http://139.159.163.177:1002/api/'  // 打包部署上线时 
const api = {
    login: `${serverUrl}login`, // 登录接口  
    upload: `/upload/uploadfile`, // 上传  
    taskOneTap: `${serverUrl}task/gettasklist`, // 领取任务
    taskTwoTap: `${serverUrl}task/getrecievetasklist`, // 待完成任务
    taskThreeTap: `${serverUrl}task/gethassubmittasklist`, // 已完成任务
    recieveTask: `${serverUrl}task/recievetask`, // 领取任务
    gettask: `${serverUrl}task/gettask`, // 领取详情
    submittask: `${serverUrl}task/submittask`, // 提交任务
    // 我的
    getrules: `${serverUrl}my/getrules`, // 获取规则和纪律说明内容
}
Vue.prototype.$api = api