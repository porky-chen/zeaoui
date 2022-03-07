/**
 * @author czh
 *
 * Description:
 * Changelog:
 *
 * Revision:
 */
 export default {
    methods: {
      /**
       * 获取目标对象里的所需属性组成的对象
       * @param includePrefixes [Array] 所需的前缀集合
       * @param excludePrefixes [Array] 不需要的前缀集合
       * @param targetObj [Object] 目标对象
       * @param replaceKey [Boolean] 是否需要替换key内容
       *
       * @return attributes [Object]
       */
      filterAttributes({includePrefixes, excludePrefixes, targetObj, replaceKey = true}) {
        if (!targetObj) return {}

        let attributes = {}
        for (let key of Object.keys(targetObj)) {
          // 如果属于exclude范围的，则过滤掉
          let beExclude = excludePrefixes && excludePrefixes.findIndex(item => key.startsWith(item)) >= 0
          if (beExclude) {
            continue
          }

          // 如果属于include范围为的，则添加进去
          let beIncludeIndex = includePrefixes ? includePrefixes.findIndex(item => key.startsWith(item)) : -1
          let beInclude = !includePrefixes || beIncludeIndex >= 0
          if (beInclude) {
            let attributeName = beIncludeIndex >= 0 && replaceKey ? key.replace(includePrefixes[beIncludeIndex], '') : key
            attributes[attributeName] = targetObj[key]
          }
        }

        return attributes
      },
    },
  }
