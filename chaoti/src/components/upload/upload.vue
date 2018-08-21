<template>
   <div class="upload">
        <div class="u-title">
            <div class="ut-title">任务书:</div>
            <div class="ut-content">{{fileName}}</div>
        </div>
        <div class="u-Imglist" v-if="isShowImg">
           <img v-for="(item, index) in filesUrlList" :key="index" :src="item" alt="">
        </div>
        <div class="u-img" v-if="isHaveUpload">
            <div class="uploadBtn"><img src="../../assets/images/upload.png" alt="Alternate Text" /></div>
            <input type="file" class="file-btn" accept="image/*" @change="getFile"/>
        </div>
       <mt-button type="primary" size="large">领取任务</mt-button>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  components:{},
  props:{
      isShowImg: true,
      isHaveUpload: false
  },
  data(){
    return {
        fileName: null,
        uploadFile: null,
        filesUrlList: []
    }
  },
  watch:{
  },
  computed:{
     test() {
         console.log('this', this.isHaveUpload)
     }
  },
  methods:{
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
      }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../assets/stylus/variable.styl"
.upload
    background #ffffff
    padding 20px $pagePadding
    margin-top 10px
.u-img 
    padding 10px 0
    .file-btn 
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
        outline: none
        background-color: transparent
        opacity: 0
    img
        height: 50px
        width: 50px
.u-title
    .ut-title
        font-size $fs18
        font-weight bolder
    .ut-content
        font-size $fs16
        padding 10px 0
        no-wrap()
</style>