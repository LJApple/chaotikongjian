<template>
  <div class="tasks">
    <div class="t-header">
      <div class="setting">
        <div class="logout" @click="logout"><img  src="../../assets/images/logout.png" alt=""></div>
        <div class="logout" @click="setting"><img src="../../assets/images/setting.png" alt=""></div>
      </div>
      <div class="th-photo">
        <img src="../../assets/images/defalut-wihte.png" alt="">
      </div>
      <div class="th-right">
        <div class="thr-left">
          <div class="thrl-top">
            <div class="thrlt-name">王五</div>
            <div class="thrlt-asign">签到</div>
            <div class="thrlt-img" @click="questionClick"><img src="../../assets/images/question.png" alt=""></div>
          </div>
          <div class="thrl-bottom">
            <div>
              <div class="thrl-center">级别 0</div>
              <div class="thrl-bottom">经验值 1014</div>
            </div>
            <div class="thr-right">
              <div class="thrr-btn" @click="showModal(1)">奖励规则</div>
              <div class="thrr-btn" @click="showModal(2)">纪律说明</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-navbar">
      <mt-navbar class="page-part paddingLR12" v-model="selected">
        <mt-tab-item id="1">我参与的</mt-tab-item>
        <mt-tab-item id="2">我的经验值</mt-tab-item>
        <mt-tab-item id="3">排行榜</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected" class="my-contain">
        <mt-tab-container-item id="1">
          <mt-cell title="待完成任务" to="/tasks?selected=2" is-link>
            <img slot="icon" class="mc-img" src="../../assets/images/time.png" width="24" height="24">
          </mt-cell>
          <mt-cell title="已完成任务"  to="/tasks?selected=3" is-link>
            <img slot="icon" src="../../assets/images/done.png" width="20" height="20">
          </mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="total">
             <mt-cell title="个人总体验值">
            <span class="my-ex">11分</span>
            <img slot="icon" class="mc-img" src="../../assets/images/exprience.png" width="22" height="22">
          </mt-cell>
          </div>
          <mt-cell title="个人体验值">
            <span class="my-ex">11分</span>
            <img slot="icon" class="mc-img" src="../../assets/images/exprience.png" width="22" height="22">
          </mt-cell>
          <mt-cell title="日常反馈经验值">
            <span class="my-ex">1分</span>
            <img slot="icon" src="../../assets/images/exprience.png" width="22" height="22">
          </mt-cell>
           <mt-cell title="任务体验经验值">
            <span class="my-ex">1分</span>
            <img slot="icon" src="../../assets/images/exprience.png" width="22" height="22">
          </mt-cell>
           <mt-cell title="调研活动经验值">
            <span class="my-ex">1分</span>
            <img slot="icon" src="../../assets/images/exprience.png" width="22" height="22">
          </mt-cell>
           <mt-cell title="签到奖励经验值">
            <span class="my-ex">1分</span>
            <img slot="icon" src="../../assets/images/exprience.png" width="22" height="22">
          </mt-cell>
           <mt-cell title="晋级奖励经验值">
            <span class="my-ex">1分</span>
            <img slot="icon" src="../../assets/images/exprience.png" width="22" height="22">
          </mt-cell>
           <mt-cell title="其他奖励经验值">
            <span class="my-ex">1分</span>
            <img slot="icon" src="../../assets/images/exprience.png" width="22" height="22">
          </mt-cell>
          <mt-cell title="已兑换经验值">
            <span class="my-ex">1分</span>
            <img slot="icon" src="../../assets/images/exprience.png" width="22" height="22">
          </mt-cell>
          <mt-cell title="剩余经验值">
            <span class="my-ex">1分</span>
            <img slot="icon" src="../../assets/images/exprience.png" width="22" height="22">
          </mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="type1" :hidden="isClass">
              <div class="header">
                <div class="h-left">
                  <img src="../../assets/images/done.png" alt="">
                  <span>班级：</span>
                </div>
                <div class="h-name">信动人生体验团</div>
                <div class="h-right">
                  <img src="../../assets/images/done.png" alt="">
                  <span>班级：</span>
                </div>
                <div class="h-name">第一名</div>
              </div>
              <div class="cell" v-for="(item, index) in classList" :key="index">
                <div class="c-first">{{index + 1}}</div>
                <div class="c-second">
                  <img :src="item.imgUrl" alt="">
                  <span>{{item.name}}</span>
                </div>
                <div class="c-three">级别 {{item.level}}</div>
                <div class="c-four">{{item.core}}分</div>
              </div>
          </div>
          <div class="type2" :hidden="!isClass">
              <div v-for="(item, index) in allList" :key="index">
                 <div class="header">
                  <div class="h-left">
                    <img src="../../assets/images/done.png" alt="">
                    <span>班级：</span>
                  </div>
                  <div class="h-name">{{item.className}}</div>
                  <div class="h-right">
                    <img src="../../assets/images/done.png" alt="">
                    <span>班级：</span>
                  </div>
                  <div class="h-name">第{{item.count}}名</div>
                </div>
                <div class="cell">
                  <div class="c-first">{{index + 1}}</div>
                  <div class="c-second">
                    <img :src="item.imgUrl" alt="">
                    <span>{{item.name}}</span>
                  </div>
                  <div class="c-three">级别 {{item.level}}</div>
                  <div class="c-four">{{item.core}}分</div>
                </div>
              </div>
          </div>
          <mt-palette-button content="排名" @expand="main_log('expand')" @expanded="main_log('expanded')" @collapse="main_log('collapse')"
            direction="lt" class="pb changeClass" ref="target_1" :radius="60"  mainButtonStyle="color:#fff;background-color:#26a2ff;">
            <div class="my-icon-button indexicon icon-popup" @touchstart="sub_log(1)"><div class="classRadio">班级</div></div>
            <div class="my-icon-button indexicon icon-popup" @touchstart="sub_log(2)"><div class="classRadio">全部</div></div>
          </mt-palette-button>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <mt-popup
      v-model="popupVisible" modal="false"
      position="center" class="showMes">
      <div class="close" @click="close"><img src="../../assets/images/delDialog.png" alt=""></div>
      <div class="content">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components:{},
  props:{},
  data(){
    return {
      selected: '1',
      isClass: false,
      classList: [
        {
          imgUrl: 'static/images/default.png',
          name: '战三',
          level: 1,
          core: 1014
        },
        {
          imgUrl: 'static/images/default.png',
          name: '战三2',
          level: 2,
          core: 101
        }
      ],
      allList: [
        {
          className: 'test1',
          count: 1,
          imgUrl: 'static/images/default.png',
          name: '战三',
          level: 1,
          core: 1014
        },
        {
          className: 'test2',
           count: 2,
          imgUrl: 'static/images/default.png',
          name: '战三2',
          level: 2,
          core: 101
        }
      ],
      popupVisible: false
    }
  },
  watch:{
    // 监听selected
    selected(val, oldVal) {

      //val     切换后 id
      //oldVal  切换前 id 
      this.selected = val
      if (val === "1") {
        console.log('点击了1')
      } else if (val === "2") {
        console.log('点击了2')
      } else if (val === "3") {
         console.log('点击了3')
      }
      console.log('seleced', val, oldVal)
    }
  },
  computed:{},
  methods:{
    main_log(val) {
        console.log('main_log', val);
      },
      sub_log(val) {
        console.log('sub_log', val);
        if (val === 1) {
          this.isClass = false
        } else if (val === 2) {
          this.isClass = true
        }
        this.$refs.target_1.collapse();
      },
      // 打开窗口
      showModal() {
        this.popupVisible =true
      },
      // 关闭窗口
      close() {
        this.popupVisible = false
      },
      // 退出登录
      logout() {
        // 清除session 返回login
        this.$router.push({
          path: '/login'
        })
      },
      // 设置
      setting() {
        this.$router.push({
          path: '/setting'
        })
      },
      // 连续签到3天赠送1级分
      questionClick() {
        this.$toast('连续签到3天赠送1级分');
      }
  },
  activated () {},
  created(){},
  mounted(){

  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../assets/stylus/variable.styl"
.my-contain
  margin-top 10px
.total
  margin-bottom 10px
  /deep/ .mint-cell-text
    font-weight bolder
   /deep/ .my-ex
      color #26a2ff

.header
  display flex
  font-size 14px
  height 48px
  align-items center
  padding 0 $pagePadding
  background-color #ffffff
  box-sizing border-box
  .h-left, .h-right
    display flex
    img 
      height 16px
      width 16px
  .h-right
    margin-left 10px
  .h-name
    font-weight bolder
.cell
  display flex
  height 48px
  align-items center
  padding 0 $pagePadding
  background-color #ffffff
  border-top 1px solid #d9d9d9
  font-size 14px
  .c-first
    width 10%
  .c-second
    display flex
    height 25px
    align-items center
    width 50%
    no-wrap()
    img
      height 25px
      width 25px
      margin-right 3px
  .c-three
    width 20%
  .c-four
    width: 20%
.changeClass
  position fixed
  right 20px
  bottom 20px
  width 58px
  height 58px
.classRadio
  height 40px
  width @height
  border-radius  @height
  line-height @height
  font-size 14px
  color #ffffff
  background rgb(38, 162, 255)
/deep/ .mint-main-button
  font-size 18px
.t-header
  display flex
  align-items center
  padding 0 12px
  box-sizing border-box
.th-photo
  img 
    height 60px
    width @height 
    border-radius @height
.th-right
  padding-left 10px
  display flex
  justify-content space-between
  .thr-left
    font-size $fs14
    color #ffffff
    .thrl-top
      display flex
      height 20px
      align-items center
      .thrlt-asign
        width 35px
        font-size 12px
        color #ffffff
        background red
        height 20px
        text-align center
        line-height 20px
        border-radius 4px
        margin-left 10px
      .thrlt-img
        padding 0 5px
        img
          width 16px
          height 16px
    .thrl-center
      font-size $fs16
      padding 10px 0
.thr-right
  display flex
  justify-content space-between
  height 30px
  margin-top 18px
  .thrr-btn
    height 30px
    width 80px
    text-align center
    line-height @height 
    border 1px solid #ffffff
    color #ffffff
    margin-left 10px
    box-sizing border-box
.showMes 
  height 100%
  width 100%
  background rgba(0, 0, 0, 0.5)
  color #ffffff
  line-height 25px
  img 
    height 30px
    width 30px
    position absolute
    right 20px
    top 20px
.content
  width 100%
  padding 50px 20px
  box-sizing border-box
  text-align justify
.setting
  position absolute
  right 0
  top: 0
  display flex
  .logout
    padding 15px
    img 
      height 20px
      width 20px
.thrl-bottom
  display flex
  justify-content space-between
  height 60px
  width 100px
</style>