import Vue from 'vue'
const serverUrl = '/api/' // 本地调试时 
// const serverUrl = 'http://139.159.163.177:1002/api/'  // 打包部署上线时 
const api = {
    login: `${serverUrl}login`, // 登录接口  
    forgetpwd: `${serverUrl}retrievepassword`, // 忘记密码 
    updateuserpwd: `${serverUrl}updateuserpwd`, // 修改密码 
    updateuserdata: `${serverUrl}user/updateuserdata`, // 修改用户信息
    upload: `/upload/uploadfile`, // 上传  
    taskOneTap: `${serverUrl}gettasklist`, // 领取任务
    taskTwoTap: `${serverUrl}getrecievetasklist`, // 待完成任务
    taskThreeTap: `${serverUrl}gethassubmittasklist`, // 已完成任务
    recieveTask: `${serverUrl}recievetask`, // 领取任务
    gettask: `${serverUrl}gettaskdetails`, // 领取详情
    submittask: `${serverUrl}submittask`, // 提交任务
    // 我的
    getrules: `${serverUrl}my/getrules`, // 获取规则和纪律说明内容 
    getuserinfo: `${serverUrl}user/getuserdata`, // 获取用户信息
    signin: `${serverUrl}my/signin`, // 签到
    getexper: `${serverUrl}my/getexper`, // 获取经验值
    getmyrno: `${serverUrl}my/getmyrno`, // 获取排行榜
    updateuserpwd: `${serverUrl}user/updateuserpwd`, // 修改密码

    // 帖子列表
    getpostlist: `${serverUrl}discuss/getpostlist`, // 获取帖子列表
    gettabletype: `${serverUrl}discuss/gettabletype`, // 获取发帖类型
}
Vue.prototype.$api = api