<template>
  <div class="reg-container">
    <div class="reg-box">
      <h1>欢迎注册</h1>
      <el-form ref="form" :model="form" :rules="rulesObj">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input type="password"  placeholder="请再次确认密码" v-model="form.repassword" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-reg" type="primary" @click="registerbtn">注册</el-button>
          <el-link type="primary" @click="$router.push('/login')">去登录</el-link>
        </el-form-item>
      </el-form>
      
    </div>
  </div>
</template>

<script>
import { registerAPI } from '@/api'
export default {
    name:'MyRegister',
    data() {
      // 自定义校验
      const sameJudge = (rule,value,callback) => {
        if (value !== this.form.password) {
            callback(new Error('两次密码不一致'))
          }else{
          callback();
        }
      }
      return {
        form:{
          username:'',
          password:'',
          repassword:'',
        },
        rulesObj:{
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
          ],
          repassword:[
          {required:true, message:'请再次输入密码',trigger:'blur'},
          {validator:sameJudge,trigger:'blur'}
          ]
        }
      }
    },
    methods: {
          registerbtn(){
            this.$refs.form.validate(async vaild =>{
              if(vaild){
                const res = await registerAPI(this.form)
                if(res.data.code!=200) return this.$message.error(res.data.message);
                this.$message.success(res.data.message)
                // 跳转至登录页面
                this.$router.push('/login')
              }else{
                return false
              }
            }
            )
          }
        },
}
</script>

<style scoped>
  .reg-container{
    background: url(../../assets/zhuye.jpg);
    background-size: cover;
    height: 100%;
  }

  .reg-box{
    width:400px;
    height: 370px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding: 0 30px;
    box-sizing: border-box;
    opacity: 0.92;
  }

  h1{
    height: 60px;
    text-align: center;
  }

  .btn-reg{
    width: 100%;
  }
</style>