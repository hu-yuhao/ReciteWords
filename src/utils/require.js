import store from '@/store'
import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'

const myAxios = axios.create({
    baseURL:'http://192.168.80.215:8080'
    // http://192.168.181.215:8080
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