<template>
    <div class="nwd" v-if="nwInfo">
        <div class="nwd-title">
            <span class="blod titleW">标题：</span>
            <span class="conW">{{nwInfo.Title}}</span>
        </div>
        <div class="nwd-time">
            <span class="blod titleW">时间：</span>
            <span class="conW">{{nwInfo.EndTime}}</span>
        </div>
        <div class="nwd-content">
            <div class="blod">内容：</div>
            <div v-html="nwInfo.Details" class="nwdc-c">{{nwInfo.Details}}</div>
        </div>
        <div class="nwd-btn">
            <div class="nwdb-red" @click="saveactivity" v-if="nwInfo.Status === 0">我要报名</div>
            <div class="nwdb-gray" v-if="nwInfo.Status === 1">已结束/{{nwState}}</div>
        </div>
        <div class="ac-table">
            <div class="act-desc">目前各部门体验情况</div>
            <div class="act-title">
                <div class="act-l">部门</div>
                <div class="act-l">体验人数</div>
                <div class="act-l">参与率</div>
            </div>
            <div v-for="item in activitycount" :key="item.id" class="act-list">
                <div class="actl-l">{{item.deptName}}</div>
                <div class="actl-l">{{item.userCount}}</div>
                <div class="actl-l">{{item.rate}}</div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import emoticon from 'utils/emoticon'
import { Actionsheet } from 'mint-ui'
import common from '../../utils/common'
import { MessageBox } from "mint-ui"
import { Indicator } from 'mint-ui'
import Header from 'components/header/header'
export default {
  components:{
    Header
  },
  props:{},
  data(){
    return {
        nwInfo: null,
        nwState: null,
        activitycount: []
    }
  },
  watch:{},
  computed: {
  },
  methods:{
    getactivitydetail() {
        const {activityId} = this.$route.params
        const url = this.$api.getactivitydetail + '?activityId=' + activityId
        this.$axios.get(url).then((response) => {
            const { data, success,  message} = response.data
            if (success) {
              this.nwInfo = data
              this.nwState = message
            }
        })
    },
    getactivitycount() {
        const {activityId} = this.$route.params
        const url = this.$api.getactivitycount + '?activityId=' + activityId
        this.$axios.get(url).then((response) => {
            const { data, success,  message} = response.data
            if (success) {
             this.activitycount = data
            }
        })
    },
    // 参与活动
    saveactivity() {
        const {activityId} = this.$route.params
        const url = this.$api.saveactivity + '?activityId=' + activityId
        this.$axios.post(url).then((response) => {
            const { data, success,  message} = response.data
            if (success) {
                MessageBox.alert("参与活动成功")
            }
        })
    }
  },
  created() {
      this.getactivitydetail()
  },
  mounted() {}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../assets/stylus/variable.styl"
@import "../../assets/stylus/mixin.styl"
.nwd
    position fixed
    top 0
    height 100%
    width 100%
    z-index 100
    background #ffffff
    color #333333
    padding 0 12px
    overflow auto
    box-sizing border-box
    padding-bottom 50px
    .nwd-title
        height 40px
        line-height @height
        display flex
        span 
            no-wrap()
    .nwd-time
        height 40px
        line-height @height
    .blod
        font-weight bolder
    .nwd-btn
        width 100%
        height 40px
        line-height @height 
        text-align center
        border-top 1px solid #dddddd
        border-bottom 1px solid #dddddd
    .nwdb-red
        background-color $bg-color
        color #ffffff 
    .nwdb-gray
        background-color #999999
        color #ffffff 
    .titleW
        width 15%
    .conW
        width 85%
    .nwdc-c
        line-height 20px
        overflow auto 
        text-align justify
    .ac-table
        margin-top 20px
        border 1px solid #dddddd
        .act-desc
            border-bottom 1px solid #dddddd
            height 40px
            line-height  @height
            font-size 16px
            font-weight bolder
            text-align center
        .act-title
            display  flex
            .act-l
                font-weight bolder
                width 33.33333333%
                text-align center
                height 30px
                line-height @height
        .act-list
            border-bottom 1px solid #dddddd
            display flex
            .actl-l
                width 33.33333333%
                text-align center
                height 30px
                line-height @height
</style>