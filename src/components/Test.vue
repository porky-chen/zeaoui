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
        <z-button @click="tns" type="text" icon="el-icon-view"
          >文字按钮</z-button
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
    <el-row style="margin-top:20px" type="flex">
      <z-radio :data="radioData" v-model="radioValue"></z-radio>
      <z-radio
        :data="disabledData"
        v-model="disabledValue"
        :isNormalCheck="false"
        style="margin:40px"
      ></z-radio>
    </el-row>
    <!-- z-tooltip -->
    <div
      style="display:flex;justify-content:space-around;align-items:center;height:300px"
    >
      <div>
        <z-tooltip
          effect="dark"
          content="我是默認content的内容"
          placement="top-start"
        >
          <z-button plain>深色上边</z-button>
        </z-tooltip>
      </div>
      <div>
        <z-tooltip effect="dark" placement="left-start">
          <template slot="content">我是插桥slot="content"的内容</template>
          <z-button plain>深色左边</z-button>
        </z-tooltip>
      </div>
      <div>
        <z-tooltip
          effect="dark"
          content="我是默認content的内容，我是通过类名限制宽度的换行"
          popper-class="demo"
          placement="right-start"
        >
          <z-button plain>深色右边</z-button>
        </z-tooltip>
      </div>
      <div>
        <z-tooltip effect="dark" placement="bottom-start">
          <template slot="content"
            >我是插桥slot="content"的<br />内容自定义的换行</template
          >
          <z-button plain>深色下边</z-button>
        </z-tooltip>
      </div>
    </div>
    <div
      style="display:flex;justify-content:space-around;align-items:center;height:300px"
    >
      <div>
        <z-tooltip
          effect="light"
          content="我是默認content的内容"
          placement="top-start"
        >
          <z-button plain>浅色上边</z-button>
        </z-tooltip>
      </div>
      <div>
        <z-tooltip effect="light" placement="left-start">
          <template slot="content">我是插桥slot="content"的内容</template>
          <z-button plain>浅色左边</z-button>
        </z-tooltip>
      </div>
      <div>
        <z-tooltip
          effect="light"
          content="我是默認content的内容，我是通过类名限制宽度的换行"
          popper-class="demo"
          placement="right-start"
        >
          <z-button plain>浅色右边</z-button>
        </z-tooltip>
      </div>
      <div>
        <z-tooltip effect="light" placement="bottom-start">
          <template slot="content"
            >我是插桥slot="content"的<br />内容自定义的换行</template
          >
          <z-button plain>浅色下边</z-button>
        </z-tooltip>
      </div>
    </div>
    <el-row style="margin-top:20px" type="flex">
      <div style='display:flex;justify-content:center;'>
      <div style='margin:40px;'>
        <span>选则日期</span>
        <z-date v-model='dateValue' type='date'
                 disabled=''
                 value-format='yyyy-MM-dd'
                 placeholder='选择日期' />
      </div>
      <div style='margin:40px;'>
        <span>带快捷选项</span>
        <z-date
          v-model='dateValue'
          :picker-options='pickerOptions'
          align='left'
          type='date'
          value-format='yyyy-MM-dd'
          placeholder='选择日期'
        />
      </div>
      <div style='margin:40px;'>
        <span>选则年</span>
        <z-date v-model='monthValue' type='year' format='yyyy' value-format='yyyy' placeholder='选择年' @change='weekChange' />
      </div>
    </div>
      <div style="">
        <div style="margin:40px;">
          <span>选则日期范围</span>
          <z-date
            v-model="daterangeValue"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div style="margin:40px;">
          <span>选则月范围</span>
          <z-date
            v-model="monthrangeValue"
            type="monthrange"
            format="yyyy-MM"
            valueFormat="yyyy-MM"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
      </div>
    </el-row>
    <el-row style="margin-top:20px" type="flex"></el-row>
  </div>
</template>

<script>
import ZButton from "./z-button/z-button.vue";
import ZRadio from "./z-radio.vue";
import ZTooltip from "./z-tooltip.vue";
import ZDate from "./z-date-picker.vue";

export default {
  name: "HelloWorld",
  components: {
    ZButton,
    ZRadio,
    ZTooltip,
    ZDate
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
    };
  },
  methods: {
    tns() {
      console.log("我也可以实现了");
    },
    weekChange(e){console.log(e)},
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.demo {
  width: 60px;
  font-size: 14px;
}
</style>
