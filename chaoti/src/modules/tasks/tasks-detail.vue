<template>
  <transition name="slide">
    <div class="task-detail">
        <div class="t-header"></div>
        <div class="td-list">
          <div class="tdl-title"><span class="bloder">任务标题：</span>2018下半年脑if噢is发达范德萨发发发发范德萨发发</div>
          <div class="tdl-content">
            <div><span class="bloder">内容:</span> 范德萨发搭嘎广大搭嘎搭嘎打发发达地方司法但是发放范德萨发大师傅发发</div>
          </div>
           <div class="uplad">
              <upload @fileList="uplad" :isHaveUpload="isHaveUpload"></upload>  
            </div>
          <div>
            <mt-button v-if="taskDetail.state === 1" type="primary">领取任务</mt-button>
            <mt-button class="gray" v-if="taskDetail.state === 2" type="primary">已过期</mt-button>
          </div>
        </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import upload from 'components/upload/upload'
export default {
  components: {
      upload
  },
  props:{},
  data(){
    return {
      taskDetail: {},
      isHaveUpload: false
    }
  },
  watch:{},
  computed:{
    test() {
         console.log('isHaveUpload', this.isHaveUpload)
     },
    // 获取store中的taskList的值
    ...mapGetters([
      'taskListDetail'
    ])
  },
  methods:{
    uplad(e) {
      console.log('uplad', e)
    }
  },
  beforeCreate() {
  },
  created(){
    console.log('this.tash', this.taskListDetail)
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
    line-height 20px
</style>