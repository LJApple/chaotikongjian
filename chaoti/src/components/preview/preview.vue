<template>
      <div class="preview">
          <div class="p-div">
               <swiper class="p-swiper" :options="swiperOption">
                    <swiper-slide v-for="(item, index) in imgList" :key="index">
                        <img :src="item" alt=""></swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
          </div>
          <div class="p-close" @click="close">
              <img src="../../assets/images/delDialog.png" alt="">
          </div>
      </div>
</template>

<script type="text/ecmascript-6">
export default {
  components:{},
  props:{
      imgList: ""
  },
  data(){
    return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          }
        }
    }
  },
  watch:{
  },
  computed:{
  },
  methods:{
      close() {
         this.$emit('showImageList', false)
      }
  },
  created(){
      console.log('imgList', this.imgList)
  },
  mounted(){}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../assets/stylus/variable.styl"
.preview
    position fixed
    top 0
    z-index 20
    height 100%
    width 100% 
    background rgba(0, 0,0 0.8)
    .swiper-container
        height 100%
        img
            max-width 100%
    .p-close
        position absolute
        top 10px
        right 10px
        z-index 1
        height 40px
        width @height 
        display flex
        align-items center
        justify-content center
        // background rgba(0,0,0, 0.5)
        img 
            height 30px
            width @height
.swiper-slide, .p-swiper
    display flex
    align-items center
    justify-content center
    height 100vh
    background rgba(255, 255, 255, 0.7)
</style>