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
import userPwd from '@/views/user/userPwd'
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
                    component:MyHome,
                    meta:{
                        title:"词易记-首页"
                    }
                },
                {
                    path:'srword',
                    component:SrWords,
                    redirect:'/srword/wordbooks',
                    children:[
                        {
                            path:'wordbooks',
                            component:WordBooks,
                            meta:{
                                title:"词易记-单词书清单"
                            }
                        },
                        {
                            path:'recirewords',
                            component:ReciteWords,
                            meta:{
                                title:"词易记-背单词",
                                isAuth:true,
                            },
                        },
                    ]
                },

                // {
                //     path:'wordbooks',
                //     component:WordBooks
                // },
                // {
                //     path:'recirewords',
                //     component:ReciteWords
                // },
                {
                    path:'exam',
                    component:Exam,
                    redirect:'/exam/setexam',
                    children:[
                        {
                            path:'setexam',
                            component:SetExam,
                            meta:{
                                title:"词易记-测前设置"
                            }
                        },
                        {
                            path:'startexam',
                            component:StartExam,
                            meta:{
                                title:"词易记-单词自测"
                            }
                        }
                    ]
                },
                {
                    path:'examrecord',
                    component:ExamRecord,
                    meta:{
                        title:"词易记-考试记录"
                    }
                },
                {
                    path:'user-info',
                    component:UserInfo,
                    meta:{
                        title:"词易记-用户信息"
                    }
                },
                {
                    path:'changepassword',
                    component:userPwd,
                    meta:{
                        title:"词易记-修改密码"
                    }
                }
            ]
        },
        { 
          path:'/reg',
          component:MyRegister,
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

router.afterEach((to,from)=>{
    document.title = to.meta.title || document.title
})


export default router