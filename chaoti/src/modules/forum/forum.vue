<template>
  <div class="forum">
    <div class="f-header">
      <div class="setting">
        <div class="logout" @click="logout"><img  src="../../assets/images/logout.png" alt=""></div>
        <div class="logout" @click="setting"><img src="../../assets/images/setting.png" alt=""></div>
      </div>
      <div class="f-content">
        <div class="fc-user">
          <img class="" src="../../assets/images/defalut-wihte.png" alt="">
            <div class="fcuc-list">
              <div class="fcuc-name">你好,王五</div>
              <div class="fcuc-use" @click="toMyForum">发过的主题</div>
            </div>
        </div>
        <div class="logo">
            <!-- <img  class="logo" src="../../assets/images/logo.png" alt=""> -->
            卡神来帮忙
        </div>
      </div>
    </div>
    <div class="f-list">
      <div class="fl-img" @click="toDetail(1)">
        <div class="fli-modal">
           <img src="../../assets/images/fourm1.png" alt="">
            <div class="">模块1</div>
        </div>
      </div>
      <div class="fl-img" @click="toDetail(2)">
        <div class="fli-modal">
           <img src="../../assets/images/fourm1.png" alt="">
            <div class="">模块2</div>
        </div>
      </div>
      <div class="fl-img" @click="toDetail(3)">
        <div class="fli-modal">
           <img src="../../assets/images/fourm1.png" alt="">
            <div class="">模块3</div>
        </div>
      </div>
      <div class="fl-img" @click="toDetail(4)">
        <div class="fli-modal">
           <img src="../../assets/images/fourm1.png" alt="">
            <div class="">模块4</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components:{},
  props:{},
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{
    // 退出登录
      logout() {
        // 清除session 返回login
        this.$router.push({
          path: '/login'
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
          path: '/myForum'
        })
      },
      // 跳转到详情
      toDetail(param) {
        this.$router.push({
          path: '/forumDetail'
        })
      }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../assets/stylus/variable.styl"
.forum
  height 100%
  background #abcee8
.f-header
  background $bg-color
  height 120px
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
  height 120px
  .fc-user
    display flex
    img 
      height 60px
      width @height
    .fcuc-list
      height 50px
      color #ffffff
      .fcuc-name
        padding 12px 10px
      .fcuc-use
        padding-left 10px
        color blue
  .logo
    margin-top 10px
    color #ffffff
.f-list
  display flex
  flex-wrap wrap
  .fl-img
    width 50%
    height 260px
    display flex
    justify-content center
    flex-direction column
    align-items center
    .fli-modal
      height 150px
      width @height 
      border-radius 150px
      background #457ba5
      color: #ffffff
      display flex
      justify-content center
      flex-direction column
      align-items center
    img 
      width 70px
      height 70px
</style>