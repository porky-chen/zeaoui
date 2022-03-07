<!--
 - @author Zeao
 - Description: 预览
 - Changelog:
 - Revision 1.0 2022-01-10 Zeao
 - - 初始化
 -->
<template>
  <el-carousel class='su-viewer'
               :interval='interval'
               :type='type'
               :height='height'
               :autoplay='false'
               :arrow="items.length > 1 ? 'always' : 'never'">
    <el-carousel-item v-for='(v, index) in items'
                      :key='v.url + index'>
      <el-card>
        <div class='su-viewer-header'
             v-if='v.header'>{{ v.header }}
        </div>
        <div class='su-viewer-url-wrapper'>
          <div v-if='/.(png|jpg|jpeg|bmp|gif)$/i.test(v.url)'
               :style='getImageStyle(v.url)'
               class='su-viewer-url'
               @dblclick='ViewerModel([v])'>
          </div>

          <div v-else-if='/.(pmt)$/i.test(v.url)'
               style='width:100%;background:white;text-align:center;position:relative;'>
            <div style='position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);width:100%;'>
              文件：{{ getFileName(v.url) }}
              <div>请点击按钮打开新窗口进行预览</div>
              <el-button type='primary'
                         icon='el-icon-document'
                         style='margin-top:10px;'
                         @click='previewPmt(v.url)'>在线预览
              </el-button>
            </div>

          </div>
          <video controls
                 v-else-if='/.mp4$/i.test(v.url)'
                 class='su-viewer-url'
          >
            <source :src='v.url'
                    type='video/mp4'
            >
          </video>
          <div style='background:#000;width:100%;'
               v-else-if='/.pdf$/i.test(v.url)'
          >
            <embed :src='v.url'
                   style='width:100%;height:100%;'
                   type='application/pdf' />
          </div>

          <div v-else style='width:100%;background:white;text-align:center;position:relative;'>
            <div style='position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);width:100%;'>
              文件：{{ getFileName(v.url) }}
              <div>暂不支持预览，请点击下载按钮下载！</div>
              <el-button type='primary'
                         icon='el-icon-download'
                         style='margin-top:10px;'
                         @click='download(v.url)'>下载
              </el-button>
            </div>

          </div>

        </div>
        <div class='su-viewer-title-wrapper'
             v-if='v.title || v.subtitle'
        >
          <div class='su-viewer-title'>{{ v.title }}</div>
          <div class='su-viewer-subtitle'>{{ v.subtitle }}</div>
        </div>
      </el-card>
    </el-carousel-item>
    <el-carousel-item v-if='items.length === 0'>
      <el-card>
        <div class='su-viewer-no-data'>{{ emptyText }}</div>
      </el-card>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import axios from 'axios'
import common from '@/utils/common.js'
import {isFirefox} from 'element-ui/lib/utils/util'
import {
  Button,
} from 'element-ui'
import ZViewerModal from './z-viewer-model'

export default {
  name: 'z-viewer',
  components: {
    'el-button': Button,
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
    interval: {
      type: Number,
      default: 3000,
    },
    type: {
      type: String,
      default: 'card',
    },
    height: {
      type: String,
      default: '250px',
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    emptyText: {
      type: String,
      default: '无数据',
    },
  },
  data() {
    return {
      disabled: false,
    }
  },
  computed: {
    items() {
      const ret = []
      for (let v of this.data) {
        if (typeof v === 'string') {
          ret.push({
            url: v,
          })
        } else if (typeof v === 'object') {
          ret.push(v)
        } else {
          console.warning(v + ' isn\'t a supported format')
        }
      }

      return ret
    },
  },
  methods: {
    ViewerModel(data){
      ZViewerModal(data)
    },
    getImageStyle(url) {
      return {
        'background-image': 'url(\'' + url + '\')',
      }
    },
    download(url) {
      const isMov = /.mov$/i.test(url)
      if (isFirefox() && isMov) {
        this.downloadMovByFirefox(url)
      } else {
        window.location.href = url
      }
    },
    previewPmt(url) {
      const file = this.getFile(url)
      const previewUrl = this.$api.pmtViewer + '?file=' + file
      window.open(previewUrl, '_blank')
    },
    downloadMovByFirefox(url) {
      this.disabled = true
      const _self = this

      // 上传在500ms内时不显示动画
      setTimeout(() => {
        if (_self.disabled) {
          _self.loading = common.getLoading({
            text: '下载文件',
          })
        }
      }, 500)

      axios({
        url: url,
        method: 'GET',
        responseType: 'blob',
      })
        .then((response) => {
          const obj = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = obj
          link.setAttribute('download', this.getFileName(url))
          link.setAttribute('type', 'video/quicktime')
          document.body.appendChild(link)
          link.click()

          _self.disabled = false
          if (_self.loading) {
            _self.loading.close()
          }
        })
        .catch((error) => {
          this.handleDownloadError(error)

          _self.disabled = false
          if (_self.loading) {
            _self.loading.close()
          }
        })
    },
    // downloadByIE (url) {
    //   axios.get(url)
    //     .then((response) => {
    //       const elemIF = document.createElement('iframe')
    //       elemIF.src = url
    //       elemIF.style.display = 'none'
    //       document.body.appendChild(elemIF)
    //     })
    //     .catch((error) => {
    //       this.handleDownloadError(error)
    //     })
    // },
    handleDownloadError(error) {
      if (error.response && error.response.status === 404) {
        this.$alert('下载失败，文件已失效！')
      } else if (error.message && error.message.includes('Network Error')) {
        this.$alert('下载失败，请检查网络连接！')
      } else {
        this.$alert('下载失败，请稍后再试！')
      }
    },
    getFileName(file) {
      let splited = file.split('/')
      splited = splited[splited.length - 1].split('$$')
      const name = splited[splited.length - 1]

      return name
    },
    getFile(file) {
      let splited = file.split('//')

      return splited[splited.length - 1]
    },
  },
}
</script>

<style scoped lang='scss'>
/* .su-viewer-url-wrapper {
    background: #000 url("../../assets/404.png") no-repeat center center;
  } */
</style>
