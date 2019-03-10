<template>
    <div class="nwd" v-if="bulletinListDetail">
        <div class="nwd-title">
           {{bulletinListDetail.Title}}
        </div>
        <div class="nwd-time">
            <div class="">{{bulletinListDetail.TypeName}}</div>
            <span class="conW">{{bulletinListDetail.CreateDate}}</span>
        </div>
        <div class="nwd-content">
            <div v-html="bulletinListDetail.Details" class="nwdc-c">{{bulletinListDetail.Details}}</div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import common from '../../utils/common'
import Header from 'components/header/header'
export default {
  components:{
    Header
  },
  props:{},
  data(){
    return {
        bulletinListDetail: null
    }
  },
  watch:{},
  computed: {
  },
  methods:{
    getnoticelist() {
        const {activityId} = this.$route.params
        this.$axios.get(this.$api.getnoticelist).then((response) => {
            const { data, success } = response.data
            if (success) {
                for (const item of data) {
                    if (item.Id === parseInt(activityId)) {
                         this.bulletinListDetail = item
                    }
                }
            }
        })
    }
  },
  created() {
      this.getnoticelist()
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
        text-align center
        font-weight bolder
        font-size 16px
        padding 20px 0
    .nwd-time
        display flex
        justify-content space-between
        color #999999
        padding-bottom 20px
</style>
