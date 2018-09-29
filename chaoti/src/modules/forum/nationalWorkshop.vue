<template>
    <div class="nw">
        <Header></Header>
        <div class="nw-list" @click="navToWorkDetail(item.Id)" v-for="item in actilist" :key="item.Id">
            <div class="nwl-status have" v-if="item.Status === 0">进行中</div>
            <div class="nwl-status" v-if="item.Status === 1">已结束</div>
            <div class="nwl-title">{{item.Title}}</div>
        </div>
        <mt-palette-button content="体验" @expand="main_log('expand')" @expanded="main_log('expanded')" @collapse="main_log('collapse')"
        direction="lt" class="changeClass" :radius="100" ref="target_1" mainButtonStyle="color:#fff;background-color:#ef4f4f;font-size:14px">
        <div class="my-icon-button indexicon icon-popup classH" @click.stop ="sub_log(1)"><div class="classRadio" v-if="isExpend">进行中</div></div>
        <div class="my-icon-button indexicon icon-popup classH" @click.stop ="sub_log(2)"><div class="classRadio" v-if="isExpend">进行中</div></div>
        <div class="my-icon-button indexicon icon-popup classH" @click.stop ="sub_log(3)"><div class="classRadio" v-if="isExpend">全部</div></div>
    </mt-palette-button>
    <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
import emoticon from 'utils/emoticon'
import common from '../../utils/common' 
import { MessageBox, Indicator, Actionsheet } from "mint-ui"
import Header from 'components/header/header'
export default {
  components:{
    Header
  },
  props:{},
  data(){
    return {
        actilist: [],
        actilistAll: [],
        actilistHave: [],
        actilistEnd: [],
        isExpend: false
    }
  },
  watch:{},
  computed: {
  },
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
        if (val === 1) {
            this.actilist = this.actilistHave
        } else if (val === 2) {
            this.actilist = this.actilistEnd
        } else {
            this.actilist = this.actilistAll
        }
        this.$refs.target_1.collapse()
        return false
    },
    getactilist() {
        this.actilist = []
        this.actilistAll = []
        this.actilistHave = []
        this.actilistEnd = []
        this.$axios.get(this.$api.getactilist).then((response) => {
            const { data, success } = response.data
            if (success) {
               this.actilist = this.actilistAll = data
               for (const item of data) {
                   if (item.Status === 0) {
                       this.actilistHave.push(item)
                   } else if (item.Status === 1) {
                       this.actilistEnd.push(item)
                   }
               }
            }
        })
    },
    // 跳转到详情
    navToWorkDetail(Id) {
        this.$router.push({
          path: `/nationalWorkshop/${Id}`
        })
    }
  },
  created() {
      this.getactilist()
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
    .have 
        color rgb(239, 79, 79)
    .nwl-status
        width 20%
    .nwl-title
        width 80%
        no-wrap()
</style>