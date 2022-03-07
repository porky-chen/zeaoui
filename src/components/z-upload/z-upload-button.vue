<template>
  <el-button
    :type="type"
    :disabled="disabled"
    icon="el-icon-upload2"
    plain
    size="small">
    {{text}}
  </el-button>
</template>

<script>
export default {
  name: "z-upload-button",
  props: {
    text: {
      type: String,
      default: '上传文件'
    },
    type: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
