<template>
    <div class="shouye">
    <p class="title"><img src="../../assets/title.png" alt=""></p>
    <P>一个简洁实用的英语单词学习网站</P>
    <div class="block">
        <el-carousel height="450px">
            <el-carousel-item>
                <img  src="../../assets/1.jpg">
            </el-carousel-item>
            <el-carousel-item>
                <img  src="../../assets/2.jpg">
            </el-carousel-item>
            <el-carousel-item>
                <img  src="../../assets/3.jpg">
            </el-carousel-item>
        </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
    name:'shouye',
    Created(){
        // 此处应发送请求获取首页图片的相关信息，再铺设到页面
    }
}
</script>

<style scoped>
    p{
        text-align: center;
        font-size: 25px;
        font-family: '仿宋';
    }
    
    .title img{
        display: inline-block;
        margin-left: 450px;
        width: 50%;
    }

    .shouye {
        height: 100%;
    }

    img{
        display: inline-block;
        width: 80%;
        margin-left: 10%;
        height: 100%;
    }
</style>