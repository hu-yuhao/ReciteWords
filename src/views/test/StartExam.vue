<template>
  <div>
    <!-- 倒计时 -->
    <div class="time" v-if="isShow">
      剩余时间{{ minutes }}分{{ seconds }}秒
    </div>
    <template v-if="isShow">
      <el-card>
        <p class="title">{{ testList[index].question }}</p>
        <el-radio-group size="medium" v-model="tOf">
            <p><el-radio-button  :label="answerList[0]"><div>A:{{ answerList[0] }}</div></el-radio-button></p>
            <p><el-radio-button  :label="answerList[1]"><div>B:{{ answerList[1] }}</div></el-radio-button></p>
            <p><el-radio-button  :label="answerList[2]"><div>C:{{ answerList[2] }}</div></el-radio-button></p>
            <p><el-radio-button :label="answerList[3]"><div>D:{{ answerList[3]}}</div></el-radio-button></p>
          </el-radio-group>
          <!-- 判断是否做完 -->
          <el-button v-if="index+1<number" type="primary" @click="next">下一个</el-button>
          <el-button v-if="index+1==number"  type="primary" @click="complete">完成考试</el-button>
      </el-card>
    </template>
        
      <template v-else-if="!isShow">
        <el-card>
          <p>恭喜你已经完成所以题目,本次成绩为<span>{{ Score }}</span>分</p>
          <h3>错题一览:</h3>
          <table>
            <tbody>
              <tr>
                <th>错题</th>
                <th>正确答案</th>
                <th>你的答案</th>
              </tr>
              <tr v-for="(item,index) in errList" :key="index">
                  <td>{{ item.question }}</td>
                  <td>{{ item.trueAnswer }}</td>
                  <!-- 判断是否作答 -->
                  <td v-if="item.yourAnswer">{{ item.yourAnswer }}</td>
                  <td v-else>未作答</td>
              </tr>
            </tbody>
        </table>
          <el-button type="success" @click="leave">点击退出</el-button>
        </el-card>
      </template>
  </div>
</template>

<script>

import { getExamQuestionAPI, sendExamRecordAPT } from '@/api'
// 引入格式化时间工具
import dayjs from 'dayjs'
export default {
  name:'startExam',
  data() {
    return {
      ExamInfo:this.$store.state.ExamInfo,
      number:this.$store.state.ExamInfo.examNumber,
      minutes:this.$store.state.ExamInfo.testTime,
      seconds:0,
      // 测试题目
      testList:[],
      // 错误题目
      errList:[],
      // 索引
      index:0,
      // 正确与否
      tOf:'',
      // 正确数量
      TrueNumber:0,
      isShow:true,
      // 分数
      score:0,
      // 格式化后的时间
      Date:'',
    }
  },
  computed:{
    // 打乱选项顺序
    answerList(){
      return this.shuffle(this.testList[this.index].answer) || ['','','','']
    },
    // 计算考试成绩，转化为百分制，向下取整
    Score(){
      this.score= Math.floor(((this.TrueNumber/this.number)*100))
      return this.score
    }
  },
  // 调用组件内路由守卫
  beforeRouteLeave (to, from, next) {
    if(to.path!=='/setexam'){
      this.$confirm("测试还未结束,确定要退出吗？",'提示',{
        confirmButtonText:'确定',
        cancelButtonText:'不了',
        type:'warning'
      }).then(()=>{
        this.$message({
          type:'success',
          message:'测试继续进行中，尽快回来哦'
        });
        // 改变考试状态，true表示考试还未完成
        this.$store.commit('updateIsExaming',true)
        next()
      })
    }else{
      next()
    }
    },
  methods:{
    // 创建定时器，倒计时显示方法
    timer(){
      const This = this
      const Time =window.setInterval(function () {
        if (This.seconds === 0 && This.minutes !== 0) {
          if(This.minutes === 3){
            This.$message.info('离测试结束还有三分钟，抓紧时间哦')
          }
          This.seconds = 59
          This.minutes -= 1
        } else if (This.minutes === 0 && This.seconds === 0) {
              console.log('hello')
              This.isShow=false
              // 如果时间到了，将剩下的所有单词导入errList，便于展示
              This.errList=This.errList.concat(This.testList.slice(This.index))
              window.clearInterval(Time)
          }else {
              This.seconds -= 1
          }
      }, 1000)
    },
    // 打乱单词顺序方法
    shuffle(arr){
      var l = arr.length
      var i,temp
      while(l>0){
        i = Math.floor(Math.random()*1)
        temp = arr[l-1]
        arr[l-1]=arr[i]
        arr[i] = temp
        l--
      }
      return arr
    },
    next(){
      console.log(this.testList[this.index].trueAnswer)
      if(this.index<this.number){
        if(this.tOf==this.testList[this.index].trueAnswer){
          this.TrueNumber+=1
          this.index+=1
        }else if(this.tOf==''){
          this.$message.warning('请先选择这一题的答案')
        }else{
          // 将错词添加到errList
          this.errList.push({question:this.testList[this.index].question,trueAnswer:this.testList[this.index].trueAnswer,yourAnswer:this.tOf})
          this.index+=1
        }
      }else{
        console.log('123')
        window.clearInterval(Time)
      }
    },
    leave(){
      // 调用接口提交本次考试记录
      const record = {
        date:this.Date,
        number:this.number,
        book:this.ExamInfo.whichBookExam,
        scores:this.score
      }
      sendExamRecordAPT(record).then(res=>{
        this.$message.success('成绩已经保存在考试记录')
      })
      //考试完成，销毁组件  
      this.$destroy()
      this.$router.push('/setexam')
    },
    complete(){
      // 将错词添加到errList
      this.errList.push({question:this.testList[this.index].question,trueAnswer:this.testList[this.index].trueAnswer,yourAnswer:this.tOf})
      // 展示最后成绩和错题
      this.isShow=false
    }
  },

  // 调用接口获取测试题
  created(){
    console.log(this.ExamInfo)
    const ExamInfo = {
      number:this.ExamInfo.examNumber,
      book:this.ExamInfo.whichBookExam,
      rate:this.ExamInfo.percentage
    }
    console.log(ExamInfo)
    getExamQuestionAPI(ExamInfo).then(res=>{
      this.testList=res.data.data
    })
    console.log(456)
  },

  mounted(){
    // 打开定时器，开始计时
    this.timer()
    // 获取当前格式化时间
    this.Date=dayjs(Date.now()).format('YYYY-MM-DD HH:mm')
  },

}
</script>

<style scoped>

  h3{
    text-align: center;
  }

.el-card p span{
  font-size: 15px;
  color: red;
}

.time{
  position: absolute;
}
.el-card{
  width:600px;
  height: 100%;
  margin:auto;
}

.title{
  text-align: center;
  font-size: 50px;
  font-weight: bolder;
}

.el-radio-group{
  width: 100%;
}

.el-radio-button{
    display: block;
    width: 90%;
    margin: 0px;
    margin-left: 5%;
    margin-bottom: 20px;
  }

  .el-radio-button div{
    width:470px;
    height: 30px;
  }

  .el-button{
    display: block;
    width: 200px;
    margin: 0 auto;
  }

  ul li span{
    font-size: 25px;
    font-weight: bolder;
  }

  table{
    width:100%
  }

  td,th{
  width: 33%;
  height: 50px;
  line-height: 30px;
  text-align: left;
  text-align: center;
}


</style>