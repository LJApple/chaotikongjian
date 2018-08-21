<template>
  <div class="forum-detail">
     <div class="fd-header">
        <div>我是logo</div>
        <div class="fdh-post" @click="publishTopic">发布话题</div>
    </div>
    <mt-search class="search"
    v-model="value"
    autofocus="autofocus"
    cancel-text="取消"
    placeholder="搜索">
    </mt-search>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components:{},
  props:{},
  data(){
    return {
        value: '',
        autofocus: true
    }
  },
  watch:{},
  computed:{},
  methods:{
    publishTopic() {
      this.$router.push({
          path: '/post'
        })
    }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../assets/stylus/variable.styl"
.fd-header
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
    .fdh-post
        background #26a2ff
        padding 10px
        border-radius 10px
.search
    position fixed
    top 50px
    width 100%
    height 52px
</style>