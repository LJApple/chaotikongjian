import Vue from 'vue'
import url from '../../static/utils/config'
const serverUrl = '/api/' // 本地调试时
// const serverUrl = url + '/api/'  // 打包部署上线时
// console.log('serverUrl', serverUrl)
const api = {
    login: `${serverUrl}login`, // 登录接口
    forgetpwd: `${serverUrl}retrievepassword`, // 忘记密码
    updateuserpwd: `${serverUrl}updateuserpwd`, // 修改密码
    updateuserdata: `${serverUrl}user/updateuserdata`, // 修改用户信息
    upload: `/upload/uploadfile`, // 上传
    uploadimg: `/upload/uploadimg`, // 上传
    taskOneTap: `${serverUrl}gettasklist`, // 领取任务
    getmytask: `${serverUrl}getmytask`, // 获取我的任务
    taskTwoTap: `${serverUrl}getrecievetasklist`, // 待完成任务
    taskThreeTap: `${serverUrl}gethassubmittasklist`, // 已完成任务
    recieveTask: `${serverUrl}receivetask`, // 领取任务
    gettask: `${serverUrl}gettaskdetails`, // 领取详情
    submittask: `${serverUrl}submittask`, // 提交任务
    getemailstr: `${serverUrl}getemailstr`, // 获取邮件地址
    // 我的
    getrules: `${serverUrl}my/getrules`, // 获取规则和纪律说明内容
    getuserinfo: `${serverUrl}user/getuserdata`, // 获取用户信息
    signin: `${serverUrl}my/signin`, // 签到   /api/my/getsigndata
    getissign: `${serverUrl}my/getissign`, // 是否签到
    getexper: `${serverUrl}my/getexper`, // 获取经验值
    getmyrno: `${serverUrl}my/getrno`, // 获取排行榜
    updateuserpwd: `${serverUrl}user/updateuserpwd`, // 修改密码

    // 帖子列表 /api/posts/posting
    getpostlist: `${serverUrl}posts/getpostlist`, // 获取帖子列表
    getPostsType: `${serverUrl}posts/getPostsType`, // 获取发帖类型
    posting: `${serverUrl}posts/posting`, // 发布帖子
    postspraise: `${serverUrl}posts/postspraise`, // 帖子点赞
    getpostdetial: `${serverUrl}posts/getpostdetial`, // 帖子详情
    replyposts: `${serverUrl}posts/replyposts`, // 回复帖子
    delmyposts: `${serverUrl}posts/delmyposts`, // 删除帖子 POST
    delmypostsreply: `${serverUrl}posts/delmypostsreply`, // 删除回复
    // 活动
    getactilist: `${serverUrl}activity/getactilist`, // 获取活动列表 GET
    getactivitydetail: `${serverUrl}activity/getactivitydetail`, // 获取活动详情 GET activityId query
    saveactivity: `${serverUrl}activity/saveactivity`, // 参与活动 activityId query  post
    getactivitycount: `${serverUrl}activity/getactivitycount`, // 获取活动统计  GET activityId query

    // 通知公告
    getnoticelist: `${serverUrl}notice/getnoticelist`, // 通知公告 GET

    // 我发过的主题
    getmypostslist: `${serverUrl}posts/getmypostslist`, // 我发过的主题 GET
    getnoticereddot: `${serverUrl}notice/getnoticereddot` // 获取通知红点

}
Vue.prototype.$api = api
