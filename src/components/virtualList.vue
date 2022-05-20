<!--
 - All rights reserved.
 - @author Zeao
 - Description: 虚拟列表
 - Changelog:
 - Revision 1.0 2022-4-22  Zeao
 - - 初始化
 -->
<template>
  <div>
    <div class='scroll-main' @scroll='fn' ref='scrollBox'>
      <div :style="{paddingTop:startNum*itemHeight+'px',paddingBottom:(allHX.length - endNum)*itemHeight + 'px'}">
        <div v-for='(item,index) in showHX' :key='item.id' class='item' :style="{height:(itemHeight - 2)+'px'}">
          <span>{{item.id}} - {{item.msg}}</span>
          <span @click='deleteItem(index)'>删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const bufferSize = 10

export default {
  name: 'virtualList',
  data(){
    return {
      itemHeight:'100',
      allHX:[],
      startNum:0,
      boxHeight:0,
      fn:this.debounce(this.startScroll,100),
    }
  },
  created() {
    this.getMock(100000)
  },
  mounted() {
    this.getBoxHeight()
  },
  methods:{
    getMock(count){
      for(let i = 0; i < count;i++){
        this.allHX.push({
          id:`H${i}号`,
          msg:`到第${i}了!`
        })
      }
    },
    getBoxHeight(){
      this.boxHeight = Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)
    },
    startScroll(){
      let target = Math.floor(this.$refs.scrollBox.scrollTop / this.itemHeight)
      console.log(target,this.startNum)
      // if(target > this.allHX.length - this.pageNum){
      //   this.startNum = this.allHX.length - this.pageNum
      //   return
      // }
      if(this.startNum !== target){
        this.startNum = Math.max(target - bufferSize,0)
        return
      }
      this.startNum = target
    },
    deleteItem(index){
      this.allHX.splice(this.startNum + index,1)
    },
    debounce(fn,time){
      let timer = null
      return function(){
        if(timer !== null) clearTimeout(timer)
        timer = setTimeout(fn,time)
      }
    }
  },
  computed:{
    pageNum(){
      return Math.ceil(this.boxHeight / this.itemHeight)
    },
    endNum(){
      return Math.min(this.startNum + this.pageNum + bufferSize,this.allHX.length - 1)
    },
    showHX(){
      return this.allHX.slice(this.startNum,this.endNum)
    }
  },
}
</script>

<style lang='scss' scoped>
.scroll-main{
  height: 500px;
  overflow: scroll;
  overflow-x: hidden;
}
.item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #3c86ff;
  padding: 0 20px;
}
</style>
