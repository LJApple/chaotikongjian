<template>
    <div class="header">
        <div>我是logo</div>
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
  watch:{
  },
  computed:{
  },
  methods:{
  },
  created() {
  },
  mounted(){}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../assets/stylus/variable.styl"
.header
    height 50px
    position fixed
    top 0
    width 100%
    padding $pagePadding
    background $bg-color 
    display flex
    align-items center
    justify-content space-between
    box-sizing border-box
    color #ffffff
</style>