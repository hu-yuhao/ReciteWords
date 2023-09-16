<template>
    <div class="login-container">
    <div class="login-box">
      <h1>欢迎登录</h1>
      <el-form :model="loginform" :rules="loginRules" ref="loginRef">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="loginform.username"></el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="loginform.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" type="primary" @click="loginbtn">登录</el-button>
          <el-link type="primary" @click="$router.push('/reg')">去注册</el-link>
        </el-form-item>
      </el-form>     
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api'
import {mapMutations} from 'vuex'

export default {
    name:'MyLogin',
    data() {
        return {
            loginform:{
                username:'',
                password:''
            },
            // 做相关校验
            loginRules:{
                username:[
                        {required:true, message:'请输入用户名',trigger:'blur'},
                        {
                            pattern:/[a-zA-Z0-9]{1,10}$/,
                            message:'用户名必须是1-10的大小写字母数字',
                            trigger:'blur'
                        }
                ],
                password:[
                    {required:true, message:'请输入密码',trigger:'blur'},
                    {
                        pattern:/^\S{6,15}$/,
                        message:'密码必须是6-15的非空字符',
                        trigger:'blur'
                    }
                ]
            }
        }
    },
    methods:{
        ...mapMutations(['updateToken']),
        loginbtn(){
           this.$refs.loginRef.validate(async valid=>{
            if(valid){
                const res = await loginAPI(this.loginform)
                if(res.data.code!==0)return this.$message.error(res.data.message);
                this.$message.success(res.data.message)
                // 保存token
                this.updateToken(res.data.data['token'])
                // 跳转到主页面
                this.$router.push('/home')
            }else{
                return false
            }
           })
        }
    },
}
</script>

<style scoped>
    .login-container{
    background: url(../../assets/zhuye.jpg);
    /* background-color: blue; */
    background-size: cover;
    height: 100%;
  }

  .login-box{
    width:400px;
    height: 320px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding: 0 30px;
    box-sizing: border-box;
    opacity: 0.92;
    /* background-color: antiquewhite; */
  }

  h1{
    height: 60px;
    text-align: center;
  }

  .btn-login{
    width: 100%;
  }
</style>