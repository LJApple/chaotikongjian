<template>
  <div class="tasks">
    <Header :isShowSetting="true"></Header>
    <div class="v-list">
        <swiper :options="swiperOption">
            <swiper-slide v-if="postsTypes" v-for="item in postsTypes" :data-id="item.id" :key="item.id">{{item.name}}</swiper-slide>
        </swiper>
    </div>
    <div class="page-navbar">
        <div class="pn-list" v-if="type === 2"  v-for="item in mypostslistOne" :key="item.postsId" @click="toTaskDetail(item.postsId)">
            <mt-cell class="pnl-list" is-link  :title="item.details">
                <!-- <span class="redColor">新的回复</span> -->
            </mt-cell>
        </div>
        <div class="pn-list" v-if="type === 1"  v-for="item in mypostslistTwo" :key="item.postsId" @click="toTaskDetail(item.postsId)">
            <mt-cell class="pnl-list" is-link :title="item.details">
                <!-- <span>已回复</span> -->
            </mt-cell>
        </div>
        <div class="pn-list" v-if="type === 0"  v-for="item in mypostslist" :key="item.postsId" @click="toTaskDetail(item.postsId)">
            <mt-cell class="pnl-list" is-link :title="item.details">
                <span v-if="item.isReply === 0">已回复</span>
                <span v-if="item.isReply === 1" class="redColor">新的回复</span>
            </mt-cell>
        </div>
        <div class="pn-null" v-if="(mypostslistOne.length === 0 && type === 2) || (mypostslistTwo.length === 0 && type === 1) ||  (mypostslist.length === 0 && type === 0)">暂无数据</div>
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
        mypostslistOne: [],
        mypostslistTwo: [],
        type: 0,
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
            {name: '全部', id: 0},
            {name: '已回复', id: 2},
            {name: '新消息', id: 1}
        ]        
    }
  },
  watch: {
  },
  computed: {},
  methods: {
    // 获取任务列表
    getmypostslist() {
        this.mypostslist = []
        this.mypostslistOne = []
        this.mypostslistTwo = []
        Toast.loading({ mask: true })
        this.$axios.get(this.$api.getmypostslist).then((response) => {
        Toast.clear()
        const { data, success } = response.data
        if (success) {
            for (const item of data) {
                const {isReply} = item 
                if (isReply === 0) {
                    this.mypostslistOne.push(item)
                } else if (isReply === 1) {
                    this.mypostslistTwo.push(item)
                }
            }
            this.mypostslist = data
        }
        }).catch((error) => {
        
        }).then(() =>{
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
    selctPostsType(type) {
        this.type = type
       setTimeout(() => {
            Toast.clear()
       }, 200)
    }
  },
  activated() {
  },
  created() {
      this.getmypostslist()
  },
  mounted() {}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '../../assets/stylus/variable.styl'
.swiper-slide
    width 33.33333%
.page-navbar
    // margin-top 100px
    .pn-list
        margin-top 10px
        border-top 1px solid #dddddd
.redColor
    color rgb(239, 79, 79)
</style>