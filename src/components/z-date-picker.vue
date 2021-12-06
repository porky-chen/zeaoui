<!--
 - All rights reserved.
 - @author Zeao
 - Description: z-date 日期选择组件
 - Changelog:
 - Revision 1.0 2021-12-03  Zeao 
 - - 初始化
 -->
<template>
  <el-date-picker class='z-date-picker'
                    :value='value'
                    v-bind='$attrs'
                    v-on='$listeners'
    />
</template>

<script>
export default {
  name: 'z-date-picker',
  props: {
    value: null,
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {
  },
}
</script>
<style scoped lang='scss'>

.z-date-picker {
  height: 32px;
  line-height: 32px;
}
</style>
