<template>
  <div class="tasks">
    <!-- <div class="t-header"></div> -->
    <Header :isShowSetting="true" :isShowsetImg="true"></Header>
    <div class="page-navbar">
        <div class="pn-list" v-for="(item, index) in getTaskList" :key="index" @click="toTaskDetail(item.taskId)">
            <mt-cell class="pnl-list" is-link  :title="item.title">
                <!-- <span>未领取</span> -->
            </mt-cell>
        </div>
        <div class="pn-null" v-if="getTaskList.length === 0">暂无数据</div>
    </div>
    <div @click="showBtn">
      <mt-palette-button :content="content" @expand="main_log('expand')" @expanded="main_log('expanded')" @collapse="main_log('collapse')"
        direction="lt" class="changeClass" :class="isExpend?'expand':''" :radius="140" ref="target_1" mainButtonStyle="color:#fff;background-color:#ef4f4f;font-size:14px">
        <div class="my-icon-button indexicon icon-popup classH" @click.stop ="sub_log(1)"><div class="classRadio" v-if="isExpend">未领取</div></div>
        <div class="my-icon-button indexicon icon-popup classH" @click.stop ="sub_log(2)"><div class="classRadio" v-if="isExpend">待提交</div></div>
        <div class="my-icon-button indexicon icon-popup classH" @click.stop ="sub_log(3)"><div class="classRadio" v-if="isExpend">已完成</div></div>
        <div class="my-icon-button indexicon icon-popup classH" @click.stop ="sub_log(4)"><div class="classRadio" v-if="isExpend">已过期</div></div>
        <!-- <div class="my-icon-button indexicon icon-popup classH" @click.stop ="sub_log(5)"><div class="classRadio" v-if="isExpend">全部</div></div> -->
      </mt-palette-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapMutations } from 'vuex'
import qs from 'qs'
import common from '../../utils/common'
import { MessageBox } from 'mint-ui'
import Header from 'components/header/header'
export default {
  components:{
    Header
  },
  props:{},
  data(){
    return {
     getTaskList: [],
     isExpend: false,
     val: 1,
     content: '未领取'
    }
  },
  watch:{
  },
  computed:{},
  methods:{
    showBtn() {
      // 判断是否是移动端
      if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        this.isExpend = !this.isExpend
      }
    },
    main_log(val) {
      if (val === 'expand') {
          this.isExpend = true
      } else if(val === 'collapse') {
          this.isExpend = false
      }
    },
    sub_log(val) {
      console.log('sub_log', val)
      this.val = val
      this.getTaskOneTap()
      if (val === 1) {
        this.content = '未领取'
      } else if (val === 2) {
        this.content = '待提交'
      } else if (val === 3) {
        this.content = '已完成'
      } else if (val === 4) {
        this.content = '已过期'
      }
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
      this.getTaskList = []
      const url = this.$api.taskOneTap + '?type=' + (this.val - 1)
      this.$axios.get(url).then((response) => {
        console.log('response', response)
        const { data, success } = response.data
        if (success) {
          this.getTaskList = data
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
    // this.getTaskOneTap()
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
            height: 50px !important
            width: @height
            border-radius: @height
            line-height: @height
            font-size: 12px
            color: #ffffff
            background: #ef4f4f
</style>
