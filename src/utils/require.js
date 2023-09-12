import store from '@/store'
import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'

const myAxios = axios.create({
    baseURL:''
})

myAxios.interceptors.response.use(function(response){
    return response
},function (error){
    if(error.response.status===401){
        store.commit('updateToken','')
        store.commit('undateUserInfo',{})
        router.push('/login')
        Message.error('用户身份已过期')
    }
    return Promise.reject(error)
})

export default myAxios