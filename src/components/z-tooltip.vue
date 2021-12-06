<!--
 - All rights reserved.
 - @author Zeao
 - Description: z-tooltip 文字提示
 - Changelog:
 - Revision 1.0 2021-12-03  Zeao 
 - - 初始化
 -->
<template>
  <div class='su-tooltip'>
    <el-tooltip v-bind='$attrs' v-on='$listeners'>
      <template v-for='name in Object.keys($slots)' v-slot:[name]>
        <slot :name='name' />
      </template>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'z-tooltip',
  props: {},
  data() {
    return {}
  },
  methods: {},
  mounted() {
  },
}
</script>