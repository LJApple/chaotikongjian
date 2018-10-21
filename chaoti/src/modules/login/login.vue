<template>
  <div class="login">
     <div class="l-img">
       <img v-if="isForum" class="li-img" src="../../assets/images/logo.png" alt="">
       <img v-else class="li-img" src="../../assets/images/bg_login.png" alt="">
      </div>
     <div class="l-input">
      <!-- <input placeholder="请输入用户名" v-model="userName"/>
      <input placeholder="请输入密码" v-model="passWord" type="password"/>
      <div class="line"></div> -->
      <van-field
          v-model="userName"
          required
          class="li-list"
          :border="false"
          clearable
          label="工号"
          placeholder="请输入工号"
          @click-icon="$toast('question')"
      />
      <van-field
          v-model="passWord"
          type="password"
          class="li-list"
          label="密码"
          :border="false"
          placeholder="请输入密码"
          required
      />
    </div>
    <div class="l-btn" @click="login" :data-index="1">登录</div>
    <div class="l-forget" @click="forgetPwd">忘记密码?</div>
    <div class="editPwd" :class="{displayNo:!isShowModal}">
      <div class="ep-box">
        <div class="e-title">请输入您的工号和邮箱</div>
        <div class="ep-content">
          <input class="e-input"  type="text" placeholder="请输入您的工号" v-model="number"/>
          <input class="e-input"  type="text" placeholder="请输入您的邮箱" v-model="email" />
        </div>
        <div class="epb-btn">
          <div class="epbb-cancle" @click="cancle">取消</div>
          <div class="epbb-sure" @click="submit">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getData } from '../../assets/js/dom'
import common from '../../utils/common'
import { Toast } from 'vant'
import { mapMutations } from 'vuex'
import { MessageBox } from 'mint-ui'
import qs from 'qs'
export default {
  components:{},
  props:{},
  data(){
    return {
      userName: null,
      passWord: null,
      number: null,
      email: null,
      isShowModal: false,
      isForum: false
    }
  },
  methods:{
    // 登录逻辑
    login() {
      if (!this.userName || !this.passWord) {
        this.$toast('用户名密码不能为空')
        return
      }
      let param = {
        number: this.userName, // number
        pwd: this.passWord
      }
      param = common.splicingJson(param)
      const url = this.$api.login + param
      this.$axios.post(url).then((res) => {
        const { success, data } = res.data
        if (success) {
        //   window.localStorage.setItem('account_token', data)
          common.setCookie('account_token', data.token, 365)
          const path = this.$route.query.redirect
          setTimeout(() => {
            this.$router.push({path: path})
          }, 1000);
        } else {
          this.$toast(res.data.message)
        }
        console.log('res', res.data)
      }).catch((error) => {
       console.log('error', error)
      })
    },
    forgetPwd() {
      this.isShowModal = !this.isShowModal
    },
   cancle() {
      this.isShowModal = false
   },
   submit() {
      if (!this.number || !this.email) {
        this.$toast('请输入正确的工号和邮箱')
        return
      }
      console.log('common.checkEmail(this.email)', common.checkEmail(this.email))
      if(!common.checkEmail(this.email)) {
        this.$toast('请输入正确的邮箱地址')
        return
      }
       let param = {
          email: this.email,
          number: this.number
        }
        param = common.splicingJson(param)
        const url = this.$api.forgetpwd + param
        // Toast.loading({ mask: true })
        this.$axios.post(url).then((res) => {
            const { message, success } = res.data
            if (success) {
               MessageBox.alert('提交成功，请前往您的邮箱修改密码').then(action => {
                   this.isShowModal = false
               })
              //  Toast.clear()
            } else {
               this.$toast(message)
            }
        })
   }
  },
  created(){
      // common.delCookie('account_token')
    if (this.$route.query.redirect === 'forum') {
      this.isForum = false
    } else {
      this.isForum = true
    }
  },
  mounted(){
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../assets/stylus/variable.styl"
.login
  background #fff
  background-size 100%
  height 100%
  display flex
  flex-direction column
  padding 30px 10% 0 10%
  .l-input
    display flex
    flex-direction column
    // margin-top 50px
    // ::-webkit-input-placeholder
    //   color #ffffff
    min-height 136px
    .li-list
        border 1px solid #cccccc
        margin-top 25px
        border-radius 4px
        box-shadow 2rpx 2rpx 5rpx rgba(0, 0, 0,.2)
  .l-btn
    font-size 16px
    height 44px
    border-radius 4px
    line-height @height
    color #fff
    text-align center
    background linear-gradient(0deg, #ff5959 0, #ff3e3e 100%)
    margin-top 40px
  .l-img
    display flex
    justify-content center
    align-items center
    padding 50px 0
    .li-img
      height 62px
      width 161px
  .l-forget
    font-size 16px
    color #999999
    text-align center
    padding 30px 0
</style>
