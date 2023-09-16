<template>
  <router-view></router-view>
</template>

<script>

export default {
  name:'Exam',
  data() {
    return {
      isExaming:this.$store.state.isExaming
    }
  },
  // 判断上次考试是否完成
  // 如果未完成，进入考试页面；如果已完成，进入相关信息选择页面
  created(){
      if(this.isExaming==false){
      this.$router.push('setexam')
    }else{
      this.$router.push('startexam')
      this.$store.commit('updateIsExaming',false)
      }
  }
}
</script>

<style>

</style>