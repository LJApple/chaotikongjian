<template>
  <div class="tasks">
    <div class="t-header"></div>
    <div class="page-navbar">
        <div class="pn-list"  v-for="(item, index) in getTaskList" :key="index" @click="toTaskDetail(item.taskId, item.taskStatus, 1)">
            <mt-cell class="pnl-list" is-link  v-if="item.taskStatus === 0" :title="item.title">
                <span>领取任务</span>
            </mt-cell>
            <mt-cell class="pnl-list" is-link  v-if="item.taskStatus === 1" :title="item.title">
                <span>提交任务</span>
            </mt-cell>
            <mt-cell class="pnl-list" is-link v-if="item.taskStatus === 2" :title="item.title">
                <span>已完成</span>
            </mt-cell>
        </div>
    </div>
    <mt-palette-button content="任务" @expand="main_log('expand')" @expanded="main_log('expanded')" @collapse="main_log('collapse')"
    direction="lt" class="changeClass" :radius="80" ref="target_1" mainButtonStyle="color:#fff;background-color:#ef4f4f;font-size:14px">
    <div class="my-icon-button indexicon icon-popup" @touchstart="sub_log(1)"><div class="classRadio" v-if="isExpend">领取</div></div>
    <div class="my-icon-button indexicon icon-popup" @touchstart="sub_log(2)"><div class="classRadio" v-if="isExpend">待完成</div></div>
    <div class="my-icon-button indexicon icon-popup" @touchstart="sub_log(3)"><div class="classRadio" v-if="isExpend">已完成</div></div>
    </mt-palette-button>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapMutations } from 'vuex'
import qs from 'qs'
import common from '../../utils/common'
import { MessageBox } from 'mint-ui'
export default {
  components:{},
  props:{},
  data(){
    return {
     getTaskList: [],
     isExpend: false
    }
  },
  watch:{
  },
  computed:{},
  methods:{
    main_log(val) {
        console.log('main_log', val)
        if (val === 'expand') {
            this.isExpend = true
        } else if(val === 'collapse') {
            this.isExpend = false
        }
    },
    sub_log(val) {
        console.log('sub_log', val)
        if (val === 1) {

        } else if (val === 2) {

        } else if (val === 3) {

        }
        this.$refs.target_1.collapse()
    },
    // 将事件派发
    toTaskDetail(taskId, isHaveUpload, taskType) {
     if ( isHaveUpload === 0 ) {
         isHaveUpload = false
     } else {
         isHaveUpload = true
     }
      this.$router.push({
        name: 'tasksDetail',
        params: { taskId },
        query: {isHaveUpload, taskType}
      })
      this.setTaskDetail(taskId)
    },
    // 我的页面切换导航
    changeSelected() {
      this.query = this.$route.query
      const { selected } = this.query
      if ((selected === '2' || selected === '3')) {
        this.selected = selected
      }
    },
    // 领取任务
    recieveTask(taskID) {
      let params = {
        taskID
      }
      params = common.splicingJson(params)
      const url = this.$api.recieveTask + params
      this.$axios.post(url).then((response) => {
        const {success} = response.data
        if (success) {
          MessageBox('提示', '任务领取成功，任务书已发至您的邮箱，请前往查看！')
        }
      }).catch((error) => {
        
      }).then(() =>{
      })
    },
    // 获取任务列表 第一步
    getTaskOneTap() {
      this.$axios.get(this.$api.taskOneTap).then((response) => {
        console.log('response', response)
        const { data, success } = response.data
        if (success) {
          this.getTaskList = data
        }
      }).catch((error) => {
        
      }).then(() =>{
      })
    },
    //  // 获取任务列表 第二步
    // getTaskTwoTap() {
    //   this.$axios.get(this.$api.taskTwoTap).then((response) => {
    //     console.log('response', response)
    //     const { data, success } = response.data
    //     if (success) {
    //       for (const v of data) {
    //         v.submitByTime = v.submitByTime.substring(0, 10)
    //       }
    //       this.toComTaskList = data
    //     }
    //   }).catch((error) => {
        
    //   }).then(() =>{
    //   })
    // },
    //  // 获取任务列表 第三步
    // getTaskThreeTap() {
    //   this.$axios.get(this.$api.taskThreeTap).then((response) => {
    //     console.log('response', response)
    //     const { data, success } = response.data
    //     if (success) {
    //       for (const v of data) {
    //         v.submitByTime = v.submitByTime.substring(0, 10)
    //       }
    //       this.completedTaskList = data
    //     }
    //   }).catch((error) => {
        
    //   }).then(() =>{
    //   })
    // },
    ...mapMutations({
      setTaskDetail: 'SET_TASK_LIST_DETAIL'
    })
  },
  activated () {
    const {selected} = this.$route.query
    // 缓存返回卸卸载这里
    this.changeSelected()
    // if (selected) this.selected = selected
    console.log('this.selected', this.selected)
  },
  created(){
    // this.changeSelected()
    // 领取任务列表数据
    this.getTaskOneTap()
  },
  mounted(){

  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../assets/stylus/variable.styl"
.tasks
    height 100%   
    .pnl-list
        margin-top 10px
    .changeClass
        position: fixed
        right: 20px
        bottom: 20px
        width: 58px
        height: 58px
        z-index 99999
        .classRadio
            height: 50px
            width: @height
            border-radius: @height
            line-height: @height
            font-size: 12px
            color: #ffffff
            background: #ef4f4f
</style>