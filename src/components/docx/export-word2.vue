<template>
  <div id="app">
    <el-row>
      <el-button type="primary" @click="exportWord">点击导出</el-button>
    </el-row>
    <div class="table" >
      <el-table
      border
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { wordexport } from "@/utils/wordexport";
export default {
  data() {
    return {
      myChart: null,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
  methods: {
    exportWord() {
      // console.log(this.$refs.echarts);
      let table = document.querySelector(".table");
      wordexport(table,'word2');
    },
  }
};
</script>
<style scoped>
.table {
  display: inline-block;
  width: 600px;
  margin: 50px auto;
}
</style>