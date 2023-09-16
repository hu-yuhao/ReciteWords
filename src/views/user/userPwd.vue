<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>重置密码</span>
        </div>
        <el-form :model="pwdForm" :rules="pwdFormRules" ref="pwdFormRef" label-width="100px">
            <el-form-item label="原密码" prop="oldPwd">
                <el-input v-model="pwdForm.oldPwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd">
                <el-input v-model="pwdForm.newPwd" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="rePwd">
                <el-input v-model="pwdForm.rePwd" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updatePwdFn">点击修改</el-button>
                <el-button @click="resetFn">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import { updatePwdAPI } from '@/api'
export default {
    name:'userPWd',
    data() {
        // 自定义校验
        const samePwd = (rules,value,callback)=>{
            if(this.pwdForm.oldPwd===value){
                callback(new Error('新旧密码不能相同'))
            }else{
                callback()
            }
        }
        const rPwd = (rules,value,callback)=>{
            if(this.pwdForm.newPwd!==value){
                callback(new Error('两次输入密码不一致'))
            }else{
                callback()
            }
        }
        return {
            pwdForm:{
                oldPwd:'',
                newPwd:"",
                rePwd:''
            },
            // 校验
            pwdFormRules:{
                oldPwd:[
                    {required:true, message:'请输入密码',trigger:'blur'},
                    {
                    pattern:/^\S{6,15}$/,
                    message:'密码必须是6-15的非空字符',
                    trigger:'blur'
                    }  
                ],
                newPwd:[
                    {required:true, message:'请输入新密码',trigger:'blur'},
                    {
                    pattern:/^\S{6,15}$/,
                    message:'新密码必须是6-15的非空字符',
                    trigger:'blur'
                    },
                    {validator:samePwd,trigger:'blur'}
                ],
                rePwd:[
                    {required:true, message:'请重新输入新密码',trigger:'blur'},
                    {
                    pattern:/^\S{6,15}$/,
                    message:'密码长度必须是6-15的非空字符',
                    trigger:'blur'
                    },
                    {validator:rPwd,trigger:'blur'}
                ],
            }
        }
    },
    methods:{
        updatePwdFn(){
            this.$refs.pwdFormRef.validate(async valid=>{
              if(valid){
                const res = await updatePwdAPI(this.pwdForm)
                if(res.data.code!==200)return this.$message.error(res.data.message)
                this.$message.success(res.data.message)
                // 清空输入框
                this.$refs.pwdFormRef.resetFields()
                // 清空token
                this.$store.commit('updateToken','')
                // 清空用户信息
                this.$store.commit('updateUserInfo',{})
                // 跳转至登录页面,重新登录
                this.$router.push('/login')
              } else{
                return false
              } 
            })
        },
        resetFn(){
            // 清空输入框
            this.$refs.pwdFormRef.resetFields()  
        }
    }
}
</script>

<style scoped>
    .text {
    font-size: 20px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
  .el-form{
    width: 500px;
  }
</style>