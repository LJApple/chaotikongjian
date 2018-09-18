<template>
  <div class="forum-detail">
     <div class="fd-header">
        <div>我是logo</div>
        <!-- <div class="fdh-post" @click="publishTopic">发布话题</div> -->
    </div>
     <div class="v-list">
        <!-- swiper -->
        <swiper :options="swiperOption">
            <swiper-slide @click="selctPostsType()">全部</swiper-slide>
            <swiper-slide v-if="postsTypes" v-for="item in postsTypes" :data-id="item.id" :key="item.id">{{item.name}}</swiper-slide>
        </swiper>
    </div>
    <div class="fd-list">
        <div v-if="forumDetailList">
             <div class="fdl-list" @click="navToDetail(item.postsId)" v-for="item in forumDetailList" :key="item.id">
                <div class="fdll-top">
                    <img v-if="!item.photo" src="../../assets/images/default.png" alt="/assets/images/comment.png">
                    <img v-else :src="item.photo" alt="/assets/images/comment.png">
                    <div class="df-flex">
                        <div class="df-if1">{{item.name}}</div>
                        <div class="df-if2">{{item.createTime}}</div>
                    </div>
                </div>
                <div class="fdll-mess">
                    {{item.details}}
                </div>
                <div class="fdll-btnbox">
                    <div class="fdllb-btns">
                        <img src="../../assets/images/comment.png" alt="/assets/images/comment.png">
                        <span>{{item.commentCount}}</span>
                    </div>
                    <span class="fdllb-btns" @click.stop="clickLike(item.postsId)">
                        <img v-if="!item.good" src="../../assets/images/like.png" alt="/assets/images/like.png">
                        <img v-else src="../../assets/images/like-active.png" alt="/assets/images/like-active.png">
                        <span>{{item.goodCount}}</span>
                    </span>
                </div>
            </div>
        </div>
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
                    const {id} = e.target.dataset
                    self.selctPostsType(id)
                }
            }
        },
        forumDetailList: null,
        postsTypes: []
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
              from: this.$route.query.from
          }
       })
    },
    // 获取帖子类型
    getPostsType() {
        // param = common.splicingJson(param)
        const url = this.$api.getPostsType + '?typeId=' + this.$route.query.from
        this.$axios.get(url).then((response) => {
            const { data, success } = response.data
            if (success) {
               this.postsTypes = data
            //    this.selctPostsType()
            }
        })
    },
    // 获取帖子列表
    selctPostsType(postsTypeId) {
        // sectionId postsTypeId
        const url = `${this.$api.getpostlist}?sectionId=${this.$route.query.from}&postsTypeId=${postsTypeId}`
        this.$axios.get(url).then((response) => {
        const { data, success } = response.data
        if (success) {
            this.forumDetailList = data
        } else {
            this.forumDetailList = null
        }
      })
    },
    // 点赞
    clickLike(postsId) {
        for (const item of this.forumDetailList) {
            if (postsId === item.postsId) {
                const url = `${this.$api.postspraise}?postsId=${postsId}&replyId=0&lv=0`
                this.$axios.post(url).then((response) => {
                    const { data, success } = response.data
                    if (success) {
                        item.goodCount = item.good ? item.goodCount - 1 : item.goodCount + 1
                        item.good = item.good ? 0 : 1
                    }
                })
            }
        }
    },
    // 跳转到帖子详情
    navToDetail(postsId) {
        this.$router.push({
          path: '/forumListDetail',
          query: {
              postsId
          }
       })
    }
  },
   activated () {
    // 缓存返回卸卸载这里
    this.selctPostsType()
  },
  created(){
      // 获取帖子类型
      this.getPostsType()
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
    background rgba(0, 0, 0, 0.5)
    display flex
    justify-content center
    align-items center
    img
        height 40px
        width @height
.fd-list
    margin-top 101px
    .fdl-list
        margin-top 10px
        padding 12px
        background #ffffff
        .fdll-top
            display flex
            align-items center
            height 40px
            img 
                height 40px
                width @height
                border-radius 100%
            .df-flex
                padding-left 10px
                .df-if1
                    padding-bottom 10px
                    font-weight bolder
                .df-if2
                    font-size 12px
        .fdll-mess
            padding 10px 0
            line-height 20px
        .fdll-btnbox
            display flex
            padding-top 12px
            img 
                height 22px
                width @height
            span 
                padding 0 10px
                font-size 16px
            .fdllb-btns
                width 50%
                display flex
                height 22px
                align-items center
                justify-content center
                color #333


</style>