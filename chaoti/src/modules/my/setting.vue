<template>
  <div class="tasks">
    <div class="t-header">
      <div class="setting">
        <!-- <div class="logout" @click="logout"><img  src="../../assets/images/logout.png" alt=""></div> -->
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
          </div>
        </div>
      </div>
      <div class="thrlt-logo">
        <img v-if="isForum" src="../../assets/images/logo-forum.png" alt="">
        <img v-else src="../../assets/images/logo-in.png" alt="">
      </div>
    </div>
    <div class="page-navbar">
      <div class="my-contain">
          <div class="s-list">
                <div class="sl-list">
                    <div class="sll-img">
                        <img src="../../assets/images/done.png" alt="">
                    </div>
                    <mt-field class="s-padding" label="用户名" placeholder="用户名" v-model="userInfo.name"></mt-field>
                </div>
                <div class="sl-list">
                    <div class="sll-img">
                        <img src="../../assets/images/done.png" alt="">
                    </div>
                    <mt-field class="s-padding" label="职业" placeholder="职业" v-model="userInfo.profession"></mt-field>
                </div>  
                <div class="sl-list sex">
                    <div class="sll-left">
                        <img src="../../assets/images/done.png" alt="">
                        <span style="padding-left: 12px">性别</span>
                    </div>
                    <mt-radio class="s-radio"
                        v-model="sextype"
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
                <div class="sl-list" @click="changPwd">
                    <mt-cell title="修改密码" value="" class="hasArrow borderBt"  is-link>
                        <img slot="icon" src="../../assets/images/done.png" width="20" height="20">
                    </mt-cell>
                </div>
                <!-- <mt-cell title="修改头像"  value="" class="hasArrow"  is-link>
                    <img slot="icon" class="paddingLR10" src="../../assets/images/done.png" width="20" height="20">
                </mt-cell> -->
                </div>
            <div class="submit" >
                <mt-button class="red" type="primary" size="large" @click="submitData">提交</mt-button>
            </div>
      </div>
    </div>
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
      userInfo: {},
      photoNumber: "",
      value: "1",
      sextype: '0',
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
      isForum: false
    }
  },
  watch: {
  },
  computed: {},
  methods: {
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
        // window.localStorage.removeItem("account_token")
        common.delCookie('account_token')
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
      // 是否签到
      getissign() {
         this.$axios.get(this.$api.getissign).then(response => {
          const { success } = response.data;
          if (success) {
          }
        })
      }
  },
  activated() {
    // this.getTaskOneTap()
  },
  created() {
    this.getUserInfo()
    if (this.$route.query.toSetting === 'tasks') {
      this.isForum = false
    } else {
       this.isForum = true
    }
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
  z-index 10
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
</style>