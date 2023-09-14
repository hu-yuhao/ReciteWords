<template>
  <div>
    <div class="time">
      剩余时间{{ minutes }}分{{ seconds }}秒
    </div>
    <el-card>
        <!-- <div>
          <p class="title">{{ testList[index].question }}</p>
          <p><el-button @click="select" type="info" round>A:{{ answerList[0].content }}</el-button></p>
          <p><el-button @click="select" type="info" round>B:{{ answerList[1].content }}</el-button></p>
          <p><el-button @click="select" type="info" round>C:{{ answerList[2].content }}</el-button></p>
          <p><el-button @click="select" type="info" round>D:{{ answerList[3].content }}</el-button></p>
        </div> -->
        <p class="title">{{ testList[index].question }}</p>
        <el-radio-group size="medium" v-model="tOf">
            <p><el-radio-button @click="select"  :label="answerList[0].istrue"><div>A:{{ answerList[0].content }}</div></el-radio-button></p>
            <p><el-radio-button @click="select"  :label="answerList[1].istrue"><div>B:{{ answerList[1].content }}</div></el-radio-button></p>
            <p><el-radio-button @click="select"  :label="answerList[2].istrue"><div>C:{{ answerList[2].content }}</div></el-radio-button></p>
            <p><el-radio-button @click="select"  :label="answerList[3].istrue"><div>D:{{ answerList[3].content }}</div></el-radio-button></p>
        </el-radio-group>
        <el-button type="primary" @click="next">下一个</el-button>

        <template>
          <p>恭喜你已经完成所以题目</p>
          <el-button type="success" @click="leave">点击退出考试</el-button>
        </template>
        
        
    </el-card>
    <!-- <template>
      <el-carousel :autoplay='false' type="card" height="200px">
        <el-carousel-item v-for="(item,index) in testList" :key="index">
          <p>{{item.question}}</p>
          <p>A:{{ item.answer[0].content }}</p>
          <p>B:{{ item.answer[1].content }}</p>
          <p>C:{{ item.answer[2].content }}</p>
          <p>D:{{ item.answer[3].content }}</p>
        </el-carousel-item>
      </el-carousel>
    </template> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      minutes:3,
      seconds:3,
      testList:[
        {question:'hello',trueAnswer:'你好',answer:[{content:'你好',istrue:0},{content:'漂亮的',istrue:1},{content:'美丽的',istrue:1},{content:'开心的',istrue:1}]},
        {question:'happy',trueAnswer:'你好',answer:[{content:'5',istrue:1},{content:'8',istrue:1},{content:'1',istrue:1},{content:'开心的',istrue:0}]},
        {question:'beautiful',trueAnswer:'你好',answer:[{content:'88',istrue:1},{content:'漂亮的',istrue:0},{content:'55',istrue:1},{content:'11',istrue:1}]},
        {question:'he',trueAnswer:'你好',answer:[{content:'他',istrue:0},{content:'888',istrue:1},{content:'455',istrue:1},{content:'999',istrue:1}]}
      ],
      errList:[],
      index:0,
      tOf:2,
      TrueNumber:0
    }
  },
  computed:{
    answerList(){
      return this.shuffle(this.testList[this.index].answer)
    }
  },
  // beforeUpdated(){
  //   this.shuffle(this.testList[this.index].answer)
  // },
  methods:{
    timer(){
      const This = this
      const Time =setInterval(function () {
        if (This.seconds === 0 && This.minutes !== 0) {
          if(This.minutes === 3){
            This.$message.info('离测试结束还有三分钟，抓紧时间哦')
          }
          This.seconds = 59
          This.minutes -= 1
        } else if (This.minutes === 0 && This.seconds === 0) {
              This.seconds = 0
              clearInterval(Time)
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
      if(tOf==0){
        this.TrueNumber+=1
        this.index+=1
      }else if(tOf=1){
        this.errList.push({word:testList[index].question,meaning:testList[index].trueAnswer})
        this.index+=1
      }else{
        this.$message.warning('请先选择这一题的答案')
      }
    },
    leave(){
      
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
</style>