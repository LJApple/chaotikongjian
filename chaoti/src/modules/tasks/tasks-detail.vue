<template>
  <transition name="slide">
    <div class="task-detail">
        <div class="t-header"></div>
        <div class="td-list">
          <div class="tdl-title"><span class="bloder">任务标题：</span>{{taskDetail.title}}</div>
          <div class="tdl-content">
            <div class="tdlc-con"><span class="bloder">内容：</span>{{taskDetail.details}}</div>
            <div class="tdlc-time">
              <div>创建时间：{{taskDetail.createTime}}</div>
              <div>截止时间：{{taskDetail.receiveByTime}}</div>  
            </div>
          </div>
           <div class="uplad">
              <upload @fileList="fileList" :isHaveUpload="isHaveUpload" :fileName="taskDetail.fileName"></upload>  
            </div>
          <div class="revieseTask pd20" v-if="taskType === 0">
            <mt-button v-if="taskDetail.receiveStatus === 0 && taskDetail.taskStatus === 0" @click="recieveTask" size="large" type="primary">领取任务</mt-button>
            <mt-button class="gray" v-if="taskDetail.receiveStatus === 1 && taskDetail.taskStatus === 0" size="large" type="primary">已领取</mt-button>
            <mt-button class="gray" v-if="taskDetail.taskStatus === 1" size="large" type="primary">已过期</mt-button>
          </div>
          <!-- 待提交任务 -->
          <div class="stayTask pd20" v-if="taskType === 1">
            <mt-button v-if="taskDetail.taskStatus === 0" @click="satyTask" size="large" type="primary">提交任务</mt-button>          
            <mt-button class="gray" v-if="taskDetail.taskStatus === 1" @click="satyTask" size="large" type="primary">已过期</mt-button>
          </div>
          <!-- 未完成任务 -->
          <div class="comTask pd20" v-if="taskType === 3">
            <mt-button class="gray" size="large" type="primary">已过期</mt-button>
          </div>
          <!-- 已完成任务 -->
          <div class="stayTask pd20" v-if="taskType === 2">
            <mt-button v-if="taskDetail.taskStatus === 0" @click="satyTask" size="large" type="primary">修改</mt-button>
            <mt-button class="gray" v-if="taskDetail.taskStatus === 1" size="large" type="primary">已过期</mt-button>
          </div>
        </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import upload from 'components/upload/upload'
import { MessageBox } from 'mint-ui'
import common from '../../utils/common'
import qs from 'qs'
export default {
  components: {
      upload
  },
  props:{},
  data(){
    return {
      taskDetail: {},
      isHaveUpload: false,
      taskId: null,
      taskType: '1',
      fileData: null,
      fileName: null
    }
  },
  watch:{},
  computed:{
    // 获取store中的taskList的值
    ...mapGetters([
      'taskListDetail'
    ])
  },
  methods:{
    // 获取上传组件中的数据
    fileList(e) {
      this.fileData = e
    },
    // 获取任务数据
    gettask() {
      this.taskId = this.$route.params.taskId
      this.taskType = parseInt(this.$route.query.taskType)
      const url = `${this.$api.gettask}?account_token=${common.getCookie('account_token')}&taskId=${this.taskId}`
      this.$axios.get(url).then((response) => {
          console.log('response', response)
          const { data, success } = response.data
          if (success) {
            if (this.taskType === 0) {
              data.fileName = data.fileName.split('|')[0]
            } else {
              data.fileName = data.fileName.split('|')[1] ? '': data.fileName
            }
            this.taskDetail = data
          }
        })
    },
     // 领取任务
    recieveTask() {
      let params = {
        taskID: this.taskId
      }
      params = common.splicingJson(params)
      const url = this.$api.recieveTask + params
      this.$axios.post(url).then((response) => {
        const {success} = response.data
        if (success) {
           MessageBox.alert('任务领取成功，任务书已发至您的邮箱，请前往查看！', '提示').then(action => {
            this.$router.go(-1)
          })
        }
      })
    },
    // 提交任务
    satyTask() {
      if (!this.fileData) return this.$toast("请上传任务书！")
      let params = {
            "taskId": this.taskId,
            "file": this.fileData.uploadFile//附件路径
            // "FileName": this.fileData.fileName//附件名称
      }
      // params = common.splicingJson(params)
      // const url = this.$api.submittask + params
      this.$axios.post(this.$api.submittask, params).then((response) => {
        const {success} = response.data
        if (success) {
           MessageBox.alert('提交成功', '提示').then(action => {
            this.$router.go(-1)
          })
        }
      })
    }
  },
  beforeCreate() {
  },
  created(){
    this.gettask()
  },
  mounted(){
    const params = this.$route.params
    const query = this.$route.query
    this.isHaveUpload = query.isHaveUpload
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../assets/stylus/variable.styl"
.pd20
  padding-bottom 20px
.td-list
  font-size $fs16
  .tdl-title
    font-size $fs18
    background #ffffff
    padding 20px $pagePadding 
    line-height 25px
    textOverflowEs(2)
  .tdl-content
    font-size $fs16
    background #ffffff
    padding 20px $pagePadding 
    margin-top 10px
    line-height 24px
    .tdlc-time
      display flex
      justify-content space-between
      font-size 12px
      padding 12px 0
.revieseTask
  padding 12px
.comTask, .stayTask
  margin-top 20px
  padding 0 12px 20px 12px
</style>