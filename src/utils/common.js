import {Loading} from 'element-ui'

export default {
  // loading加载动画
  getLoading (options = {}) {
    const {
      lock = true,
      text = '处理数据',
      fullscreen = true,
      background = 'rgba(0, 0, 0, 0.3)',
    } = options

    return Loading.service({
      lock: lock,
      text: '正在' + text + '，请稍后...',
      fullscreen: fullscreen,
      background: background,
    })
  },
  // 查看浏览器版本
  getIEVersion(){
    // 获取浏览器userAgent字符串
    const {userAgent} = navigator
    // 判断是否IE<11浏览器
    const isIEBelow11 = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1
    // 判断是否IE的Edge浏览器
    const isEdge = userAgent.indexOf('Edge') > -1 && !isIEBelow11
    const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1

    if (isIEBelow11) {
      const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
      reIE.test(userAgent)
      const fIEVersion = parseFloat(RegExp['$1'])
      if (fIEVersion === 7) {
        return 7
      } else if (fIEVersion === 8) {
        return 8
      } else if (fIEVersion === 9) {
        return 9
      } else if (fIEVersion === 10) {
        return 10
      } else {
        // IE版本<=7
        return 6
      }
    } else if (isEdge) {
      // edge
      return 'edge'
    } else if (isIE11) {
      // IE11
      return 11
    } else {
      // 不是ie浏览器
      return -1
    }
  }
}
