<template>
    <div class="nwd">
        <div class="nwd-title">
            <span class="blod">标题：</span>
            <span>{{nwInfo.Title}}</span>
        </div>
        <div class="nwd-time">
            <span class="blod">时间：</span>
            <span>{{nwInfo.EndTime}}</span>
        </div>
        <div class="nwd-content">
            <div class="blod">内容：</div>
            <div v-html="nwInfo.Details" class="nwdc-c">{{nwInfo.Details}}</div>
        </div>
        <div class="nwd-btn">
            <span>{{nwInfo.EndTime}}</span>
            <div v-if="nwInfo.Status === 0">我要报名</div>
            <div v-if="nwInfo.Status === 0">已结束</div>
            <div v-if="nwInfo.Status === 0">已参与</div>
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
        nwInfo: null
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
            const { data, success } = response.data
            if (success) {
              this.nwInfo = data
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
    z-index 9999
    background #ffffff
    color #333333
    padding 0 12px
    box-sizing border-box
    .nwd-title
        height 40px
        line-height @height
    .nwd-time
        height 40px
        line-height @height
    .blod
        font-weight bolder
</style>