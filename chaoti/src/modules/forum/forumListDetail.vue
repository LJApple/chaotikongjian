<template>
  <div class="fd">
      <div class="fd-header">
          <img class="fdh-img" :src="forumListDetailInfo.photo" alt="">
          <div class="fdh-name">{{forumListDetailInfo.name}}</div>
          <div v-if="forumListDetailInfo.isDel" class="fdh-isDel">删除</div>
      </div>
       <swiper class="fd-banner" :options="swiperOption">
        <swiper-slide v-for="(item, index) in forumListDetailInfo.uploadFileUrl" :key="index">
            <img :src="item" alt="" @click="clickImg"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="fd-content">
          <div class="fd-opr">
              <div class="fdo-left">{{forumListDetailInfo.goodCount}}次点赞</div>
              <div class="fdo-right">
                <span><img src="../../assets/images/comment.png" alt="/assets/images/comment.png"></span>
                <span class="fdllb-btns" @click.stop="clickLike(forumListDetailInfo.postsId)">
                    <img v-if="!forumListDetailInfo.good" src="../../assets/images/like.png" alt="/assets/images/like.png">
                    <img v-else src="../../assets/images/like-active.png" alt="/assets/images/like-active.png">
                </span>
              </div>
          </div>
          <div class="fdc-text">{{forumListDetailInfo.details}}</div>
          <div class="fdc-tiem">
              <div>共{{forumListDetailInfo.commentCount}}条回复</div>
              <div>{{forumListDetailInfo.createTime}}</div>
          </div>
      </div>
      <preview v-if="showImageList" :imgList="forumListDetailInfo.uploadFileUrl" @showImageList="close"></preview>
      <div class="fd-input">
          <div class="fdi-img"><img src="../../assets/images/smile.png" alt=""></div>
          <textarea placeholder="写个回复走走心" class="fdi-text"></textarea>
          <!-- <div class="fdi-btn">发送</div> -->
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import preview from 'components/preview/preview'
export default {
  components:{
    swiper,
    swiperSlide,
    preview
  },
  props:{},
  data(){
    return {
       forumListDetailInfo: {},
       swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          }
        },
        showImageList: false
    }
  },
  watch:{},
  computed:{
  },
  methods:{
      getpostdetial() {
        const url = `${this.$api.getpostdetial}?postId=${this.$route.query.postsId}`
        this.$axios.get(url).then((response) => {
            const { data, success } = response.data
            if (success) {
                data.uploadFileUrl = data.uploadFileUrl.split('|')
                console.log('uploadFileUrl',  data.uploadFileUrl)
                this.forumListDetailInfo = data
            }
        })
      },
      clickLike(postsId) {
        const forumListDetailInfo = this.forumListDetailInfo
        if (postsId === forumListDetailInfo.postsId) {
                const url = `${this.$api.postspraise}?postsId=${postsId}&replyId=0&lv=0`
                this.$axios.post(url).then((response) => {
                    const { data, success } = response.data
                    if (success) {
                        forumListDetailInfo.goodCount = forumListDetailInfo.good ? forumListDetailInfo.goodCount - 1 : forumListDetailInfo.goodCount + 1
                        forumListDetailInfo.good = forumListDetailInfo.good ? 0 : 1
                    }
                })
            }
     },
     // 全图
     clickImg() {
        this.showImageList = true
     },
     // 关闭
     close(e) {
        this.showImageList = e
     }
  },
  created(){
    // 获取帖子详情
    this.getpostdetial()
  },
  mounted(){}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../assets/stylus/variable.styl"
.fd
    height 100%
    background #ffffff
    .fd-header
        height 40px
        display flex
        align-items center
        padding 12px
        img 
            width 40px 
            height @height 
            border-radius 100%
            margin-right 10px
        .fdh-isDel
            position absolute
            right 12px
            background red
            color #ffffff
            padding 4px 10px
            border-radius 20px
            font-size 12px
    .fd-banner
        height 200px
        overflow hidden
        .swiper-slide
            display flex
            justify-content center
            align-items center
        img 
           width 100%
           position absolute
    .fd-content
        padding 0 12px
      .fd-opr
          display flex
          justify-content space-between
          height 30px
          align-items center
          .fdo-left
              color #333333
          .fdo-right
              display flex
              img 
                height 20px
                width 20px
                margin-left 20px
        .fdc-tiem
            display flex
            justify-content space-between
            padding 10px 0
        .fdc-text
            color #333333
            line-height 20px

.fd-input
    position fixed
    bottom 0
    width 100%
    background #f6f6f6
    height 42px
    display flex
    align-items center
    .fdi-img
        width 52px
        display flex
        align-items center
        justify-content center
        img 
            height 28px
            width @height
    .fdi-text
        height 30px
        width 100%
        border 0
        background #ffffff
        border-radius 6px
        padding 0 10px
        box-sizing border-box
    .fdi-btn
        color #377cdb
        width:81px
        display flex
        justify-content center
        align-items center
</style>