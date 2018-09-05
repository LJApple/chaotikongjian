<template>
  <div class="post" @click="hideEmotion">
      <div class="p-type">
          <div class="pt-title">系统类别</div>
          <div class="pt-text" @click="actionSheet">
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
         <textarea class="pt-textarea" v-model="conetent"></textarea>
    </div>
    <div class="p-image" v-if="fileList.length">
        <div class="pi-list" v-for="(item, index) in fileList" :key="index">
              <img :src="item.uploadFile" alt="">
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
import { Actionsheet } from 'mint-ui'
export default {
  components:{},
  props:{},
  data(){
    return {
        titleName: '',
        conetent: '',
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
        sheetVisible: false
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
        console.log('gettype', id, name)
    },
    // 获取文件
    getFile(e) {
        const { files, value } = e.target
        this.filesUrlList = []
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
            this.$axios(option).then((res) => {
                const { data, success, message } = res.data
                if (success) {
                    this.fileList.push({ fileName: name, uploadFile: data})
                    console.log('this.fileList',  this.fileList)
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
        this.content += name
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
    gettabletype() {
        this.$axios.get(this.$api.gettabletype).then((response) => {
            const { data, success } = response.data
            if (success) {
                this.tabletype = data
            }
        })
    },
    // 发布帖子
    submit() {
        const param = {
            titleName: this.titleName,
            introduction: this.introduction,
            conetent: this.conetent
        }
    }
  },
  created(){
      this.initEmo()
      // 获取帖子类型
    //   this.gettabletype()
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
// 表情
.emoticon
    width 100%
    height 330px
    display flex
    flex-wrap wrap
    padding 0 12px
    box-sizing border-box
    .e-list
        width 35px
        height 30px 
        display flex
        align-items center
        justify-content center
        .el-img 
            width 25px
            height @width 
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
        padding 12px 12px 12px 0
        img 
            width 100px
            height auto
/deep/ .mint-field-core, /deep/ .mint-cell-text
    font-size 14px
// 系统类型
.p-type
    display flex
    height 46px
    line-height 46px
    background #ffffff
    font-size 14px
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
        padding-left 12px
        box-sizing border-box
    .pt-textarea
        border none 
        width 100%
        height 300px
        padding 12px 0
        box-sizing border-box
</style>