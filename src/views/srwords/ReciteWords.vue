<template>
  <div>
    <div v-if="index<howManyWords-1">
      {{ WordList[index].word }}
      <button @click="rem">记得</button>
      <button @click="nrem">模糊</button>
      <button @click="unrem">不记得</button>
      <button @click="nextWord">下一个单词</button>
    </div>
    <div v-else>
      恭喜你已经记完所有单词
    </div>
  </div>
</template>

<script>
export default {
  name:'ReciteWords',
  data() {
    return {
      whichBook:this.$store.state.ReWordsInfo.whichBook,
      // howManyWords:this.$store.state.ReWordsInfo.howManyWords,
      howManyWords:5,
      WordList:[
                {id:'1',word:'hello',meaning:'你好',count:0,state:false},
                {id:"2",word:'he',meaning:'他',count:0,state:true},
                {id:'3',word:'hello',meaning:'你好',count:0,state:false},
                {id:"4",word:'heasdg',meaning:'他',count:0,state:true},
                {id:'5',word:'hellosdg',meaning:'你好',count:0,state:false},
      ],
      index:0
    }
  },
  methods:{
    nextWord(){
      console.log(this.WordList[this.index].count!==0)
      if(this.WordList[this.index].count!==0){
        this.WordList[this.index].count-=1
      }else{
        this.index+=1
      }
    },
    rem(){
      this.WordList[this.index].count=0
    },
    unrem(){
      this.WordList[this.index].count=2
    },
    nrem(){
      this.WordList[this.index].count=1
    }


  }

}
</script>

<style>

</style>