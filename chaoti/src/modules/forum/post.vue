<template>
  <div class="post" @click="hideEmotion">
     <mt-field label="标题" placeholder="请输入标题" v-model="titleName"></mt-field>
      <div class="sl-list sex">
        <div class="sll-left">
            <span>性别</span>
        </div>
        <mt-radio class="s-radio"
        v-model="value"
        align="right"
        :options="options">
        </mt-radio>
    </div>
    <mt-field label="内容" placeholder="请填写内容" type="textarea" rows="10" v-model="introduction"></mt-field>
    <div class="p-footer">
        <div class="pf-opr">
            <div class="pf-list">
            <div class="u-img">
                <div class="uploadBtn"><img src="../../assets/images/takePhoto.png" alt="Alternate Text" /></div>
                <input type="file" class="file-btn" accept="image/*" @change="getFile"/>
            </div>
            </div>
            <div class="pf-list" @click="showEmoticon" @click.stop><img src="../../assets/images/smile.png" alt=""></div>
            <div class="pf-list">
                <mt-button type="default">取消</mt-button>
            </div>
            <div class="pf-list">
                <mt-button type="primary">发布</mt-button>
            </div>
        </div>
         <!-- 表情列表 -->
        <div class="emoticon" v-if="isShowEmoticon">
            <div class="e-list" @click.stop @click="selectEmo(item.name)" v-for="(item, index) in emoticon" :key="index">
                <img class="el-img" :src="item.path" alt="">
            </div>
        </div>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import upload from 'components/upload/upload'
import emoticon from 'utils/emoticon'
export default {
  components:{
      upload
  },
  props:{},
  data(){
    return {
        titleName: '',
        introduction: '',
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
        isShowEmoticon: false
    }
  },
  watch:{},
  computed: {
  },
  methods:{
    // 获取文件
    getFile(e) {
        const { files, value } = e.target
        console.log(e)
        this.filesUrlList = []
        this.fileName = files[0].name
        for (var i = 0; i < files.length; i++) {
            this.fileName = files[i].name
            this.filesUrlList.push(value)
            var formData = new FormData()
            formData.append("file", files[i])
            const param = {
                contentType: false,
                cache: false,
                data: formData,
                processData: false
            }
            return
            this.$axios.post(this.$api.upload, param).then((response) => {
                // handle success
                this.fileName = response.fileName
                this.uploadFile = response.uploadFile
                const fileList = {
                    fileName: this.fileName,
                    uploadFile: this.uploadFile
                }
                this.$emit('fileList', fileList)
            }).catch((error) => {
                // handle error
                console.log(error)
            })
        }
        e.target.value = null;
    },
    // 获取文件
    uplad(e) {
        console.log('获取文件内容', e)
    },
    // 选择标签
    selectEmo(name) {
        this.introduction += name
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
    }
  },
  created(){
      this.initEmo()
  },
  mounted(){}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../assets/stylus/variable.styl"

.mint-cell
    border-bottom 1px solid  #dddddd
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
</style>