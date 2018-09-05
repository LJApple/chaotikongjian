<template>
  <div class="forum-detail">
     <div class="fd-header">
        <div>我是logo</div>
        <!-- <div class="fdh-post" @click="publishTopic">发布话题</div> -->
    </div>
     <div class="v-list">
        <!-- swiper -->
        <swiper :options="swiperOption">
            <swiper-slide data-index="0">热门帖</swiper-slide>
            <swiper-slide data-index="1">最新帖</swiper-slide>
            <swiper-slide data-index="2">系统反馈</swiper-slide>
            <swiper-slide data-index="3">产品反馈</swiper-slide>
            <swiper-slide data-index="4">活动反馈</swiper-slide>
            <swiper-slide data-index="5">其他</swiper-slide>
        </swiper>
    </div>
    <div class="fd-list">
        <templete v-if="forumDetailList">
             <div class="fdl-list" v-for="(item, index) in forumDetailList" :key="index">
                <div class="fdll-top">
                    <img src="/assets/images/default.jpg" class="da-icon">
                    <div class="df-flex">
                        <div class="df-if1">{{item.Name}}</div>
                        <div class="df-if2">{{item.CreateTime}}</div>
                    </div>
                </div>
                <div class="fdll-mess">
                    {{item.Details}}
                </div>
                <div class="fdll-btnbox">
                    <div class="fdllb-btns">
                        <img src="../../assets/images/comment.png" alt="/assets/images/comment.png">
                        <span>{{item.count}}</span>
                    </div>
                    <span class="fdllb-btns">
                        <img src="../../assets/images/comment.png" alt="/assets/images/like.png">
                        <img src="../../assets/images/comment.png" alt="/assets/images/like-active.png">
                        <span>{{item.count}}</span>
                    </span>
                </div>
            </div>
        </templete>
        <div class="fdl-null" v-else>暂无帖子</div>
    </div>
    <div class="post" @click="toPost">
        <img src="../../assets/images/post.png" alt="/assets/images/post.png">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components:{
    swiper,
    swiperSlide
  },
  props:{},
  data(){
    const self = this
    return {
        value: '',
        autofocus: true,
        swiperOption: {
            spaceBetween: 0,
            slidesPerView: 'auto',
            slideToClickedSlide: true,
            preventClicks : false,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            on: {
                click: function (e) {
                    const {index} = e.target.dataset
                    self.swiperData(index)
                }
            }
        },
        forumDetailList: null
    }
  },
  watch:{},
  computed:{
  },
  methods:{
    publishTopic() {
      this.$router.push({
          path: '/post'
      })
    },
    // 跳转到发布帖子
    toPost() {
        this.$router.push({
          path: '/post',
          query: {
              form: this.$route.query.from
          }
       })
    },
    // 切换数据
    swiperData(type) {
        console.log('type', type)
        // 热门帖
        if (type === 0) {

        } else if(type === 1) {
            // 最新帖
        } else if(type === 2) {
            // 系统反馈
        } else if(type === 3) {
            // 产品反馈
        } else if(type === 4) {
            // 活动反馈
        } else {
            // 其他
        }
    },
    // 获取帖子列表
    getpostlist() {
        this.$axios.get(this.$api.getpostlist).then((response) => {
        const { data, success } = response.data
        if (success) {
          this.forumDetailList = data
        }
      })
    }
  },
  created(){
      // 获取帖子列表
      this.getpostlist()
  },
  mounted(){}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../assets/stylus/variable.styl"
.fd-header
    height 50px
    position fixed
    top 0
    width 100%
    padding $pagePadding
    background $bg-color 
    display flex
    align-items center
    justify-content space-between
    box-sizing border-box
    color #ffffff
    .fdh-post
        background #26a2ff
        padding 10px
        border-radius 10px
.v-list
    position fixed
    top 50px
    width 100%
    .swiper-slide
        height 40px
        width 100px
        line-height @height
        text-align center
        background #ffffff
        border-right 1px solid #dddddd
        border-bottom 1px solid #dddddd
        &:last-child
            border-right 0
.fdl-null
    height 100vh
    width 100%
    display flex
    align-items center
    justify-content center
    font-size 12px
.post
    position fixed
    bottom 50px
    width 70px
    height @width
    border-radius @width
    right 20px
    background #b8bbbf
    display flex
    justify-content center
    align-items center
    img
        height 50px
        width @height
</style>