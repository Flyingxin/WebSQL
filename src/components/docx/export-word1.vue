<template>
  <div>
    <el-button type="primary" size="small" @click="exportWord(fileName)">点击导出</el-button>
    <hr/>
    <div class="content">
      <p>同意书</p>
      <p>您需要签订同意书后，我司方可提供服务，未签订该同意书，本公司不承担责任。</p>
      <p>xxxxx(省略1万字)</p>
      <p>本人以上内容认可并确认：{{lookDetail.name}}</p>
      <p>签名日期：{{lookDetail.order_date}}</p>      
    </div>

  </div>
</template>

<script>
// 定义好word文件模板，再将变量插值进去（图片无效）
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'
export default {
  data() {
    return {
      fileName: 'word1',
      lookDetail: { name: "李四", order_date: "2020-02-26" },
    };
  },
  methods: {
    // 点击导出word
    exportWord(fileName) {
      const that = this;
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent(
        "textTemplate.docx",// gy-agree-service.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
        function (error, content) {
          // 抛出异常
          if (error) console.warn(error)
          
          // 创建一个PizZip实例，内容为模板的内容
          const zip = new PizZip(content);
          // 创建并加载docxtemplater实例对象
          const doc = new Docxtemplater().loadZip(zip);
          // 设置模板变量的值
          doc.setData({
            name: that.lookDetail.name,
            order_date: that.lookDetail.order_date, 
          });
          try {
            // 用模板变量的值替换所有模板变量
            doc.render();
          } catch (error) {
            // 抛出异常
            const e = {
              message: error.message,
              name: error.name,
              stack: error.stack,
              properties: error.properties,
            };
            console.log(JSON.stringify({ error: e }));
            throw error;
          }

          // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
          const out = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
          // 将目标文件对象保存为目标类型的文件，并命名
          if (fileName) {
            saveAs(out, `${fileName}.docx`);            
          } else {
            saveAs(out, `name.docx`);
          }

        }
      );
    },
  },
};
</script>

<style>
.content {
  display: inline-block;
  height: 600px;
  margin: 50px auto;
  text-align: left;
}
</style>