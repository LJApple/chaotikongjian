<template>
    <div class="nw">
        <Header></Header>
        <div class="v-list">
            <!-- swiper -->
            <swiper :options="swiperOption">
                <swiper-slide v-if="postsTypes" v-for="item in postsTypes" :data-id="item.id" :key="item.id">{{item.name}}</swiper-slide>
            </swiper>
        </div>
        <div class="nw-list" @click="navToWorkDetail(item.Id)" v-for="item in actilist" :key="item.Id">
            <div class="nwl-status have" v-if="item.Status === 0">进行中</div>
            <div class="nwl-status" v-if="item.Status === 1">已结束</div>
            <div class="nwl-title">{{item.Title}}</div>
        </div>
    <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
import emoticon from 'utils/emoticon'
import common from '../../utils/common' 
import { MessageBox, Indicator, Actionsheet } from "mint-ui"
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Header from 'components/header/header'
import { Toast } from 'vant'
export default {
  components:{
    Header,
    swiper,
    swiperSlide
  },
  props:{},
  data(){
    const self = this
    return {
        actilist: [],
        actilistAll: [],
        actilistHave: [],
        actilistEnd: [],
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
            {name: '全部', id: 3},
            {name: '进行中', id: 1},
            {name: '已结束', id: 2}
        ]        
    }
  },
  watch:{},
  computed: {
  },
  methods:{
    getactilist() {
        this.actilist = []
        this.actilistAll = []
        this.actilistHave = []
        this.actilistEnd = []
        Toast.loading({ mask: true })
        this.$axios.get(this.$api.getactilist).then((response) => {
            const { data, success } = response.data
            if (success) {
               Toast.clear()
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
    },
    selctPostsType(type) {
        if (type === 1) {
            this.actilist = this.actilistHave
        } else if (type === 2) {
            this.actilist = this.actilistEnd
        } else {
            this.actilist = this.actilistAll
        }
        setTimeout(() => {
            Toast.clear()
        }, 200)
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
.swiper-slide
    width 33.33333%
.nw
    padding-top 100px
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