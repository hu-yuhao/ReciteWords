<template>
    <el-container>
        <el-header>
          <h1>词 &nbsp;&nbsp;易 &nbsp;&nbsp;记</h1>
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#23262e"
            text-color="#fff"
            active-text-color="#ffd04b">
            <!-- <div>
              <img v-if="user_pic" :src="user_pic" alt="">
              <img v-else src="../../assets/logo.png" alt="">
              <span>欢迎{{ nickname||username }}</span>
            </div> -->
            <el-menu-item class="welcome">
              <img v-if="user_pic" :src="user_pic" alt="">
              <img v-else src="../../assets/logo.png" alt="">
              欢迎<span>{{ nickname||username }}</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <span>个人中心</span>
              </template>
              <el-menu-item index="2-1">基本信息</el-menu-item>
              <el-menu-item index="2-2">修改头像</el-menu-item>
              <el-menu-item index="2-3">修改密码</el-menu-item>
            </el-submenu>
            <el-menu-item index="3" @click="quitBtn">退出</el-menu-item>
          </el-menu>
        </el-header>
        <el-container>
            <el-aside width="200px">
              <!-- <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">导航一</span>
                  </template>
                  <el-menu-item-group>
                    <span slot="title">分组一</span>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                  </el-menu-item-group>
                  <el-submenu index="1-4">
                    <span slot="title">选项4</span>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                  </el-submenu>
                </el-submenu>
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                  <i class="el-icon-document"></i>
                  <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-setting"></i>
                  <span slot="title">导航四</span>
                </el-menu-item>
              </el-menu>
              <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                <el-radio-button :label="false">展开</el-radio-button>
                <el-radio-button :label="true">收起</el-radio-button>
              </el-radio-group> -->
              <el-menu
                default-active="/home"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                unique-opened
                router>
                <el-menu-item index="/home">
                  <i class="el-icon-menu"></i>
                  <span slot="title">首页</span>
                </el-menu-item>
                

                <el-menu-item index="/srword">
                  <i class="el-icon-menu"></i>
                  <span slot="title">我要背单词！</span>

                </el-menu-item>
                <!-- <el-submenu index="/srword">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>背单词</span>
                  </template>
                  <el-menu-item index="/wordbooks">单词书清单</el-menu-item>
                  <el-menu-item index="/recirewords">开始背单词</el-menu-item>
                </el-submenu> -->
                <el-submenu index="/test">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>小试一下</span>
                  </template>
                  <el-menu-item index="/exam">开始考试</el-menu-item>
                  <el-menu-item index="/examrecord">考试记录</el-menu-item>
                </el-submenu>
                <!-- <el-menu-item index="4">
                  <i class="el-icon-setting"></i>
                  <span slot="title">个人中心</span>
                </el-menu-item> -->
                <el-submenu index="/user">
                  <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>个人中心</span>
                  </template>
                  <el-menu-item index="/user-info">基本信息</el-menu-item>
                  <el-menu-item index="/changeavatar">修改头像</el-menu-item>
                  <el-menu-item index="/changepassword">修改密码</el-menu-item>
                </el-submenu>
              </el-menu>
            </el-aside>
        <el-container>
            <el-main>
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </el-main>
        </el-container>
  </el-container>
</el-container>
</template>

<script scoped>
export default {
    name:'MyLayout',
    data() {
      return {
        nickname:this.$store.state.userInfo.nickname,
      }
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

<style>
  /* .el-aside .el-radio-button{
    width:50%
  } */

  .welcome{
    border: 1px solid rgba(95, 95, 3, 0.405);
    border-top: none;
    border-bottom: none;
  }
  .el-header h1 {
    margin: 0px;
    width: 200px;
    text-align: center;
    margin-top: 10px;
    margin-left: -20px;
    font-size: 30px;
  }

  .el-container{
    height: 100%;
  }

  .el-aside{
    background-color: #23262e; 
  }

  .el-header{
    display: flex;
    justify-content: space-between;
    background-color: #23262e;    
  }

  .el-main{
    overflow-y: scroll;
    background-color: #f2f2f2;
  }

  .el-menu-item img{
    height: 30px;
  }
</style>