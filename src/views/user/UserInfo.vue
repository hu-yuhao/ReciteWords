<template>
    <el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>基本信息</span>
    </div>
    <el-form :model="userForm" :rules="userFormrules" ref="userFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="userForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitFn">提交</el-button>
            <el-button @click="resetFn">重置</el-button>
        </el-form-item>
    </el-form>
    </el-card>
</template>

<script>
import { updateUserInfoAPT } from '@/api'
export default {
    name:'UserInfo',
    data() {
        return {
            userForm:{
                username:this.$store.state.username,
                nickname:'',
                email:'',
            },
            userFormrules:{
                nickname:[
                    {required:true,message:'请输入昵称',trigger:'blur'},
                    {pattern:/^\S{1,10}$/,message:'昵称必须是1-10位的非空字符串',trigger:'blur'}
                ],
                email:[
                    {required:true,message:'请输入邮箱',trigger:'blur'},
                    {type:'email',message:'邮箱格式不正确',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        submitFn(){
            this.$refs.userFormRef.validate(async valid =>{
                if(valid){
                    const res = await updateUserInfoAPT(this.userForm)
                    if(res.date.code!==0) return this.$message.error(res.data.message)
                    this.$message.success(res.date.message)
                    this.$store.dispatch('getUserInfoActions')
                    this.$refs.userFormRef.resetFields()
                }else{
                    return false
                }
            })
        },
        resetFn(){
            // this.userForm.nickname='',
            // this.userForm.email=''
            this.$refs.userFormRef.resetFields()
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