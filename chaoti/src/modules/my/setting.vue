<template>
 <transition name="slide">
  <div class="setting">
    <div class="t-header"><img src="../../assets/images/defalut-wihte.png" alt=""></div>
    <div class="s-list">
        <div class="sl-list">
            <div class="sll-img">
                <img src="../../assets/images/done.png" alt="">
           </div>
           <mt-field class="s-padding" label="用户名" placeholder="用户名" v-model="username"></mt-field>
        </div>
        <div class="sl-list sex">
            <div class="sll-left">
                <img src="../../assets/images/done.png" alt="">
                <span>性别</span>
           </div>
          <mt-radio class="s-radio"
            v-model="value"
            align="right"
            :options="options">
          </mt-radio>
        </div>
        <div class="sl-list">
            <div class="sll-img">
                <img src="../../assets/images/done.png" alt="">
           </div>
           <mt-field class="s-padding" label="手机号" placeholder="手机号" v-model="photoNumber"></mt-field>
        </div>
        <div class="sl-list">
            <div class="sll-img">
                <img src="../../assets/images/done.png" alt="">
           </div>
           <mt-field class="s-padding" label="邮箱" placeholder="邮箱" v-model="photoNumber"></mt-field>
        </div>
        <mt-cell title="修改密码"  value="" class="hasArrow"  is-link>
            <img slot="icon" class="paddingLR10" src="../../assets/images/done.png" width="20" height="20">
        </mt-cell>
        <mt-cell title="修改头像"  value="" class="hasArrow"  is-link>
            <img slot="icon" class="paddingLR10" src="../../assets/images/done.png" width="20" height="20">
        </mt-cell>
    </div>
    <div class="submit" >
        <mt-button type="primary" size="large">提交</mt-button>
    </div>
  </div>
 </transition>
</template>

<script type="text/ecmascript-6">
export default {
  components:{},
  props:{},
  data(){
    return {
        username: '王五',
        photoNumber: '18720087343',
        value: '1',
        options: [
            {
                label: '男',
                value: '1'
            },
            {
                label: '女',
                value: '2'
            }
        ]
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){
  },
  mounted(){}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../assets/stylus/variable.styl"
    .t-header
        display flex
        align-items center
        justify-content center
        img 
            height 100px
            width 100px
    .s-list
        margin-top 10px
    .sl-list
        position relative
        .sll-img
            position absolute
            z-index 1
            height 48px
            width 40px
            display flex
            align-items center
            justify-content flex-end
            padding 0 10px
            box-sizing border-box
            img 
                height 20px
                width @height
        .s-padding
            /deep/ .mint-cell-title
                padding-left 40px
    .sex
        display flex
        // justify-content space-between
        background #ffffff
        font-size 16px
        border-bottom 1px solid  #dddddd
        /deep/ .mint-cell-wrapper
            background-image none !important
            background #ffffff
            padding 0
        .sll-left
            height 48px
            width 112px
            display flex
            align-items center
            justify-content left 
            padding-left 10px
            box-sizing border-box
            img 
                height 20px
                width @height
                margin-right 10px
    .s-radio
        display flex
    /deep/ .mint-cell-wrapper
        padding 0
        background-image none
.paddingLR10
    padding-left 10px
.hasArrow
    /deep/ .mint-cell-text
        padding-left 4px
.submit
   margin 30px 10px
   box-sizing border-box 
/deep/ .mint-radio-label
    padding-right 7px
</style>