<!--
 - All rights reserved.
 - @author Zeao
 - Description: z-button 按钮组件
 - Changelog:
 - Revision 1.0 2021-12-02  Zeao
 - - 初始化
 -->
<script>
import elButton from './button'

export default {
  name: 'z-button',
  components: {
    'el-button': elButton,
  },
  render(createElement, context) {
    // 新增
    if (this.buttonType === 'add') {
      return this.renderNativeButton(createElement, true, 'el-icon-plus')
    }
    // 批量新增
    if (this.buttonType === 'batchadd') {
      return this.renderNativeButton(createElement, true, 'el-icon-plus')
    }
    // 编辑
    if (this.buttonType === 'edit') {
      return this.renderNativeButton(createElement, true, 'el-icon-edit-outline')
    }
    // 删除
    if (this.buttonType === 'del') {
      return this.renderNativeButton(createElement, true, 'el-icon-delete', 'danger')
    }
    // 批量删除
    if (this.buttonType === 'batchdel') {
      return this.renderNativeButton(createElement, true, 'el-icon-delete', 'danger')
    }
    // 取消
    if (this.buttonType === 'cancel') {
      return this.renderNativeButton(createElement, true, null, '')
    }
    // 确定
    if (this.buttonType === 'confirm') {
      return this.renderNativeButton(createElement, true, null)
    }
    // 关联结构
    if (this.buttonType === 'link') {
      return this.renderNativeButton(createElement, true, 'el-icon-link')
    }
    // 发布
    if (this.buttonType === 'release') {
      return this.renderNativeButton(createElement, true, 'el-icon-s-promotion')
    }
    // 提交
    if (this.buttonType === 'submit') {
      return this.renderNativeButton(createElement, true, 'el-icon-s-promotion')
    }
    // 导入
    if (this.buttonType === 'import') {
      return this.renderNativeButton(createElement, true, 'el-icon-upload2')
    }
    // 上传
    if (this.buttonType === 'upload') {
      return this.renderNativeButton(createElement, true, 'el-icon-upload')
    }
    // 导出
    if (this.buttonType === 'export') {
      return this.renderNativeButton(createElement, true, 'el-icon-download')
    }
    return this.renderNativeButton(createElement)
  },

  methods: {
    renderNativeButton(createElement, customPlain, customIcon, customType) {
      return createElement(
        'el-button',
        {
          'class': {
            'z-button': true,
            'pa-no': this.type === 'text',
            'is-link': this.isLink,
          },
          attrs: {
            ...this.$attrs,
            size: this.size,
            type: customType === null || customType === undefined ? this.type : customType,
            plain: customPlain === null || customPlain === undefined ? this.plain : customPlain,
            icon: customIcon === null || customIcon === undefined ? this.icon : customIcon,
          },
          on: {
            ...this.$listeners,
          },
        },
        [
          this.content,
          this.$slots.default,
        ],
      )
    },
    getName(type){
        switch(type){
            case 'add':
                return '新增';
            case 'batchadd':
                return '批量新增';
            case 'edit':
                return '编辑';
            case 'del':
                return '删除';
            case 'batchdel':
                return '批量删除';
            case 'cancel':
                return '取消';
            case 'confirm':
                return '确定';
            case 'link':
                return '关联结构';
            case 'release':
                return '发布';
            case 'submit':
                return '提交';
            case 'import':
                return '导入';
            case 'upload':
                return '上传';
            case 'export':
                return '导出';
        }
    }
  },

  computed: {
    content: function() {
      if (this.buttonType) return this.getName(this.buttonType)
      return ''
    },
  },
  props: {
    buttonType: {
      type: String,
      default: '',
    },

    icon: {
      type: String,
    },
    type: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'small',
    },
    plain: {
      type: Boolean,
      default: false,
    },
    // 文字按钮时使用
    isLink: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
}
</script>
