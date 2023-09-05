<template>
  <div>
    <el-button type="primary" size="small" @click="exportWord">点击下载</el-button>
    <div ref="charts" class="charts" id="charts"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";
import ImageModule from 'docxtemplater-image-module-free'
export default {
  name: "exportChart",
  data(){
    return{
      xAlis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      yAxis: [120, 200, 150, 80, 70, 110, 130]
    }
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    // 初始化图标
    initCharts() {
      let myChart = echarts.init(this.$refs.charts);
      let option = {
        xAxis: {
          type: "category",
          data: this.xAlis,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.yAxis,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },
    // 导出文档
    exportWord() {
      let _this = this;
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent(
        "chartTemplate.docx", // 1.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
        function (error, content) {
        // 抛出异常
        if (error) console.warn(error); 
        // 图片处理
        let opts = {};
        opts.centered = false; // 图片居中，在word模板中定义方式为{%%image}
        opts.fileType = "docx";
        opts.getImage = function (chartId) {
          return _this.getBase64Sync(chartId);
        };
        opts.getSize = function () {
          return [150, 35];
        };
  
        let imageModule = new ImageModule(opts);
        // 创建一个JSZip实例，内容为模板的内容
        const zip = new PizZip(content);
        // 创建并加载docxtemplater实例对象
        let doc = new docxtemplater();
        doc.attachModule(imageModule);
        doc.loadZip(zip);

        // 设置模板变量的值
        doc.setData({
          ..._this.list,
          list: _this.data,//需要循环的数据
          imgUrl :  _this.base64,//图片获取的base6
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
          console.log(
           e
          );
          throw error;
        }

        // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
        const out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        // 将目标文件对象保存为目标类型的文件，并命名
        saveAs(out, "柱状图.docx");
      });

    },
    /**
     * 将图片的url路径转为base64路径
     * @param {Object} imgUrl 图片路径
     */
    getBase64Sync(imgUrl) {
      window.URL = window.URL || window.webkitURL;
      var xhr = new XMLHttpRequest();
      xhr.open("get", imgUrl, true);
      xhr.responseType = "blob";
      xhr.onload = function () {
        if (this.status == 200) {
          //得到一个blob对象
          var blob = this.response;
          console.log("blob", blob);
          // 至关重要
          let oFileReader = new FileReader();
          oFileReader.onloadend = function (e) {
            // 此处拿到的已经是base64的图片了,可以赋值做相应的处理
            console.log(e.target.result);
          };
          oFileReader.readAsDataURL(blob);
        }
      };
      xhr.send();
    },
  },
};
</script>

<style>
.charts {
  margin: auto;
  width: 800px;
  height: 600px;
}
</style>