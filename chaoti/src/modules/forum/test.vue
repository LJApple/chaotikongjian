<template>
  <div class="fd">
     <div class="commont-new" id="common">
        <div v-for="item in postReplyList" :key="item.commentId">
            <div class="cn-list">
                <div class="cn-user">
                    <img mode="aspectFill" src="{{item.userPic}}"/>
                    <text>{{item.userName}}</text>
                </div>
                <div class="cn-content">{{item.content}}</div>
                <div class="cn-praise">
                    <div class="cnp-time">{{item.createTime}}</div>
                    <div class="cnp-reply">
                        <button class="cnp-re"
                        v-if="item.userId !== currentUserId"
                        @click="toRegistrationProcess">回复</button>
                        <text class="cnpr-circle"  v-if="item.userId !== currentUserId">·</text>
                        <button class="cnpr-like" @click="toRegistrationProcess">
                            <img mode="aspectFill" v-if="!item.isPraise" src="../../assets/images/praise.png">
                            <img mode="aspectFill" v-else src="../../assets/images/praise--active.png">
                            <text v-if="item.praiseNum===0">赞</text>
                            <text class="item.isPraise ? 'red' : ''" v-else>{{item.praiseNum}}</text>
                        </button>
                    </div>
                </div>
                <div class="cn-otherComment" v-if="item.replyList.length">
                    <div v-for="relyList in item.replyList" :key="relyList.replyId"> 
                        <div class="cno-list">
                            <div class="cno-user">
                                <div @click="toIdentifyCard" 
                                v-if="item.userId === relyList.beReplyUserId">
                                    <img mode="aspectFill" :src="relyList.userPic">
                                    <text>{{relyList.userName}}</text>
                                </div>
                                <div v-else class="bnou-photo">
                                    <img data-title="跳转-个人主页" @click="toIdentifyCard" :src="relyList.userPic">
                                    <text data-title="跳转-个人主页" @click="toIdentifyCard" v-if="relyList.userId === authorId">{{relyList.userName}}（作者）</text>
                                    <text data-title="跳转-个人主页" @click="toIdentifyCard" v-else>{{relyList.userName}}</text>
                                    <text style="padding: 0 20rpx">></text>
                                    <text data-title="跳转-个人主页" @click="toIdentifyCard" v-if="relyList.beReplyUserId === authorId">{{relyList.beReplyUserName}}（作者）</text>
                                    <text data-title="跳转-个人主页" @click="toIdentifyCard" v-else>{{relyList.beReplyUserName}}</text>
                                </div> 
                            </div>
                            <div class="cno-content">{{relyList.content}}</div>
                            <div class="cno-praise">
                                <div class="cnop-time">{{relyList.createTime}}</div>
                                <div class="cnop-reply">
                                    <button class="cnop-re"
                                    v-if="relyList.userId !== currentUserId"
                                    @click="toRegistrationProcess">回复</button>
                                    <text class="cnopr-circle" v-if="relyList.userId !== currentUserId">·</text>
                                    <button class="cnopr-like"
                                    @click="toRegistrationProcess">
                                        <img mode="aspectFill" v-if="!relyList.isPraise" src="../../assets/images/praise.png">
                                        <img mode="aspectFill" v-else src="../../assets/images/praise-active.png">
                                        <text>{{relyList.praiseNum}}</text>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </div>
  </div>
</template>

<script type="text/ecmascript-6">
import emoticon from "utils/emoticon"
import { swiper, swiperSlide } from "vue-awesome-swiper"
import prediv from "components/prediv/prediv"
import { MessageBox, Indicator } from "mint-ui"
export default {
  components: {
    swiper,
    swiperSlide,
    prediv
  },
  props: {},
  data() {
    return {
      forumListDetailInfo: {},
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      },
      showSendModal: false,
      showimgList: false,
      sendMsg: "",
      emoticon: [], // 表情列表
      isShowEmoticon: false,
      imgUrl: [], // 图片路径
      imgList: [], // 大图列表
      postReplyList: [] // 回复列表
    }
  },
  watch: {},
  computed: {},
  methods: {
    getpostdetial() {
      const url = `${this.$api.getpostdetial}?postId=${
        this.$route.query.postsId
      }`;
      this.$axios.get(url).then(response => {
        const { data, success } = response.data;
        if (success) {
          data.uploadFileUrl = data.uploadFileUrl.split("|")
          console.log("uploadFileUrl", data.uploadFileUrl)
          this.forumListDetailInfo = data
          this.postReplyList = data.postReplyList
        }
      });
    },
    clickLike(postsId) {
      const forumListDetailInfo = this.forumListDetailInfo;
      if (postsId === forumListDetailInfo.postsId) {
        const url = `${
          this.$api.postspraise
        }?postsId=${postsId}&replyId=0&lv=0`;
        this.$axios.post(url).then(response => {
          const { data, success } = response.data
          if (success) {
            forumListDetailInfo.goodCount = forumListDetailInfo.good
              ? forumListDetailInfo.goodCount - 1
              : forumListDetailInfo.goodCount + 1
            forumListDetailInfo.good = forumListDetailInfo.good ? 0 : 1;
          }
        });
      }
    },
    // 全图
    clickImg() {
      this.showimgList = true;
      this.imgList = this.forumListDetailInfo.uploadFileUrl;
    },
    // 关闭
    close(e) {
      this.showimgList = e;
    },
    // 选择表情
    selectEmo(name) {
      this.sendMsg += name;
      console.log("name", name);
    },
    // 初始化表情
    initEmo() {
      this.emoticon = emoticon;
    },
    // 显示表情
    showEmoticon() {
      this.isShowEmoticon = !this.isShowEmoticon;
    },
    hideEmotion() {
      this.isShowEmoticon = false;
    },
    // 获取文件
    getFile(e) {
      const { files, value } = e.target;
      if (this.imgUrl.length >= 5) return MessageBox.alert("最多上传五张图片");
      for (var i = 0; i < files.length; i++) {
        const name = files[i].name;
        let param = new FormData();
        param.append("file", files[i]);
        let option = {
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: param,
          processData: false,
          url: this.$api.upload
        };
        Indicator.open("上传中...");
        this.$axios(option)
          .then(res => {
            const { data, success, message } = res.data;
            if (success) {
              this.imgUrl.push({ fileName: name, imgUrl: data });
              Indicator.close();
            } else {
              // this.$toast('头像上传失败')
            }
          })
          .catch(error => {
            // handle error
            console.log(error);
          });
      }
      e.target.value = null;
    },
    // 删除照片
    closeImg(imgUrl) {
      for (const [index, item] of this.imgUrl.entries()) {
        if (item.imgUrl === imgUrl) {
          this.imgUrl.splice(index, 1);
        }
      }
    },
    inputFocus() {
      this.showSendModal = true;
    },
    closeSendModal() {
      this.showSendModal = false;
      this.resetReply();
    },
    // 发送回复-评论帖子
    sendData() {
      const imgUrl = this.imgUrl.map(v => v.imgUrl).join("|");
      const param = {
        postsId: this.$route.query.postsId,
        replyPostsId: "",
        detail: this.sendMsg,
        imgUrl,
        lv: 0
      };
      this.$axios.post(this.$api.replyposts, param).then(response => {
        const { data, success, message } = response.data;
        if (success) {
          this.$toast(message);
          this.resetReply();
        }
      });
    },
    // 清空回复窗口数据
    resetReply() {
      this.imgUrl = [];
      this.isShowEmoticon = false;
      this.showSendModal = false;
      this.sendMsg = "";
    },
    // 预览回复窗口 图片
    clickRepImg() {
      this.showimgList = true;
      this.imgList = this.imgUrl.map(v => v.imgUrl);
    }
  },
  created() {
    // 获取帖子详情
    this.getpostdetial();
    // 初始化表情列表
    this.initEmo();
  },
  mounted() {}
};
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '../../assets/stylus/variable.styl'
.fd {
    height: 100%;
    background: #ffffff;

    .fd-header {
        height: 40px;
        display: flex;
        align-items: center;
        padding: 12px;

        img {
            width: 40px;
            height: @height;
            border-radius: 100%;
            margin-right: 10px;
        }

        .fdh-isDel {
            position: absolute;
            right: 12px;
            background: red;
            color: #ffffff;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 12px;
        }
    }

    .fd-banner {
        height: 200px;
        overflow: hidden;

        .swiper-slide {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        img {
            width: 100%;
            position: absolute;
        }
    }

    .fd-content {
        padding: 0 12px;
        border-bottom: 1px solid #dddddd;
    }

    .fd-opr {
        display: flex;
        justify-content: space-between;
        height: 30px;
        align-items: center;

        .fdo-left {
            color: #333333;
        }

        .fdo-right {
            display: flex;

            img {
                height: 20px;
                width: 20px;
                margin-left: 20px;
            }
        }
    }

    .fdc-tiem {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
    }

    .fdc-text {
        color: #333333;
        line-height: 20px;
    }
}

.fd-input {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #f6f6f6;
    height: 42px;
    display: flex;
    padding: 0 12px;
    box-sizing: border-box;
    align-items: center;

    .fdi-img {
        width: 52px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            height: 28px;
            width: @height;
        }
    }

    .fdi-text {
        height: 30px;
        width: 100%;
        border: 0;
        background: #ffffff;
        border-radius: 6px;
        padding: 0 10px;
        box-sizing: border-box;
    }

    .fdi-btn {
        color: #377cdb;
        width: 81px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

// 发表评论
.fd-send {
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;

    .fds-box {
        background: #ffffff;

        .fdsb-area {
            width: 100%;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            padding: 12px;
            font-size: 14px;
            background: #fff;
            height: 100px;
            resize: none;
            border: none;
        }

        .fdsb-img {
            padding: 12px;
            position: relative;

            .fdsbi-list {
                display: flex;
                flex-wrap: wrap;
                max-width: 315px;

                .fdsbil-img {
                    height: 80px;
                    width: @height;
                    display: flex;
                    align-content: center;
                    justify-content: center;
                    position: relative;
                    background: #dddddd;
                    margin: 0 10px 10px 0;

                    .close {
                        position: absolute;
                        top: 0;
                        right: 0;
                        line-height: 1;
                        font-size: 16px;
                        width: 25px;
                        height: @width;
                        color: #ffffff;
                        // background rgba(0, 0,0, 0.5)
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        img {
                            width: 20px;
                            height: @width;
                        }
                    }

                    img {
                        max-height: 80px;
                        max-width: @height;
                    }
                }

                .add {
                    position: relative;

                    .file-btn {
                        position: absolute;
                        width: 80px;
                        height: @width;
                        top: 0;
                        left: 0;
                        outline: none;
                        background-color: transparent;
                        opacity: 0;
                    }

                    img {
                        height: 80px;
                        width: @height;
                        border: 1px solid #dddddd !important;
                    }
                }
            }

            .fdsb-smile {
                position: absolute;
                right: 12px;
                top: 35px;
                width: 35px;
                height: @width;

                img {
                    width: 35px;
                    height: @width;
                }
            }
        }
    }
}

.fdsb-bottom {
    height: 50px;
    display: flex;
    justify-content: flex-end;
    padding: 0 12px;
    align-items: center;
    border-top: 1px solid #dddddd;

    .fdsbb-btn {
        padding: 6px 12px;
        border-radius: 20px;
        background: #ed4b4b;
        border: 0;
        line-height: 1;
        color: #ffffff;
        margin-left: 10px;

        &:first-child {
            background: #eeeeee;
        }
    }
}

.fd-p
    height: 400px
</style>




.fd-send
    position fixed
    top 0
    height 100%
    width 100%
    background rgba(0, 0, 0, 0.4)
    z-index 1

    .fds-box
        background #ffffff

        .fdsb-area
            width 100%
            -webkit-box-sizing border-box
            box-sizing border-box
            padding 12px
            font-size 14px
            background #fff
            height 100px
            resize none
            border none

        .fdsb-img
            padding 12px
            position relative

            .fdsbi-list
                display flex
                flex-wrap wrap
                max-width 315px

                .fdsbil-img
                    height 80px
                    width @height
                    display flex
                    align-content center
                    justify-content center
                    position relative
                    background #dddddd
                    margin 0 10px 10px 0

                    .close
                        position absolute
                        top 0
                        right 0
                        line-height 1
                        font-size 16px
                        width 25px
                        height @width
                        color #ffffff
                        // background rgba(0, 0,0, 0.5)
                        display flex
                        align-items center
                        justify-content center

                        img
                            width 20px
                            height @width
                    img
                        max-height 80px
                        max-width @height

                .add
                    position relative

                    .file-btn
                        position absolute
                        width 80px
                        height @width
                        top 0
                        left 0
                        outline none
                        background-color transparent
                        opacity 0
                    img
                        height 80px
                        width @height
                        border 1px solid #dddddd !important
            .fdsb-smile
                position absolute
                right 12px
                top 35px
                width 35px
                height @width
                img
                    width 35px
                    height @width