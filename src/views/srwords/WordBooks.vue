<template>
  <div>
    <div>
      <el-card class="box-card1">
    <div slot="header" class="clearfix">
      <h2>单词书清单：</h2>
    </div>
      
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <img src="../../assets/u=870860854,928165858&fm=253&fmt=auto&app=138&f=JPEG.webp" alt="">
            <p>高中英语</p>
            <br>
            <el-button @click="drawer1 = true" type="primary" style="margin-left: 16px;">
                点我查看单词书
            </el-button>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <img src="../../assets/u=870860854,928165858&fm=253&fmt=auto&app=138&f=JPEG.webp" alt="">
            <p>英语四级</p>
            <br>
            <el-button @click="drawer2 = true" type="primary" style="margin-left: 16px;">
                点我查看单词书
            </el-button>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <img src="../../assets/u=870860854,928165858&fm=253&fmt=auto&app=138&f=JPEG.webp" alt="">
            <p>英语六级</p>
            <br>
            <el-button @click="drawer3 = true" type="primary" style="margin-left: 16px;">
                点我查看单词书
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
      <ul>
        <li v-for="w in book1" :key="w.id">
          <div>
            <div class="w">单词：{{ w.word }}</div>
            <div class="m">释义：{{ w.meaning }}</div>
          </div>
          <br>
          <p>
            <span style="width:200px; display: inline-block;">不记得次数:{{ w.count }}</span>
            <template >
              <input type="radio" :name="w.id" v-model="w.state" value=true>已记住
				      <input type="radio" :name="w.id" v-model="w.state" value=false>未记住
            </template>
          </p>
        </li>
      </ul>
    </el-drawer>
    <el-drawer
      title="英语四级"
      :visible.sync="drawer2"
      :direction="direction"
      :before-close="handleClose">
      <ul>
        <li v-for="w in book2" :key="w.id">
          <div>
            <div class="w">单词：{{ w.word }}</div>
            <div class="m">释义：{{ w.meaning }}</div>
          </div>
          <br>
          <p>
            <span style="width:200px; display: inline-block;">不记得次数:{{ w.count }}</span>
            <template >
              <input type="radio" :name="w.id" v-model="w.state" value=true>已记住
				      <input type="radio" :name="w.id" v-model="w.state" value=false>未记住
            </template>
          </p>
        </li>
      </ul>
    </el-drawer>
    <el-drawer
      title="英语六级"
      :visible.sync="drawer3"
      :direction="direction"
      :before-close="handleClose">
      <ul>
        <li v-for="w in book3" :key="w.id">
          <div>
            <div class="w">单词：{{ w.word }}</div>
            <div class="m">释义：{{ w.meaning }}</div>
          </div>
          <br>
          <p>
            <span style="width:200px; display: inline-block;">不记得次数:{{ w.count }}</span>
            <template >
              <!-- <el-radio v-model="w.state" label=ture >已记住</el-radio>
              <el-radio v-model="w.state" label=false>未记住</el-radio> -->
              <input type="radio" :name="w.id" v-model="w.state" value=true>已记住
				      <input type="radio" :name="w.id" v-model="w.state" value=false>未记住
            </template>
          </p>
        </li>
      </ul>
    </el-drawer>
    <!-- <el-card class="box-card2">
    <div slot="header" class="clearfix">
        <h2>准备背单词</h2>
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
  </el-card> -->
    <el-card class="box-card2">
      <div slot="header" class="clearfix">
        <h2>准备背单词</h2>
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
export default {
  data() {
      return {
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
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
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

<style scoped>
    .el-col img{
      width: 90%;
      margin-left: 5%;
    }
    .el-row {
    margin-bottom: 20px;
    /* &:last-child {
      margin-bottom: 0;
    } */
 
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
    /* height: 200px; */
    margin-right: 20px;
    /* text-align: center; */
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

  .el-drawer ul li>span {
    margin-right: 0px;
  }
  
  .el-drawer ul li span{
    font-size: 12px;
  }
  .el-drawer ul li .w,
  .el-drawer ul li .m{
    float: left;
  }
  .el-drawer ul li .w{
    width: 100px;
  }
  .el-drawer ul li .m{
    margin-left: 100px;
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
</style>