<template>
  <div class="box">
    <h1>WebSQL</h1>
    <!-- 表单 -->
    <div class="form">
      <el-form
        label-position="right"
        label-width="80px"
        :model="userInfo"
      >
        <el-form-item label="姓名">
          <el-input v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="userInfo.tel"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addData()">添加</el-button>
          <el-button size="large" @click="delAllData()">清空列表</el-button>
        </el-form-item>
      </el-form>      
    </div>
    <hr>
    <!-- 表格 -->
    <div class="table">
      <el-table 
      border
      stripe
      :data="userList" 
      align="center" 
      style="width: 100%">
        <el-table-column label="电话" prop="tel"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
      </el-table>      
    </div>
  </div>
</template>

<script>
import { addUser, getUser, delAllUser, createTelData } from "@/api/user";
export default {
  name: "userInfo",
  data() {
    return {
      userInfo: {
        name: "",
        tel: "",
      },
      userList: [],
    };
  },
  methods: {
    // 请求数据
    getData() {
      this.userList = []
      getUser().then((res) => {
        console.log(res);
        let dataList = res.rows;
        for (let i = 0; i < dataList.length; i++) {
          this.userList.push(dataList[i]);
          // console.log(item);
        }
      });
    },
    // 添加用户
    addData() {
      if (this.userInfo.name && this.userInfo.tel) {
        addUser(this.userInfo).then((res) => {
          console.log(res);
          this.userList.push(this.userInfo);
          this.$message({
            message: "添加用户成功",
            type: "success",
          });
        });        
      }else {
        this.$message({
          message: "信息不能为空",
          type: "warning",
        });
      }

    },
    // 清空数据
    delAllData() {
      delAllUser()
        .then((res) => {
          this.$message({
            message: "清空列表成功",
            type: "success",
          });
          this.userList = [];
        })
        .catch((err) => {
          this.$message({
            message: "清空列表失败",
            type: "danger",
          })
        })
    },
  },
  mounted() {
    // 创建表格
    createTelData();
    // 请求数据
    this.getData();
  },
};
</script>

<style scoped>
.box {
  width: 800px;
  margin: auto;
}
h1{
  text-align: center;
}
.form {
  width: 500px;
  margin: 0 auto;
  margin-top: 50px;
}
.table {
  margin-top: 50px;
}
</style>>