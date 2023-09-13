<template>
  <div>
    <div>
    <div>
      <el-card class="box-card1">
        <div slot="header" class="clearfix">
          <h2>请勾选你想要测试的单词书</h2>
        </div>
        <el-row>
          <el-col :span="8">
            <el-radio v-model="radio" :label=1><span>高中英语</span></el-radio>
            <div @click="first" class="grid-content bg-purple">
              <img src="../../assets/u=870860854,928165858&fm=253&fmt=auto&app=138&f=JPEG.webp" alt="">
              <p><span>书名：</span>高中英语</p>
              <p><span>简介：</span>针对高考打造的英语词汇书</p>
              <p><span>适用人群：</span>高中生</p>
            </div>
          </el-col>
          <el-col  :span="8">
            <el-radio v-model="radio" :label=2><span>英语四级</span></el-radio>
            <div @click="second" class="grid-content bg-purple">
              <img src="../../assets/u=870860854,928165858&fm=253&fmt=auto&app=138&f=JPEG.webp" alt="">
              <p><span>书名：</span>英语四级</p>
              <p><span>简介：</span>针对全国英语四级考试打造的英语词汇书</p>
              <p><span>适用人群：</span>高中生、大学生</p>
            </div>
          </el-col>
          <el-col :span="8">
            <el-radio v-model="radio" :label=3><span>英语六级</span></el-radio>
            <div @click="third" class="grid-content bg-purple">
              <img src="../../assets/u=870860854,928165858&fm=253&fmt=auto&app=138&f=JPEG.webp" alt="">
              <p><span>书名：</span>英语六级</p>
              <p><span>简介：</span>针对全国英语六级考试打造的英语词汇书</p>
              <p><span>适用人群：</span>大学生</p>
            </div>
          </el-col>
        </el-row>
    </el-card>

    </div>
    
    <el-drawer
      title="高中英语"
      :visible.sync="drawer1"
      :direction="direction"
      :before-close="handleClose">
      <ol>
        <li v-for="w in book1" :key="w.id">
          <div>
            <div class="w">单词：{{ w.word }}</div>
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
        <li v-for="w in book2" :key="w.id">
          <div>
            <div class="w">单词：{{ w.word }}</div>
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
        <li v-for="w in book3" :key="w.id">
          <div>
            <div class="w">单词：{{ w.word }}</div>
            <div class="m">释义：{{ w.meaning }}</div>
          </div>
        </li>
      </ol>
    </el-drawer>
  </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
        radio:0,
        drawer1: false,
        drawer2: false,
        drawer3: false,
        direction: 'rtl',
        whichBook:'',
        howManyWords:0,
        // 目前都是直接拿的，应该发请求
        book1:this.$store.state.book1,
        book2:this.$store.state.book2,
        book3:this.$store.state.book3
      };
    },
    created(){
      // 此处应发送请求，获取单词书相关信息，封面、名字
    },
    methods: {
      first(){
// 调用接口

        // getBooks(1).then(res=>{
        //   this.book = res.data
        // }
        // )
        this.drawer1 = true
      },
      second(){
        // getBooks(2).then(res=>{
        //   this.book = res.data
        // }
        // )
        this.drawer2 = true
      },
      third(){
        // getBooks(3).then(res=>{
        //   this.book = res.data
        // }
        // )
        this.drawer3 = true
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            // updateBooks(this.book)
            done();
          })
          .catch(_ => {});
      },
      entryExam(){
        if(this.whichBook=='' || this.howManyWords==0){
          this.$message.error('请先选择好相关数据,再开始背单词哦')
        }else{
          this.$message.success('开始背单词')
          const ReWordsInfo = {
            whichBook:this.whichBook,
            howManyWords:this.howManyWords
          }
          this.$store.commit('getReWordsInfo',ReWordsInfo)
          this.$router.push('/srword/recirewords' )
        }
      }
    }
  };
</script>

<style>
.el-radio {
  margin-bottom: 10px;
}
.el-radio span{
  color: red;
  font-size: 18px;
}

.el-col img{
      width: 90%;
      margin-left: 5%;
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
</style>