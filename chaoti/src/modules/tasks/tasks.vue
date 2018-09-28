<template>
  <div class="tasks">
    <div class="t-header"></div>
    <div class="page-navbar">
        <div class="pn-list" v-if="val === 1" v-for="(item, index) in getTaskListOne" :key="index" @click="toTaskDetail(item.taskId, false, item.receiveStatus)">
            <mt-cell class="pnl-list" is-link  :title="item.title">
                <span>未领取</span>
            </mt-cell>
        </div>
        <div class="pn-list" v-if="val === 2"  v-for="(item, index) in getTaskListTwo" :key="index" @click="toTaskDetail(item.taskId, true, item.receiveStatus)">
            <mt-cell class="pnl-list" is-link  :title="item.title">
                <span>已领取</span>
            </mt-cell>
        </div>
        <div class="pn-list" v-if="val === 3"  v-for="(item, index) in getTaskListThree" :key="index" @click="toTaskDetail(item.taskId, true, item.receiveStatus)">
            <mt-cell class="pnl-list" is-link :title="item.title">
                <span>已完成</span>
            </mt-cell>
        </div>
        <div class="pn-list" v-if="val === 4"  v-for="(item, index) in getTaskListFour" :key="index" @click="toTaskDetail(item.taskId, false, item.receiveStatus)">
            <mt-cell class="pnl-list" is-link :title="item.title">
                <span>已过期</span>
            </mt-cell>
        </div>
        <!-- 全部 -->
         <div class="pn-list"  v-if="val === 5" v-for="(item, index) in getTaskList" :key="index" @click="toTaskDetail(item.taskId, false, item.receiveStatus)">
            <mt-cell class="pnl-list" is-link  v-if="item.receiveStatus === 0" :title="item.title">
                <span>未领取</span>
            </mt-cell>
            <mt-cell class="pnl-list" is-link  v-if="item.receiveStatus === 1" :title="item.title">
                <span>已领取</span>
            </mt-cell>
            <mt-cell class="pnl-list" is-link v-if="item.receiveStatus === 2" :title="item.title">
                <span>已完成</span>
            </mt-cell>
            <mt-cell class="pnl-list" is-link  v-if="item.receiveStatus === 3" :title="item.title">
                <span>未完成</span>
            </mt-cell>
        </div>
    </div>
    <mt-palette-button content="任务" @expand="main_log('expand')" @expanded="main_log('expanded')" @collapse="main_log('collapse')"
    direction="lt" class="changeClass" :radius="140" ref="target_1" mainButtonStyle="color:#fff;background-color:#ef4f4f;font-size:14px">
    <div class="my-icon-button indexicon icon-popup classH" @click.stop ="sub_log(1)"><div class="classRadio" v-if="isExpend">未领取</div></div>
    <div class="my-icon-button indexicon icon-popup classH" @click.stop ="sub_log(2)"><div class="classRadio" v-if="isExpend">已领取</div></div>
    <div class="my-icon-button indexicon icon-popup classH" @click.stop ="sub_log(3)"><div class="classRadio" v-if="isExpend">已完成</div></div>
    <div class="my-icon-button indexicon icon-popup classH" @click.stop ="sub_log(4)"><div class="classRadio" v-if="isExpend">已过期</div></div>
    <div class="my-icon-button indexicon icon-popup classH" @click.stop ="sub_log(5)"><div class="classRadio" v-if="isExpend">全部</div></div>
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
     getTaskListOne: [],
     getTaskListTwo: [],
     getTaskListThree: [],
     getTaskListFour: [],
     isExpend: false,
     val: 1
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
        this.val = val
        this.$refs.target_1.collapse()
        return false
    },
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
      const url = this.$api.taskOneTap  + '?account_token=' + common.getCookie('account_token')
      this.$axios.get(url).then((response) => {
        console.log('response', response)
        const { data, success } = response.data
        this.getTaskList = []
        this.getTaskListOne = []
         this.getTaskListTwo = []
        this.getTaskListThree = []
        this.getTaskListFour = []
        if (success) {
          for (const item of data) {
            item.title = item.title + (item.taskStatus === 0 ? '（新）':'（已结束）')
            const {receiveStatus} = item 
            if (receiveStatus === 0) {
              this.getTaskListOne.push(item)
            } else if (receiveStatus === 1) {
              this.getTaskListTwo.push(item)
            } else if (receiveStatus === 2) {
              this.getTaskListThree.push(item)
            } else if (receiveStatus === 3) {
               this.getTaskListFour.push(item)
            }
          }
          this.getTaskList = data
          console.log('this.', this.getTaskList)
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
    // 缓存返回卸卸载这里
    this.getTaskOneTap()
  },
  created(){
    // this.changeSelected()
    // 领取任务列表数据
    // this.getTaskOneTap()
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
    .classH
      height 58px
      width 58px
    .changeClass
        position: fixed
        right: 30px
        bottom: 30px
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