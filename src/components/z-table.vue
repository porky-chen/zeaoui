<!--
 - All rights reserved.
 - @author Zeao
 - Description: z-table table组件
 - Changelog:
 - Revision 1.0 2022-01-17  Zeao
 - - 初始化
 -->
<template>
    <div>
      <el-table v-bind="$attrs" v-on='filterAttributes({
                  targetObj: $listeners,
                  excludePrefixes: ["row-click", "selection-change"]
                  })' ref="table"
                :data="data"
                :height='tableHeight'
                :row-class-name="rowClassName"
                :header-row-class-name='$attrs["header-row-class-name"] || headerRowClassName'
                :header-cell-style="$attrs['header-cell-style'] || headerCellStyle"
                @row-click='handleRowClick'
                @selection-change='handleSelectionChange'
      >
        <template slot="append">
          <slot name="append"></slot>
        </template>
        <div class='empty' v-if='$slots.empty' slot='empty'>
          <slot name='empty'></slot>
        </div>
        <slot>
          <el-table-column
            v-if='showCheckbox'
            width='49'
            type='selection'
            :resizable='false'
            :selectable='selectable'
          />

          <el-table-column
            v-if='showIndex'
            :width='indexwidth'
            type='index'
            :fixed='indexFixed'
            :index='index'
            :resizable='false'
            header-align='center'
            align='center'
            label='序号'
          />

          <template v-for='(v, k) of columns'>
            <el-table-column v-if='v.buttons'
                             :resizable='v.resizable !== undefined ? v.resizable : true'
                             :key="'col' + k"
                             :prop='v.prop'
                             :label="v.label || '操作'"
                             :width='v.width || 60'
                             :min-width='getTableColumnMinWidth(v, 80)'
                             :align="v.align || 'left'"
                             :header-align="v.headerAlign || 'left'"
                             :column-key='v.prop'
                             :filters='v.filters'
                             :fixed='v.fixed'
                             :render-header='v.renderHeader'
            >
              <div class='buttons-cell' slot-scope='scope'>
                <template v-if='v.round'>
                  <!-- 为空时:透明,primary:蓝色,success为绿色,info:灰色,warning:橙色,danger:红色 -->
                  <el-button
                    :type='getType(v, scope.row)'
                    round
                    size='mini'
                    plain
                    @click='handleClick(x.onClick, scope)'
                    v-for='(x, i) of v.buttons'
                    :key="'btn' + i"
                    :loading='loading'
                  >
                    {{ getBtnText(x, scope.row) }}
                  </el-button>
                </template>

                <template v-else v-for='(x, i) of v.buttons'>
                  <z-button
                    v-if='getBtnText(x, scope.row)'
                    :key="'btn' + i"
                    :disabled='handleDisabled(x, scope.row)'
                    :fa='x.fa'
                    :type='x.type'
                    :icon='x.icon'
                    @click='handleClick(x.onClick, scope)'
                    :loading='loading'
                  >
                  <span
                    class='action-button'
                    :style="{
                      color: (x.color && (Object.prototype.toString.call(x.color) === '[object Function]' ? x.color(scope.row) : x.color)) || 'rgba(52, 139, 245, 1)',
                    }"
                  >
                    {{ getBtnText(x, scope.row) }}
                  </span>
                  </z-button>
                </template>
              </div>
            </el-table-column>

            <el-table-column
              v-else-if="v.type === 'textColor'"
              :show-overflow-tooltip='true'
              :key="'textColor' + k"
              :label='v.label'
              :fixed='v.fixed'
              :min-width='getTableColumnMinWidth(v, 100)'
              :prop='v.prop'
              :resizable='v.resizable !== undefined ? v.resizable : true'
              :sortable='v.sortable'
              :sort-method='v.sortMethod'
              :filters='v.filters'
              :filter-method='v.filterMethod'
              :width='v.width'
              :column-key='v.prop'
              :align="v.align || 'left'"
              :header-align="v.headerAlign || 'left'"
              :render-header='v.renderHeader'
            >
              <template slot-scope='scope'>
                <strong
                  class='text-overflow'
                  @click='handleClick(v.onClick, scope)'
                  :class="{cursor: v.cursor, 'text-normal': v.textNormal, 'underline': getUnderline(v, scope.row)}"
                  :style='{
                    color: `${getColor(v, scope.row)}`,
                  }'
                >
                  {{ getColorText(v, scope.row) }}
                </strong>
              </template>
            </el-table-column>

            <el-table-column
              v-else-if="v.type === 'colorTag' && v.filters !== undefined"
              :filter-multiple='v.multiple === undefined'
              :filters='v.filters'
              :filter-method='v.filterMethod || filterHandler'
              filter-placement='bottom-end'
              :key="'colorTag' + k"
              :label='v.label'
              :fixed='v.fixed'
              :min-width='getTableColumnMinWidth(v, 100)'
              :prop='v.prop'
              :resizable='v.resizable !== undefined ? v.resizable : true'
              :sortable='v.sortable'
              :sort-method='v.sortMethod'
              :width='v.width'
              :column-key='v.prop'
              :align="v.align || 'left'"
              :header-align="v.headerAlign || 'left'"
              :render-header='v.renderHeader'
            >
              <template slot-scope='scope'>
                <el-tag
                  v-if="getTypeTool(v, scope.row, 'isBorder')"
                  :effect="getTypeTool(v, scope.row, 'effect')"
                  :type="getTypeTool(v, scope.row, 'tagType')"
                  :color="getTypeTool(v, scope.row, 'tagColor')"
                >
                  {{ getBtnText(v, scope.row) }}
                </el-tag>
                <div
                  v-else
                  :class="`su-tabele-tag su-tabele-tag-${getTypeTool(v, scope.row, 'tagType')}`"
                >
                  {{ getBtnText(v, scope.row) }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-else-if="v.type === 'colorTag' && v.filters === undefined"
              :key="'colorTag' + k"
              :label='v.label'
              :fixed='v.fixed'
              :min-width='getTableColumnMinWidth(v, 100)'
              :prop='v.prop'
              :resizable='v.resizable !== undefined ? v.resizable : true'
              :sortable='v.sortable'
              :sort-method='v.sortMethod'
              :width='v.width'
              :column-key='v.prop'
              :align="v.align || 'left'"
              :header-align="v.headerAlign || 'left'"
              :render-header='v.renderHeader'
            >
              <template slot-scope='scope'>
                <el-tag
                  v-if="getTypeTool(v, scope.row, 'isBorder')"
                  :effect="getTypeTool(v, scope.row, 'effect')"
                  :type="getTypeTool(v, scope.row, 'tagType')"
                  :color="getTypeTool(v, scope.row, 'tagColor')"
                >
                  {{ getBtnText(v, scope.row) }}
                </el-tag>
                <div
                  v-else
                  :class="`su-tabele-tag su-tabele-tag-${getTypeTool(v, scope.row, 'tagType')}`"
                >
                  {{ getBtnText(v, scope.row) }}
                </div>
              </template>
            </el-table-column>

            <el-table-column
              v-else-if='v.isIcon'
              :fixed='v.fixed'
              :formatter='v.formatter'
              :key='v.prop + k'
              :resizable='v.resizable !== undefined ? v.resizable : true'
              :label='v.label'
              :min-width='getTableColumnMinWidth(v, 100)'
              :width='v.width'
              :align="v.align || 'left'"
              :header-align="v.headerAlign || 'left'"
              :render-header='v.renderHeader'
            >
              <template slot-scope='scope'>
                <i :class='v.icon' style='cursor: pointer' @click='handleClick(v.onClick, scope)'></i>
              </template>
            </el-table-column>

            <el-table-column
              :class-name='v.class'
              v-else-if='v.icon'
              :fixed='v.fixed'
              :formatter='v.formatter'
              :key='v.prop + k'
              :label='v.label'
              :resizable='v.resizable !== undefined ? v.resizable : true'
              :min-width='getTableColumnMinWidth(v, 100)'
              :width='v.width'
              :show-overflow-tooltip='v.showOverflowTooltip !== undefined ? v.showOverflowTooltip : true'
              :sortable='v.sortable'
              :sort-method='v.sortMethod'
              :filters='v.filters'
              :align="v.align || 'left'"
              :header-align="v.headerAlign || 'left'"
              :render-header='v.renderHeader'
            >
              <template slot-scope='scope'>
                <div
                  :style="`display:flex;align-items:center;justify-content:${
                    v.align === 'right' ? 'flex-end' : 'flex-start'
                  }`">
                  <img :src='getUrl(v, scope.row)' style='height: 12px' />
                  <div
                    style='
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-left: 10px;
              '>
                    {{ getText(v, scope.row) }}
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              v-else-if='v.showPhotos'
              :class-name='v.class'
              :fixed='v.fixed'
              :formatter='v.formatter'
              :key='v.prop + k'
              :label='v.label'
              :resizable='v.resizable !== undefined ? v.resizable : true'
              :min-width='getTableColumnMinWidth(v, 100)'
              :show-overflow-tooltip='v.showOverflowTooltip !== undefined ? v.showOverflowTooltip : true'
              :sortable='v.sortable'
              :sort-method='v.sortMethod'
              :width='v.width'
              :align="v.align || 'left'"
              :header-align="v.headerAlign || 'left'"
              :render-header='v.renderHeader'
            >
              <template slot-scope='scope'>
                <img
                  v-for='(url, index) in getPhotos(v, scope.row)'
                  :key='index'
                  :src='url'
                  class='photo'
                  @click='photoClick(url)'
                />
              </template>
            </el-table-column>

            <el-table-column
              v-else-if='v.isFilter'
              :fixed='v.fixed'
              :formatter='v.formatter'
              :key='v.prop + k'
              :label='v.label'
              :resizable='v.resizable !== undefined ? v.resizable : true'
              :min-width='getTableColumnMinWidth(v, 100)'
              :prop='v.prop'
              :show-overflow-tooltip='v.showOverflowTooltip !== undefined ? v.showOverflowTooltip : true'
              :sortable='v.sortable'
              :sort-method='v.sortMethod'
              :width='v.width'
              :column-key='v.prop'
              :filter-multiple='v.multiple === undefined'
              :filters='v.filters'
              :filter-method='v.filterMethod || filterHandler'
              filter-placement='bottom-end'
              :align="v.align || 'left'"
              :header-align="v.headerAlign || 'left'"
              :render-header='v.renderHeader'
            />

            <el-table-column
              v-else-if="v.type === 'slot'"
              :key="'slot' + k"
              :label='v.label'
              :fixed='v.fixed'
              :min-width='getTableColumnMinWidth(v, 100)'
              :prop='v.prop'
              :sortable='v.sortable'
              :sort-method='v.sortMethod'
              :resizable='v.resizable !== undefined ? v.resizable : true'
              :width='v.width'
              :column-key='v.prop'
              :filter-multiple='v.multiple === undefined'
              :filters='v.filters'
              filter-placement='bottom-end'
              :filter-method='v.filters && v.filters.length > 0 ? (v.filterMethod || filterHandler) : null'
              :align="v.align || 'left'"
              :header-align="v.headerAlign || 'left'"
              :render-header='v.renderHeader'
            >
              <template slot-scope='scope'>
                <slot :name='v.slotID' :item='scope.row'></slot>
              </template>
            </el-table-column>

            <template v-else-if="v.type === 'slotMultiple'">
              <slot :name="v.slotID"></slot>
            </template>

            <el-table-column
              v-else
              :class-name='v.class'
              :fixed='v.fixed'
              :resizable='v.resizable !== undefined ? v.resizable : true'
              :formatter='v.formatter'
              :key='v.prop + k'
              :label='v.label'
              :min-width='getTableColumnMinWidth(v, 100)'
              :prop='v.prop'
              :show-overflow-tooltip='v.showOverflowTooltip !== undefined ? v.showOverflowTooltip : true'
              :sortable='v.sortable'
              :width='v.width'
              :column-key='v.prop'
              :filter-multiple='v.multiple === undefined'
              :align="v.align || 'left'"
              :header-align="v.headerAlign || 'left'"
              :render-header='v.renderHeader'
              :sort-method='v.sortMethod'
            />
          </template>
        </slot>
      </el-table>
    </div>
</template>

<script>
import ZViewer from './z-viewer-model/index'
import ComponentUtil from '../mixins/component-util'
import ZButton from './z-button/z-button.vue'

export default {
  name: "z-table",
  mixins:[ComponentUtil],
  components:{
    ZButton
  },
  props:{
    columns:{
      type: Array,
      default(){
        return []
      }
    },
    indexFixed: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Function,
      default(index) {
        return index + 1
      },
    },
    data: {
      type: Array,
      default() {
        return []
      },
    },
    indexwidth: {
      type: String,
      default: () => {
        return '62'
      },
    },
    showIndex: {
      type: Boolean,
      default: true,
    },
    selectable: {
      type: Function,
      default() {
        return true
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showCheckbox: {
      type: Boolean,
      default: true,
    },
    // 默认点击行不选中该行的复选框
    clickRowCheck: {
      type: Boolean,
      default: false,
    },
    rowClassName: {
      type: Function,
      default: () => {
        return 'row-defalut-class'
      },
    },
    headerRowClassName: {
      type: Function,
      default: () => {
        return 'header-defalut-row-class'
      },
    },
    headerCellStyle: {
      type: Function,
      default: () => {
        return {background:'#fafbfc'}
      },
    },
  },
  data(){
    return {
      tableHeight: null,
    }
  },
  watch:{
    height(val) {
      if (!(navigator.userAgent.toLocaleLowerCase().indexOf('qqbrowse') > -1)) {
        this.tableHeight = val
      }
    },
  },
  computed:{
    // 搜索，过滤等图片的宽度
    widthOfSearchFilterIcon() {
      return 24
    },
    // 字体大小
    fontSize() {
      return this.$attrs.fontSize || (this.$ELEMENT || {}).fontSize || 14
    },
    // 字体比例
    fontRate() {
      return {
        ...{
          CHAR_RATE: 1.1, // 汉字比率
          NUM_RATE: 0.65, // 数字
          OTHER_RATE: 0.5, // 除汉字和数字以外的字符的比率
        }, // 默认值
        ...(this.$ELEMENT || {}).fontRate || {}, // 根注册参数 (Vue.use 时的第二个参数)
        ...this.$attrs.fontRate || {}, // 父组件属性
      }
    },
  },
  created() {
  },
  mounted() {
    if (!(navigator.userAgent.toLocaleLowerCase().indexOf('qqbrowse') > -1)) {
      this.tableHeight = this.height
    }
  },
  methods:{
    getRef() {
      return this.$refs.table
    },
    clearSelection() {
      this.$refs.table.clearSelection()
    },
    clearFilter(filters) {
      this.$refs.table.clearFilter(filters)
    },
    getTableColumnMinWidth(item, defaultWidth) {
      // 自定义宽度信息
      if (item.customWidth) {
        return item.minWidth || defaultWidth
      }
      // 自适应宽度
      let computedWidth = item.label.length * this.fontRate.CHAR_RATE * this.fontSize + 20
      if (item.sortable) {
        computedWidth += this.widthOfSearchFilterIcon
      }
      if (item.isFilter) {
        computedWidth += this.widthOfSearchFilterIcon
      }
      return computedWidth
    },
    getType(opts = {}, row = {}) {
      const {type} = opts
      return type instanceof Function ? type(row) : type
    },
    handleClick(callback = () => {
    }, scope = {}) {
      const {row, $index} = scope
      callback(row, $index)
    },
    getBtnText(opts = {}, row = {}) {
      const {text} = opts
      return text instanceof Function ? text(row) : text
    },
    getText(opts = {}, row = {}) {
      const {text} = opts
      return text instanceof Function ? text(row) : row[opts.prop]
    },
    handleDisabled(opts = {},row = {}){
      const { disabled } = opts
      return disabled instanceof Function?disabled(row) : disabled
    },
    getColor(opts = {}, row = {}) {
      const {color} = opts
      return color instanceof Function ? color(row) : color
    },
    getUnderline(opts = {}, row = {}) {
      const {underline} = opts
      return underline instanceof Function ? underline(row) : underline
    },
    getColorText(opts = {}, row = {}) {
      let {text} = opts
      if (text) {
        return text(row)
      } else {
        return row[opts.prop]
      }
    },
    filterHandler(value, row, column) {
      const property = column['property']
      this.$emit('filter-change', {
        key: property,
        value,
        from: 'filterHandler',
      })

      return row[property] === value
    },
    getTypeTool(opts = {}, row = {}, typeStr) {
      const type = opts[typeStr]
      return type instanceof Function ? type(row) : type
    },
    getUrl(opts = {}, row = {}) {
      const {icon} = opts
      return icon instanceof Function ? icon(row) : icon
    },
    // 获取图片Url
    getPhotos(opts = {}, row = {}) {
      return row[opts.prop]
    },
    // 点击图片显示
    photoClick(file) {
      ZViewer([file])
    },
    handleRowClick(row, column, event) {
      row.flag = !row.flag
      if (this.clickRowCheck) {
        this.$refs.table.toggleRowSelection(row)
      }
      this.$emit('row-click', row, column, event)
    },
    handleSelectionChange(selectedRows) {
      this.$emit('selection-change', selectedRows)
    },
    updateInputValue(text, row, opts = {}) {
      const {input} = opts
      if (input) input(text, row)
    },
    changeInputValue(text, row, opts = {}) {
      const {change} = opts
      if (change) change(text, row)
    },
  },
}
</script>

<style lang='sass' scoped>
.action-button
  font-size: 0.9rem
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif

  .el-button.is-disabled.el-button--text ::v-deep
    > span
      > span
        color: #888 !important

  .photo
    margin-right: 5px
    height: 20px
    width: 20px
    cursor: pointer
</style>
<style lang="scss" scoped>
.cursor {
  cursor: pointer;
}
.buttons-cell {
  .el-button {
    padding: 0 12px;
  }
}
</style>
