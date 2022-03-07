<!--
 - @author Zeao
 - Text Demo
-->
<template>
  <div>
    <!-- z-button -->
    <el-row style="margin-top:20px" type="flex">
      <el-col>
        <z-button buttonType="export" @click="tns"></z-button>
      </el-col>
      <el-col>
        <z-button buttonType="batchadd" @click="tns"></z-button>
      </el-col>
      <el-col>
        <z-button @click="tns" type="text" icon="el-icon-view"></z-button>
      </el-col>
      <el-col>
        <z-button @click="tnsView" type="text" icon="el-icon-view"
          >显示浏览效果</z-button
        >
      </el-col>
      <el-col>
        <z-button
          @click="tns"
          :loading="true"
          :plain="true"
          type="primary"
          icon="el-icon-view"
          >加载中</z-button
        >
      </el-col>
    </el-row>
    <!-- z-radio -->
<!--    <el-row style="margin-top:20px" type="flex">-->
<!--      <z-radio :data="radioData" v-model="radioValue"></z-radio>-->
<!--      <z-radio-->
<!--        :data="disabledData"-->
<!--        v-model="disabledValue"-->
<!--        :isNormalCheck="false"-->
<!--        style="margin:40px"-->
<!--      ></z-radio>-->
<!--    </el-row>-->
    <!-- z-tooltip -->
<!--    <div-->
<!--      style="display:flex;justify-content:space-around;align-items:center;height:300px"-->
<!--    >-->
<!--      <div>-->
<!--        <z-tooltip-->
<!--          effect="dark"-->
<!--          content="我是默認content的内容"-->
<!--          placement="top-start"-->
<!--        >-->
<!--          <z-button plain>深色上边</z-button>-->
<!--        </z-tooltip>-->
<!--      </div>-->
<!--      <div>-->
<!--        <z-tooltip effect="dark" placement="left-start">-->
<!--          <template slot="content">我是插桥slot="content"的内容</template>-->
<!--          <z-button plain>深色左边</z-button>-->
<!--        </z-tooltip>-->
<!--      </div>-->
<!--      <div>-->
<!--        <z-tooltip-->
<!--          effect="dark"-->
<!--          content="我是默認content的内容，我是通过类名限制宽度的换行"-->
<!--          popper-class="demo"-->
<!--          placement="right-start"-->
<!--        >-->
<!--          <z-button plain>深色右边</z-button>-->
<!--        </z-tooltip>-->
<!--      </div>-->
<!--      <div>-->
<!--        <z-tooltip effect="dark" placement="bottom-start">-->
<!--          <template slot="content"-->
<!--            >我是插桥slot="content"的<br />内容自定义的换行</template-->
<!--          >-->
<!--          <z-button plain>深色下边</z-button>-->
<!--        </z-tooltip>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div-->
<!--      style="display:flex;justify-content:space-around;align-items:center;height:300px"-->
<!--    >-->
<!--      <div>-->
<!--        <z-tooltip-->
<!--          effect="light"-->
<!--          content="我是默認content的内容"-->
<!--          placement="top-start"-->
<!--        >-->
<!--          <z-button plain>浅色上边</z-button>-->
<!--        </z-tooltip>-->
<!--      </div>-->
<!--      <div>-->
<!--        <z-tooltip effect="light" placement="left-start">-->
<!--          <template slot="content">我是插桥slot="content"的内容</template>-->
<!--          <z-button plain>浅色左边</z-button>-->
<!--        </z-tooltip>-->
<!--      </div>-->
<!--      <div>-->
<!--        <z-tooltip-->
<!--          effect="light"-->
<!--          content="我是默認content的内容，我是通过类名限制宽度的换行"-->
<!--          popper-class="demo"-->
<!--          placement="right-start"-->
<!--        >-->
<!--          <z-button plain>浅色右边</z-button>-->
<!--        </z-tooltip>-->
<!--      </div>-->
<!--      <div>-->
<!--        <z-tooltip effect="light" placement="bottom-start">-->
<!--          <template slot="content"-->
<!--            >我是插桥slot="content"的<br />内容自定义的换行</template-->
<!--          >-->
<!--          <z-button plain>浅色下边</z-button>-->
<!--        </z-tooltip>-->
<!--      </div>-->
<!--    </div>-->
<!--    <el-row style="margin-top:20px" type="flex">-->
<!--      <div style='display:flex;justify-content:center;'>-->
<!--      <div style='margin:40px;'>-->
<!--        <span>选则日期</span>-->
<!--        <z-date v-model='dateValue' type='date'-->
<!--                 disabled=''-->
<!--                 value-format='yyyy-MM-dd'-->
<!--                 placeholder='选择日期' />-->
<!--      </div>-->
<!--      <div style='margin:40px;'>-->
<!--        <span>带快捷选项</span>-->
<!--        <z-date-->
<!--          v-model='dateValue'-->
<!--          :picker-options='pickerOptions'-->
<!--          align='left'-->
<!--          type='date'-->
<!--          value-format='yyyy-MM-dd'-->
<!--          placeholder='选择日期'-->
<!--        />-->
<!--      </div>-->
<!--      <div style='margin:40px;'>-->
<!--        <span>选则年</span>-->
<!--        <z-date v-model='monthValue' type='year' format='yyyy' value-format='yyyy' placeholder='选择年' @change='weekChange' />-->
<!--      </div>-->
<!--    </div>-->
<!--      <div style="">-->
<!--        <div style="margin:40px;">-->
<!--          <span>选则日期范围</span>-->
<!--          <z-date-->
<!--            v-model="daterangeValue"-->
<!--            type="daterange"-->
<!--            value-format="yyyy-MM-dd"-->
<!--            range-separator="至"-->
<!--            start-placeholder="开始日期"-->
<!--            end-placeholder="结束日期"-->
<!--          />-->
<!--        </div>-->
<!--        <div style="margin:40px;">-->
<!--          <span>选则月范围</span>-->
<!--          <z-date-->
<!--            v-model="monthrangeValue"-->
<!--            type="monthrange"-->
<!--            format="yyyy-MM"-->
<!--            valueFormat="yyyy-MM"-->
<!--            range-separator="至"-->
<!--            start-placeholder="开始日期"-->
<!--            end-placeholder="结束日期"-->
<!--          />-->
<!--        </div>-->
<!--      </div>-->
<!--    </el-row>-->
    <el-row style="margin-top:20px" type="flex"></el-row>
    <el-row>
      <z-upload ref="uploadFiles" :isDrag="false" :limit="5" :show-file-list="false" :accept="['*']" @on-upload-success="onUploadProcessFileSuccess"></z-upload>
    </el-row>
    <el-row>
    </el-row>
    <el-row>
      <z-table
        :columns="columns" :data="tableData" ref="tableRef" :show-checkbox="false" :border="true"
        :fit="true"
      >
        <template slot="phone">
          <el-table-column label="电话" header-align="center">
            <el-table-column label="座机" prop="xxx"></el-table-column>
            <el-table-column label="手机" prop="xxx"></el-table-column>
          </el-table-column>
        </template>
        <template slot="age">
          <span>123</span>
        </template>
      </z-table>
    </el-row>
  </div>
</template>

<script>
import ZButton from "./z-button/z-button.vue";
import ZRadio from "./z-radio.vue";
import ZTooltip from "./z-tooltip.vue";
import ZDate from "./z-date-picker.vue";
import ZUpload from "./z-upload/z-upload";
import ZTable from "./z-table"
import ZViewerModal from "./z-viewer-model";
import utils from '@/utils/utils'

export default {
  name: "HelloWorld",
  components: {
    ZButton,
    ZRadio,
    ZTooltip,
    ZDate,
    ZUpload,
    ZTable
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      },
      radioValue: "",
      disabledValue: "",
      radioData: [
        { label: "默认选中", value: "1" },
        { label: "默认2", value: "2" },
        { label: "默认3", value: "3" }
      ],
      disabledData: [
        { label: "默认1", value: "1" },
        {
          label: "自定义选中且禁止状态",
          value: "2",
          checked: true,
          disabled: true
        },
        { label: "禁止选中状态", value: "3", disabled: true }
      ],
      daterangeValue: null,
      monthrangeValue: null,
      dateValue: null,
      monthValue: null,
      columns:[
        {
          prop:'xxx',
          label:'姓名',
          type:'textColor',
          color:'#3b86ff',
          onClick: (row) => {
            console.log(row)
          },
          cursor: true,
          textNormal: true,
        },
        {
          type:'slot',
          slotID:'age',
          prop:'xxx',
          label:'年龄'
        },
        {
          prop:'xxx',
          label:'性别',
        },
        {
          label:'图片',
          prop:'photo',
          showPhotos:true
        },
        {
          prop: 'status',
          label: '状态',
          type: 'colorTag',
          isBorder: true,
          tagColor: (row) => {
            return {0: '#000', 1: '#fff'}[row.status]
          },
          text: (row) => {
            return {0: '未销警', 1: '已销警'}[row.status]
          },
          isFilter: true,
          filters: [
            {text: '未销警', value: 0},
            {text: '已销警', value: 1},
          ],
        },
        {
          label:'图标',
          prop:'icon',
          width:120,
          isIcon: true,
          icon:'el-icon-eleme',
          onClick(row){
            console.log(row)
          },
        },
        {
          type:'slotMultiple',
          slotID:'phone',
        },
        {
          label:'操作',
          width:160,
          headerAlign:'center',
          buttons:[
            {
              text:'编辑',
              type:'text',
              onClick(row){
                console.log('编辑')
              },
            },
            {
              text:'删除',
              type:'text',
              onClick(row){
                console.log('删除')
              },
            }
          ],
        }
      ],
      tableData:[
        {xxx:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',status:1,photo:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fc8%2Fe3%2Fd9%2Fc8e3d9870576652b3204a01e69cfabed.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645002259&t=2c40ae953a522e4d480bf9af288fa558'},
        {xxx:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',status:0},
        {xxx:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',status:1}
      ],
    };
  },
  methods: {
    tns() {
      console.log("我也可以实现了");
    },
    tnsView() {
      // ZViewerModal([''])
      // utils.previewFile({
      //   fileUrl: 'pdf地址',
      //   fileName: '这个是文件的名称'
      // })
      // 一张图片
      // utils.previewFile({
      //   fileUrl: '图片地址',
      //   fileName: '这个是图片的名称'
      // })
      // 多张
      utils.previewImages({
        // // 图片资源集合
        imageList: [
          {
            larger: 'https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/9c16fdfaaf51f3dee3fbb43696eef01f3a297912.jpg',
            thumb: 'https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/9c16fdfaaf51f3dee3fbb43696eef01f3a297912.jpg',
            name: '这个是文件1的名称'
          },
          {
            larger: 'https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/9c16fdfaaf51f3dee3fbb43696eef01f3a297912.jpg',
            thumb: 'https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/9c16fdfaaf51f3dee3fbb43696eef01f3a297912.jpg',
            name: '这个是文件2的名称'
          }
        ],
        // 预览图片的下标
        previewIndex: 1
      })
      console.log("我也可以实现了");
    },
    weekChange(e){
      console.log(e)
    },
    onUploadProcessFileSuccess (files) {
      files.forEach(f => this.uploadFiles.push(f))
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.demo {
  width: 60px;
  font-size: 14px;
}
.table_header{
  background:#fafbfc;
}
</style>
