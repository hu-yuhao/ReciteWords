import store from '@/store'
import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'

// 基地址
const myAxios = axios.create({
    baseURL:'http://192.168.80.215:8080'
})


// 响应拦截器，判断token是否过期，过期则跳转到登录压面重新登录
myAxios.interceptors.response.use(function(response){
    return response
},function (error){
    if(error.response.status===500){
        store.commit('updateToken','')
        store.commit('undateUserInfo',{})
        router.push('/login')
        Message.error('用户身份已过期')
    }
    return Promise.reject(error)
})

export default myAxios