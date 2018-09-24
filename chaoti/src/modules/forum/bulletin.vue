<template>
    <div class="nw">
        <Header></Header>
        <div class="nw-list" @click="navToWorkDetail(item.Id)" v-for="item in bulletinList" :key="item.Id">
            <div class="nwl-title">{{item.Title}}</div>
            <div class="nwl-tip">{{item.TypeName}}</div>
        </div>
        <router-view></router-view>
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
        bulletinList: [],
        isExpend: false
    }
  },
  watch:{},
  computed: {
  },
  methods:{
    getnoticelist() {
        this.$axios.get(this.$api.getnoticelist).then((response) => {
            const { data, success } = response.data
            if (success) {
               this.bulletinList = data
               }
        })
    },
    // 跳转到详情
    navToWorkDetail(Id) {
         this.$router.push({
          path: `/bulletin/${Id}`
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
.nw
    padding-top 60px
.nw-list
    height 48px
    display flex
    align-items center
    border-top 1px solid #d9d9d9 
    border-bottom 1px solid #d9d9d9 
    margin-bottom 10px
    background #ffffff
    font-size 16px
    padding 0 12px
    position relative
    .nwl-tip
        position absolute
        right 12px
        color $de-color
    .have 
        color rgb(239, 79, 79)
    .nwl-status
        width 20%
    .nwl-title
        width 80%
        no-wrap()
</style>