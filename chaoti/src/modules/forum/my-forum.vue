<template>
  <div class="tasks">
    <Header></Header>
    <div class="page-navbar">
        <div class="pn-list" v-if="val === 1"  v-for="item in mypostslistOne" :key="item.postsId" @click="toTaskDetail(item.postsId)">
            <mt-cell class="pnl-list" is-link  :title="item.details">
                <span class="red">新的回复</span>
            </mt-cell>
        </div>
        <div class="pn-list" v-if="val === 2"  v-for="item in mypostslistTwo" :key="item.postsId" @click="toTaskDetail(item.postsId)">
            <mt-cell class="pnl-list" is-link :title="item.details">
                <span>已回复</span>
            </mt-cell>
        </div>
        <div class="pn-list" v-if="val === 3"  v-for="item in mypostslist" :key="item.postsId" @click="toTaskDetail(item.postsId)">
            <mt-cell class="pnl-list" v-if="item.receiveStatus === 0" is-link  :title="item.details">
                <span v-if="item.isReply === 1" class="red">新的回复</span>
            </mt-cell>
            <mt-cell class="pnl-list" v-if="item.receiveStatus === 1" is-link :title="item.details">
                <span v-if="item.isReply === 0">已回复</span>
            </mt-cell>
        </div>
    </div>
        
    <mt-palette-button content="回复" @expand="main_log('expand')" @expanded="main_log('expanded')" @collapse="main_log('collapse')"
            direction="lt" class="changeClass" :radius="100" ref="target_1" mainButtonStyle="color:#fff;background-color:#ef4f4f;font-size:14px">
            <div class="my-icon-button indexicon icon-popup" @touchstart="sub_log(1)"><div class="classRadio" v-if="isExpend">新回复</div></div>
            <div class="my-icon-button indexicon icon-popup" @touchstart="sub_log(2)"><div class="classRadio" v-if="isExpend">已回复</div></div>
            <div class="my-icon-button indexicon icon-popup" @touchstart="sub_log(3)"><div class="classRadio" v-if="isExpend">全部</div></div>
    </mt-palette-button>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { MessageBox } from "mint-ui"
import common from '../../utils/common'
import Header from 'components/header/header'
import qs from 'qs'
export default {
  components: {
    Header
  },
  props: {},
  data() {
    return {
        mypostslist: [],
        mypostslistOne: [],
        mypostslistTwo: [],
        val: 3,
        isExpend: false
    }
  },
  watch: {
  },
  computed: {},
  methods: {
    main_log(val) {
        console.log('main_log', val)
        if (val === 'expand') {
            this.isExpend = true
        } else if(val === 'collapse') {
            this.isExpend = false
        }
    },
    sub_log(val) {
        this.val = val
        this.$refs.target_1.collapse()
        return false
    },
    // 获取任务列表
    getmypostslist() {
        this.mypostslist = []
        this.mypostslistOne = []
        this.mypostslistTwo = []
        // const data = [
        //     {receiveStatus:0, Title: '范德萨发送回家啊分手I·佛挡杀佛大法好大发大水很大范德萨大很大很大', Id: 1},
        //     {receiveStatus:1, Title: '范德萨发送回家啊分手I·佛挡杀佛大法好大发大水很大范德萨大很大很大2', Id: 2}
        // ]
        // for (const item of data) {
        //     const {receiveStatus} = item 
        //     if (receiveStatus === 0) {
        //         this.mypostslistOne.push(item)
        //     } else if (receiveStatus === 1) {
        //         this.mypostslistTwo.push(item)
        //     }
        // }
        // this.mypostslist = data
    //   return
      this.$axios.get(this.$api.getmypostslist).then((response) => {
        console.log('response', response)
        const { data, success } = response.data
        if (success) {
            for (const item of data) {
                const {receiveStatus} = item 
                if (receiveStatus === 0) {
                    this.mypostslistOne.push(item)
                } else if (receiveStatus === 1) {
                    this.mypostslistTwo.push(item)
                }
            }
            debugger
            this.mypostslist = data
        }
      }).catch((error) => {
        
      }).then(() =>{
      })
    },
    // 跳转到任务详情
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
      // this.setTaskDetail(taskId)
    }
  },
  activated() {
  },
  created() {
      this.getmypostslist()
  },
  mounted() {}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '../../assets/stylus/variable.styl'
.page-navbar
    margin-top 60px
    .pn-list
        margin-top 10px
</style>