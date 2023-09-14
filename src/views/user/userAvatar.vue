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
            //    this.avatar= URL.createObjectURL(files[0])
            const fr = new FileReader()
            fr.readAsDataURL(files[0])
            fr.onload = e =>{
                this.avatar = e.target.result
            }
            }
        },
        updateUserAvatar(){
            updateUserAvatarAPI(this.avatar).then(res=>{
                if(res.data.code!==0){
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