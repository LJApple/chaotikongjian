<template>
  <div class="post" @click="hideEmotion">
      <div class="p-type" @click="actionSheet">
          <div class="pt-title">系统类别</div>
          <div class="pt-text">
              <span v-if="!titleName">选择相应类型</span>
              <span v-else>{{titleName}}</span>
          </div>
      </div>
      <!-- <div class="sl-list sex">
        <div class="sll-left">
            <span>性别</span>
        </div>
        <mt-radio class="s-radio"
        v-model="value"
        align="right"
        :options="options">
        </mt-radio>
    </div> -->
    <!-- <mt-field class="content" label="内容" placeholder="请填写内容" type="textarea" rows="10" v-model="conetent"></mt-field> -->
    <div class="p-content">
         <div class="pt-title">内容</div>
         <textarea class="pt-textarea" v-model="detail"></textarea>
    </div>
    <div class="p-image" v-if="fileList.length">
        <div class="pi-list" v-for="(item, index) in fileList" :key="index">
              <img :src="item.uploadFile" alt="">
              <div class="close" @click="close(item.uploadFile)">X</div>
        </div>
    </div>
    <div class="p-footer">
        <div class="pf-opr">
            <div class="pf-list">
            <div class="u-img">
                <div class="uploadBtn"><img src="../../assets/images/takePhoto.png" alt="Alternate Text" /></div>
                <input type="file" multiple="multiple" class="file-btn" accept="image/*" @change="getFile"/>
            </div>
            </div>
            <div class="pf-list" @click="showEmoticon" @click.stop><img src="../../assets/images/smile.png" alt=""></div>
            <div class="pf-list">
                <mt-button type="default">取消</mt-button>
            </div>
            <div class="pf-list" @click="submit">
                <mt-button type="primary">发布</mt-button>
            </div>
        </div>
         <!-- 表情列表 -->
        <div class="emoticon" v-if="isShowEmoticon">
            <div class="e-list" @click.stop @click="selectEmo(item.name)" v-for="(item, index) in emoticon" :key="index">
                <img class="el-img" :src="item.path" alt="">
            </div>
        </div>
        <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible">
        </mt-actionsheet>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import emoticon from 'utils/emoticon'
import common from '../../utils/common'
import { MessageBox, Indicator, Actionsheet } from "mint-ui"
import { Toast } from 'vant'

import qs from 'qs'
export default {
  components:{},
  props:{},
  data(){
    return {
        titleName: '',
        detail: '',
        value: '1',
        isHaveUpload: false,
        options: [
            {
                label: '所有人可看',
                value: '1'
            },
            {
                label: '仅管理员可看',
                value: '2'
            }
        ],
        sheetVisible:false,
        emoticon:[], // 表情列表
        isShowEmoticon: false,
        tabletype: null,
        fileList: [],
        actions: [{
            name: '系统反馈',
            id: 1,
            method : this.gettype	// 调用methods中的函数
        }, {
            name: '产品反馈', 
            id: 2,
            method : this.gettype	// 调用methods中的函数
        }],
        // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
        sheetVisible: false,
        ptypeId: null // 帖子类型
    }
  },
  watch:{},
  computed: {
  },
  methods:{
    // 选择类型
    actionSheet() {
        this.sheetVisible = true
    },
    gettype(e) {
        const {id, name} = e
        this.titleName = name
        this.ptypeId = id
        console.log('gettype', id, name)
    },
    // 获取文件
    getFile(e) {
        const { files, value } = e.target
        this.filesUrlList = []
        if (files.length >= 5) return MessageBox.alert('最多上传五张图片')
        for (var i = 0; i < files.length; i++) {
            this.filesUrlList.push(value)
            const name =  files[i].name
            let param = new FormData()
            param.append("file", files[i])
            let option = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: param,
                processData: false,
                url: this.$api.upload
            }
            Toast.loading({ mask: true })
            this.$axios(option).then((res) => {
                const { data, success, message } = res.data
                if (success) {
                    this.fileList.push({ fileName: name, uploadFile: data})
                    Toast.clear()
                } else {
                    // this.$toast('头像上传失败')
                }
            }).catch((error) => {
                // handle error
                console.log(error)
            })
        }
        e.target.value = null
    },
    // 选择标签
    selectEmo(name) {
        this.detail += name
        console.log('name', name)
    },
    // 初始化表情
    initEmo() {
        this.emoticon = emoticon
    },
    // 显示表情
    showEmoticon() {
        this.isShowEmoticon = !this.isShowEmoticon
    },
    hideEmotion() {
        this.isShowEmoticon = false
    },
    // 获取帖子类型
    getPostsType() {
        // param = common.splicingJson(param)
        const url = this.$api.getPostsType + '?typeId=' + this.$route.query.from
        this.$axios.get(url).then((response) => {
            const { data, success } = response.data
            if (success) {
                for (const item of data) {
                    Object.assign(item,{ method : this.gettype})
                }
                console.log('gettype', data)
                this.actions = data
            }
        })
    },
    // 删除照片
    close(uploadFile) {
        for (const [index, item] of this.fileList.entries()) {
            if (item.uploadFile === uploadFile) {
                this.fileList.splice(index, 1)
            }
        }
    },
    // 发布帖子
    submit() {
        // sectionId (integer, optional): 版块Id ,
        // ptypeId (integer, optional): 帖子类型 ,
        // detail (string, optional): 帖子详情 ,
        // imgPath (string, optional): 图片
        Toast.loading({ mask: true })
        console.log('this.fileList', this.fileList)
        if (!this.ptypeId)  return MessageBox.alert('请选择系统类别')
        if (!this.detail)  return MessageBox.alert('请填写内容')
        let imgPath = ''
        for (const [index, item] of this.fileList.entries()) {
            if (index === this.fileList.length - 1) {
                 imgPath += item.uploadFile 
            } else {
                imgPath += item.uploadFile + '|'
            }
           
        }
        let param = {
            sectionId: this.$route.query.from,
            ptypeId: this.ptypeId,
            detail: this.detail,
            imgPath
        }
        // param = common.splicingJson(param)
        // const url = this.$api.posting + param
        this.$axios.post(this.$api.posting, param).then((response) => {
            const { data, success } = response.data
            Toast.clear()
            if (success) {
                MessageBox.alert('发布成功').then(action => {
                   this.$router.go(-1)
                })
            }
        })
    }
  },
  created(){
    this.initEmo()
    // 获取帖子类型
    this.getPostsType()
  },
  mounted(){}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../assets/stylus/variable.styl"

.mint-cell
    border-bottom 1px solid  #dddddd
.content
    font-size 14px
/deep/ .mint-cell-text
    padding-left 12px
  .sex
        display flex
        // justify-content space-between
        background #ffffff
        font-size 16px
        /deep/ .mint-cell-wrapper
            background-image none !important
            background #ffffff
            padding 0
        .sll-left
            height 48px
            width 50px
            display flex
            align-items center
            justify-content left 
            padding-left 10px
            box-sizing border-box
            img 
                height 20px
                width @height
                margin-right 10px

/deep/ .mint-cell-wrapper
    padding 0
/deep/ .mint-field .mint-cell-title
    width 81px
/deep/ .mint-radio-label
    padding-right 6px
.s-radio
    display flex

// 底部栏
.p-footer
    position fixed
    background #ffffff
    bottom 0
    width 100%
    z-index 2
    .pf-opr
        width 100%
        height 70px
        display flex
        align-items center
        border-bottom 1px solid #dddddd
        .pf-list
            width 25%
            display flex
            border-right 1px solid $bg-color 
            justify-content center
            height 50%
            &:last-child
                border 0
        img 
            height 30px
            width 30px
.u-img 
    .file-btn 
        position: absolute
        width: 25%
        height: 70px
        top: 0
        left: 0
        outline: none
        background-color: transparent
        opacity: 0
    img
        height: 30px
        width: 30px
// 上传图片
.p-image
    background #ffffff
    display flex
    flex-wrap wrap
    padding 0 12px
    .pi-list
        height 100px
        width @height
        overflow hidden
        margin  12px 12px 12px 0
        position relative
        img 
            width 100px
            height auto
        .close
            position absolute
            height 30px
            width @height 
            text-align center
            line-height @height 
            font-size 20px
            background #999999
            z-index 1
            right 0
            top 0
            color #ffffff
/deep/ .mint-field-core, /deep/ .mint-cell-text
    font-size 14px
// 系统类型
.p-type
    display flex
    height 46px
    line-height 46px
    background #ffffff
    .pt-title
        width 85px
        padding-left 12px
        box-sizing border-box
.p-content
    display flex
    height 300px
    line-height @height
    background #ffffff
    font-size 14px
    border-top 1px solid #dddddd
    .pt-title
        width 85px
        padding 12px 0 12px 12px
        box-sizing border-box
        line-height 1
    .pt-textarea
        border none 
        width 100%
        height 300px
        padding 12px 0
        box-sizing border-box
</style>