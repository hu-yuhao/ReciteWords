<template>
  <div>
    <div>
    <div>
      <el-card class="box-card1">
        <!-- 选择单词书 -->
        <div>
          <div slot="header" class="clearfix">
            <h3>请勾选你想要测试的单词书</h3>
          </div>
          <el-row>
            <el-col :span="8">
                <el-radio v-model="whichBookExam" label="book1"><span>高中英语</span></el-radio>
                <div @click="first" class="grid-content bg-purple">
                  <img src="../../assets/gaozhong.jpg" alt="">
                  <p><span>书名：</span>高中英语</p>
                  <p><span>简介：</span>针对高考打造的英语词汇书</p>
                  <p><span>适用人群：</span>高中生</p>
                </div>
            </el-col>
            <el-col  :span="8">
              <el-radio v-model="whichBookExam" label="book2"><span>英语四级</span></el-radio>
              <div @click="second" class="grid-content bg-purple">
                <img src="../../assets/cet4.jpg" alt="">
                <p><span>书名：</span>英语四级</p>
                <p><span>简介：</span>针对全国英语四级考试打造的英语词汇书</p>
                <p><span>适用人群：</span>高中生、大学生</p>
              </div>
            </el-col>
            <el-col :span="8">
              <el-radio v-model="whichBookExam" label="book3"><span>英语六级</span></el-radio>
              <div @click="third" class="grid-content bg-purple">
                <img src="../../assets/cet6.jpg" alt="">
                <p><span>书名：</span>英语六级</p>
                <p><span>简介：</span>针对全国英语六级考试打造的英语词汇书</p>
                <p><span>适用人群：</span>大学生</p>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 数量 -->
        <div>
          <h3>确定你想测试的单词数量</h3>
          <div>
            <el-radio-group v-model="examNumber">
              <el-radio-button :label="10">10</el-radio-button>
              <el-radio-button :label="30">30</el-radio-button>
              <el-radio-button :label="50">50</el-radio-button>
              <el-radio-button :label="80">80</el-radio-button>
              <el-radio-button :label="100">100</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <!-- 比例 -->
        <div>
          <h3>选择中英比例</h3>
          <div>
            <el-radio-group v-model="percentage">
              <el-radio-button :label="0.1">10%</el-radio-button>
              <el-radio-button :label="0.2">30%</el-radio-button>
              <el-radio-button :label="0.5">50%</el-radio-button>
              <el-radio-button :label="0.8">80%</el-radio-button>
              <el-radio-button :label="1">100%</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <!-- 时长 -->
        <div>
          <h3>自定义测试时长</h3>
          <div>
            <el-radio-group v-model="testTime">
              <el-radio-button :label="5">5min</el-radio-button>
              <el-radio-button :label="10">10min</el-radio-button>
              <el-radio-button :label="30">30min</el-radio-button>
            </el-radio-group>
          </div>
          <el-button class="entryExam" type="success" @click="entryExam">开始测试</el-button>
        </div>
      </el-card>
    </div>
    
    <el-drawer
      title="高中英语"
      :visible.sync="drawer1"
      :direction="direction"
      :before-close="handleClose">
      <ol>
        <li v-for="w in book" :key="w.id">
          <div>
            <div class="w">单词：{{ w.word }}</div>
            <br>
            <div class="m">释义：{{ w.meaning }}</div>
          </div>
        </li>
      </ol>
    </el-drawer>
    <el-drawer
      title="英语四级"
      :visible.sync="drawer2"
      :direction="direction"
      :before-close="handleClose">
      <ol>
        <li v-for="w in book" :key="w.id">
          <div>
            <div class="w">单词：{{ w.word }}</div>
            <br>
            <div class="m">释义：{{ w.meaning }}</div>
          </div>
        </li>
      </ol>
    </el-drawer>
    <el-drawer
      title="英语六级"
      :visible.sync="drawer3"
      :direction="direction"
      :before-close="handleClose">
      <ol>
        <li v-for="w in book" :key="w.id">
          <div>
            <div class="w">单词：{{ w.word }}</div>
            <br>
            <div class="m">释义：{{ w.meaning }}</div>
          </div>
        </li>
      </ol>
    </el-drawer>
  </div>
  </div>
</template>

<script>
import { getBooksAPI } from '@/api';
export default {
  name:'setExam',
  data() {
      return {
        drawer1: false,
        drawer2: false,
        drawer3: false,
        direction: 'rtl',
        // 记录选择那本单词书
        whichBookExam:'',
        // 比例
        percentage:0,
        // 数量
        examNumber:0,
        // 时间
        testTime:0,
        // 查看的单词书
        book:[],
      };
    },
    created(){
      // 此处应发送请求，获取单词书相关信息，封面、名字
    },
    methods: {
      first(){
        getBooksAPI('book1').then(res=>{
          this.book = res.data.data
        }
        )
        this.drawer1 = true
      },
      second(){
        getBooksAPI('book2').then(res=>{
          this.book = res.data.data
        }
        )
        this.drawer2 = true
      },
      third(){
        getBooksAPI('book3').then(res=>{
          this.book = res.data.data
        }
        )
        this.drawer3 = true
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      entryExam(){
        if(this.whichBookExam=='' || this.examNumber==0 ||this.percentage==0 ||this.testTime==0){
          this.$message.error('请先选择好相关数据,再进入考试哦')
        }else{
          this.$message.success('开始考试')
          const ExamInfo = {
            whichBookExam:this.whichBookExam,
            examNumber:this.examNumber,
            percentage:this.percentage,
            testTime:this.testTime
          }
          // 保存测试相关信息到vuex
          this.$store.commit('getExamInfo',ExamInfo)
          // 跳转到考试页面
          this.$router.push('/startexam' )
        }
      }
    }
  };
</script>

<style scoped>

  .el-col img{
    height: 60%;
  }
  .el-card{
    position: relative;
  }

  .entryExam{
    width: 200px;
    position: absolute;
    bottom: 10%;
    right: 10%;
  }

  .el-radio {
    margin-bottom: 10px;
  }
  .el-radio span{
    color: red;
    font-size: 18px;
  }

  .el-col img{
        width: 70%;
        margin-left: 15%;
      }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    height: 400px;
    margin-right: 20px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .grid-content p {
    padding:10px 0px 0px;
    margin: 0px;
    margin-left: 5%;
    font-size: 20px;
  }

  .grid-content p span{
    font-size: 25px;
    font-weight: bolder;
  }

  .el-drawer ol li .w,
  .el-drawer ol li .m{
    float: left;
  }
  .el-drawer ol li .w{
    display: inline-block;
    width: 250px;
  }

  .el-drawer ol li{
    border: 1px dash black;
  }

  ol li{
    margin-bottom: 30px;
  }

  table{
    width: 100%;
  }

  tr td{
    width: 33%;
  }
</style>