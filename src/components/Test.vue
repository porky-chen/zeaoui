<template>
  <div>
      <el-row style="margin-top:20px" type="flex">
        <el-col>
          <z-button buttonType='export' @click="tns"></z-button>
        </el-col>
        <el-col>
          <z-button buttonType='batchadd' @click="tns"></z-button>
        </el-col>
        <el-col>
          <z-button @click="tns" type="text" icon="el-icon-view"></z-button>
        </el-col>
        <el-col>
          <z-button @click="tns" type="text" icon="el-icon-view">文字按钮</z-button>
        </el-col>
        <el-col>
          <z-button @click="tns" :loading="true" :plain="true" type="primary" icon="el-icon-view">加载中</z-button>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import ZButton from './z-button/z-button.vue'

export default {
  name: 'HelloWorld',
  components:{
    ZButton,
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    tns(){
      console.log('我也可以实现了')
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
