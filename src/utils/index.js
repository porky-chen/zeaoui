/*
* 工具方法
* */

import ZViewerModal from "../components/z-viewer-model";
import ZImageViewer from "../components/z-images/popup";


/**
 * 判断图片
 * @param url
 * @returns {Boolean}
 */
function isImage(url) {
  if (!url) {
    return false
  }

  return /.(png|jpg|jpeg|bmp|gif)$/i.test(url)
}

/**
 * 判断PDF
 * @param url
 * @returns {Boolean}
 */
function isPDF(url) {
  if (!url) {
    return false
  }

  return /.pdf$/i.test(url)
}

/**
 * 文件预览
 * @param fileUrl 图片或PDF地址
 * @param fileName 名字
 */
function previewFile({fileUrl, fileName}) {
  // 如果是pdf预览
  if (isPDF(fileUrl)) {
    ZViewerModal([fileUrl])
  }
  // 如果是图片预览
  else if (isImage(fileUrl)) {
    ZImageViewer([{
      name: fileName,
      thumb: fileUrl,
      larger: fileUrl,
    }], 0)
  }
}

/**
 * 图片集合的预览
 * @param imageList 图片数据集合(name, thumb, larger)
 * @param previewIndex 预览图片的序号，默认从那张图片开始
 */
function previewImages({imageList, previewIndex}) {
  // 过滤获取是图片的集合
  let imageDataList = (imageList || []).filter(item => {
    return isImage(item.larger || item.thumb)
  })
  imageDataList = imageDataList.map(item => {
    return {
      // 	文件名称
      name: item.name,
      // 缩略图的url
      thumb: item.thumb,
      // 大图的url
      larger: item.larger,
    }
  })
  console.log(imageDataList, 'imageDataList')
  ZImageViewer(imageDataList, previewIndex || 0)
}

export default {
  isPDF,
  isImage,
  previewFile,
  previewImages
}
