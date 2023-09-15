<template>
  <div>
    <div class="time" v-if="isShow">
      剩余时间{{ minutes }}分{{ seconds }}秒
    </div>
    <!-- <el-card> -->

      <template v-if="isShow">
        <el-card>
        <p class="title">{{ testList[index].question }}</p>
        <el-radio-group size="medium" v-model="tOf">
          <el-radio-group size="medium" v-model="tOf"></el-radio-group>
            <p><el-radio-button  :label="answerList[0]"><div>A:{{ answerList[0] }}</div></el-radio-button></p>
            <p><el-radio-button  :label="answerList[1]"><div>B:{{ answerList[1] }}</div></el-radio-button></p>
            <p><el-radio-button  :label="answerList[2]"><div>C:{{ answerList[2] }}</div></el-radio-button></p>
            <p><el-radio-button :label="answerList[3]"><div>D:{{ answerList[3]}}</div></el-radio-button></p>
          </el-radio-group>
          <el-button v-if="index+1<number" type="primary" @click="next">下一个</el-button>
          <el-button v-if="index+1==number"  type="primary" @click="complete">完成考试</el-button>
      </el-card>
      </template>
        
      <template v-else-if="!isShow">
        <el-card>
          <p>恭喜你已经完成所以题目,本次成绩为{{ Score }}分</p>
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
                  <td>{{ item.yourAnswer }}</td>
              </tr>
            </tbody>
        </table>
          <el-button type="success" @click="leave">点击退出</el-button>
        </el-card>
      </template>
  </div>
</template>

<script>
var Time
export default {
  data() {
    return {
      number:4,
      minutes:3,
      seconds:3,
      testList:[
        // {question:'hello',trueAnswer:'你好',answer:[{content:'你好',istrue:0},{content:'漂亮的',istrue:1},{content:'美丽的',istrue:1},{content:'开心的',istrue:1}]},
        // {question:'happy',trueAnswer:'你好',answer:[{content:'5',istrue:1},{content:'8',istrue:1},{content:'1',istrue:1},{content:'开心的',istrue:0}]},
        // {question:'beautiful',trueAnswer:'你好',answer:[{content:'88',istrue:1},{content:'漂亮的',istrue:0},{content:'55',istrue:1},{content:'11',istrue:1}]},
        // {question:'he',trueAnswer:'你好',answer:[{content:'他',istrue:0},{content:'888',istrue:1},{content:'455',istrue:1},{content:'999',istrue:1}]}
        {question:'hello',trueAnswer:'你好',answer:['你好','漂亮的','美丽的','开心的']},
        {question:'happy',trueAnswer:'开心的',answer:['111','222','333','开心的']},
        {question:'beautiful',trueAnswer:'美丽的',answer:['11','22','美丽的','33']},
        {question:'he',trueAnswer:'他',answer:['1','他','2','3']},
      ],
      errList:[],
      index:0,
      tOf:'',
      TrueNumber:0,
      isShow:true,
      score:0,
    }
  },
  computed:{
    answerList(){
      return this.shuffle(this.testList[this.index].answer) || ['','','','']
    },
    Score(){
      this.score= Math.floor(((this.TrueNumber/this.number)*100))
      return this.score
    }
  },
  // beforeUpdated(){
  //   this.shuffle(this.testList[this.index].answer)
  // },
  methods:{
    timer(){
      const This = this
      Time =window.setInterval(function () {
        if (This.seconds === 0 && This.minutes !== 0) {
          if(This.minutes === 3){
            This.$message.info('离测试结束还有三分钟，抓紧时间哦')
          }
          This.seconds = 59
          This.minutes -= 1
        } else if (This.minutes === 0 && This.seconds === 0) {
              This.seconds = 0
              window.clearInterval(Time)
          }else {
              This.seconds -= 1
          }
      }, 1000)
    },
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
      // if(this.tOf==this.testList[this.index].trueAnswer){
      //   this.TrueNumber+=1
      //   this.index+=1
      // }else if(this.tOf==''){
      //   this.$message.warning('请先选择这一题的答案')
      //   // this.errList.push({word:testList[index].question,meaning:testList[index].trueAnswer})
      //   // this.index+=1
      // }else{
      //   // this.$message.warning('请先选择这一题的答案')
      //   this.errList.push({word:this.testList[this.index].question,meaning:this.testList[this.index].trueAnswer})
      //   this.index+=1
      // }

      if(this.index<this.number){
        if(this.tOf==this.testList[this.index].trueAnswer){
          this.TrueNumber+=1
          this.index+=1
        }else if(this.tOf==''){
          this.$message.warning('请先选择这一题的答案')
          // this.errList.push({word:testList[index].question,meaning:testList[index].trueAnswer})
          // this.index+=1
        }else{
          // this.$message.warning('请先选择这一题的答案')
          this.errList.push({question:this.testList[this.index].question,trueAnswer:this.testList[this.index].trueAnswer,yourAnswer:this.tOf})
          this.index+=1
        }
      }else{
        console.log('123')
        window.clearInterval(Time)
      }
    },
    leave(){

    },
    complete(){
      this.errList.push({question:this.testList[this.index].question,trueAnswer:this.testList[this.index].trueAnswer,yourAnswer:this.tOf})
      this.isShow=false
    }
  },
  mounted(){
    this.timer()
  },
}
</script>

<style scoped>

.time{
  position: absolute;
}
.el-card{
  width:600px;
  height: 100%;
  margin:auto;
}

/* .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  } */

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

  /* .el-radio-button__inner{
    width: 200px;
  } */

 /* .el-radio-button--medium .el-radio-button__inner{
    font-size: 14px;
    width: 200px;
  } */

  .el-button{
    display: block;
    width: 200px;
    margin: 0 auto;
  }

  ul li span{
    font-size: 25px;
    font-weight: bolder;
  }

  td,th{
  width: 120px;
  line-height: 30px;
  text-align: left;
}
</style>