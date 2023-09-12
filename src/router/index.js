import VueRouter from "vue-router"
import MyLogin from "../views/login/MyLogin"
import MyRegister from "../views/register/MyRegister"
import MyLayout from "../views/layout/MyLayout"
import MyHome from "@/views/home/MyHome"
import SrWords from '@/views/srwords/SrWords'
import Exam from '@/views/test/Exam'
import WordBooks from '@/views/srwords/WordBooks'
import ReciteWords from '@/views/srwords/ReciteWords'
import SetExam from '@/views/test/SetExam'
import StartExam from '@/views/test/StartExam'
import ExamRecord from '@/views/test/ExamRecord'
import UserInfo from '@/views/user/UserInfo'

import store from '@/store'

const router = new VueRouter({
    routes:[
        {
            path:'/',
            component:MyLayout,
            redirect:'/home',
            children:[
                {
                    path:'home',
                    component:MyHome
                },
                {
                    path:'srword',
                    component:SrWords,
                    redirect:'/srword/wordbooks',
                    children:[
                        {
                            path:'wordbooks',
                            component:WordBooks
                        },
                        {
                            path:'recirewords',
                            component:ReciteWords
                        }
                    ]
                },
                {
                    path:'exam',
                    component:Exam,
                    redirect:'/exam/setexam',
                    children:[
                        {
                            path:'setexam',
                            component:SetExam,
                        },
                        {
                            path:'startexam',
                            component:StartExam
                        }
                    ]
                },
                {
                    path:'examrecord',
                    component:ExamRecord
                },
                {
                    path:'user-info',
                    component:UserInfo
                }
            ]
        },
        { 
          path:'/reg',
          component:MyRegister
        },
        {
            path:'/login',
            component:MyLogin
        },
    ],
})

// router.beforeEach((to, from, next) => {
//     const token = store.state.token
//     if(token){
//         if(!store.state.userInfo.username){
//             store.dispatch('getUserInfoActions')
//         }
//         next()
//     }else{
//         if(to.path=='/login'||to.path=='/reg'){
//             next()
//         }else{
//             next('/login')
//         } 
//     }
// })

export default router