<template>
  <div class="fd">
      <div class="fd-header">
          <img class="fdh-img" v-if="!forumListDetailInfo.photo" src="../../assets/images/default.png" alt="">
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
                <span @click="inputFocus"><img src="../../assets/images/comment.png" alt="/assets/images/comment.png"></span>
                <span class="fdllb-btns" @click.stop="clickLike(forumListDetailInfo.postsId, 0, 0)">
                    <img v-if="!forumListDetailInfo.isGood" src="../../assets/images/like.png" alt="/assets/images/like.png">
                    <img v-else src="../../assets/images/like-active.png" alt="/assets/images/like-active.png">
                </span>
              </div>
          </div>
          <div class="fdc-text">{{forumListDetailInfo.details}}</div>
          <div class="fdc-tiem">
              <div>共{{forumListDetailInfo.commentCount}}条回复</div>
              <div>{{forumListDetailInfo.createTime}}</div>
          </div>
      </div>

    <!-- 回复列表开始  -->
    <div class="commont-new" >
         <div class="cn-list" v-for="item in postReplyList" :key="item.replyId">
            <div class="cn-user">
                <img v-if = "item.photo" src="../../assets/images/default.png"/>
                <img v-else :src="item.photo"/>
                <div>{{item.name}}</div>
            </div>
            <div class="cn-content">{{item.details}}</div>
            <div class="cn-imgList" v-if="item.uploadFileUrl.length > 0">
                 <swiper class="cn-swiper contetnL" :options="swiperOption">
                    <swiper-slide v-for="(itemlist, index) in item.uploadFileUrl" :key="index">
                        <img :src="itemlist" alt="" @click="clickOneImg(item.uploadFileUrl)"></swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <div class="cn-praise">
                <div class="cnp-time">
                    <div>{{item.createTime}}</div>
                    <div class="cnp-del" @click="delmypostsreply(item.replyId)" v-if="item.isDel">删除</div>
                </div>
                <div class="cnp-reply">
                    <div class="cnp-re" @click="reply(item.replyId, item.replyId, 1)"
                    v-if="item.isDel === false">回复</div>
                    <span class="cnpr-circle"  v-if="item.isDel === false">·</span>
                    <div class="cnpr-like" @click.stop="clickLike(forumListDetailInfo.postsId, item.replyId, 1)">
                        <img v-if="!item.isGood" src="../../assets/images/praise.png">
                        <img v-else src="../../assets/images/praise--active.png">
                        <span class="red" v-if="item.goodCount !== 0">{{item.goodCount}}</span>
                        <span class="red" v-else>赞</span>
                    </div>
                </div>
              
            </div>
              <div class="cn-otherComment" v-if="item.postReplyList.length">
                    <div v-for="relyList in item.postReplyList" :key="relyList.replyId"> 
                        <div class="cno-list">
                            <div class="cno-user">
                                <img v-if = "relyList.photo" src="../../assets/images/default.png"/>
                                <img v-else :src="relyList.photo"/>
                                <div>{{relyList.name}}</div>
                            </div>
                            <div class="cno-content">{{relyList.details}}</div>
                             <div class="cno-imgList" v-if="item.uploadFileUrl.length > 0">
                                <swiper class="cn-swiper" :options="swiperOption">
                                    <swiper-slide v-for="(itemlist, index) in relyList.uploadFileUrl" :key="index">
                                        <img :src="itemlist" alt="" @click="clickOneImg(relyList.uploadFileUrl)"></swiper-slide>
                                    <div class="swiper-pagination" slot="pagination"></div>
                                </swiper>
                            </div>
                            <div class="cno-praise">
                                <div class="cnop-time">
                                    <div>{{relyList.createTime}}</div>
                                    <div class="cnp-del" @click="delmypostsreply(relyList.replyId)" v-if="relyList.isDel">删除</div>
                                </div>
                                <div class="cnop-reply">
                                    <div class="cnop-re" @click="reply(relyList.replyId, relyList.replyId, 2)" v-if="relyList.isDel === false">回复</div>
                                    <span class="cnopr-circle" v-if="relyList.isDel === false">·</span>
                                    <div class="cnopr-like" @click.stop="clickLike(forumListDetailInfo.postsId, relyList.replyId,2)">
                                         <img v-if="!relyList.isGood" src="../../assets/images/praise.png">
                                         <img v-else src="../../assets/images/praise--active.png">
                                        <span class="red" v-if="relyList.goodCount !== 0">{{relyList.goodCount}}</span>
                                        <span class="red" v-else>赞</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    <!-- 回复列表结束 -->

      <preview v-if="showImageList" :imgList="imgList" @showImageList="close"></preview>
     <div class="fd-input" @click="inputFocus">
          <!-- <div class="fdi-img"><img src="../../assets/images/smile.png" alt=""></div> -->
          <input disabled="true" placeholder="写个回复走走心" class="fdi-text"/>
          <!-- <div class="fdi-btn">发送</div> -->
      </div>
      <div class="fd-send" v-if="showSendModal" @click="closeSendModal">
          <div class="fds-box" @click.stop>
              <textarea class="fdsb-area" v-model="sendMsg"></textarea>
              <div class="fdsb-img">
                  <div class="fdsbi-list">
                      <div @click="clickRepImg" class="fdsbil-img" v-for="(item, index) in imgUrl" :key="index">
                           <img :src="item.imgUrl" alt="">
                           <div class="close"  @click.stop="closeImg(item.imgUrl)"><img src="../../assets/images/close.png" alt=""></div>
                      </div>
                      <div class="add">
                          <img src="../../assets/images/addPhoto.png" alt="">
                          <input type="file" multiple="multiple" class="file-btn" accept="img/*" @change="getFile"/>
                      </div>
                  </div>
                  <div class="fdsb-smile"  @click="showEmoticon">
                      <img src="../../assets/images/smile.png" alt="">
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
  components:{
    swiper,
    swiperSlide,
    preview
  },
  props:{},
  data(){
    return {
       forumListDetailInfo: {},
       swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          }
        },
        showImageList: false,
        showSendModal: false,
        sendMsg: "",
        emoticon: [], // 表情列表
        isShowEmoticon: false,
        imgUrl: [], // 图片路径
        imgList: [], // 大图列表
        postReplyList: [], // 回复列表
        replyId: '',
        replyPostsId: '',
        sendType: '' // 0 帖子 1 回复
    }
  },
  watch:{},
  computed:{
  },
  methods:{
      getpostdetial() {
        const url = `${this.$api.getpostdetial}?postId=${this.$route.query.postsId}`
        this.$axios.get(url).then((response) => {
            const { data, success } = response.data
            if (success) {
                data.uploadFileUrl = data.uploadFileUrl.split('|')
                if (!data.postReplyList.length > 0) {
                    for (const rList of data.postReplyList) {
                        rList.uploadFileUrl = rList.uploadFileUrl.split('|')
                        if (rList.postReplyList.length > 0) {
                            for (const rListTwo of rList.postReplyList) {
                                rListTwo.uploadFileUrl = rListTwo.uploadFileUrl.split('|')
                            }
                        }
                    }
                }
                this.forumListDetailInfo = data
                this.postReplyList = data.postReplyList
                console.log('this.postReplyList', this.postReplyList, this.forumListDetailInfo)
            }
        })
      },
      clickLike(postsId, replyId, type) {
        const forumListDetailInfo = this.forumListDetailInfo
        const url = `${this.$api.postspraise}?postsId=${postsId}&replyId=${replyId}&lv=${type}`
        // const param = {
        //    postsId,
        //    replyId,
        //    type
        // }
        this.$axios.post(url).then((response) => {
            const { data, success } = response.data
            if (success) {
                if (type === 0) {
                    forumListDetailInfo.goodCount = forumListDetailInfo.isGood ? forumListDetailInfo.goodCount - 1 : forumListDetailInfo.goodCount + 1
                    forumListDetailInfo.isGood = forumListDetailInfo.isGood ? 0 : 1
                } else if (type === 1) {
                    for (const item of this.postReplyList) {
                        if (item.replyId === replyId) {
                            item.goodCount = item.isGood ? item.goodCount - 1 : item.goodCount + 1
                            item.isGood = item.isGood ? 0 : 1
                        }
                    }
                } else {
                     for (const item of this.postReplyList) {
                        for (const itemList of item.postReplyList) {
                            if (itemList.replyId === replyId) {
                                itemList.goodCount = itemList.isGood ? itemList.goodCount - 1 : itemList.goodCount + 1
                                itemList.isGood = itemList.isGood ? 0 : 1
                            }
                        }
                    }
                }
            }
        })
     },
     // 全图
    clickImg() {
      this.showImageList = true
      this.imgList = this.forumListDetailInfo.uploadFileUrl
    },
    // 关闭
    close(e) {
      this.showImageList = e
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
      this.showSendModal = true
      this.sendType = 0
    },
    closeSendModal() {
      this.showSendModal = false
      this.resetReply();
    },
    // 发送回复-评论帖子
    sendData() {
      const imgUrl = this.imgUrl.map(v => v.imgUrl).join("|")
      let param
      if (this.sendType === 0) {
        param = {
            postsId: this.$route.query.postsId,
            replyPostsId: "",
            detail: this.sendMsg,
            imgUrl,
            lv: 0
        }
      } else if (this.sendType === 1) {
        param = {
            postsId: this.$route.query.postsId,
            replyPostsId: this.replyPostsId,
            detail: this.sendMsg,
            imgUrl,
            lv: 1
        }
      } else if (this.sendType === 2) {
        param = {
            postsId: this.$route.query.postsId,
            replyPostsId: this.replyPostsId,
            detail: this.sendMsg,
            imgUrl,
            lv: 2
        }
      }
      this.$axios.post(this.$api.replyposts, param).then(response => {
            const { data, success, message } = response.data
            if (success) {
                this.$toast(message)
                this.resetReply()
                this.getpostdetial()
            }
      })
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
      this.showImageList = true;
      this.imgList = this.imgUrl.map(v => v.imgUrl);
    },
    // 回复他人 第一层
    reply(replyId, replyPostsId, type) {
        this.showSendModal = true
        this.replyId = replyId
        this.replyPostsId = replyPostsId
        if (type === 1) {
            this.sendType = 1
        } else if (type === 2){
             this.sendType = 2
        }
    },
    clickOneImg(imgList) {
        this.showImageList = true
        this.imgList = imgList
    },
    // 删除评论
    delmypostsreply(replyId) {
        const url = `${this.$api.delmypostsreply}?replyId=${replyId}`
        this.$axios.post(url).then(response => {
            const { data, success, message } = response.data
            if (success) {
                this.$toast(message)
                this.getpostdetial()
            }
        })
    }
  },
  created(){
    // 获取帖子详情
    this.getpostdetial()
     // 初始化表情列表
    this.initEmo()
  },
  mounted(){}
}
</script>
<style lang="stylus" scoped>
@import "../../assets/stylus/variable.styl"
.fd
    height 100%
    background #ffffff
    padding-bottom 50px
    box-sizing border-box
    .fd-header
        height 40px
        display flex
        align-items center
        padding 12px
        img 
            width 40px 
            height @height 
            border-radius 100%
            margin-right 10px
        .fdh-isDel
            position absolute
            right 12px
            background red
            color #ffffff
            padding 4px 10px
            border-radius 20px
            font-size 12px
    .fd-banner
        height 200px
        overflow hidden
        .swiper-slide
            display flex
            justify-content center
            align-items center
        img 
           width 100%
           position absolute
    .cn-imgList
        padding-right 12px
    .fd-content
        padding 0 12px
        border-bottom 1px solid #ddd
      .fd-opr
          display flex
          justify-content space-between
          height 30px
          align-items center
          .fdo-left
              color #333333
          .fdo-right
              display flex
              img 
                height 20px
                width 20px
                margin-left 20px
        .fdc-tiem
            display flex
            justify-content space-between
            padding 10px 0
        .fdc-text
            color #333333
            line-height 20px

.fd-input
    position fixed
    bottom 0
    width 100%
    background #f6f6f6
    height 42px
    display flex
    align-items center
    padding 0 12px
    box-sizing border-box
    z-index 4
    .fdi-img
        width 52px
        display flex
        align-items center
        justify-content center
        img 
            height 28px
            width @height
    .fdi-text
        height 30px
        width 100%
        border 0
        background #ffffff
        border-radius 6px
        padding 0 10px
        box-sizing border-box
    .fdi-btn
        color #377cdb
        width:81px
        display flex
        justify-content center
        align-items center
.fd-send
    position fixed
    top 0
    height 100%
    width 100%
    background rgba(0, 0, 0, 0.4)
    z-index 5

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
     .fdsb-bottom
        height 50px
        display flex
        justify-content flex-end
        padding 0 12px
        align-items center
        border-top 1px solid #dddddd

    .fdsbb-btn
        padding 6px 12px
        border-radius 20px
        background #ed4b4b
        border 0
        line-height 1
        color #ffffff
        margin-left 10px

        &first-child
            background #eeeeee
.fd-p
    height: 400px

$userBigPhoto = 40px
$pageL = 12px
$color999 = #999999
$contentL = 62px
$commentBg = #F5F8FF
$userSmallPhoto = 30px
.commont-new
    background #ffffff
    margin-top 20px
    padding-bottom 70px
    .cn-list
        padding 12px 0
        padding-bottom 25px
        border-bottom 1px solid #ddd
        .cn-user
            display flex
            align-items center
            height $userBigPhoto 
            padding 0 12px
            img
                height $userBigPhoto
                width @height 
                border-radius @height 
                margin-right $pageL
            text
                font-size 16px
                color $color999
        .cn-content
            font-size: 14px
            color: #333333
            padding-left: $contentL
            padding-right: 12px
            line-height: 20px
            word-break: break-all
            word-wrap: break-word
            white-space: pre-wrap
        .cn-praise
            display: flex
            justify-content space-between
            padding-left: $contentL
            width: 100%
            box-sizing: border-box
            padding: 0 12px 0 $contentL
            align-content: center
            box-sizing: border-box
            .cnp-reply
                position relative
                display: flex
                height 27px
                align-items: center
                .cnp-re
                    font-size: 12px
                    color: $color999
                    padding: 0 10px
                .cnpr-circle
                    font-size: 12px
                    top: 14px
                    color: $color999
                    align-items: center
                .cnpr-like
                    padding: 0
                    margin: 0
                    font-size: 12px
                    color: $color999
                    display: flex
                    align-items: center
                    text-align: right 
                    padding:0 0 0 10px
                    img
                        width: 13px
                        height 13px
                        margin-right: 4px
            .cnp-time
                display flex
                font-size: 12px
                color: $color999
                line-height: 27px
                .cnp-del
                    color blue
                    padding-left 10px
          .cn-otherComment
            margin: 0 0 0 $contentL
            font-size: 12px
            background-color: $commentBg
            padding 12px 0 12px 12px
            .cno-list
                padding-bottom: 12px
                padding-right 12px
                &:last-child
                    padding-bottom: 8px
            .cno-user
                display flex
                height $userSmallPhoto
                align-items center
                .bnou-photo
                    display: inline-block
                .cnou-list
                    height @height
                    display: flex
                    align-items: center
                img
                    height $userSmallPhoto
                    width: @height 
                    border-radius: @height 
                    margin-right: 12px
                text
                    font-size: 13px
                    color: $color999
                    line-height: $userSmallPhoto
            .cno-content
                // margin-left: 72px
                padding-top: 10px
                font-size: 13px
                line-height: 20px
                color: #333333
            .cno-praise
                display flex
                justify-content space-between
                .cnop-time
                    display flex
                    align-items center
                    .cnp-del
                        color blue
                        padding-left 10px

                .cnop-reply
                    position relative
                    display: flex
                    height 27px
                    align-items: center
                    .cnop-re
                        font-size: 12px
                        color: $color999
                        padding: 0 10px
                    .cnopr-circle
                        font-size: 12px
                        top: 14px
                        color: $color999
                        align-items: center
                    .cnopr-like
                        padding: 0
                        margin: 0
                        font-size: 12px
                        color: $color999
                        display: flex
                        align-items: center
                        text-align: right 
                        padding:0 0 0 10px
                        img
                            width: 13px
                            height 13px
                            margin-right: 4px
       
.cn-swiper
    height 150px
    overflow hidden
    margin 5px 0 5px 0
    .swiper-slide
        display flex
        justify-content center
        align-items center
        width 100%
    img 
        max-width 100%
        position absolute 
.contetnL
    padding-left $contentL
</style>