<!--
  - @author: Zeao
  - @description 预览组件
  -
  - Changelog:
  - Revision 1.0 2022-01-01 Zeao
  - - 初始化
  -->
<template>
  <div>
    <div class='buttonbox'>
      <slot></slot>
      <div class='popupcontent'>
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'z-preview-popup',
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      title: '',
    }
  },
  methods: {},
  mounted() {

  },
}
</script>

<style lang='scss' scoped>
.buttonbox {

  position: relative;

  &:hover {
    .popupcontent {
      display: block;
    }
  }

  .popupcontent {
    display: none;
    position: absolute;
    border-radius: 4px;
    padding: 10px;
    z-index: 2000;
    font-size: 12px;
    line-height: 1.2;
    min-width: 50px;
    top: 0;
    transform: translate(-20%, -150%);

    width: auto;
    word-wrap: break-word;
    text-align: center;
    background: rgba($color: #101010, $alpha: .3);
    transform-origin: center bottom;

  }

}
</style>
