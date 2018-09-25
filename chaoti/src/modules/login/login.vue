<template>
  <div class="login">
     <div class="l-img"><img class="li-img" src="../../assets/images/logo.png" alt=""></div>
     <div class="l-input">
      <input placeholder="请输入用户名" v-model="userName"/>
      <div class="line"></div>
      <input placeholder="请输入密码" v-model="passWord" type="password"/>
      <div class="line"></div>
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
      isShowModal: false
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
      console.log('url', url)
      this.$axios.post(url, ).then((res) => {
        const { success, data } = res.data
        if (success) {
        //   window.localStorage.setItem('account_token', data)
          common.setCookie('account_token', data, 2)
          const path = this.$route.query.redirect
          this.$router.push({path: path})
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
        this.$axios.post(url).then((res) => {
            const { message, success } = res.data
            if (success) {
               MessageBox.alert('提交成功，请前往您的邮箱修改密码').then(action => {
                   this.isShowModal = false
               })
            } else {
               this.$toast(message)
            }
        })
   }
  },
  created(){
  },
  mounted(){
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../assets/stylus/variable.styl"
.login
  background url(../../assets/images/bg.jpg) rgb(42,144,223) top no-repeat
  background-size 100%
  height 100%
  display flex
  flex-direction column
  padding 30px 10% 0 10%
  .l-input
    display flex
    flex-direction column
    height 98px
    min-height @height
    ::-webkit-input-placeholder
      color #ffffff
    input 
      height 48px
      color #ffffff
      padding 0 10px
      font-size 16px
      background-color rgba(0, 0, 0, 0)
      box-sizing border-box
    .line
      border-bottom 1px solid #ffffff
  .l-btn
    font-size 16px
    height 30px
    border-radius 30px
    line-height 30px
    color $bg-color
    text-align center
    background-color #ffffff
    margin-top 40px
  .l-img
    display flex
    justify-content center
    height 240px
    align-items center
    .li-img
      height 120px
      width 120px
  .l-forget
    font-size 16px
    color #ffffff
    text-align center
    padding 30px 0
</style>