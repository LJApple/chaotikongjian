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
    </div>
</template>

<script type="text/ecmascript-6">
import common from '../../utils/common'
import qs from 'qs'
export default {
  components:{},
  props:{
      isShowImg: true,
      isHaveUpload: true,
      fileName: null
  },
  data(){
    return {
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
        console.log('files', files)
        this.filesUrlList = []
        this.fileName = files[0].name
        for (var i = 0; i < files.length; i++) {
            this.fileName = files[i].name
            this.filesUrlList.push(value)
            let param = new FormData()
            param.append("file", files[i])
            console.log('param', files[i])
            let option = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: param,
                processData: false,
                url: this.$api.upload
            }
            this.$axios(option).then((response) => {
                // handle success
                this.uploadFile = response.data.data
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