<template>
  <div class="fd">
      <div class="fd-header">
          <img class="fdh-img" :src="forumListDetailInfo.photo" alt="">
          <div class="fdh-name">{{forumListDetailInfo.name}}</div>
          <div v-if="forumListDetailInfo.isDel" class="fdh-isDel">删除</div>
      </div>
       <swiper class="fd-banner" :options="swiperOption">
        <swiper-slide v-for="(item, index) in forumListDetailInfo.uploadFileUrl" :key="index">
            <img :src="item" alt="" @click="clickImg"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="fd-content">
          <div class="fd-opr">
              <div class="fdo-left">{{forumListDetailInfo.goodCount}}次点赞</div>
              <div class="fdo-right">
                <span><img src="../../assets/imgs/comment.png" alt="/assets/imgs/comment.png"></span>
                <span class="fdllb-btns" @click.stop="clickLike(forumListDetailInfo.postsId)">
                    <img v-if="!forumListDetailInfo.good" src="../../assets/imgs/like.png" alt="/assets/imgs/like.png">
                    <img v-else src="../../assets/imgs/like-active.png" alt="/assets/imgs/like-active.png">
                </span>
              </div>
          </div>
          <div class="fdc-text">{{forumListDetailInfo.details}}</div>
          <div class="fdc-tiem">
              <div>共{{forumListDetailInfo.commentCount}}条回复</div>
              <div>{{forumListDetailInfo.createTime}}</div>
          </div>
      </div>
      <preview v-if="showimgList" :imgList="imgList" @showimgList="close"></preview>
      <div class="fd-input">
          <!-- <div class="fdi-img"><img src="../../assets/imgs/smile.png" alt=""></div> -->
          <input @focus="inputFocus" placeholder="写个回复走走心" class="fdi-text"/>
          <!-- <div class="fdi-btn">发送</div> -->
      </div>
      <div class="fd-send" v-if="showSendModal" @click="closeSendModal">
          <div class="fds-box" @click.stop>
              <textarea class="fdsb-area" v-model="sendMsg"></textarea>
              <div class="fdsb-img">
                  <div class="fdsbi-list">
                      <div @click="clickRepImg" class="fdsbil-img" v-for="(item, index) in imgUrl" :key="index">
                           <img :src="item.imgUrl" alt="">
                           <div class="close"  @click.stop="closeImg(item.imgUrl)"><img src="../../assets/imgs/close.png" alt=""></div>
                      </div>
                      <div class="add">
                          <img src="../../assets/imgs/addPhoto.png" alt="">
                          <input type="file" multiple="multiple" class="file-btn" accept="img/*" @change="getFile"/>
                      </div>
                  </div>
                  <div class="fdsb-smile"  @click="showEmoticon">
                      <img src="../../assets/imgs/smile.png" alt="">
                  </div>
              </div>
              <div class="fdsb-bottom">
                  <button class="fdsbb-btn" @click="closeSendModal">取消</button>
                  <button class="fdsbb-btn" @click="sendData">发送</button>
              </div>
          </div>
        <!-- 表情列表 -->
        <div class="emoticon fd-p" v-if="isShowEmoticon">
            <div class="e-list" @click.stop @click="selectEmo(item.name)" v-for="(item, index) in emoticon" :key="index">
                <img class="el-img" :src="item.path" alt="">
            </div>
        </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import emoticon from "utils/emoticon"
import { swiper, swiperSlide } from "vue-awesome-swiper"
import preview from "components/preview/preview"
import { MessageBox, Indicator } from "mint-ui"
export default {
  components: {
    swiper,
    swiperSlide,
    preview
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