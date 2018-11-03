<template>
  <div class="forum">
    <div class="f-header">
      <div class="setting">
        <div class="logout" @click="logout"><img  src="../../assets/images/logout.png" alt=""></div>
        <div class="logout" @click="setting"><img src="../../assets/images/setting.png" alt=""></div>
      </div>
      <div class="f-content">
        <div class="fc-user">
             <img class="" v-if="!userInfo.photo" src="../../assets/images/defalut-wihte.png" alt="">
            <img v-else :src="userInfo.photo" alt="">
            <div class="fcuc-list">
              <div class="fcuc-name">你好,{{userInfo.name}}</div>
              <!-- <div class="fcuc-use" @click="toMyForum">发过的主题
                <van-tag v-if="userInfo.isPostReply" type="danger">new</van-tag>
              </div> -->
            </div>
        </div>
       <!-- <img  class="f-logo" src="../../assets/images/logo-forum.png" alt=""> -->
      </div>
    </div>
    <div class="f-list">
      <div class="fl-img" @click="toDetail(5)">
        <div class="fli-modal">
           <img src="../../assets/images/fourm1.png" alt="">
            <div class="fli-text">意见反馈</div>
        </div>
      </div>
      <div class="fl-img" @click="toNWork">
        <div class="fli-modal">
           <img src="../../assets/images/fourm2.png" alt="">
            <div class="fli-text">全民体验坊</div>
        </div>
      </div>
      <div class="fl-img" @click="toDetail(2)">
        <div class="fli-modal">
           <img src="../../assets/images/fourm3.png" alt="">
          <div class="fli-text">我要点赞</div>
        </div>
      </div>
      <div class="fl-img" @click="toBulletin">
        <div class="fli-modal">
          <img src="../../assets/images/fourm4.png" alt="">
          <div class="fli-text">热点公告</div>
          <van-tag class="flim-idot" v-if="isHaveIdot" type="danger">new</van-tag>
        </div>
      </div>
      <div class="fl-img"  @click="toMyForum">
        <div class="fli-modal">
          <img src="../../assets/images/fourm5.png" alt="">
          <div class="fli-text">我发过的主题</div>
          <van-tag class="flim-idot" v-if="userInfo.isPostReply" type="danger">new</van-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import common from '../../utils/common'
export default {
  components:{},
  props:{},
  data(){
    return {
      userInfo: {},
      isHaveIdot: false
    }
  },
  watch:{},
  computed:{},
  methods:{
    // 退出登录
    logout() {
      // 清除session 返回login
      // common.delCookie('account_token')
      window.localStorage.removeItem('account_token')
      this.$router.push({
        path: '/login',
        query: { redirect: 'forum' }
      })
    },
    // 设置
    setting() {
      this.$router.push({
        path: '/setting'
      })
    },
      // 跳转发过的主图
      toMyForum() {
         this.$router.push({
          path: '/myForum',
            query: {
            redirect: 'forum'
          }
        })
      },
      // 跳转到详情 type 分别表示对应的类型 意见反馈=5 我要点赞=2
      toDetail(param) {
        this.$router.push({
          path: '/forumDetail',
          query: {
              from: param,
              redirect: 'forum'
          }
        })
      },
      toBulletin() {
        this.$router.push({
          path: '/bulletin',
          query: {
              redirect: 'forum'
          }
        })
      },
      toNWork() {
        this.$router.push({
          path: '/nationalWorkshop',
          query: {
              redirect: 'forum'
          }
        })
      },
      // 获取用户信息
      getUserInfo() {
        this.$axios.get(this.$api.getuserinfo).then(response => {
          const { success, data } = response.data
          if (success) {
            this.userInfo = data
          }
        })
      },
      // 获取红点通知
      getnoticereddot() {
        this.$axios.get(this.$api.getnoticereddot).then(response => {
          const { success, data } = response.data
          if (success) {
            this.isHaveIdot = data
          }
        })
      }
  },
  created(){
    this.getUserInfo()
    this.getnoticereddot()
  },
  mounted(){}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../assets/stylus/variable.styl"
$headerH = 140px
.forum
  height 100%
  background #ffffff
.f-header
  background $headerBg
  height $headerH
  width 100%
  padding $paddingPage
  position relative
  .setting
    position absolute
    right 0
    top: 0
    display flex
    .logout
      padding 15px
      img
        height 20px
        width 20px
.f-content
  display flex
  justify-content space-between
  padding 0 12px
  align-items center
  height $headerH
  .fc-user
    display flex
    img
      height 60px
      width @height
      border-radius @height
    .fcuc-list
      // height 50px
      color #ffffff
      display flex
      align-items center
      .fcuc-name
        padding 12px 10px
      .fcuc-use
        padding-left 10px
        color #3283fa
        position relative
.fli-text
  font-size 16px
  margin-top 15px
  font-weight bolder
  .logo
    margin-top 10px
    color #ffffff
.f-list
  display flex
  flex-wrap wrap
  height 60%
  .fl-img
    width 33.33%
    // padding 30px 0
    border-right 1px solid #dfdfdf
    border-bottom 1px solid #dddddd
    box-sizing border-box
    display flex
    justify-content center
    flex-direction column
    align-items center
    .fli-modal
      height 120px
      width @height
      // border-radius 150px
      // background #ffffff
      color: #333
      display flex
      justify-content center
      flex-direction column
      align-items center
      position relative
      .flim-idot
        position absolute
        right 0px
        top 0px
    img
      width 70px
      height @height
.logo
  top 5px
.fu-idot
  font-size 16px
  position absolute
  top -4px
  left 83px
  color #ffffff
  height 20px
  line-height 20px
  font-weight bolder
  background #ef4f4f
  padding 0 3px
  border-radius 4px
.f-logo
  position absolute
  left 0
  height 30px
  top 0
</style>
