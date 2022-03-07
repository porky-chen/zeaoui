<!--
  - @author: Zeao
  - @description 预览组件
  -
  - Changelog:
  - Revision 1.0 2022-01-01 Zeao
  - - 初始化
  -->
<template>
  <div class='image-preview-bg' ref='bg' :style='layoutStyle' id='imgcontent'>

    <div class='asideBar' v-if='index > 0' style='left:0px'>
      <div class='selectedBrn' @click='prev'>
        <svg t='1635904917107' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='5394' width='40' height='40'>
          <path d='M378.24 512l418.88 418.88L704 1024 192 512l512-512 93.12 93.12z' fill='#ffffff' p-id='5395'></path>
        </svg>
      </div>
    </div>
    <div class='asideBar' v-if='index < images.length - 1' style='right:0px'>
      <div class='selectedBrn' @click='next'>
        <svg t='1635904982452' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='5737' width='40' height='40'>
          <path d='M610.88 512L192 93.12 285.12 0l512 512-512 512L192 930.88z' fill='#ffffff' p-id='5738'></path>
        </svg>
      </div>
    </div>

    <div class='topBar'>
      <div class='title'>{{ images[index].name && images[index].name.length > 0 ? images[index].name : fileName }}</div>
      <div class='close' @click='handleclose'></div>
    </div>
    <div class='image-wrapper' :style='layoutStyle'>
      <div class='image' :style='layoutStyle'>
        <img
          ref='img'
          :src='images[index][this.fullUrl]'
          :style='imgStyle'
          @mousedown.prevent='handleMousedown'
          @mouseup='handleMouseup'
          @mousemove.stop='handleMousemove'
        />
      </div>
    </div>

    <div class='toolBox' v-if='!moving'>
      <div class='btn-wrapper'>
        <z-preview-popup content='上一个'>
          <div :class='{ disable: index === 0 }' @click='prev'>
            <svg t='1635904804524' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='4568' width='22' height='22'>
              <path d='M378.24 512l418.88 418.88L704 1024 192 512l512-512 93.12 93.12z' fill='#ffffff' p-id='4569'></path>
            </svg>
          </div>
        </z-preview-popup>
        <z-preview-popup content='下一个'>
          <div :class='{ disable: index === images.length - 1 }' @click='next'>
            <svg t='1635904822045' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='4839' width='22' height='22'>
              <path d='M610.88 512L192 93.12 285.12 0l512 512-512 512L192 930.88z' fill='#ffffff' p-id='4840'></path>
            </svg>
          </div>
        </z-preview-popup>
        <div class='boxvertical' />

        <z-preview-popup content='原图比例'>
          <div class='Proportion' @click='handleProportion'>
            1:1
          </div>
        </z-preview-popup>
        <div class='scaleBox'>
          <z-preview-popup content='缩小'>
            <div @click='handleScale(-1)'>
              <svg t='1635904780206' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='4333' width='22' height='22'>
                <path d='M1005.312 914.752l-198.528-198.464A448 448 0 1 0 0 448a448 448 0 0 0 716.288 358.784l198.4 198.4a64 64 0 1 0 90.624-90.432zM448 767.936A320 320 0 1 1 448 128a320 320 0 0 1 0 640zM256 384v128h384V384H256z' fill='#ffffff' p-id='4334'></path>
              </svg>
            </div>
          </z-preview-popup>
          <div class='precentbox'>{{ scalePrecent }}%</div>
          <z-preview-popup content='放大'>
            <div @click='handleScale(1)'>
              <svg t='1635904762742' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='4098' width='22' height='22'>
                <path d='M1005.312 914.752l-198.528-198.464A448 448 0 1 0 0 448a448 448 0 0 0 716.288 358.784l198.4 198.4a64 64 0 1 0 90.624-90.432zM384 384H256v128h128v128h128V512h128V384H512V256H384v128z m64 384A320 320 0 1 1 448 128a320 320 0 0 1 0 640z'
                      fill='#ffffff' p-id='4099'></path>
              </svg>
            </div>
          </z-preview-popup>
        </div>
        <z-preview-popup content='全屏'>
          <div @click='handlefullscreen'>
            <svg v-if='!isFullScreen' t='1635905198490' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='1227' width='22' height='22'>
              <path
                d='M145.066667 85.333333h153.6c25.6 0 42.666667-17.066667 42.666666-42.666666S324.266667 0 298.666667 0H34.133333C25.6 0 17.066667 8.533333 8.533333 17.066667 0 25.6 0 34.133333 0 42.666667v256c0 25.6 17.066667 42.666667 42.666667 42.666666s42.666667-17.066667 42.666666-42.666666V145.066667l230.4 230.4c17.066667 17.066667 42.666667 17.066667 59.733334 0 17.066667-17.066667 17.066667-42.666667 0-59.733334L145.066667 85.333333z m170.666666 563.2L162.133333 802.133333l-76.8 76.8V725.333333C85.333333 699.733333 68.266667 682.666667 42.666667 682.666667s-42.666667 17.066667-42.666667 42.666666v256c0 25.6 17.066667 42.666667 42.666667 42.666667h256c25.6 0 42.666667-17.066667 42.666666-42.666667s-17.066667-42.666667-42.666666-42.666666H145.066667l76.8-76.8 153.6-153.6c17.066667-17.066667 17.066667-42.666667 0-59.733334-17.066667-17.066667-42.666667-17.066667-59.733334 0z m665.6 34.133334c-25.6 0-42.666667 17.066667-42.666666 42.666666v153.6l-76.8-76.8-153.6-153.6c-17.066667-17.066667-42.666667-17.066667-59.733334 0-17.066667 17.066667-17.066667 42.666667 0 59.733334l153.6 153.6 76.8 76.8H725.333333c-25.6 0-42.666667 17.066667-42.666666 42.666666s17.066667 42.666667 42.666666 42.666667h256c25.6 0 42.666667-17.066667 42.666667-42.666667v-256c0-25.6-17.066667-42.666667-42.666667-42.666666z m0-682.666667h-256c-25.6 0-42.666667 17.066667-42.666666 42.666667s17.066667 42.666667 42.666666 42.666666h153.6l-76.8 76.8-153.6 153.6c-17.066667 17.066667-17.066667 42.666667 0 59.733334 17.066667 17.066667 42.666667 17.066667 59.733334 0l153.6-153.6 76.8-76.8v153.6c0 25.6 17.066667 42.666667 42.666666 42.666666s42.666667-17.066667 42.666667-42.666666v-256c0-25.6-17.066667-42.666667-42.666667-42.666667z'
                fill='#ffffff' p-id='1228'></path>
            </svg>

            <svg v-if='isFullScreen' t='1635905232778' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='1536' width='22' height='22'>
              <path
                d='M384 597.333333h-256c-25.6 0-42.666667 17.066667-42.666667 42.666667s17.066667 42.666667 42.666667 42.666667h153.6L17.066667 947.2c-17.066667 17.066667-17.066667 42.666667 0 59.733333 17.066667 17.066667 42.666667 17.066667 59.733333 0L341.333333 742.4v153.6c0 25.6 17.066667 42.666667 42.666667 42.666667s42.666667-17.066667 42.666667-42.666667v-256c0-25.6-17.066667-42.666667-42.666667-42.666667z m358.4 85.333334h153.6c25.6 0 42.666667-17.066667 42.666667-42.666667s-17.066667-42.666667-42.666667-42.666667h-256c-25.6 0-42.666667 17.066667-42.666667 42.666667v256c0 25.6 17.066667 42.666667 42.666667 42.666667s42.666667-17.066667 42.666667-42.666667V742.4l264.533333 264.533333c17.066667 17.066667 42.666667 17.066667 59.733333 0 17.066667-17.066667 17.066667-42.666667 0-59.733333L742.4 682.666667zM640 426.666667h256c25.6 0 42.666667-17.066667 42.666667-42.666667s-17.066667-42.666667-42.666667-42.666667H742.4L1006.933333 76.8c17.066667-17.066667 17.066667-42.666667 0-59.733333-17.066667-17.066667-42.666667-17.066667-59.733333 0L682.666667 281.6V128c0-25.6-17.066667-42.666667-42.666667-42.666667s-42.666667 17.066667-42.666667 42.666667v256c0 25.6 17.066667 42.666667 42.666667 42.666667z m-256-341.333334c-25.6 0-42.666667 17.066667-42.666667 42.666667v153.6L76.8 8.533333C59.733333 0 25.6 0 8.533333 8.533333 0 25.6 0 59.733333 8.533333 76.8L281.6 341.333333H128c-25.6 0-42.666667 17.066667-42.666667 42.666667s17.066667 42.666667 42.666667 42.666667h256c25.6 0 42.666667-17.066667 42.666667-42.666667v-256c0-25.6-17.066667-42.666667-42.666667-42.666667z'
                p-id='1537' fill='#ffffff'></path>
            </svg>
          </div>
        </z-preview-popup>
        <z-preview-popup content='拉伸'>
          <div @click='handleStretched'>
            <svg t='1635907323013' class='icon' viewBox='0 0 1170 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='1240' width='32' height='32'>
              <path
                d='M1024 1024H146.285714c-80.457143 0-146.285714-65.828571-146.285714-146.285714V146.285714C0 65.828571 65.828571 0 146.285714 0h877.714286c80.457143 0 146.285714 65.828571 146.285714 146.285714v731.428572c0 80.457143-65.828571 146.285714-146.285714 146.285714zM146.285714 73.142857c-43.885714 0-73.142857 29.257143-73.142857 73.142857v731.428572c0 43.885714 29.257143 73.142857 73.142857 73.142857h877.714286c43.885714 0 73.142857-29.257143 73.142857-73.142857V146.285714c0-43.885714-29.257143-73.142857-73.142857-73.142857H146.285714z'
                fill='#ffffff' p-id='1241'></path>
              <path
                d='M672.914286 833.828571v-65.828571h124.342857L607.085714 592.457143l7.314286-7.314286 43.885714-36.571428 182.857143 168.228571V599.771429h65.828572v234.057142H672.914286zM329.142857 299.885714v124.342857h-65.828571V190.171429h241.371428v65.828571H380.342857l182.857143 168.228571-51.2 51.2-182.857143-175.542857z'
                fill='#ffffff' p-id='1242'></path>
            </svg>
          </div>
        </z-preview-popup>
        <div class='boxvertical' />
        <z-preview-popup content='旋转'>
          <div @click='rotateImg'>
            <svg t='1635904720050' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='3863' width='22' height='22'>
              <path
                d='M1019.880673 447.449687l0.063994 0.511956h-132.468657l-0.063995-0.511956H572.750958l208.110181-206.382328A383.967123 383.967123 0 1 0 870.965424 639.945205h136.820284a511.956164 511.956164 0 1 1-134.388493-490.581994L1023.912328 0v447.449687h-4.031655z'
                fill='#ffffff' p-id='3864'></path>
            </svg>
          </div>
        </z-preview-popup>
      </div>
      <div v-if='!isFullScreen' class='thumbContent'>
        <div class='selectedbuttom' :class='{ disable: index === 0 }' @click='prev'>
          <svg t='1635904917107' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='5394' width='40' height='40'>
            <path d='M378.24 512l418.88 418.88L704 1024 192 512l512-512 93.12 93.12z' fill='#ffffff' p-id='5395'></path>
          </svg>
        </div>
        <div class='thumbBoxList'>
          <div v-for='(item,imgindex) in images' :key='`${item[thumbUrl]}${imgindex}`'
               :class="`thumbbox ${index === imgindex ? 'isactived' : ''}`">
            <div v-if='index !== imgindex' class='thumbmask' @click='handleimg(imgindex)' />
            <img :src='item[thumbUrl]' />
          </div>
        </div>
        <div class='selectedbuttom' :class='{ disable: index === images.length - 1 }' @click='next'>
          <svg t='1635904822045' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='4839' width='40' height='40'>
            <path d='M610.88 512L192 93.12 285.12 0l512 512-512 512L192 930.88z' fill='#ffffff' p-id='4840'></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ZPreviewPopup from './z-preview-popup'

export default {
  name: 'z-preview-image',
  components: {
    ZPreviewPopup,
  },
  props: {
    // 缩略图地址字段
    thumbUrl: {
      type: String,
      default: 'thumb',
    },
    // 完整地址字段
    fullUrl: {
      type: String,
      default: 'larger',
    },
    // 文件名称字段
    name: {
      type: String,
      default: 'fileName',
    },
    // 图片数据
    images: {
      type: Array,
      default: () => [],
    },
    // 图片显示的索引
    startIndex: {
      type: Number,
      default: 0,
    },
    // 是否支持滑轮缩放
    canWheel: {
      type: Boolean,
      default: true,
    },
    //暂时不支持自定义面板宽高
    baseScreenSize: {
      type: Object,
      default: () => ({
        width: 1344,
        height: 699,
      }),
    },
    //图片下标初始值
    initIndex: {
      type: Number,
      default: 0,
    },

  },
  data() {
    return {
      // 图片的宽高
      width: 50,
      height: 50,
      // 图片的宽高
      calWidth: 50,
      calHeight: 50,
      // 图片的定位
      top: 0,
      left: 0,
      moving: false,
      index: 0,
      rotate: 0,

      // 图片缩放比  位置
      imgscale: 1,
      imgtop: 0,
      imgleft: 0,
      // 是否为全屏
      isFullScreen: false,
      // 初始化 缩放和图片宽高
      basescale: 1,
      basewidth: 50,
      baseheight: 50,

      //是否为拉伸
      isStretched: false,

      //icon 地址
      iconsrc: {
        prev: require('./assets/prev.png'),
        rotate: require('./assets/rotate.png'),
        scaleb: require('./assets/scaleb.png'),
        scales: require('./assets/scales.png'),
        stretched: require('./assets/stretched-x.png'),
        full: require('./assets/full.png'),
        escfull: require('./assets/escfull.png'),
        next: require('./assets/next.png'),
      },

    }
  },
  computed: {
    // 全屏按钮
    fullsrc() {
      return this.isFullScreen ? this.iconsrc.escfull : this.iconsrc.full
    },
    //缩放比显示
    scalePrecent() {
      return Math.round((1 - (1 - this.imgscale)) * 100)
    },
    // 面板参数
    layoutStyle() {
      return {
        width: Math.round(this.calWidth) + 'px',
        height: Math.round(this.calHeight) + 'px',
      }
    },
    // 图片参数
    imgStyle() {
      return {
        transform: `scale(${this.imgscale}) rotate(${this.rotate * 90}deg)`,
        top: `${this.imgtop}px`,
        left: `${this.imgleft}px`,
        width: `${this.width}px`,
        height: `${this.height}px`,
      }
    },
    fileName() {
      if (this.images[this.index][this.name]) {
        return this.images[this.index][this.name]
      }

      // 获取文件名 不兼容参数图片
      const tmp = this.images[this.index][this.fullUrl].split('/')
      return tmp[tmp.length - 1].split('?')[0]
    },
  },
  mounted() {
    this.index = this.initIndex
    this.getCalLength()
    this.getOrgLength()
    // 窗口缩放事件
    window.addEventListener(
      'resize',
      this._throttle(() => {
        this.getCalLength()
        this.layout()
      }, 200),
    )
    // 绑定滑动缩放事件console.log()
    if (this.canWheel) {
      this.addWheel()
    }
  },
  methods: {
    handleStretched() {
      if (this.isStretched) {
        this.isStretched = false
        this.width = this.basewidth
        this.height = this.baseheight
        this.imgscale = this.basescale
      } else {
        this.imgscale = 1
        this.isStretched = true
        this.width = this.calWidth
        this.height = this.calHeight
      }
      this.resetPosition()
    },
    handleimg(imgindex) {
      this.index = imgindex
      this.imgscale = 1
      this.layout()
    },
    prev() {
      if (this.index) {
        this.index--
        this.rotate = 0
        this.layout()
        this.imgscale = 1
      }
    },
    next() {
      if (this.index < this.images.length - 1) {
        this.index++
        this.rotate = 0
        this.layout()
        this.imgscale = 1
      }
    },
    rotateImg() {
      this.rotate = (this.rotate + 1) % 4
    },
    handleScale(der) {
      if (der > 0) {
        this.imgscale += 0.05
      } else {
        this.imgscale -= 0.05
        if (this.imgscale < 0.2) {
          this.imgscale = 0.2
        }
      }

    },
    handleProportion() {
      if (this.imgscale === 1) {
        this.imgscale = this.basescale
      } else {
        this.imgscale = 1
      }
      this.resetPosition()

    },
    //关闭按钮
    handleclose() {
      if (this.isFullScreen) {
        this.handleExitFullscreen()
        return
      }
      this.rotate = 0
      this.removeWheel()
      this.$emit('close')
    },
    loadImage(src, index) {
      const image = new Image()
      image.src = src
      image.onload = () => {
        this.orgHeight[index] = image.height
        this.orgWidth[index] = image.width
        if (index === this.index) {
          // 加载到首加载图片
          this.layout()
        }
      }
    },
    getCalLength() {
      this.clientHeight = window.innerHeight
      this.clientWidth = window.innerWidth
      // 200 为按钮的预留高度
      if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        this.calHeight = this.clientHeight
        this.calWidth = this.clientWidth
        this.isFullScreen = true
        this.$emit('fullScreenChange', this.isFullScreen)
      } else {
        this.calHeight = this.baseScreenSize.height
        this.calWidth = this.baseScreenSize.width
        this.isFullScreen = false
        this.$emit('fullScreenChange', this.isFullScreen)
      }
    },
    getOrgLength() {
      this.orgWidth = []
      this.orgHeight = []
      this.images.forEach((src, i) => {
        this.loadImage(src[this.fullUrl], i)
      })
    },
    resetPosition() {
      this.imgleft = (this.calWidth - this.width) / 2
      this.imgtop = (this.calHeight - this.height) / 2

    },
    layout() {
      const orgWidth = this.orgWidth.length && this.orgWidth[this.index]
      const orgHeight = this.orgHeight.length && this.orgHeight[this.index]
      if (!orgWidth || !orgHeight) {
        return
      }

      this.width = orgWidth
      this.height = orgHeight

      this.basewidth = orgWidth
      this.baseheight = orgHeight

      this.basescale = orgHeight > 538 ? 538 / orgHeight : 1

      this.$nextTick(() => {
        this.imgscale = this.basescale
      })

      // 计算图片位置
      this.resetPosition()
    },
    handleMousedown(e) {
      if (this.movestart || this.moving) return
      this.movestart = true
      this.sx = e.pageX
      this.sy = e.pageY
    },
    handleMousemove(e) {
      if (!this.movestart) return
      this.moving = true
      let delX = e.pageX - this.sx
      let delY = e.pageY - this.sy
      this.imgleft += delX
      this.imgtop += delY
      this.sx = e.pageX
      this.sy = e.pageY
    },
    handleMouseup() {
      this.movestart = false
      this.moving = false
    },
    // 处理滑轮的放大缩小
    handleMousewheel(e) {
      const delta = e.deltaY || e.wheelDelta || -e.detail
      // const img = this.$refs.img;

      if (delta < 0) {
        this.imgscale += 0.05
      } else {
        this.imgscale -= 0.05
        if (this.imgscale < 0.2) {
          this.imgscale = 0.2
        }
      }
    },
    addWheel() {
      if (this.wheelHandle) return
      this.wheelHandle = this.handleMousewheel
      this.$refs.img.addEventListener('mousewheel', this.wheelHandle)
      this.$refs.img.addEventListener('DOMMouseScroll', this.wheelHandle)
    },
    removeWheel() {
      if (this.wheelHandle) {
        this.$refs.img.removeEventListener('mousewheel', this.wheelHandle)
        this.$refs.img.removeEventListener('DOMMouseScroll', this.wheelHandle)
        this.wheelHandle = null
      }
    },
    // 函数防抖
    _debounce(fn, delay) {
      let timer
      return function(...arg) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          fn.apply(this, arg)
        }, delay)
      }
    },
    // 函数节流
    _throttle(fn, delay) {
      let pre = Date.now()
      return function(...arg) {
        let now = Date.now()
        if (now - pre >= delay) {
          fn.apply(this, arg)
          pre = now
        }
      }
    },
    //全屏
    handlefullscreen() {

      if (this.isFullScreen) {
        this.handleExitFullscreen()
        return
      }

      const element = document.getElementById('imgcontent')
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
      }
    },
    //退出全屏
    handleExitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozExitFullScreen) {
        document.mozExitFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    },
  },
  watch: {
    canWheel(val, oldVal) {
      if (val == oldVal) return
      if (val) {
        this.addWheel()
      } else {
        this.removeWheel()
      }
    },
  },
}
</script>

<style lang='scss' scoped>
.image-preview-bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;

  .image-wrapper {
    position: relative;

    .image {
      position: absolute;
      top: 0;
      left: 0;
      min-width: 50px;
      min-height: 50px;

      > img {
        position: absolute;
        transform-origin: 50% 50%;

        &.rotate1 {
          transform: rotate(90deg);
        }

        &.rotate2 {
          transform: rotate(180deg);
        }

        &.rotate3 {
          transform: rotate(270deg);
        }

        &.move {
          cursor: move;
        }
      }

      .close {
        position: absolute;
        top: -20px;
        right: -20px;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.3);
        cursor: pointer;

        > i {
          font-size: 30px;
          color: #fff;
        }
      }
    }
  }

  .toolBox {

    .boxvertical {
      border-right: 1px #c5c5c5 solid;
      height: 50%;
      width: 1px;
    }

    &:hover {
      opacity: 1;
    }

    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;

  }

  .btn-wrapper {
    align-self: center;
    position: relative;
    width: 543px;
    height: 58px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;

    .buttonbox {
      img, svg {
        height: 22px;
      }
    }

    .Proportion {
      border: 1px solid #fff;
      display: inline-block;
    }

    .scaleBox {
      display: flex;
      justify-content: space-around;
      align-items: center;
      line-height: 22px;
      transform: translate(0, 10%);
    }

    .precentbox {
      width: 35px;
      height: 24px;
      font-size: 14px;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
      font-weight: 400;
      text-align: left;
      color: #ffffff;
      line-height: 24px;
      margin: 0 10px 5px 10px;
    }

  }

  .thumbContent {
    //background: #000;
    background: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100px;
    position: relative;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .thumbBoxList {
      width: auto;
      height: 100%;
      display: inline-block;
    }

    .thumbmask {
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, .3);
      width: 122px;
      height: 92px;
    }

    .isactived {
      width: 116px;
      height: 86px;
      border: 3px solid #ffffff;
    }

    .selectedbuttom {
      padding: 0 16px;
      width: 22px;
      height: 40px;
      display: inline-block;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .thumbbox {
      display: inline-block;
      width: 122px;
      height: 92px;
      position: relative;
      margin: 0 4.5px;

      > img {
        width: 100%;
        height: 100%;
      }
    }
  }

}

.asideBar {
  &:hover {
    opacity: 1;
  }

  opacity: 0;
  z-index: 10000;
  width: 100px;
  height: 100%;
  position: absolute;
  display: flex;
  top: 0px;
  justify-content: center;
  align-items: center;

  .selectedBrn {
    width: 55px;
    height: 55px;
    border-radius: 100%;
    background: rgba($color: #000000, $alpha: .3);
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 22px;
      height: 40px;
    }
  }
}
</style>

<style lang='sass' scoped>

.topBar
  position: absolute
  width: 100%
  height: 50px
  display: flex
  background: transparent
  justify-content: flex-end
  z-index: 10000

  .title
    opacity: 0

  &:hover
    background: rgba($color: #000, $alpha: .3)

    .title
      opacity: 1
      position: absolute
      left: 20px
      top: 20
      width: 150px
      height: 50px
      font-size: 14px
      font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
      text-align: left
      color: #ffffff
      line-height: 50px

    .close
      position: relative
      height: 50px
      width: 50px
      display: inline-block
      cursor: pointer
      background: rgba($color: #000, $alpha: .3)

      &:hover
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
