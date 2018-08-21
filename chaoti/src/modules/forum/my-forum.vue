<template>
  <div class="my-forum">
    <div class="t-header">
        <img src="../../assets/images/defalut-wihte.png" alt="">
        <div class="">王五</div>
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
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
.t-header
    display flex
    align-items center
    justify-content center
    flex-direction column
    color #ffffff
    font-size 16px
    img 
        height 70px
        width @height
        margin-bottom 10px
</style>