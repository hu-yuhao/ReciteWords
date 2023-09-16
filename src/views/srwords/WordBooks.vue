<template>
  <div class="all">
    <div>
      <el-card class="box-card1">
        <div slot="header" class="clearfix">
          <h2>单词书清单：</h2>
        </div>
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <img src="../../assets/gaozhong.jpg" alt="">
              <p>高中英语</p>
              <br>
              <el-button @click="first" type="primary" style="margin-left: 16px;">
                  点击查看单词书
              </el-button>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <img src="../../assets/cet4.jpg" alt="">
              <p>英语四级</p>
              <br>
              <el-button @click="second" type="primary" style="margin-left: 16px;">
                  点击查看单词书
              </el-button>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <img src="../../assets/cet6.jpg" alt="">
              <p>英语六级</p>
              <br>
              <el-button @click="third" type="primary" style="margin-left: 16px;">
                  点击查看单词书
              </el-button>
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
        <li v-for="w in book" :key="w.id">
          <div>
            <div class="w">单词：{{ w.word }}</div>
            <br>
            <div class="m">释义：{{ w.meaning }}</div>
          </div>
          <br>
          <p>
            <span style="width:200px; display: inline-block;">不记得次数:{{ w.count }}</span>
            <template >
              <el-radio v-model="w.state" :label="1">已记住</el-radio>
              <el-radio v-model="w.state" :label="0">未记住</el-radio>
            </template>
          </p>
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
          <br>
          <p>
            <span style="width:200px; display: inline-block;">不记得次数:{{ w.count }}</span>
            <template >
              <el-radio v-model="w.state" :label="1">已记住</el-radio>
              <el-radio v-model="w.state" :label="0">未记住</el-radio>
              <!-- <input type="radio" :name="w.id" v-model="w.state" :value='1'>已记住
				      <input type="radio" :name="w.id" v-model="w.state" :value='0'>未记住 -->
            </template>
          </p>
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
          <br>
          <p>
            <span style="width:200px; display: inline-block;">不记得次数:{{ w.count }}</span>
            <template >
              <el-radio v-model="w.state" :label="1">已记住</el-radio>
              <el-radio v-model="w.state" :label="0">未记住</el-radio>
            </template>
          </p>
        </li>
      </ol>
    </el-drawer>
    <el-card class="box-card2">
      <div slot="header" class="clearfix">
        <h2>设置背诵目标</h2>
      </div>
      <h3>step1:选择一本你想背的单词书</h3>
      <div>
        <el-radio-group v-model="whichBook">
          <el-radio-button label="book1">高中英语</el-radio-button>
          <el-radio-button label="book2">英语四级</el-radio-button>
          <el-radio-button label="book3">英语六级</el-radio-button>
        </el-radio-group>
      </div>
      <h3>step2:确定你想背的单词数</h3>
      <div>
        <el-radio-group v-model="howManyWords">
          <el-radio-button :label="10">10</el-radio-button>
          <el-radio-button :label="30">30</el-radio-button>
          <el-radio-button :label="50">50</el-radio-button>
          <el-radio-button :label="80">80</el-radio-button>
          <el-radio-button :label="100">100</el-radio-button>
        </el-radio-group>
      </div>
      <el-button class="entry" type="success" @click="entryExam">GoGoGo</el-button>
    </el-card>
  </div>
</template>

<script>
import { getBooksAPI } from '@/api';
import { updateBooksAPI } from '@/api';
export default {
  name:"WordBooks",
  data() {
      return {
        drawer1: false,
        drawer2: false,
        drawer3: false,
        direction: 'rtl',
        whichBook:'',
        // 标记现在打开的是哪本书
        thisBook:'',
        howManyWords:0,
        book:[],
      };
    },
    created(){
      // 此处应发送请求，获取单词书相关信息，封面、名字
    },
    methods: {
      first(){
        // 调用接口，获得对应单词书
        getBooksAPI('book1').then(res=>{
          this.book = res.data.data
          this.thisBook='book1'
          }
        )
        this.drawer1 = true
      },
      second(){
        // 调用接口，获得对应单词书
        getBooksAPI('book2').then(res=>{
          this.book = res.data.data
          this.thisBook='book2'
        }
        )
        this.drawer2 = true
      },
      third(){
        // 调用接口，活动对应单词书
        getBooksAPI('book3').then(res=>{
          this.book = res.data.data
          this.thisBook='book3'
          }
        )
        this.drawer3 = true
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            // 调用接口，更新对应单词书
            updateBooksAPI({book:this.thisBook,wordList:this.book})
            done();
          })
          .catch(_ => {});
      },
      entryExam(){
        // 做出限制，必须选好相关信息
        if(this.whichBook=='' || this.howManyWords==0){
          this.$message.error('请先选择好相关数据,再开始背单词哦')
        }else{
          this.$message.success('开始背单词')
          const ReWordsInfo = {
            whichBook:this.whichBook,
            howManyWords:this.howManyWords
          }
          // 保存背单词信息到vuex
          this.$store.commit('getReWordsInfo',ReWordsInfo)
          this.$router.push('/srword/recirewords' )
        }
      }
    }
  };
</script>

<style scoped>
    .el-col img{
      height: 400px;
    }
    .el-input{
      width: 200px;
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
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    margin-right: 20px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .grid-content button{
    width: 90%;
  }

  .grid-content p {
    padding:10px 0px 0px;
    margin: 0px;
    font-size: 30px;
    text-align: center;
    font-family: "华文彩云";
    font-weight: bolder;
  }
  .el-drawer ol li span{
    font-size: 12px;
  }
  .box-card2{
    position: relative;
  }
  .entry{
    position: absolute;
    right: 5%;
    bottom:10%;
    width: 200px;
  }
  ol li{
    margin-bottom: 30px;
  }
</style>