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
          <div @click="toTaskDetail(item.id, false)" v-for="(item, index) in getTaskList" :key="index" class="t-list paddingLR12">
            <div class="tl-left">
              <div class="tll-tittle nowrap">{{item.title}}</div>
              <div class="tll-content nowrap">{{item.content}}</div>
              <div class="tll-last nowrap">截止时间：{{item.time}}</div>
            </div>
            <div class="tl-right">
              <mt-button v-if="item.state === 1" type="primary">领取任务</mt-button>
              <mt-button class="gray" v-if="item.state === 2" type="primary">已过期</mt-button>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
           <div @click="toTaskDetail(item.id, true)" v-for="(item, index) in toComTaskList" :key="index" class="t-list paddingLR12">
            <div class="tl-left">
              <div class="tll-tittle nowrap">{{item.title}}</div>
              <div class="tll-content nowrap">{{item.content}}</div>
              <div class="tll-last nowrap">截止时间：{{item.time}}</div>
            </div>
            <div class="tl-right">
              <mt-button v-if="item.state === 1" type="primary">领取任务</mt-button>
              <mt-button class="gray" v-if="item.state === 2" type="primary">已过期</mt-button>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
            <div @click="toTaskDetail(item.id, true)" v-for="(item, index) in completedTaskList" :key="index" class="t-list paddingLR12">
              <div class="tl-left">
                <div class="tll-tittle nowrap">{{item.title}}</div>
                <div class="tll-content nowrap">{{item.content}}</div>
                <div class="tll-last nowrap">截止时间：{{item.time}}</div>
              </div>
              <div class="tl-right">
                <mt-button v-if="item.state === 1" type="primary">待审核</mt-button>
                <mt-button class="gray" v-if="item.state === 2" type="primary">已过期</mt-button>
              </div>
            </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapMutations } from 'vuex'
export default {
  components:{},
  props:{},
  data(){
    return {
       selected: '1',
       getTaskList: [
         {id: 1, title: '攀岩活动', content: '发哦附近嗷嗷佛发发哦附近嗷嗷佛发发哦附近嗷嗷佛发', time: '2016-9-8', state: 1},
         {id: 2, title: '攀岩活动', content: '发哦附近嗷嗷佛发发哦附近嗷嗷佛发发哦附近嗷嗷佛发', time: '2016-9-8', state: 2}
       ],
       toComTaskList: [
        {title: '攀岩活动2', content: '发哦附近嗷嗷佛发发哦附近嗷嗷佛发发哦附近嗷嗷佛发', time: '2016-9-8', state: 2}
       ],
      completedTaskList: [
        {title: '攀岩活动3', content: '发哦附近嗷嗷佛发发哦附近嗷嗷佛发发哦附近嗷嗷佛发', time: '2016-9-8', state: 1}
      ]
    }
  },
  watch:{
    // 监听selected
    selected(val, oldVal) {

      //val     切换后 id
      //oldVal  切换前 id 
      this.selected = val
      if (val === "1") {
        console.log('点击了1')
      } else if (val === "2") {
        console.log('点击了2')
      } else if (val === "3") {
         console.log('点击了3')
      }
      console.log('seleced', val, oldVal)
    }
  },
  computed:{},
  methods:{
    // 将事件派发
    toTaskDetail(taskId, isHaveUpload) {
      this.$router.push({
        name: 'tasksDetail',
        params: { taskId },
        query: {isHaveUpload}
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
    ...mapMutations({
      setTaskDetail: 'SET_TASK_LIST_DETAIL'
    })
  },
  activated () {
    // 缓存返回卸卸载这里
    console.log('this.selected', this.selected)
  },
  created(){
    this.changeSelected()
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
</style>