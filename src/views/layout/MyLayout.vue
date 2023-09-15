<template>
    <el-container>
        <el-header>
          <h1>词 &nbsp;&nbsp;易 &nbsp;&nbsp;记</h1>
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#f3f3f3"
            text-color="black"
            active-text-color="#ffd04b">
            <!-- <div>
              <img v-if="user_pic" :src="user_pic" alt="">
              <img v-else src="../../assets/logo.png" alt="">
              <span>欢迎{{ nickname||username }}</span>
            </div> -->
            <el-menu-item class="welcome">
              <img v-if="userPic" :src="userPic" alt="">
              <img v-else src="../../assets/logo.png" alt="">
              欢迎<span>{{ nickname||username }}</span>
            </el-menu-item>
           
            <el-menu-item index="3" @click="quitBtn"><i class="el-icon-switch-button"></i>退出</el-menu-item>
          </el-menu>
        </el-header>
        <el-container>
            <el-aside width="200px">
              <el-menu
                default-active="/home"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#f3f3f3"
                text-color="black"
                active-text-color="#ffd04b"
                unique-opened
                router>
                <el-menu-item index="/home">
                  <i class="el-icon-menu"></i>
                  <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="/srword">
                  <i class="el-icon-reading"></i>
                  <span slot="title">背单词</span>
                </el-menu-item>
                <el-submenu index="/exam">
                  <template slot="title">
                    <i class="el-icon-edit"></i>
                    <span>小试一下</span>
                  </template>
                  <el-menu-item index="/exam"><i class="el-icon-document"></i>开始考试</el-menu-item>
                  <el-menu-item index="/examrecord"><i class="el-icon-document-copy"></i>考试记录</el-menu-item>
                </el-submenu>
                <el-submenu index="/user">
                  <template slot="title">
                    <i class="el-icon-s-custom"></i>
                    <span>个人中心</span>
                  </template>
                  <el-menu-item index="/user-info"><i class="el-icon-s-operation"></i>基本信息</el-menu-item>
                  <el-menu-item index="/changeavatar"><i class="el-icon-camera-solid"></i>修改头像</el-menu-item>
                  <el-menu-item index="/changepassword"><i class="el-icon-key"></i>修改密码</el-menu-item>
                </el-submenu>
              </el-menu>
            </el-aside>
        <el-container>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
  </el-container>
</el-container>
</template>

<script scoped>
import { getUserInfoAPI } from '@/api';
export default {
    name:'MyLayout',
    data() {
      return {
        nickname:this.$store.state.userInfo.nickname,
        userPic:this.$store.state.userInfo.userPic,
        username:this.$store.state.userInfo.username,
      }
    },
    created(){
      getUserInfoAPI().then(res=>{
        this.$store.commit('updateUserInfo',res.data.data)
      })
    },
    methods:{
      quitBtn(){
        this.$confirm('确定退出吗？再多学会吧', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('updateToken','')
          this.$store.commit('undateUserInfo',{})
          this.$router.push('/login')
        }).catch(() => {
         
        });
    },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>

<style scoped>
  /* .el-aside .el-radio-button{
    width:50%
  } */

  /* .welcome{
    border: 1px solid rgba(15, 15, 0, 0.405);
    border-top: none;
    border-bottom: none;
  } */

  .welcome span{
    font-size: 18px;
    font-weight: bolder;
  }

  .el-header h1 {
    margin: 0px;
    width: 200px;
    text-align: center;
    margin-top: 15px;
    margin-left: -20px;
    font-size: 30px;
    /* color: #fff; */
  }

  .el-container{
    height: 100%;
  }

  .el-aside{
    /* #23262e */
    background-color: #f3f3f3; 
  }

  .el-header{
    display: flex;
    justify-content: space-between;
    background-color: #f3f3f3;    
  }

  .el-main{
    overflow-y: scroll;
    /* background-color: #545C64; */
  }

  .el-menu-item img{
    height: 30px;
  }
</style>