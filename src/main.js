import Vue from 'vue'
import App from './App'
import ajax from 'ajax'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.prototype.$ajax = ajax

Vue.use(ElementUI)

window.Vue = Vue

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
