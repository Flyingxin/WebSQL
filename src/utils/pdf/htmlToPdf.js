// htmlToPdf.js
// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import jsPDF from 'jspdf'
import {downloadFile} from './util'

export default {
  install(Vue, options) {
    Vue.prototype.getPdf = function (scrollBox,title) {
      let scrollDom = document.querySelector(scrollBox)
      // let mainDom = document.querySelector(mainBox)
      let scrollHeight = scrollDom.scrollHeight //滚动总高度
      let clientWidth = scrollDom.clientWidth //滚动总高度
      console.log('高',scrollHeight,'宽',clientWidth)
      // let offsetHeight = scrollDom.offsetHeight //可见高度
      // console.log('==========',scrollHeight,offsetHeight,clientHeight)

      //横向打印
      if (scrollHeight <= clientWidth-450) {
        console.log('横')

        html2Canvas(scrollDom, {
          allowTaint: true,
          taintTest: false,
          useCORS: true,
          y: 0, // 页面在垂直方向的滚动距离
          windowHeight: scrollHeight+160, // 获取y方向滚动条中的内容
          // width:1200,
          // height:2000,
          dpi: window.devicePixelRatio * 4, //将分辨率提高到特定的DPI 提高四倍
          scale: 4 //按比例增加分辨率
        }).then(function (canvas) {
          let pdf = new jsPDF('l', 'mm', 'a4') // A3纸，横向
          let ctx = canvas.getContext('2d')
          let a4w = 190;
          let a4h = 277 // A4大小，210mm x 297mm，四边各保留10mm的边距，显示区域190x277
          let imgHeight = Math.floor(a4w * canvas.width / a4h) // 按A4显示比例换算一页图像的像素高度[这个是横向打印的计算方法]
          let renderedHeight = 0

          while (renderedHeight < canvas.height) {
            let page = document.createElement('canvas')
            page.width = canvas.width
            page.height = Math.min(imgHeight, canvas.height - renderedHeight)// 可能内容不足一页

            // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
            page.getContext('2d').putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0)
            // pdf.addImage(page.toDataURL('image/jpeg', 1.0), 'JPEG', 10, 10, a4w, Math.min(a4h, a4w * page.height / page.width)) // 添加图像到页面，保留10mm边距 [a4使用]
            pdf.addImage(page.toDataURL('image/jpeg', 1.0), 'JPEG', 10, 10, a4w * 1.45, Math.min(a4h, a4w * page.height / page.width) * 1.45) // 添加图像到页面，保留10mm边距[a3使用1.414换算比例]

            renderedHeight += imgHeight
            // console.log('imgHeight', imgHeight)
            // console.log('renderedHeight', renderedHeight)
            // console.log('canvas.height', canvas.height)
            if (renderedHeight < canvas.height) {
              pdf.addPage()// 如果后面还有内容，添加一个空页
            }
            // delete page;
          }
          // 保存文件
          // pdf.save(title + '.pdf')
          const blob = convertBase64ToBlob(pdf.output('datauristring'))
          downloadFile(blob, title + '.pdf')

        }).catch(err => {
          console.log('捕获异常',err)          
        })

      } else { //纵向打印
        console.log('竖')

        html2Canvas(scrollDom, {
          allowTaint: true,
          taintTest: false,
          useCORS: true,
          y: 0, // 页面在垂直方向的滚动距离
          windowHeight: scrollHeight + 180, // 获取y方向滚动条中的内容
          // width:1200,
          // height:2000,
          dpi: window.devicePixelRatio * 4, //将分辨率提高到特定的DPI 提高四倍
          scale: 4 //按比例增加分辨率
        }).then(function (canvas) {
          let PDF = new jsPDF('', 'pt', 'a4')
          let contentWidth = canvas.width
          let contentHeight = canvas.height
          let pageHeight = contentWidth / 592.28 * 841.89
          let leftHeight = contentHeight
          let position = 0
          let imgWidth = 595.28
          let imgHeight = 592.28 / contentWidth * contentHeight
          let pageData = canvas.toDataURL('image/jpeg', 1.0)
          if (leftHeight < pageHeight) {
            PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
          } else {
            while (leftHeight > 0) {
              PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
              leftHeight -= pageHeight
              position -= 841.89
              if (leftHeight > 0) {
                PDF.addPage()
              }
            }
          }
          const blob = convertBase64ToBlob(PDF.output('datauristring'))
          downloadFile(blob, title + '.pdf')
          // PDF.save(title + '.pdf')
        },err => {
          console.log('捕获异常',err)
        })
      }
    }
  }
}


function convertBase64ToBlob(imageEditorBase64) {
  var base64Arr = imageEditorBase64.split(",");
  var imgtype = "";
  var base64String = "";
  if (base64Arr.length > 1) {
    //如果是图片base64，去掉头信息
    base64String = base64Arr[1];
    imgtype = base64Arr[0].substring(
      base64Arr[0].indexOf(":") + 1,
      base64Arr[0].indexOf(";")
    );
  }
  // 将base64解码
  var bytes = atob(base64String);
  //var bytes = base64;
  var bytesCode = new ArrayBuffer(bytes.length);
  // 转换为类型化数组
  var byteArray = new Uint8Array(bytesCode);

  // 将base64转换为ascii码
  for (var i = 0; i < bytes.length; i++) {
    byteArray[i] = bytes.charCodeAt(i);
  }

  // 生成Blob对象（文件对象）
  return new Blob([bytesCode], { type: imgtype });
}
