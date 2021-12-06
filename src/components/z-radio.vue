<!--
 - All rights reserved.
 - @author Zeao
 - Description: z-radio 单选框组件
 - Changelog:
 - Revision 1.0 2021-12-03  Zeao 
 - - 初始化
 -->
<template>
  <el-radio-group
    :value="value"
    v-on="
      filterAttributes({
        targetObj: $listeners,
        excludePrefixes: []
      })
    "
    v-bind="$attrs"
  >
    <!--    由于el-radio-group只有一个slot插槽，而下方有了slot默认插槽，因此这段代码可以注释不使用-->
    <!--    <template v-for='name in Object.keys($slots)' v-slot:[name]>-->
    <!--      <slot :name='name' />-->
    <!--    </template>-->
    <slot>
      <el-radio
        v-for="item in data"
        :key="item[valueKey]"
        :label="item[valueKey]"
        :selected="item.checked"
        v-bind="item"
      >
        <slot name="radio" :item="item">
          {{ item[labelKey] }}
        </slot>
      </el-radio>
    </slot>
  </el-radio-group>
</template>

<script>
import componentUtil from "@/mixins/component-util";

export default {
  name: "z-raido",
  mixins: [componentUtil],
  props: {
    value: null,
    // 数据集合
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    // 是否默认选择(true会默认选择第一个)
    isNormalCheck: {
      type: Boolean,
      default: true
    },
    labelKey: {
      type: String,
      default: "label"
    },
    valueKey: {
      type: String,
      default: "value"
    }
  },
  watch: {
    data: {
      handler(data) {
        // 警告提示当单选项少于2个
        if (data && data.length < 2) {
          console.warn("The number of radio must be at least two!");
        }
        // 警告提示当单选项大于6个
        if (data && data.length > 6) {
          console.warn("The number of radio is expected to be less than 6!");
        }
        // 当isNormalCheck为true会默认选择第一个
        if (data && data.length >= 2) {
          if (this.isNormalCheck) {
            let block = false;
            for (let v of data || []) {
              if (v.checked) {
                block = true;
                break;
              }
            }
            if (!block && data && data.length >= 2) {
              data[0].checked = true;
              this.$emit("input", data[0][this.valueKey]); // v-model 的返回值返回第一个选中值
            }
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.setRadio();
  },
  methods: {
    //  会把data数据集第一个checked返回选中状态和数值
    setRadio() {
      for (let item of this.data || []) {
        if (item.checked) {
          this.$emit("input", item[this.valueKey]);
          break;
        }
      }
    }
  }
};
</script>
