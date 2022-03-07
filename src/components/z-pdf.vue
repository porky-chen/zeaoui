<!--
 - All rights reserved.
 - @author Zeao
 - Description: z-pdf pdf预览器
 - Changelog:
 - Revision 1.0 2022-01-11  Zeao
 - - 初始化
 -->
<template>
  <div class="pdf" :style="`width:${width}px;height:${height}px`">
    <iframe :src="src" frameborder="0" style="width: 100%; height: 100%"></iframe>
  </div>
</template>

<script>
export default {
  name: "z-pdf",
  props:{
    width:{
      type:String,
      default(){
        return '600'
      }
    },
    height:{
      type:String,
      default() {
        return '700';
      }
    },
    src:{
      type: String,
      default(){
        return 'http://image.cache.timepack.cn/nodejs.pdf'
      }
    }
  },
  data(){
    return {
      pageCount:0,
      fileType: 'pdf',
      currentPage: 0
    }
  },
  methods:{
  }
}
</script>

<style scoped>

</style>
