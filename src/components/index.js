// 导入封装组件
import ZButton from './Z-Button'

const components = {
    // 通过install来安转组件
    install(Vue){
        Vue.component('ZButton',ZButton)
    }
}

if(typeof window !== 'undefined' && window.Vue){
    window.Vue.use(comment)
}

export default components