<template>
  <div class="tasks">
    <div class="t-header"></div>
    <div class="page-navbar">
      <mt-navbar class="page-part paddingLR12" v-model="selected">
        <mt-tab-item id="1">领取任务</mt-tab-item>
        <mt-tab-item id="2">待完成任务</mt-tab-item>
        <mt-tab-item id="3">已完成任务</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div  @click="toTaskDetail(item.taskID, false, 1)" v-for="(item, index) in getTaskList" :key="index" class="t-list paddingLR12">
            <div class="tl-left">
              <div class="tll-tittle nowrap">{{item.title}}</div>
              <div class="tll-content nowrap">{{item.content}}</div>
              <div class="tll-last nowrap">截止时间：{{item.submitByTime}}</div>
            </div>
            <div class="tl-right">
              <mt-button v-if="item.isDisabled === 0" @click.stop="recieveTask(item.taskID)" type="primary">领取任务</mt-button>
              <mt-button class="gray" v-if="item.isDisabled === 1" type="primary">已过期</mt-button>
            </div>
          </div>
          <div v-if="getTaskList.length === 0" class="havenoTask" >暂无任务</div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
           <div @click="toTaskDetail(item.taskID, true, 2)" v-for="(item, index) in toComTaskList" :key="index" class="t-list paddingLR12">
            <div class="tl-left">
              <div class="tll-tittle nowrap">{{item.title}}</div>
              <div class="tll-content nowrap">{{item.content}}</div>
              <div class="tll-last nowrap">截止时间：{{item.submitByTime}}</div>
            </div>
            <div class="tl-right">
              <mt-button v-if="item.isDisabled === 0" type="primary">提交任务</mt-button>
              <mt-button class="gray" v-if="item.isDisabled === 1" type="primary">已过期</mt-button>
            </div>
          </div>
          <div v-if="toComTaskList.length === 0"  class="havenoTask">暂无任务</div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
            <div @click="toTaskDetail(item.taskID, true, 3)" v-for="(item, index) in completedTaskList" :key="index" class="t-list paddingLR12">
              <div class="tl-left">
                <div class="tll-tittle nowrap">{{item.title}}</div>
                <div class="tll-content nowrap">{{item.content}}</div>
                <div class="tll-last nowrap">截止时间：{{item.submitByTime}}</div>
              </div>
              <div class="tl-right">
                <mt-button v-if="item.isDisabled === 1"  type="primary">已完成</mt-button>
                <mt-button class="gray" v-if="item.isDisabled === 0" type="primary">修改</mt-button>
              </div>
            </div>
            <div v-if="completedTaskList.length === 0" class="havenoTask">暂无任务</div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapMutations } from 'vuex'
import qs from 'qs'
import common from '../../utils/common'
import { MessageBox } from 'mint-ui';
export default {
  components:{},
  props:{},
  data(){
    return {
      selected: '1',
      getTaskList: [],
      toComTaskList: [],
      completedTaskList: [],
      isShowCompletedTaskList: true, // 是否显示已完成列表
    }
  },
  watch:{
    // 监听selected
    selected(val, oldVal) {

      //val     切换后 id
      //oldVal  切换前 id 
      this.selected = val
      if (val === "1") {
        this.getTaskOneTap()
        this.$router.push({
            name: 'tasks',
            query: {seleced: '1'}
        })
      } else if (val === "2") {
         this.getTaskTwoTap()
        console.log('点击了2')
      } else if (val === "3") {
         this.getTaskThreeTap()
         console.log('点击了3')
      }
      console.log('seleced', val, oldVal)
    }
  },
  computed:{},
  methods:{
    // 将事件派发
    toTaskDetail(taskId, isHaveUpload, taskType) {
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
          for (const v of data) {
            v.submitByTime = v.submitByTime.substring(0, 10)
          }
          this.getTaskList = data
        }
      }).catch((error) => {
        
      }).then(() =>{
      })
    },
     // 获取任务列表 第二步
    getTaskTwoTap() {
      this.$axios.get(this.$api.taskTwoTap).then((response) => {
        console.log('response', response)
        const { data, success } = response.data
        if (success) {
          for (const v of data) {
            v.submitByTime = v.submitByTime.substring(0, 10)
          }
          this.toComTaskList = data
        }
      }).catch((error) => {
        
      }).then(() =>{
      })
    },
     // 获取任务列表 第三步
    getTaskThreeTap() {
      this.$axios.get(this.$api.taskThreeTap).then((response) => {
        console.log('response', response)
        const { data, success } = response.data
        if (success) {
          for (const v of data) {
            v.submitByTime = v.submitByTime.substring(0, 10)
          }
          this.completedTaskList = data
        }
      }).catch((error) => {
        
      }).then(() =>{
      })
    },
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
  .t-list
    width 100%
    height 120px
    display flex
    box-sizing border-box
    background-color #ffffff
    justify-content space-between
    margin-top 15px
    .tl-left
      width 250px
      .tll-tittle 
        padding 15px 0
        font-size $fs18
      .tll-content
        padding-bottom 20px
        color $fs-content
        font-size $fs16
      .tll-last
        color $fs-time
        font-size $fs14
    .tl-right
      height 100%
      display flex
      align-items center
.havenoTask
  display flex
  justify-content  center
  width 100%
  align-items center
  margin-top 50%
</style>