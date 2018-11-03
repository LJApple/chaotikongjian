<template>
    <div class="f-header">
      <div class="setting" v-if="isShowSetting">
        <div class="logout" @click="logout"><img  src="../../assets/images/logout.png" alt=""></div>
        <div class="logout" v-if="isShowsetImg" @click="setting"><img src="../../assets/images/setting.png" alt=""></div>
      </div>
      <div class="f-content">
        <img v-if="isForum" class="fc-logo" src="../../assets/images/logo-forum.png" alt="">
        <img v-else class="fc-logo" src="../../assets/images/logo-in.png" alt="">
        <div class="fc-user">
            <img class="" v-if="!userInfo.photo" src="../../assets/images/defalut-wihte.png" alt="">
            <img v-else :src="userInfo.photo" alt="">
            <div class="fcuc-list">
              <div class="fcuc-name">你好,{{userInfo.name}}</div>
            </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import common from '../../utils/common'
import { Dialog } from 'vant'
export default {
  components:{},
  props:{
    isShowSetting: true,
    isShowsetImg: true
  },
  data(){
    return {
      userInfo: {},
      isForum: false
    }
  },
  watch:{
  },
  computed:{
  },
  methods:{
    // 退出登录
    logout() {
        Dialog.confirm({
            title: '提示',
            message: '确定退出系统吗？'
        }).then(() => {
            // 清除session 返回login
            // common.delCookie('account_token')
            window.localStorage.removeItem('account_token')
            const redirect = this.$route.query.redirect ? this.$route.query.redirect : this.$route.name
            this.$router.push({
                path: '/login',
                query: {redirect}
            })
        }).catch(() => {
        // on cancel
        });
    },
    // 设置
    setting() {
      this.$router.push({
        path: '/setting',
        query: {toSetting: this.$route.name}
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
  created() {
    this.getUserInfo()
    if (this.$route.query.redirect === 'forum') {
      this.isForum = true
    } else {
      this.isForum = false
    }
  },
  mounted(){
    // this.getUserInfo()
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../assets/stylus/variable.styl"
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
    z-index 10
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
  position relative
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
        padding 0px 10px
        line-height 60px
      .fcuc-use
        padding-left 10px
        color blue
</style>
