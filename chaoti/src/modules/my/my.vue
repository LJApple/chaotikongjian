<template>
  <div class="tasks">
    <div class="t-header">
      <div class="setting">
        <div class="logout" @click="logout"><img  src="../../assets/images/logout.png" alt=""></div>
        <div class="logout" @click="setting"><img src="../../assets/images/setting.png" alt=""></div>
      </div>
      <div class="th-photo">
        <img v-if="userInfo.photo === ''" src="../../assets/images/defalut-wihte.png" alt="">
        <img v-else :src="userInfo.photo" alt="">
        <!-- <input type="file" class="file-btn" accept="image/*" @change="getFile"/> -->
      </div>
      <div class="th-right">
        <div class="thr-left">
          <div class="thrl-top">
            <div class="thrlt-name">你好，{{userInfo.name}}</div>
            <!-- <div class="thrlt-asign">签到</div>
            <div class="thrlt-img" @click="questionClick">
                <img src="../../assets/images/question.png" alt="">
            </div> -->
          </div>
          <!-- <div class="thrl-bottom">
            <div>
              <div class="thrl-center">级别 {{userInfo.lvl}}</div>
              <div class="thrl-bottom">经验值 {{userInfo.score}}</div>
            </div>
            <div class="thr-right">
              <div class="thrr-btn" @click="showModal(1)">奖励规则</div>
              <div class="thrr-btn" @click="showModal(2)">纪律说明</div>
            </div>
          </div> -->
        </div>
      </div>
      <!-- <div class="thrlt-logo"><img src="../../assets/images/logo-in.png" alt=""></div> -->
    </div>
    <div class="page-navbar">
      <mt-navbar class="page-part paddingLR12" v-model="selected">
        <mt-tab-item id="1">我的任务</mt-tab-item>
        <mt-tab-item id="2">我的积分</mt-tab-item>
        <mt-tab-item id="3">积分排行榜</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected" class="my-contain">
        <mt-tab-container-item id="1">
          <!-- <mt-cell title="待完成任务" to="/tasks?selected=2" is-link>
            <img slot="icon" class="mc-img" src="../../assets/images/time.png" width="22" height="22">
          </mt-cell>
          <mt-cell title="已完成任务"  to="/tasks?selected=3" is-link>
            <img slot="icon" src="../../assets/images/done.png" width="18" height="18">
          </mt-cell> -->
          <div class="pn-list" v-if="val === 1"  v-for="item in getTaskListOne" :key="item.taskId" @click="toTaskDetail(item.taskId, true, item.receiveStatus)">
            <mt-cell class="pnl-list" is-link  :title="item.title">
                <!-- <span>已领取</span> -->
            </mt-cell>
          </div>
          <div class="pn-list" v-if="val === 2" v-for="item in getTaskListTwo" :key="item.taskId" @click="toTaskDetail(item.taskId, true, item.receiveStatus)">
            <mt-cell class="pnl-list" is-link :title="item.title">
                <!-- <span>已完成</span> -->
            </mt-cell>
          </div>
          <div class="pn-list" v-if="val === 3" v-for="item in getTaskListThree" :key="item.taskId" @click="toTaskDetail(item.taskId, true, item.receiveStatus)">
            <mt-cell class="pnl-list" is-link :title="item.title">
                <!-- <span>已过期</span> -->
            </mt-cell>
          </div>
          <div class="pn-list" v-if="val === 4" v-for="(item, index) in getTaskList" :key="index" @click="toTaskDetail(item.taskId, true, item.receiveStatus)">
            <mt-cell class="pnl-list" is-link  v-if="item.receiveStatus === 1" :title="item.title">
                <!-- <span>已领取</span> -->
            </mt-cell>
            <mt-cell class="pnl-list" is-link v-if="item.receiveStatus === 2" :title="item.title">
                <!-- <span>已完成</span> -->
            </mt-cell>
            <mt-cell class="pnl-list" is-link v-if="item.receiveStatus === 3" :title="item.title">
                <!-- <span>已过期</span> -->
            </mt-cell>
          </div>
          <mt-palette-button :content="content" @expand="main_log('expand')" @expanded="main_log('expanded')" @collapse="main_log('collapse')"
            direction="lt" class="changeClass" :radius="120" ref="target_1" mainButtonStyle="color:#fff;background-color:#ef4f4f;font-size:14px">
            <div class="my-icon-button indexicon icon-popup" @touchstart="sub_log(1)"><div class="classRadio" v-if="isExpend">已领取</div></div>
            <div class="my-icon-button indexicon icon-popup" @touchstart="sub_log(2)"><div class="classRadio" v-if="isExpend">已完成</div></div>
            <div class="my-icon-button indexicon icon-popup" @touchstart="sub_log(3)"><div class="classRadio" v-if="isExpend">已过期</div></div>
            <div class="my-icon-button indexicon icon-popup" @touchstart="sub_log(4)"><div class="classRadio" v-if="isExpend">全部</div></div>
          </mt-palette-button>
        </mt-tab-container-item>
        <mt-tab-container-item id="2" v-if="exper">
          <div class="animation">
            <div class="a-change">
                <img src="../../assets/images/exprience-bg.jpg" alt="">
                <div class="a-count">{{sumExperience}}</div>
            </div>
            <!-- <div class="mc-bottom"><span v-if="exper.experienceSort !== 1">距离第{{exper.experienceSort - 1}}名只差{{exper.diffExperience}}分哦</span> <router-link style="color: blue" :to="{ path: 'IntegralRankings', query: { userID: userInfo.userId }}">积分排行榜</router-link></div> -->
            <div class="mc-bottom"><span v-if="exper.experienceSort !== 1">距离第{{exper.experienceSort - 1}}名只差{{exper.diffExperience}}分哦</span></div>
          </div>
          <!-- <div class="total">
             <mt-cell title="个人总体验值">
            <span class="my-ex">11分</span>
            <img slot="icon" class="mc-img" src="../../assets/images/exprience.png" width="20" height="20">
          </mt-cell>
          </div> -->
          <mt-cell title="您的排名" style="margin-bottom: 10px">
            <span class="my-ex">第<span style="color: red;font-weight: bolder">{{exper.experienceSort}}</span>名</span>
            <img slot="icon" src="../../assets/images/exprience1.png" width="20" height="20">
          </mt-cell>
          <mt-cell title="总积分">
            <span class="my-ex">{{exper.sumExperience}}分</span>
            <img slot="icon" class="mc-img" src="../../assets/images/exprience.png" width="20" height="20">
          </mt-cell>
           <mt-cell title="活动积分" class="all-list">
            <span class="my-ex">{{exper.activeExperience}}分</span>
            <img slot="icon" class="mc-img" src="../../assets/images/exprience2.png" width="20" height="20">
          </mt-cell>
           <mt-cell title="专题积分" class="all-list">
            <span class="my-ex">{{exper.specialExperience}}分</span>
            <img slot="icon" class="mc-img" src="../../assets/images/exprience2.png" width="20" height="20">
          </mt-cell>
           <mt-cell title="日常反馈" class="all-list">
            <span class="my-ex">{{exper.dailyExperience}}分</span>
            <img slot="icon" class="mc-img" src="../../assets/images/exprience2.png" width="20" height="20">
          </mt-cell>
           <mt-cell title="其它" class="all-list">
            <span class="my-ex">{{exper.otherExperience}}分</span>
            <img slot="icon" class="mc-img" src="../../assets/images/exprience2.png" width="20" height="20">
          </mt-cell>
          <mt-cell title="已经使用" class="borderTop">
            <span class="my-ex">{{exper.convertExperience}}分</span>
            <img slot="icon" src="../../assets/images/exprience3.png" width="20" height="20">
          </mt-cell>
           <mt-cell title="剩余积分" class="borderTop">
            <span class="my-ex">{{exper.sumExperience - exper.convertExperience}}分</span>
            <img slot="icon" src="../../assets/images/exprience4.png" width="20" height="20">
          </mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
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
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <mt-popup
      v-model="popupVisible" modal="false"
      position="center" class="showMes">
      <div class="close" @click="close"><img src="../../assets/images/delDialog.png" alt=""></div>
      <div class="content">{{rulesText}}</div>
    </mt-popup>
    <div class="editPwd" :class="{displayNo:!isShowModal}">
      <div class="ep-box">
        <div class="e-title">请输入您密码</div>
        <div class="ep-content">
          <input class="e-input"  type="password" placeholder="请输入您的新密码" v-model="pwd"/>
          <input class="e-input"  type="password" placeholder="请再次输入您的新密码" v-model="pwdAgin" />
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
import { MessageBox } from "mint-ui"
import common from '../../utils/common'
import qs from 'qs'
export default {
  components: {},
  props: {},
  data() {
    return {
      selected: "1",
      isClass: 0,
      userInfo: {},
      photoNumber: "18720087343",
      value: "1",
      options: [
        {
          label: "男",
          value: "0"
        },
        {
          label: "女",
          value: "1"
        }
      ],
      popupVisible: false,
      getrulesData: null,
      isShowModal: false, // 修改密码显示隐藏
      pwd: null,
      pwdAgin: null,
      fileList: {
          fileName: null,
          uploadFile: null
      }, // 文件内容
      rules: null, // 规则
      rulesText: null, // 规则内容
      exper: null, // 积分
      isExpend: false,
      getTaskList: [],
      getTaskListOne: [],
      getTaskListTwo: [],
      getTaskListThree: [],
      val: 4,
      sumExperience: 0,
      sextype: '0',
      content: '全部',
      ranking: []
    }
  },
  watch: {
    // 监听selected
    selected(val, oldVal) {
      //val     切换后 id
      //oldVal  切换前 id
      this.selected = val;
      if (val === "1") {
        console.log("点击了1");
      } else if (val === "2") {
        console.log("点击了2")
         this.getexper()
      } else if (val === "3") {
        this.getUserInfo()
        this.getmyrno()
      }
      console.log("seleced", val, oldVal);
    }
  },
  computed: {},
  methods: {
    main_log(val) {
        console.log('main_log', val)
        if (val === 'expand') {
            this.isExpend = true
        } else if(val === 'collapse') {
            this.isExpend = false
        }
    },
    sub_log(val) {
        this.val = val
         if (val === 1) {
          this.content = '已领取'
        } else if (val === 2) {
          this.content = '已完成'
        } else if (val === 3) {
          this.content = '已过期'
        } else if (val === 4) {
          this.content = '全部'
        }
        this.$refs.target_1.collapse()
        return false
    },
    // 获取任务列表
    getTaskOneTap() {
      this.getTaskList = []
      this.getTaskListOne = []
      this.getTaskListTwo = []
      this.getTaskListThree = []
      this.$axios.get(this.$api.getmytask).then((response) => {
        console.log('response', response)
        const { data, success } = response.data
        if (success) {
          for (const item of data) {
            // item.title = item.title + (item.taskStatus === 0 ? '（新）':'（已结束）')
            const {receiveStatus} = item
            if (receiveStatus === 1) {
              this.getTaskListOne.push(item)
            } else if (receiveStatus === 2) {
              this.getTaskListTwo.push(item)
            } else if (receiveStatus === 3) {
              this.getTaskListThree.push(item)
            }
          }
          console.log(' this.getTaskListOne',  this.getTaskListOne)
          this.getTaskList = data
        }
      }).catch((error) => {

      }).then(() =>{
      })
    },
    // 跳转到任务详情
    toTaskDetail(taskId, isHaveUpload, taskType) {
     if ( isHaveUpload === 0 ) {
         isHaveUpload = false
     } else {
         isHaveUpload = true
     }
      this.$router.push({
        name: 'tasksDetail',
        params: { taskId },
        query: {isHaveUpload, taskType}
      })
      // this.setTaskDetail(taskId)
    },
    // 打开规则窗口
    showModal(type) {
      this.popupVisible = true
      if (type === 1) {
        this.rulesText = this.rules.rewardRules
      } else  {
        this.rulesText = this.rules.discipline
      }
    },
    // 关闭窗口
    close() {
      this.popupVisible = false
    },
    // 退出登录
    logout() {
      // 清除session 返回login
      MessageBox.confirm("确定退出吗?").then(action => {
        console.log("action", action);
        const path = this.$route.path;
        window.localStorage.removeItem("account_token")
        // common.delCookie('account_token')
        this.$router.push({ path: "login", query: { redirect: path } });
      });
    },
    // 设置
    setting() {
      this.$router.push({
        path: "/setting"
      });
    },
    // 获取用户信息
    getUserInfo() {
      this.$axios.get(this.$api.getuserinfo).then(response => {
        const { success, data } = response.data
        if (success) {
          if (data.sex === '男') {
            this.sextype = '0'
          } else {
            this.sextype = '1'
          }
          this.userInfo = data
        }
      })
    },
    // 获取经验值
    getexper() {
      let exp
      clearInterval(exp)
    //   this.sumExperience = 0
      if (this.exper) return
      this.$axios.get(this.$api.getexper).then(response => {
        const { success, data } = response.data;
        if (success) {
            this.exper = data
            const sum = data.sumExperience - data.convertExperience
            if (!sum) return
            if (sum > 30) {
               this.sumExperience = sum - 30
            }
            exp = setInterval(() => {
                this.sumExperience += 1
                if (this.sumExperience === data.sumExperience - data.convertExperience) clearInterval(exp)
            }, 50)
        }
      })
    },
    cancle() {
      this.isShowModal = false
    },
    // 点击修改密码
    changPwd() {
        this.isShowModal = true
    },
    // 提交修改密码
    submit() {
        if (!this.pwd) {
          this.$toast('请输入您的密码')
          return
        }
        if(!this.pwdAgin) {
          this.$toast('请再次输入您的密码')
          return
        }
         if(this.pwdAgin !== this.pwd) {
          this.$toast('两次输入的密码不一致哦')
          return
        }
        let param = {
            pwd: this.pwd
        }
        param = common.splicingJson(param)
        const url = this.$api.updateuserpwd + param
        this.$axios.post(url).then((response) => {
            const { message, success } = response.data
            if (success) {
              MessageBox.alert('修改成功').then(action => {
                this.isShowModal = false
              })
            } else {
              MessageBox.alert(message)
            }
        })
    },
    // 提交数据
    submitData() {
        let {sex, phone, email, photo} = this.userInfo
        if(!sex || !phone || !email) {
          MessageBox.alert('参数不能为空')
        }
        if (this.sextype === '0') {
          sex = '男'
        } else {
          sex = '女'
        }
        if (!photo) photo = '无'
        let param = {
          sex,
          phone,
          email,
          photo
        }
        console.log('this.userInfo', param, qs.stringify(param))
        param = common.splicingJson(param)
        const url = this.$api.updateuserdata + param
        this.$axios.post(url).then((res) => {
            const { message, success } = res.data
            if (success) {
              MessageBox.alert('修改成功')
            } else {
              MessageBox.alert(message)
            }
        })
    },
    // 上传文件
    getFile(e) {
        const { files, value } = e.target
        this.filesUrlList = []
        for (var i = 0; i < files.length; i++) {
            this.fileList.fileName = files[i].name
            this.filesUrlList.push(value)
            let param = new FormData()
            param.append("file", files[i])
            let option = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: param,
                processData: false,
                url: this.$api.upload
            }
            this.$axios(option).then((res) => {
                const { data, success, message } = res.data
                if (success) {
                    this.userInfo.photo = this.fileList.uploadFile = data
                    this.$toast(message)
                } else {
                    this.$toast('头像上传失败')
                }
            }).catch((error) => {
                // handle error
                console.log(error)
            })
        }
        e.target.value = null
      },
    // 获取排行榜
  getmyrno() {
      const url = this.$api.getmyrno
      this.$axios.get(url).then(response => {
        const { success, data } = response.data;
        if (success) {
            for (const item of data) {
                item.red = false
                if (item.userId === parseInt(this.userInfo.userId)) {
                    item.red = true
                }
            }
            console.log(data)
            this.ranking = data
        }
      })
    }
  },
  activated() {
    // this.getTaskOneTap()
  },
  created() {
    // 获取奖励规则
    // this.rulesData()
    // 获取任务列表
    this.getTaskOneTap()
    this.getUserInfo()
    // // 获取积分
    // this.getexper()
    // // 获取排行榜
    // this.getmyrno()
    // 是或签到
    // this.getissign()
  },
  mounted() {}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '../../assets/stylus/variable.styl';
.my-contain
    margin-top: 10px
    padding-bottom 30px
    /deep/ .mint-cell-wrapper
        padding-left: 10px
    .mc-bottom
        text-align: center
        height: 50px
        line-height: @height
.total
  margin-bottom: 10px

  /deep/ .mint-cell-text
    font-weight: bolder
  /deep/ .my-ex
    color: $bg-color
.header {
  display: flex;
  font-size: 14px;
  height: 48px;
  align-items: center;
  padding: 0 $pagePadding;
  background-color: #ffffff;
  box-sizing: border-box;

  .h-left, .h-right {
    display: flex;

    img {
      height: 16px;
      width: 16px;
    }
  }

  .h-right {
    margin-left: 10px;
  }

  .h-name {
    font-weight: bolder;
  }
}

.cell {
  display: flex;
  height: 48px;
  align-items: center;
  padding: 0 $pagePadding;
  background-color: #ffffff;
  border-top: 1px solid #d9d9d9;
  font-size: 14px;

  .c-first {
    width: 10%;
  }

  .c-second {
    display: flex;
    height: 25px;
    align-items: center;
    width: 50%;
    no-wrap();

    img {
      height: 25px;
      width: 25px;
      margin-right: 3px;
    }
  }

  .c-three {
    width: 20%;
  }

  .c-four {
    width: 20%;
  }
}

/deep/ .mint-main-button
  font-size: 18px

.t-header
  display: flex
  align-items: center
  padding: 0 12px
  box-sizing: border-box

.th-photo
    position: relative
    img
        height: 60px
        width: @height
        border-radius: @height

.th-right {
  padding-left: 10px;
  display: flex;
  justify-content: space-between;

  .thr-left {
    font-size: $fs14;
    color: #ffffff;

    .thrl-top {
      display: flex;
      height: 20px;
      align-items: center;

      .thrlt-asign {
        width: 35px;
        font-size: 12px;
        color: #ffffff;
        background: red;
        height: 20px;
        text-align: center;
        line-height: 20px;
        border-radius: 4px;
        margin-left: 10px;
      }

      .thrlt-img {
        padding: 0 5px;

        img {
          width: 16px;
          height: 16px;
        }
      }
    }

    .thrl-center {
      font-size: $fs16;
      padding: 10px 0;
    }
  }
}

.thr-right {
  display: flex;
  justify-content: space-between;
  height: 30px;
  margin-top: 18px;

  .thrr-btn {
    height: 30px;
    width: 80px;
    text-align: center;
    line-height: @height;
    border: 1px solid #ffffff;
    color: #ffffff;
    margin-left: 10px;
    box-sizing: border-box;
  }
}

.showMes {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  line-height: 25px;

  img {
    height: 30px;
    width: 30px;
    position: absolute;
    right: 20px;
    top: 20px;
  }
}

.content {
  width: 100%;
  padding: 50px 20px;
  box-sizing: border-box;
  text-align: justify;
}

.setting {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;

  .logout {
    padding: 15px;

    img {
      height: 20px;
      width: 20px;
    }
  }
}

.thrl-bottom {
  display: flex;
  justify-content: space-between;
  height: 60px;
  width: 100px;
}

// 个人资料
.sl-list {
  position: relative;

  .sll-img {
    position: absolute;
    z-index: 1;
    height: 48px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 10px;
    box-sizing: border-box;

    img {
      height: 20px;
      width: @height;
    }
  }

  .s-padding {
    /deep/ .mint-cell-title {
      padding-left: 40px;
    }
  }
}

.sex
  display: flex;
  // justify-content space-between
  background: #ffffff;
  font-size: 16px;
  border-bottom: 1px solid #dddddd;

  /deep/ .mint-cell-wrapper
    background-image: none !important
    background: #ffffff
    padding: 0
  /deep/ .s-radio
    padding-left: 10px
    pointer-events: none

  .sll-left
    height: 48px
    width: 112px
    display: flex
    align-items: center
    justify-content: left
    padding-left: 10px
    box-sizing: border-box
    img
      height: 20px;
      width: @height;
      margin-right: 10px

.s-radio {
  display: flex;
}

/deep/ .mint-cell-wrapper {
  padding: 0;
  background-image: none;
}

.paddingLR10 {
  padding-left: 10px;
}

.borderBt {
  border-bottom: 1px solid #dddddd;
}

.hasArrow {
  /deep/ .mint-cell-text {
    padding-left: 4px;
  }
}

.submit {
  margin: 30px 10px;
  box-sizing: border-box;
}

/deep/ .mint-radio-label {
  padding-right: 7px;
}

/deep/ .mint-cell-value {
  padding-right: 12px;
}
.file-btn
    position: absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
    outline: none
    background-color: transparent
    opacity: 0
.borderTop
    border-top: 1px solid #ddd
.thrlt-logo
  position: absolute
  right: 12px
  img
    height 50px
    width 154px
.animation
  height: 150px
  width: 100%
  display: flex
  justify-content center
  align-items center
  flex-direction column
  position relative
  background-color: #ffffff
  margin-bottom: 10px
  .a-change
    height 70px
    position relative
    img
        height: 70px
        width: @height
    .a-count
        position absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        margin: auto
        height: 70px
        display flex
        justify-content center
        align-items center
        width: @height
        font-weight bolder
        font-size 22px
.all-list
  padding-left: 20px
  border-top: 1px solid #ddd
/deep/ .mint-field-core
  background #fff


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
