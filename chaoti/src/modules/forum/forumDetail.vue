<template>
  <div class="forum-detail">
     <Header :isShowSetting="true"></Header>
     <div class="v-list">
        <!-- swiper -->
        <swiper :options="swiperOption">
            <swiper-slide @click="selctPostsType()">全部</swiper-slide>
            <swiper-slide v-if="postsTypes" v-for="item in postsTypes" :data-id="item.id" :key="item.id">{{item.name}}</swiper-slide>
        </swiper>
    </div>
    <div class="seach">
        <van-search @search="onSearch" background="#f2f2f2" placeholder="请输入搜索关键词" v-model="key"/>
        <div slot="action" class="s-btn" @click="onSearch">搜索</div>
    </div>
    <div class="fd-list">
        <div v-if="forumDetailList">
             <div class="fdl-list" @click="navToDetail(item.postsId)" v-for="item in forumDetailList" :key="item.id">
                <div class="fdll-top">
                    <img v-if="!item.photo" src="../../assets/images/default.png" alt="图片">
                    <img v-else :src="item.photo" alt="头像">
                    <div class="df-flex">
                        <div class="df-if1">{{item.name}}</div>
                        <div class="df-if2">{{item.createTime}}</div>
                    </div>
                    <div  class="df-tag">
                        <van-tag v-if="item.setTop === 2" round type="danger">精华</van-tag>
                        <van-tag v-if="item.setTop === 1" round type="danger">置顶</van-tag>
                    </div>
                </div>
                <div class="fdll-mess" v-html="item.details">
                    {{item.details}}
                </div>
                <div class="fdll-btnbox">
                    <div class="fdllb-btns">
                        <img src="../../assets/images/comment.png" alt="图片">
                        <span>{{item.commentCount}}</span>
                    </div>
                    <span class="fdllb-btns" @click.stop="clickLike(item.postsId)">
                        <img v-if="!item.good" src="../../assets/images/like.png" alt="图片">
                        <img v-else src="../../assets/images/like-active.png" alt="图片">
                        <span>{{item.goodCount}}</span>
                    </span>
                </div>
            </div>
        </div>
        <div class="fdl-null" v-else>暂无帖子</div>
    </div>
    <div class="post" @click="toPost">
        <img src="../../assets/images/post.png" alt="图片">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Header from 'components/header/header'
import { Toast } from 'vant'
import emoticon from 'utils/emoticon'
import common from '../../utils/common'
export default {
  components:{
    swiper,
    swiperSlide,
    Header
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
                    self.selctPostsType(id, true)
                }
            }
        },
        forumDetailList: null,
        postsTypes: [],
        key: ''
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
    selctPostsType(key, isTopBlock) {
        Toast.loading({ mask: true })
        // sectionId postsTypeId
        let url = ''
        if (!key || isTopBlock) {
            url = `${this.$api.getpostlist}?sectionId=${this.$route.query.from}&postsTypeId=${key}`
        } else {
            url = `${this.$api.getpostlist}?sectionId=${this.$route.query.from}&key=${key}`
        }
        this.$axios.get(url).then((response) => {
        Toast.clear()
        const { data, success } = response.data
        if (success) {
            common.emoticon(data, emoticon)
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
    },
    // 搜索
    onSearch() {
        this.selctPostsType(this.key)
        console.log('key', this.key)
    }
  },
   activated () {
    // 缓存返回卸卸载这里
    // this.selctPostsType()
  },
  created(){
    // 缓存返回卸卸载这里
    this.selctPostsType()
    // 获取帖子类型
    this.getPostsType()
  },
  mounted(){}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../assets/stylus/variable.styl"
.fdl-null
    height 70vh
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
    // margin-top 101px
    padding-bottom 30px
    .fdl-list
        margin-bottom 10px
        padding 12px
        background #ffffff
        .fdll-top
            display flex
            align-items center
            height 40px
            position relative
            .df-tag
                position absolute
                right 0
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
                height 18px
                width @height
            span 
                padding 0 10px
                font-size 16px
                line-height 22px
                display block
            .fdllb-btns
                width 50%
                display flex
                height 22px
                align-items center
                justify-content center
                color #333
.seach
    display flex
    align-items center
    padding 0 12px
    .van-search
        width 80%
        padding 10px 0
        box-sizing border-box
    .s-btn
        width 20%
        height 30px
        text-align center
        line-height @height
        background #ffffff
        border-left 1px solid #ddd
        border-top-right-radius 4px
        border-bottom-right-radius 4px
</style>