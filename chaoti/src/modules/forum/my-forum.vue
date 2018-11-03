<template>
  <div class="tasks">
    <Header :isShowSetting="true"></Header>
    <div class="v-list">
        <swiper :options="swiperOption">
            <swiper-slide v-if="postsTypes" v-for="item in postsTypes" :data-id="item.id" :key="item.id">{{item.name}}</swiper-slide>
        </swiper>
    </div>
    <div class="page-navbar">
        <div class="pn-list" v-if="mypostslist.length > 0"  v-for="item in mypostslist" :key="item.postsId" @click="toTaskDetail(item.postsId)">
            <mt-cell class="pnl-list" :title="item.details">
                <span v-if="item.isReply === 0 && listType !== 0">已回复</span>
                <van-tag v-if="item.isReply === 1" type="danger">new</van-tag>
                <!-- <span v-if="item.isReply === 1" class="redColor">new</span> -->
            </mt-cell>
        </div>
        <div class="pn-null" v-if="!mypostslist.length">暂无数据</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { MessageBox } from "mint-ui"
import common from '../../utils/common'
import Header from 'components/header/header'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Toast } from 'vant'
import qs from 'qs'
export default {
  components: {
    Header,
    swiperSlide,
    swiper
  },
  props: {},
  data() {
    const self = this
    return {
        mypostslist: [],
        isExpend: false,
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
                    Toast.loading({ mask: true })
                    const {id} = e.target.dataset
                    self.selctPostsType(parseInt(id))
                }
            }
        },
        postsTypes: [
            {name: '发过的主题', id: 0},
            {name: '管理员回复', id: 1},
            {name: '非管理员回复', id: 2},
        ],
        listType: 0      
    }
  },
  watch: {
  },
  computed: {},
  methods: {
    // 获取任务列表
    getmypostslist(id) {
        this.mypostslist = []
        Toast.loading({ mask: true })
        this.listType = id
        let url = this.$api.getmypostslist + '?ReplyType=' + id
        this.$axios.get(url).then((response) => {
        Toast.clear()
        const { data, success } = response.data
        if (success) {
            this.mypostslist = data
        }
        })
    },
    // 跳转到任务详情
    toTaskDetail(postsId) {
       this.$router.push({
          path: '/forumListDetail',
          query: {
              postsId
          }
       })
    },
    selctPostsType(id) {
        this.getmypostslist(id)
    }
  },
  activated() {
  },
  created() {
      this.getmypostslist(0)
  },
  mounted() {}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '../../assets/stylus/variable.styl'
.swiper-slide
    width 33.33333% !important
.page-navbar
    // margin-top 100px
    .pn-list
        margin-top 10px
        border-top 1px solid #dddddd
.redColor
    color rgb(239, 79, 79)
</style>