<template>
    <div class="shouye">
    <!-- <div class="title">选择<span>词易记</span>，记单词真的很<span>容易！</span></div> -->
    <p class="title">词易记</p>
    <P>一个简洁实用的英语单词学习网站</P>
    <div class="block">
        <!-- <p class="demonstration">选择词易记，记单词真的很容易</p> -->
        <el-carousel height="450px">
        <!-- <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ item }}</h3>
        </el-carousel-item> -->
        <!-- <el-carousel-item  v-for="pic in pic_list"  :key="pic">
            <img  :src="pic">
        </el-carousel-item> -->
            <el-carousel-item>
                <img  src="../home//pic/logo.png">
            </el-carousel-item>
            <el-carousel-item>
                <img  src="../home/pic/u=870860854,928165858&fm=253&fmt=auto&app=138&f=JPEG.webp">
            </el-carousel-item>
            <el-carousel-item>
                <img  src="../home/pic/zhuye.jpg">
            </el-carousel-item>
        </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
    name:'shouye',
    data() {
        return {
            pic_list:['./logo.png','./logo.png','./logo.png','./logo.png']
        }
    },
    Created(){
        // 此处应发送请求获取单词书的相关信息
    }
}
</script>

<style scoped>
    /* .title{
        color: #565d52;
        font-size: 60px;
        font-weight: bolder;
        padding:30px 0px;
        margin-left: 280px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    } */

    /* .title span{
        color: yellowgreen;
    } */

    p{
        text-align: center;
        font-size: 20px;
    }

    .title{
        font-size: 25px;
        font-weight: bolder;
    }

    .shouye {
        height: 100%;
    }



  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

img{
    width: 100%;
    height: 100%;
}
</style>