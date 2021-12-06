// 导入封装组件
import ZButton from './z-button/z-button.vue'
import ZRadio  from './z-radio.vue'
import ZTooltip  from './z-tooltip.vue'
import ZDate  from './z-date-picker.vue'

const components = {
    // 注册组件
    // 通过install来安装组件
    install(Vue){
        Vue.component('ZButton',ZButton)
        Vue.component('ZRadio',ZRadio)
        Vue.component('ZTooltip',ZTooltip)
        Vue.component('ZDate',ZDate)
    }
}

if(typeof window !== 'undefined' && window.Vue){
    window.Vue.use(comment)
}

export default components