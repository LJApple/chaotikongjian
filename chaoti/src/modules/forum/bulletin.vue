<template>
    <div class="nw">
        <Header></Header>
        <div class="v-list">
            <!-- <swiper :options="swiperOption">
                <swiper-slide @click="selctPostsType()">全部</swiper-slide>
                <swiper-slide v-if="postsTypes" v-for="item in postsTypes" :data-id="item.id" :key="item.id">{{item.name}}</swiper-slide>
            </swiper> -->
          <van-tabs @click="selctPostsType">
            <van-tab v-for="item in postsTypes" :title="item.name" :key="item.id"></van-tab>
          </van-tabs>
        </div>
        <div class="nw-list"  @click="navToWorkDetail(item.Id)" :key="item.Id" v-for="item in bulletinList">
            <div class="nwl-title">{{item.Title}}</div>
            <van-tag v-if="item.IsNew" type="danger">new</van-tag>
            <!-- <div class="nwl-tip">{{item.TypeName}}</div> -->
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
       postsTypes: []
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
        const url = this.$api.addnoticereddot + '?noticeId=' + Id
        this.$axios.post(url).then((response) => {
            const { data, success } = response.data
            if (success) {
                this.$router.push({
                    path: `/bulletin/${Id}`
                })
            }
        })
    },
     // 获取帖子类型
    getPostsType() {
        // param = common.splicingJson(param)
        const url = this.$api.getPostsType + '?typeId=' + 3
        this.$axios.get(url).then((response) => {
            const { data, success } = response.data
            if (success) {
              data.unshift({
                id: 0,
                name: '全部'
              })
              this.postsTypes = data
            //    this.selctPostsType()
            }
        })
    },
    selctPostsType(TypeId) {
        this.bulletinList = []
        if (TypeId === 1) TypeId = 12
        if (TypeId === 2) TypeId = 13
         this.$axios.get(this.$api.getnoticelist).then((response) => {
            const { data, success } = response.data
            if (success) {
                if (!TypeId) return this.bulletinList = data
                for (const item of data) {
                    if (item.TypeId === parseInt(TypeId)) {
                      this.bulletinList.push(item)
                    }
                }
            }
        })
    },
  },
  created() {
      this.getnoticelist()
      this.getPostsType()
  },
  watch: {
   '$route' (to, from) {
       if (!to.params.activityId) {
        this.getnoticelist()
        this.getPostsType()
       }
   }
 },
  mounted() {}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../assets/stylus/variable.styl"
@import "../../assets/stylus/mixin.styl"
.swiper-slide
    width 33.33333% !important
.nw-list
    height 48px
    margin-top 10px
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
        width 100%
        no-wrap()
</style>
