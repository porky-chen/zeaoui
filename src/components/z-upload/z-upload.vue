<!--
 - All rights reserved.
 - @author Zeao
 - Description: z-upload 上传组件
 - Changelog:
 - Revision 1.0 2021-12-03  Zeao
 - - 初始化
 -->
<template>
  <el-upload action=""
             :drag="isDrag"
             :http-request="uploadImg"
             :before-remove="handleBeforeRemove"
             :before-upload="handleBeforeUpload"
             :on-remove="handleRemove"
             :show-file-list="showFileList"
             multiple
             :limit="limit"
             :disabled="disabled"
             :accept="getAccepts()"
             :on-exceed="handleExceed"
             :file-list="fileList">
    <div v-if="isDrag">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </div>

    <z-upload-button :disabled="disabled" :text="text" v-else></z-upload-button>
    <div slot="tip"
         class="tip">{{tip}}
    </div>
  </el-upload>
</template>

<script>
import ZUploadButton from "./z-upload-button";
import _ from 'lodash'
import Compressor from 'compressorjs'
import common from '@/utils/common.js'

export default {
  name: "z-upload",
  components: { ZUploadButton },
  props:{
    // 文件上传地址
    fileUrl: {
      type: String,
      default: ''
    },
    // 是否展示文件列表
    showFileList: {
      type: Boolean,
      default: true
    },
    // 是否启用拖拽上传
    isDrag: {
      type: Boolean,
      default: false
    },
    // 上传路径
    action: {
      type: String,
      default: ''
    },
    // 重写上传方法
    httpRequest: {
      type: Function,
    },
    // 是否支持多选文件
    multiple: {
      type: Boolean,
      default: false
    },
    // 最大允许上传个数
    limit: {
      type: Number,
      default: 1
    },
    // 提示语
    tip: {
      type: String,
      default: ''
    },
    // 接受上传的文件类型
    accept: {
      type: Array,
      default: function () {
        return ['image', 'video', 'pdf', 'cad']
      }
    },
    // 图片大小限制
    imageSizeLimit: {
      type: Number,
      default: 50
    },
    // pdf大小限制
    pdfSizeLimit: {
      type: Number,
      default: 200
    },
    // 视频大小限制
    videoSizeLimit: {
      type: Number,
      default: 200
    },
    // CAD大小限制
    cadSizeLimit: {
      type: Number,
      default: 500
    },
    // 文件名长度限制
    fileNameLengthLimit: {
      type: Number,
      default: 100
    },
    // 文件
    files: {
      type: Array,
      default () {
        return []
      }
    },
    // 按钮名
    text: {
      type: String,
      default () {
        return '上传文件'
      }
    },
    // 文件索引
    index: {
      type: Number,
      default: 0
    },
    // 是否限制
    isLimit: {
      type: Boolean,
      default: false
    },
  },
  data(){
    return {
      disabled: false,
      orginFiles: {},
      fileList: [],
      invalidFileNameCharacters: [
        '/', '$', '@', '%', '#', '!',
        '`', '^', '&', '*', ',', '?',
        ';', ':', '\'', '"', '|', '+',
        '\\', ' ', '\t', '\n', '\r'
      ],
      loading: null,
      fileTotals:[],
      responseCount: 0,
    }
  },
  mounted () {
    this.setFileList(this.files)
    this.orginFiles = this.files
  },
  watch: {
    files (files) {
      this.setFileList(files)
    },
    fileList () {
      this.$emit('urlChange', this.getFileUrl(), this.index)
    },
    fileTotals:{
      deep: true,
      immediate: true,
      handler(val){
        this.responseCount = val.length || 0
      }
    },
  },
  methods: {
    clear () {
      this.fileList = []
    },
    remove (index) {
      this.fileList.splice(index, 1)
    },
    getAccepts () {
      if (_.isEmpty(this.accept)) {
        return '*'
      }

      const accepts = []
      for (const item of this.accept) {
        switch (item) {
          case 'image':
            accepts.push('image/png')
            accepts.push('image/jpeg')
            accepts.push('.pmt')
            break
          case 'video':
            accepts.push('video/mp4')
            accepts.push('.mov')
            break
          case 'pdf':
            accepts.push('application/pdf')
            break
          case 'cad':
            accepts.push('.dwg')
            accepts.push('.dxf')
            accepts.push('.dwf')
            accepts.push('.dws')
            break
          case 'zip':
            accepts.push('application/x-zip-compressed')
            accepts.push('.zip')
            break
          case 'rar':
            accepts.push('application/octet-stream')
            accepts.push('.rar')
            break
          default:
            break
        }
      }

      if (_.isEmpty(accepts)) {
        return '*'
      }

      return accepts.join(',')
    },
    isValidFileName: function (fileName) {
      if (_.isEmpty(fileName)) {
        return false
      }

      for (const character of this.invalidFileNameCharacters) {
        if (fileName.includes(character)) {
          return false
        }
      }

      return true
    },
    setFileList (files) {
      this.fileList = []
      const fileList = _.isEmpty(files) ? [] : files
      for (const file of fileList) {
        if (_.isEmpty(file)) {
          continue
        }

        this.fileList.push({
          id: file.fileId,
          name: file.fileName,
          url: file.fileUrl
        })
      }
    },
    setFileShowList (files) {
      this.fileList = []
      for (const file of files) {
        var tempFile = {}
        tempFile.id = file.fileId
        tempFile.name = file.fileName
        tempFile.status = 'success'
        tempFile.uid = file.fileId
        tempFile.url = []
        tempFile.url.push(file)
        this.fileList.push(tempFile)
      }
    },
    handleRemove (file) {
      this.fileList = this.fileList.filter(f => f.uid !== file.uid)
    },
    handleExceed () {
      this.$alert('超出文件数量限制')
    },
    handleBeforeRemove (file) {
      // 仅限于过程资料
      if (!this.isLimit) return true
      const splitList = this.orginFiles.split('@')
      let canDelete = false
      splitList.forEach(item => {
        if (file.url === item) {
          this.$alert('已上传的文件不能删除')
          canDelete = true
          return false
        }
      })
      if (canDelete) return false
    },
    handleBeforeUpload (file) {
      if (file.name.length > this.fileNameLengthLimit) {
        this.$alert('文件名长度不能超过' + this.fileNameLengthLimit + '个字符')
        return false
      }

      const current = this.fileList.filter(t => t.name === file.name)
      if (!_.isEmpty(current)) {
        this.$alert('已上传相同的文件')
        return false
      }

      const isImage = file.type.endsWith('png') || file.type.endsWith('jpg') ||
        file.type.endsWith('jpeg') || /.pmt$/i.test(file.name)
      const isCad = /.(dwg|dxf|dwf|dws)$/i.test(file.name)
      const isPdf = file.type.endsWith('pdf')
      const isVideo = file.type.endsWith('mp4') || /.mov$/i.test(file.name)
      const isZip = /.(zip)$/i.test(file.name)
      const isRar = /.(rar)$/i.test(file.name)

      let fileType = 'other'
      if (isImage) {
        fileType = 'image'
      } else if (isVideo) {
        fileType = 'video'
      } else if (isPdf) {
        fileType = 'pdf'
      } else if (isCad) {
        fileType = 'cad'
      } else if (isZip) {
        fileType = 'zip'
      } else if (isRar) {
        fileType = 'rar'
      }

      if (!_.isEmpty(this.accept) && !this.accept.includes('*')) {
        const supportedTypes = []
        for (const item of this.accept) {
          switch (item) {
            case 'image':
              supportedTypes.push('PNG')
              supportedTypes.push('JPEG')
              supportedTypes.push('PMT')
              break
            case 'video':
              supportedTypes.push('MP4')
              supportedTypes.push('MOV')
              break
            case 'pdf':
              supportedTypes.push('PDF')
              break
            case 'cad':
              supportedTypes.push('DWG')
              supportedTypes.push('DXF')
              supportedTypes.push('DWF')
              supportedTypes.push('DWS')
              break
            case 'zip':
              supportedTypes.push('ZIP')
              break
            case 'rar':
              supportedTypes.push('RAR')
              break
            default:
              break
          }
        }
        if (!this.accept.includes(fileType)) {
          const types = supportedTypes.join('/')
          this.$alert('仅支持' + types + '格式文件')
          return false
        }
      }

      const sizeM = file.size / 1024 / 1024
      if (isImage && sizeM > this.imageSizeLimit) {
        this.$alert('图片大小不能超过' + this.imageSizeLimit + 'MB')
        return false
      } else if (isPdf && sizeM > this.pdfSizeLimit) {
        this.$alert('PDF文件大小不能超过' + this.pdfSizeLimit + 'MB')
        return false
      } else if (isVideo && sizeM > this.videoSizeLimit) {
        this.$alert('视频大小不能超过' + this.videoSizeLimit + 'MB')
        return false
      } else if (isCad && sizeM > this.cadSizeLimit) {
        this.$alert('CAD文件大小不能超过' + this.cadSizeLimit + 'MB')
        return false
      } else if (isZip && sizeM > this.cadSizeLimit) {
        this.$alert('ZIP文件大小不能超过' + this.cadSizeLimit + 'MB')
        return false
      } else if (isRar && sizeM > this.cadSizeLimit) {
        this.$alert('RAR文件大小不能超过' + this.cadSizeLimit + 'MB')
        return false
      }
      this.fileTotals.push(file)
      return true
    },
    /**
     * 获取上传的文件地址，多个文件地址以@分隔，拼接而成的字符串用于数据上传接口
     * @returns {string} 上传的文件地址
     */
    getFileUrl () {
      let fileUrl = ''
      for (const file of this.fileList) {
        if (typeof file.url === 'string') {
          fileUrl += file.id + ','
        } else {
          fileUrl += file.url[0].fileId + ','
        }
      }

      if (fileUrl.endsWith(',')) {
        fileUrl = fileUrl.slice(0, -1)
      }

      return fileUrl
    },
    uploadImg (f) {
      this.disabled = true
      const _self = this
      let {file} = f

      // 上传在500ms内时不显示动画
      setTimeout(() => {
        if (_self.disabled) {
          _self.loading = common.getLoading({
            text: '上传文件'
          })
        }
      }, 500)

      // IE和EDGE直接不压缩
      console.log(common)
      if (common.getIEVersion() !== -1) {
        _self.httpUpload(_self, file, f)
        return
      }

      if (file.type.indexOf('image') !== -1) {
        const imgCompress = new Compressor(file, {
          quality: 0.8,
          maxHeight: 2000,
          maxWidth: 2000,
          success (result) {
            if (common.getIEVersion() === -1) {
              const file = new File([result], result.name)
              _self.httpUpload(_self, file, f)
            }
          },
          error (err) {
            console.log(err, imgCompress)
            // 压缩失败上传原来的图片
            _self.httpUpload(_self, file, f)
          },
        })
      } else {
        // 这里上传除了图片之外的其他文件
        _self.httpUpload(_self, file, f)
      }
    },
    httpUpload (_self, file, f) {
      console.log(file)
      _self.$ajax({
          url: _self.fileUrl,
          data: {
            files: file
          },
          timeout: 3600000,
          ontimeout: function () {
            _self.alert('文件上传超时，请减小文件大小或者稍后再试！', {
              type: 'error'
            }).catch()
          }
        })
        .then(res => {
          // 实现当所有加载完成后才关闭loading动画
          if(res){
            this.responseCount = this.responseCount - 1
            if(this.responseCount === 0){
              console.log('都加载完成了!')
              _self.disabled = false
              if (_self.loading) {
                _self.loading.close()
              }
              this.responseCount = 0
              this.fileTotals = []
            }
          }
          _self.fileList.push({
            id: file.lastModified,
            name: file.name,
            url: res.data
          })
          this.$emit('on-upload-success', res.data)
        }).catch(() => {
        f.onError('上传失败')
        this.responseCount = this.responseCount - 1
        if(this.responseCount === 0){
          _self.disabled = false
          if (_self.loading) {
            _self.loading.close()
          }
          this.responseCount = 0
          this.fileTotals = []
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.tip
  font-size: 0.8rem

::v-deep .el-upload
  .el-upload-dragger
    padding: 0 10px
    width: 100%
    height: 96px
    > div
      display: flex
      flex-direction: column
    .el-icon-upload
      font-size: 55px
      color: rgba(0,0,0,0.3)
      margin: 0
      padding-top: 12px
      line-height: 40px
</style>
<style lang="scss" scoped>
::v-deep .el-upload {
  width: 100%;
}
.el-form-item__content{
  >div{
    width: 100%!important;
  }
}
</style>
