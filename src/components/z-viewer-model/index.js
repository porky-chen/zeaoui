/*
  - @author: czh
  - @description 弹窗组件
  -
  - Changelog:
  - Revision 1.0 2022-01-10
  - - 初始化
  */
import Vue from 'vue'
import ZViewerModalVue from './z-viewer-model'

function ZViewerModal (data) {
  const div = document.createElement('div')
  div.className = 'su-viewer-modal-wrapper'
  document.querySelector('body').appendChild(div)
  const ZViewerModalConstructor = Vue.extend(ZViewerModalVue)
  const instance = new ZViewerModalConstructor()
  instance.$mount('.su-viewer-modal-wrapper')
  instance.$data.data = data
  instance.$data.show = true
}

export default ZViewerModal
