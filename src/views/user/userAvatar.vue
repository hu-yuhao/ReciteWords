<template>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>更换头像</span>
        </div>
        <div >
            <img v-if="!avatar" class="the-img" src="../../assets/logo.png" alt="">
            <img v-else :src="avatar" class="the-img" alt="">

            <div class="btn-box">
                <input type="file" accept="image/" style="display: none;" ref="iptRef" @change="onFileChange">
                <el-button type="primary" icon="el-icon-plus" @click="chooseImg"></el-button>
                <el-button type="success" icon="el-icon-upload" @click="updateUserAvatar" :disabled="avatar===''">上传头像</el-button>
            </div>

        </div>
        
    </el-card>
</template>

<script>
import { updateUserAvatarAPI } from '@/api'
export default {
    name:'userAvatar',
    data() {
        return {
            avatar:'',
        }
    },
    methods:{
        chooseImg(){
            this.$refs.iptRef.click()
        },
        onFileChange(e){
            const files = e.target.files
            if(files.length===0){
                this.avatar=''
            }else{
            const fr = new FileReader()
            fr.readAsDataURL(files[0])
            fr.onload = e =>{//onload等待把文件读成base64字符串后会触发onload事件函数
                this.avatar = e.target.result//赋值给变量。让他显示在img的src里
            }
            }
        },
        updateUserAvatar(){
            updateUserAvatarAPI(this.avatar).then(res=>{
                if(res.data.code!==200){
                    this.$message.error(res.data.message)
                }else{
                    this.$store.dispatch('getUserInfoActions')
                    this.$message.success(res.data.message)
                }
            })
        }
    }
}
</script>

<style scoped>
    .btn-box{
        margin-top: 10px;
    }
    .preview{
        object-fit: cover;
    }
    .the-img{
        width: 350px;
        height: 350px;
    }
</style>