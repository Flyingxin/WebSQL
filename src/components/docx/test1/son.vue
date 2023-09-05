<template>
  <!-- 导出word模版 -->
  <div class="approvalNo-or-opinionNo-list">
    <el-button type="primary" size="small" @click="exportWord"
      >点击下载</el-button
    >
    <div
      style="width: 600px; height: 300px; margin: 0 auto"
      v-for="(item, index) in option"
      :key="index"
    >
      <div :options="item" ref="chart"></div>
    </div>
  </div>
</template>

<script>
import docxtemplater from "docxtemplater";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import PizZip from "pizzip";
export default {
  data() {
    return {
      option : {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      }
    };
  },
  methods: {
    // 导出echarts图片，格式转换
    base64DataURLToArrayBuffer(dataURL) {
      const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/;
      if (!base64Regex.test(dataURL)) {
        return false;
      }
      const stringBase64 = dataURL.replace(base64Regex, "");
      let binaryString;
      if (typeof window !== "undefined") {
        binaryString = window.atob(stringBase64);
      } else {
        binaryString = new Buffer(stringBase64, "base64").toString("binary");
      }
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        const ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
      }
      return bytes.buffer;
    },
    // 导出文档
    exportWord() {
      const ImageModule = require("docxtemplater-image-module-free");
      const that = this;
      // 存放echarts 图表 base64图片数组
      const str = [];
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent(`chartTemplate.docx`, (error, content) => {
        if (error) {
          // 抛出异常
          throw error;
        }
        const zip = new PizZip(content); // 创建一个JSZip实例，内容为模板的内容
        const doc = new docxtemplater();
        doc.loadZip(zip); // 创建并加载docxtemplater实例对象
        //   如果有echarts图表
          // 图片处理
          const opts = {};
          opts.centered = true; // 图片居中，在word模板中定义方式为{%%image}
          opts.fileType = "docx";
          opts.getImage = (chartId) => {
            return that.base64DataURLToArrayBuffer(chartId);
          };
          opts.getSize = () => {
            return [600, 300];
          };
          const imageModule = new ImageModule(opts);
          doc.attachModule(imageModule);
          console.log(imageModule);
        try {
          doc.render(); // 用模板变量的值替换所有模板变量
        } catch (error) {
          const e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
          };
          console.log(JSON.stringify({ error: e }));
          throw error; // 抛出异常
        }
        // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
        const out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        // 将目标文件对象保存为目标类型的文件，并命名
        saveAs(out, `柱状图.docx`);
      });
    },
    // 初始化图标
    initCharts() {
      let myChart = echarts.init(this.$refs.chart);
      option && myChart.setOption(this.option);
    }

  },
};
</script>

<style lang="less">
.approvalNo-or-opinionNo-list {
  height: 350px;
  overflow-y: auto;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  > #pdfDom {
    table {
      text-align: center;
      border-bottom: 1px solid #ccc;
      width: 93%;
      margin: 0 auto;
      font-family: "楷体", "楷体_GB2312";
      caption {
        font-size: 16px;
        text-align: center;
        line-height: 46px;
        color: #333;
        font-weight: bold;
      }
      td {
        width: 25%;
        height: 32px;
        color: #666;
        border-left: 1px solid #ccc;
        border-top: 1px solid #ccc;
        padding: 0 6px;
      }
      td:last-child {
        border-right: 1px solid #ccc;
      }
      .key-name {
        color: #333;
        font-weight: 600;
      }
      .options {
        padding: 10px;
        text-align: justify;
        text-indent: 2em;
      }
    }
  }
}
</style>
