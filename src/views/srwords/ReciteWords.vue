<template>
    <el-card class="box-card">
      <div v-if="index<howManyWords-1">
      <p>{{ wordList[index].word }}</p>
      <p v-show="isShow">{{ wordList[index].meaning }}</p>
      
      <div class="div1" v-if="!isDis">
        <el-button @click="rem" style="width: 135px;" type="success" icon="el-icon-success" circle><span>记得</span></el-button>
        <el-button @click="nrem" style="width: 135px;" type="warning" icon="el-icon-question" circle><span>模糊</span></el-button>
        <el-button @click="unrem" type="danger" icon="el-icon-circle-close" circle><span>不记得</span></el-button>
      </div>
      <div  v-else-if="isDis">
        <div class="div2" v-if="isErr">
          <el-button @click="error" type="danger" icon="el-icon-close"><span>记错了，在来</span></el-button>
          <el-button @click="nextWord" type="success" icon="el-icon-check"><span>没错，下一个</span></el-button>
        </div>
        <div class="div3" v-else-if="!isErr">
          <el-button @click="nextWord" type="success" icon="el-icon-check"><span>记住了，再来</span></el-button>
        </div>
      </div>
    </div>
    <p v-else>
      恭喜你已经记完所有单词!!!
    </p>
    <div class="div4">
      当前是第{{ index+1 }}个单词，总共{{ howManyWords }}个
    </div>
    </el-card>
</template>

<script>
import { getWordListAPI, updateWordsAPI } from '@/api'
export default {
  name:'ReciteWords',
  data() {
    return {
      isDis:false,
      whichBook:this.$store.state.ReWordsInfo.book,
      howManyWords:this.$store.state.ReWordsInfo.number,
      ReWordsInfo:this.$store.state.ReWordsInfo,
      // 收集错误单词
      wordList:[],
      // 单词出现次数
      scount:0,
      // 索引
      index:0,
      // 判断是否正确
      isErr:true,
      // 判读是否做完
      isShow:false
    }
  },
// 发送请求获取单词列表
  created(){
    getWordListAPI(this.ReWordsInfo).then(res=>{
      this.wordList=res.data.data
    })
  },
  methods:{
    nextWord(){
      if(this.scount!==0){
        this.scount-=1
        this.isDis=!this.isDis
        this.isErr=!this.isErr
        this.isShow=!this.isShow
      }else{
        this.index+=1
        this.isDis=!this.isDis
        this.isShow=!this.isShow
      }
    },
    rem(){
      this.isDis=!this.isDis
      this.isShow=!this.isShow
    },
    unrem(){
      this.isErr=false
      this.isDis=!this.isDis
      this.scount=2
      this.isShow=!this.isShow
      // 更新不记得次数
      this.wordList[this.index].count++
    },
    nrem(){
      this.isErr=false
      this.isDis=!this.isDis
      this.scount=1
      this.isShow=!this.isShow
      // 更新不记得次数
      this.wordList[this.index].count++
    },
    error(){
      this.isErr=!this.isErr
      this.isDis=!this.isDis
      this.isShow=!this.isShow
      this.scount=1
    }
  },
  // 调用组件内路由守卫，做出提示
  beforeRouteLeave (to, from, next) {
      this.$confirm("确定要退出吗？",'提示',{
        confirmButtonText:'休息一下！',
        cancelButtonText:'在背一会！',
        type:'warning'
      }).then(()=>{
        this.$message({
          type:'success',
          message:'记得及时巩固哦'
        });
        // 发送请求，更新对应单词状态
        const obj1 ={
          whichBook:this.whichBook,
          wordList:this.wordList
        }
         updateWordsAPI(obj1)
        next()
      }).catch(()=>{
        this.$message({
          type:'info',
          message:'继续加油哦！'
        })
      })
    },

}
</script>

<style scoped>
  .el-icon{
    font-size: 20px;
  }
  .box-card {
    width: 80%;
    margin-left: 10%;
    position: relative;
  }

  .box-card p{
    text-align: center;
    font-size: 50px;
    font-weight: bolder;
    
  }

  .el-button span{
    font-size: 30px;
  }

 .div1{
    width: 440px;
    margin: 0 auto;
  }

  .div2{
    width:500px;
    margin: 0 auto;
  }

  .div3{
    width: 250px;
    margin: 0 auto;
  }

  .div4{
    font-size: 20px;
    color: yellowgreen;
    position: absolute;
    top: 0px;
    right: 0px;
  }
</style>