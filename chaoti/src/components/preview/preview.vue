<template>
      <div class="preview">
          <div class="p-div">
               <swiper class="p-swiper" :options="swiperOption">
                    <swiper-slide v-for="(item, index) in imgList" :key="index">
                        <img :src="item" alt=""></swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>

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
    z-index 1
    height 100%
    width 100% 
    background rgba(0, 0,0 0.8)
    .swiper-container
        height 100%
        img
            max-width 100%
</style>