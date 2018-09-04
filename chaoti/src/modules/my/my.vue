<template>
  <div class="tasks">
    <div class="t-header">
      <div class="setting">
        <div class="logout" @click="logout"><img  src="../../assets/images/logout.png" alt=""></div>
        <!-- <div class="logout" @click="setting"><img src="../../assets/images/setting.png" alt=""></div> -->
      </div>
      <div class="th-photo">
        <img v-if="userInfo.photo === ''" src="../../assets/images/defalut-wihte.png" alt="">
        <img v-else :src="userInfo.photo" alt="">
        <input type="file" class="file-btn" accept="image/*" @change="getFile"/>
      </div>
      <div class="th-right">
        <div class="thr-left">
          <div class="thrl-top">
            <div class="thrlt-name">{{userInfo.name}}</div>
            <div class="thrlt-asign">签到</div>
            <div class="thrlt-img" @click="questionClick">
                <img src="../../assets/images/question.png" alt="">
            </div>
          </div>
          <div class="thrl-bottom">
            <div>
              <div class="thrl-center">级别 {{userInfo.lvl}}</div>
              <div class="thrl-bottom">经验值 {{userInfo.score}}</div>
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
        <mt-tab-item id="1">我的任务</mt-tab-item>
        <mt-tab-item id="2">我的积分</mt-tab-item>
        <mt-tab-item id="3">个人资料</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected" class="my-contain">
        <mt-tab-container-item id="1">
          <!-- <mt-cell title="待完成任务" to="/tasks?selected=2" is-link>
            <img slot="icon" class="mc-img" src="../../assets/images/time.png" width="22" height="22">
          </mt-cell>
          <mt-cell title="已完成任务"  to="/tasks?selected=3" is-link>
            <img slot="icon" src="../../assets/images/done.png" width="18" height="18">
          </mt-cell> -->
          <div class="pn-list"  v-for="(item, index) in getTaskList" :key="index" @click="toTaskDetail(item.taskId, item.taskStatus, 1)">
            <mt-cell class="pnl-list" is-link  v-if="item.taskStatus === 0" :title="item.title">
                <span>领取任务</span>
            </mt-cell>
            <mt-cell class="pnl-list" is-link  v-if="item.taskStatus === 1" :title="item.title">
                <span>提交任务</span>
            </mt-cell>
            <mt-cell class="pnl-list" is-link v-if="item.taskStatus === 2" :title="item.title">
                <span>已完成</span>
            </mt-cell>
          </div>
          <mt-palette-button content="任务" @expand="main_log('expand')" @expanded="main_log('expanded')" @collapse="main_log('collapse')"
            direction="lt" class="changeClass" :radius="60" ref="target_1" mainButtonStyle="color:#fff;background-color:#ef4f4f;font-size:14px">
            <div class="my-icon-button indexicon icon-popup" @touchstart="sub_log(1)"><div class="classRadio" v-if="isExpend">待完成</div></div>
            <div class="my-icon-button indexicon icon-popup" @touchstart="sub_log(2)"><div class="classRadio" v-if="isExpend">已完成</div></div>
          </mt-palette-button>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="total">
             <mt-cell title="个人总体验值">
            <span class="my-ex">11分</span>
            <img slot="icon" class="mc-img" src="../../assets/images/exprience.png" width="20" height="20">
          </mt-cell>
          </div>
          <mt-cell title="总积分">
            <span class="my-ex">11分</span>
            <img slot="icon" class="mc-img" src="../../assets/images/exprience.png" width="20" height="20">
          </mt-cell>
          <mt-cell title="已经使用" class="borderTop">
            <span class="my-ex">1分</span>
            <img slot="icon" src="../../assets/images/exprience.png" width="20" height="20">
          </mt-cell>
           <mt-cell title="剩余积分" class="borderTop">
            <span class="my-ex">1分</span>
            <img slot="icon" src="../../assets/images/exprience.png" width="20" height="20">
          </mt-cell>
           <mt-cell title="您的排名" class="borderTop">
            <span class="my-ex">1分</span>
            <img slot="icon" src="../../assets/images/exprience.png" width="20" height="20">
          </mt-cell>
          <div class="mc-bottom">距离第9名只差3分哦 <span>积分排行榜</span></div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <!-- <div class="type1" :hidden="isClass">
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
          </mt-palette-button> -->
           <div class="s-list">
                <div class="sl-list">
                    <div class="sll-img">
                        <img src="../../assets/images/done.png" alt="">
                    </div>
                    <mt-field class="s-padding" label="用户名" placeholder="用户名" v-model="userInfo.name"></mt-field>
                </div>
                <div class="sl-list sex">
                    <div class="sll-left">
                        <img src="../../assets/images/done.png" alt="">
                        <span>性别</span>
                    </div>
                    <mt-radio class="s-radio"
                        v-model="userInfo.type"
                        align="right"
                        :options="options">
                    </mt-radio>
                </div>
                <div class="sl-list">
                    <div class="sll-img">
                        <img src="../../assets/images/done.png" alt="">
                    </div>
                    <mt-field class="s-padding" label="手机号" placeholder="手机号" v-model="userInfo.phone"></mt-field>
                </div>
                <div class="sl-list">
                    <div class="sll-img">
                        <img src="../../assets/images/done.png" alt="">
                    </div>
                    <mt-field class="s-padding" label="邮箱" placeholder="邮箱" v-model="userInfo.email"></mt-field>
                </div>
                <div  @click="changPwd">
                    <mt-cell title="修改密码" value="" class="hasArrow borderBt"  is-link>
                        <img slot="icon"  class="paddingLR10" src="../../assets/images/done.png" width="18" height="18">
                    </mt-cell>
                </div>
                <!-- <mt-cell title="修改头像"  value="" class="hasArrow"  is-link>
                    <img slot="icon" class="paddingLR10" src="../../assets/images/done.png" width="20" height="20">
                </mt-cell> -->
                </div>
            <div class="submit" >
                <mt-button type="primary" size="large" @click="submitData">提交</mt-button>
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
          <input class="e-input"  type="password" placeholder="请输入您的密码" v-model="pwd"/>
          <input class="e-input"  type="password" placeholder="请在此输入您的密码" v-model="pwdAgin" />
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
      getTaskList: null
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
        console.log("点击了3");
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
        console.log('sub_log', val)
        if (val === 1) {

        } else if (val === 2) {

        } else if (val === 3) {

        }
        this.$refs.target_1.collapse()
    },
    // 获取任务列表
    getTaskOneTap() {
      this.$axios.get(this.$api.taskOneTap).then((response) => {
        console.log('response', response)
        const { data, success } = response.data
        if (success) {
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
      this.setTaskDetail(taskId)
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
        window.sessionStorage.removeItem("account_token");
        this.$router.push({ path: "login", query: { redirect: path } });
      });
    },
    // 设置
    setting() {
      this.$router.push({
        path: "/setting"
      });
    },
    // 连续签到3天赠送1级分
    questionClick() {
      this.$toast("连续签到3天赠送1级分");
    },
    // 获取奖励规则
    rulesData() {
      this.$axios.get(this.$api.getrules).then(response => {
        const { success, data } = response.data
        if (success) {
          this.rules = data
        }
      })
    },
    // 获取用户信息
    getUserInfo() {
      this.$axios.get(this.$api.getuserinfo).then(response => {
        const { success, data } = response.data;
        if (success) {
          this.userInfo = data;
        }
      })
    },
    // 签到
    signin() {
      this.$axios.post(this.$api.signin).then(response => {
        const { success } = response.data;
        if (success) {
        }
      })
    },
    // 获取经验值
    getexper() {
      this.$axios.get(this.$api.getexper).then(response => {
        const { success, data } = response.data;
        if (success) {
            this.exper = data
        }
      })
    },
    // 获取排行榜
    getmyrno() {
      let isAll = 0;
      const url = this.$api.getmyrno + "?isAll=" + isAll;
      this.$axios.get(url).then(response => {
        const { success } = response.data;
        if (success) {
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
            pwd: this.pwd,
            pwdAgin: this.pwdAgin
        }
        param = common.splicingJson(param)
        const url = this.$api.updateuserpwd + param
        this.$axios.post(url).then((response) => {
            const { message, success } = res.data
            if (success) {
              MessageBox.alert('提交成功，请前往您的邮箱修改密码')
            } else {
              MessageBox.alert(message)
            }
        })
    },
    // 提交数据
    submitData() {
        let param = this.userInfo
        console.log('this.userInfo', param, qs.stringify(param))
        // param = common.splicingJson(param)
        // const url = this.$api.updateuserdata + param
        this.$axios.post(this.$api.updateuserdata, qs.stringify(param)).then((res) => {
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
                    debugger
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
      }
  },
  activated() {},
  created() {
    // 获取奖励规则
    this.rulesData()
    // 获取用户信息
    this.getUserInfo();
    // 获取任务列表
    this.getTaskOneTap()
    // // 获取积分
    // this.getexper()
    // // 获取排行榜
    // this.getmyrno()
  },
  mounted() {}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '../../assets/stylus/variable.styl';
.my-contain
    margin-top: 10px
    /deep/ .mint-cell-wrapper
        padding-left: 10px
    .mc-bottom
        text-align: center
        position: absolute
        bottom: -20px
.total
  margin-bottom: 10px

  /deep/ .mint-cell-text
    font-weight: bolder
  /deep/ .my-ex
    color: #26a2ff
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

.sex {
  display: flex;
  // justify-content space-between
  background: #ffffff;
  font-size: 16px;
  border-bottom: 1px solid #dddddd;

  /deep/ .mint-cell-wrapper {
    background-image: none !important
    background: #ffffff
    padding: 0
  }

  .sll-left {
    height: 48px;
    width: 112px;
    display: flex;
    align-items: center;
    justify-content: left;
    padding-left: 10px;
    box-sizing: border-box;

    img {
      height: 20px;
      width: @height;
      margin-right: 10px;
    }
  }
}

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
</style>