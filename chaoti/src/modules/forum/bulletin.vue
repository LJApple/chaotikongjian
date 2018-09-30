<template>
    <div class="nw">
        <Header></Header>
        <!-- <div class="v-list">
            <swiper :options="swiperOption">
                <swiper-slide v-if="postsTypes" v-for="item in postsTypes" :data-id="item.id" :key="item.id">{{item.name}}</swiper-slide>
            </swiper>
        </div> -->
        <div class="nw-list" @click="navToWorkDetail(item.Id)" v-for="item in bulletinList" :key="item.Id">
            <div class="nwl-title">{{item.Title}}</div>
            <div class="nwl-tip">{{item.TypeName}}</div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
import emoticon from 'utils/emoticon'
import common from '../../utils/common' 
import { Indicator, MessageBox } from 'mint-ui'
import Header from 'components/header/header'
export default {
  components:{
    Header
  },
  props:{},
  data(){
    const self = this
    return {
        bulletinList: [],
        isExpend: false,
        // swiperOption: {
        //     spaceBetween: 0,
        //     slidesPerView: 'auto',
        //     slideToClickedSlide: true,
        //     preventClicks : false,
        //     pagination: {
        //         el: '.swiper-pagination',
        //         clickable: true
        //     },
        //     on: {
        //         click: function (e) {
        //             const {id} = e.target.dataset
        //             self.selctPostsType(id)
        //         }
        //     }
        // },
        // postsTypes: [
        //     {name: '全部', id: 3},
        //     {name: '进行中', id: 1},
        //     {name: '已结束', id: 2}
        // ]        
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