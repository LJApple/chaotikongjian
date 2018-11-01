<template>
  <transition name="slide">
    <div class="task-detail">
        <Header :isShowSetting="false" :isShowsetImg="false"></Header>
        <div class="td-list">
          <div class="tdl-title"><span class="bloder">任务标题：</span>{{taskDetail.title}}</div>
          <div class="tdl-content">
            <div class="tdlc-con"><span class="bloder">内容：</span>{{taskDetail.details}}</div>
            <div class="tdlc-time">
              <div>创建时间：{{taskDetail.createTime}}</div>
              <div v-if="taskDetail.receiveStatus < 2">截止时间：{{taskDetail.receiveByTime}}</div>
              <div v-else>截止时间：{{taskDetail.submitByTime}}</div>
            </div>
          </div>
           <div class="uplad">
              <upload @fileList="fileList" :isHaveUpload="isHaveUpload" :fileName="taskDetail.fileName"></upload>
            </div>
          <div class="revieseTask pd20">
            <mt-button class="red" v-if="taskDetail.receiveStatus === 0" @click="recieveTask" size="large" type="primary">领取任务</mt-button>
            <mt-button class="gray" v-if="taskDetail.receiveStatus === 1" size="large" type="primary">已过期</mt-button>
            <mt-button class="red" v-if="taskDetail.receiveStatus === 2" @click="satyTask" size="large" type="primary">提交任务</mt-button>
            <mt-button class="red" v-if="taskDetail.receiveStatus === 3" @click="satyTask" size="large" type="primary">修改</mt-button>
            <mt-button class="gray" v-if="taskDetail.receiveStatus === 4" size="large" type="primary">已完成</mt-button>
            <mt-button class="gray" v-if="taskDetail.receiveStatus === 5" size="large" type="primary">已领取，未提交</mt-button>
          </div>
          <!-- 待提交任务 -->
          <!-- <div class="stayTask pd20" v-if="taskType === 1">
            <mt-button class="red" v-if="taskDetail.taskStatus === 0" @click="satyTask" size="large" type="primary">提交任务</mt-button>
            <mt-button class="gray" v-if="taskDetail.taskStatus === 1" @click="satyTask" size="large" type="primary">已领取，未提交</mt-button>
          </div> -->
          <!-- 未完成任务 -->
          <!-- <div class="comTask pd20" v-if="taskType === 3">
            <mt-button class="gray" size="large" type="primary">已过期</mt-button>
          </div> -->
          <!-- 已完成任务 -->
          <!-- <div class="stayTask pd20" v-if="taskType === 2">
            <mt-button v-if="taskDetail.taskStatus === 0" @click="satyTask" size="large" type="primary">修改</mt-button>
            <mt-button class="gray" v-if="taskDetail.taskStatus === 1" size="large" type="primary">已过期</mt-button>
          </div> -->
        </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import upload from 'components/upload/upload'
import { MessageBox } from 'mint-ui'
import Header from 'components/header/header'
import common from '../../utils/common'
import { Dialog } from 'vant'
import qs from 'qs'
export default {
  components: {
    upload,
    Header
  },
  props:{},
  data(){
    return {
      taskDetail: {},
      isHaveUpload: false,
      taskId: null,
      taskType: '1',
      fileData: null,
      fileName: null,
      emailstr: null
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
      const url = `${this.$api.gettask}?taskId=${this.taskId}`
      this.$axios.get(url).then((response) => {
          const { data, success } = response.data
          if (success) {
            if (data.receiveStatus === 2 || data.receiveStatus === 3) {
              this.isHaveUpload = true
            } else {
               this.isHaveUpload = false
            }
            if (data.receiveStatus === 3 || data.receiveStatus === 4) {
              data.fileName = data.fileName.split('|')[1]
            } else {
              data.fileName = data.fileName.split('|')[0]
            }
            this.taskDetail = data
          }
        })
    },
      // 获取任务数据
    getemailstr() {
      this.$axios.get(this.$api.getemailstr).then((response) => {
          const { data, success } = response.data
          if (success) {
            this.emailstr = data
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
      Dialog.confirm({
        title: '提示',
        message: `您的任务书还未上传，可上传至上传至${this.emailstr}当前状态是否确认提交？`
      }).then(() => {
        let uploadFile = ''
        if (this.fileData) uploadFile =this.fileData.uploadFile
        const params = {
          "taskId": this.taskId,
          "file": uploadFile // 附件路径
          // "FileName": this.fileData.fileName // 附件名称
        }
        // on confirm
        this.$axios.post(this.$api.submittask, params).then((response) => {
        const {success, message} = response.data
        if (success) {
          MessageBox.alert('提交成功', '提示').then(action => {
            this.$router.go(-1)
          })
        } else {
          MessageBox.alert(message)
        }
      }).catch(() => {

      })
      }).catch(() => {
        // on cancel
      })
      // if (!this.fileData) return Dialog.alert({ title: '标题',message: '请上传任务书！'})
      // params = common.splicingJson(params)
      // const url = this.$api.submittask + params
    }
  },
  beforeCreate() {
  },
  created(){
    this.gettask()
    // 获取邮件地址
    // this.getemailstr()
  },
  mounted(){
    const params = this.$route.params
    const query = this.$route.query
    // this.isHaveUpload = query.isHaveUpload
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
