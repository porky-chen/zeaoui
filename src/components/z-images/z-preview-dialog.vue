<!--
  - @author: Zeao
  - @description 预览组件
  -
  - Changelog:
  - Revision 1.0 2022-01-01 Zeao
  - - 初始化
  -->
<template>
  <div class='su-preview-dialog-main' v-if='show'>
    <div class='content content-alpha'
         :class='{"content-transparent" : isFullScreen}'
    >
      <z-preview-image
        @close='close'
        @fullScreenChange='handleFullScreenChange'
        ref='preview'
        :is-show.sync='isShow'
        :images='data'
        :start-index='index'
        :can-wheel='canWheel'
        :initIndex='index'
        :full-url='fullUrl'
        :thumb-url='thumbUrl'
        :name='fileName'
      />
    </div>
  </div>
</template>

<script>
import ZPreviewImage from './z-preview-image'

export default {
  name: 'z-preview-dialog',
  components: {
    ZPreviewImage,
  },
  data() {
    const height = document.body.clientHeight + 'px'

    return {
      data: [],
      height,
      show: false,
      fullUrl: 'larger',
      thumbUrl: 'thumb',
      fileName: 'fileName',
      isShow: true,
      index: 0,
      canWheel: true,

      isFullScreen: false,
    }
  },
  watch: {},
  methods: {
    handleFullScreenChange(isFullScreen) {
      this.isFullScreen = isFullScreen
    },
    close() {
      this.show = false
      document.removeEventListener('keydown', this.handleKeyDown)
      // const wrapper = document.querySelector('.su-viewer-modal')
      // console.log(wrapper)
      // if (wrapper) {
      //   setTimeout(() => document.querySelector('body').removeChild(wrapper), 1000)
      // }
    },
    handleClick() {
      this.close()
    },
    handleKeyDown(e) {
      e.stopPropagation()
      if (e.keyCode === 27) {
        this.close()
      }
    },
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyDown)
  },
}
</script>
<style lang='sass' scoped>

.su-preview-dialog-main
  background: rgba($color: #000000, $alpha: .3)
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 9999
  display: flex
  justify-content: center
  align-items: center


.content
  width: 1344px
  height: 699px
  position: relative

.content-alpha
  background: rgba($color: #000000, $alpha: .3)

.content-transparent
  opacity: 0

.topBar
  position: absolute
  width: 100%
  height: 50px
  display: flex
  background: transparent
  justify-content: flex-end
  z-index: 10000

  &:hover

    background: rgba($color: #000, $alpha: .35)

    .close
      position: relative
      height: 50px
      width: 50px
      display: inline-block
      cursor: pointer
      background: #D75C52

      &::after
        content: ''
        width: 16px
        border-top: 1px solid #fff
        position: absolute
        left: 50%
        top: 50%
        transform: translate(-50%, -50%) rotate(45deg)


      &::before
        content: ''
        width: 16px
        border-top: 1px solid #fff
        position: absolute
        left: 50%
        top: 50%
        transform: translate(-50%, -50%) rotate(-45deg)


  &:hover
    visibility: true


</style>
