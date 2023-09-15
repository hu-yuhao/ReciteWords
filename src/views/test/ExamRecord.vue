<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix header-box">
        <span>考试记录</span>
      </div>
      <el-table :cell-style="rowStyle" 
       :data="examRecord" style="width: 100%" border stripe>
        <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
        <el-table-column align="center" prop="time" label="时间" ></el-table-column>
        <el-table-column align="center" prop="book" label="单词书" ></el-table-column>
        <el-table-column align="center" prop="number" label="测试数量" ></el-table-column>
        <el-table-column align="center" prop="score" label="成绩" ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getUserExamRecordAPI } from '@/api';
export default {
  name:"ExamRecord",
  data() {
    return {
      examRecord:[{time:2022,book:'英语四级',score:50,number:5}],
      index:0,
    }
  },
  methods:{
    async getUserExamRecord(){
      // const res = await getUserExamRecordAPI()
      // this.examRecord = res.data

    },
    rowStyle() {
      return "text-align:center";
    },
  }
}
</script>

<style>

</style>