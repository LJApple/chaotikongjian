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
  </div>
</template>

<script type="text/ecmascript-6">
import { getData } from '../../assets/js/dom'
import { MessageBox } from 'mint-ui'
import common from '../../utils/common'
import { mapMutations } from 'vuex'
import qs from 'qs'
export default {
  components:{},
  props:{},
  data(){
    return {
      userName: null,
      passWord: null
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
          window.sessionStorage.setItem('account_token', data)
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
      MessageBox.prompt('请输入您的邮箱', {
        inputValidator: (val) => {
          if (val === null) {
            return true //初始化的值为null，不做处理的话，刚打开MessageBox就会校验出错，影响用户体验
          }
          return common.checkEmail(val)
          }, inputErrorMessage: '请输入正确的邮箱地址'

      }).then(({ value, action }) => { 
        console.log('value', value, action)
        const param = {
          email: value
        }
        this.$axios.post(this.$api.forgetpwd, qs.stringify(param)).then((response) => {
            MessageBox.alert('提交成功，请前往您的邮箱修改密码').then(action => {
                // this.$router.back(-1)
            })
        })
      })
    },
    ...mapMutations({
      setLogin: 'LOGIN'
    })
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
    ::-webkit-input-placeholder
      color #ffffff
    input 
      height 48px
      color #ffffff
      padding 0 10px
      font-size 16px
      background-color rgba(0, 0, 0, 0)
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