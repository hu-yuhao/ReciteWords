<template>
    <el-container>
        <el-header>
          <h1>词 &nbsp;易 &nbsp;记</h1>
          <el-menu
            class="el-menu-demo"
            mode="horizontal"   
            background-color="#f3f3f3"
            text-color="black"
            active-text-color="#ffd04b">
            <el-menu-item class="welcome">
              <!-- 有头像显示头像，无头像显示默认图片 -->
              <div>
                <img v-if="$store.state.userInfo.userPic" :src="'data:image/jpeg;base64,'+$store.state.userInfo.userPic" alt="">
                <img v-else src="../../assets/logo.png" alt="">
              </div>
              欢迎&nbsp;<span>{{ $store.state.userInfo.nickname|| $store.state.userInfo.username }}</span>
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
              <keep-alive include="startExam">
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
        // hasPic:this.$store.state.userInfo.userPic,
      }
    },
    create(){
      console.log(this.username)
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      quitBtn(){
        this.$confirm('确定要退出登录吗？', '提示', {
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
  }
}
</script>

<style scoped>
  .welcome span{
    font-size: 20px;
    font-weight: bolder;
    font-family: '仿宋';
  }

  .el-header h1 {
    margin: 0px;
    width: 200px;
    text-align: center;
    margin-top: 15px;
    margin-left: -20px;
    font-size: 30px;
    font-family: '仿宋';
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
  }

  .el-menu-item img{
    height: 30px;
  }
  .el-menu-item div{
    width: 50px;
    height: 50px;
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
  }
  .el-menu-item div img{
    height: 50px;
    height: 50px;
  }
</style>