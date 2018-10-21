<template>
 <transition name="slide">
  <div class="ranking">
      <div class="r-list" :class="{red: item.red}" v-for="(item, index) in ranking" :key="item.userId">
          <div class="rl-num">{{index + 1}}</div>
          <div class="rl-photo">
              <img v-if="item.photo" :src="item.photo" alt="">
              <img v-else src="../../assets/images/default.png" alt="">
          </div>
          <div class="rl-name">{{item.userName}}</div>
          <div class="rl-dpt">{{item.deptName}}</div>
          <div class="rl-rnk"><span class="rlr-text">{{item.sumExperience}}</span>分</div>
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
        ranking: []
    }
  },
  watch:{},
  computed:{},
  methods:{
    // 获取排行榜
    getmyrno() {
      const url = this.$api.getmyrno
      this.$axios.get(url).then(response => {
        const { success, data } = response.data;
        if (success) {
            for (const item of data) {
                item.red = false
                if (item.userId === parseInt(this.$route.query.userID)) {
                    item.red = true
                }
            }
            console.log(data)
            this.ranking = data
        }
      })
    },
  },
  created(){
    this.getmyrno()
  },
  mounted(){}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../assets/stylus/variable.styl"
.r-list
    display flex
    height 70px
    align-items center
    background #ffffff
    margin-bottom 10px
    font-size 14px
    .rl-photo
        img 
            height 50px
            width @height
            border-radius @height 
    .rl-num
        width 5%
        font-weight bolder
        text-align center
    .rl-name
        width 30%
        padding-left 10px
        box-sizing border-box
    .rl-dpt
        width 35%
    .rl-rnk
        width 20%
        .rlr-text
            font-size 16px
            font-weight bolder
.red
    color red
</style>