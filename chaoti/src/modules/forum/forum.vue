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
              <div class="fcuc-use" @click="toMyForum">发过的主题</div>
            </div>
        </div>
       <img  class="fc-logo" src="../../assets/images/logo.png" alt="">
      </div>
    </div>
    <div class="f-list">
      <div class="fl-img" @click="toDetail(5)">
        <div class="fli-modal">
           <img src="../../assets/images/fourm1.png" alt="">
            <div class="">意见反馈</div>
        </div>
      </div>
      <div class="fl-img" @click="toNWork">
        <div class="fli-modal">
           <img src="../../assets/images/fourm1.png" alt="">
            <div class="">全民体验坊</div>
        </div>
      </div>
      <div class="fl-img" @click="toDetail(2)">
        <div class="fli-modal">
           <img src="../../assets/images/fourm1.png" alt="">
            <div class="">我要点赞</div>
        </div>
      </div>
      <div class="fl-img" @click="toBulletin">
        <div class="fli-modal">
           <img src="../../assets/images/fourm1.png" alt="">
            <div class="">热点公告</div>
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
      userInfo: {}
    }
  },
  watch:{},
  computed:{},
  methods:{
    // 退出登录
    logout() {
      // 清除session 返回login
      common.delCookie('account_token')
      this.$router.push({
        path: '/login',
          query: { redirect: 'forum' }
      })
    },
    // 设置
    setting() {
      this.$router.push({
        path: '/my'
      })
    },
      // 跳转发过的主图
      toMyForum() {
         this.$router.push({
          path: '/myForum'
        })
      },
      // 跳转到详情 type 分别表示对应的类型 意见反馈=5 我要点赞=2
      toDetail(param) {
        this.$router.push({
          path: '/forumDetail',
          query: {
              from: param
          }
        })
      },
      toBulletin() {
        this.$router.push({
          path: '/bulletin'
        })
      },
      toNWork() {
        this.$router.push({
          path: '/nationalWorkshop'
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
      }
  },
  created(){
    this.getUserInfo()
  },
  mounted(){}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../assets/stylus/variable.styl"
.forum
  height 100%
  background #ffffff
.f-header
  background $headerBg
  height 140px
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
  height 140px
  .fc-user
    display flex
    img 
      height 60px
      width @height
      border-radius @height 
    .fcuc-list
      height 50px
      color #ffffff
      .fcuc-name
        padding 12px 10px
      .fcuc-use
        padding-left 10px
        color $bg-color
  .logo
    margin-top 10px
    color #ffffff
.f-list
  display flex
  flex-wrap wrap
  height 70%
  .fl-img
    width 50%
    padding 30px 0
    display flex
    justify-content center
    flex-direction column
    align-items center
    .fli-modal
      height 120px
      width @height 
      border-radius 150px
      background $bg-color
      color: #ffffff
      display flex
      justify-content center
      flex-direction column
      align-items center
    img 
      width 60px
      height 60px
.logo
  top 5px
</style>