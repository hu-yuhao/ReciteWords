import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import {getUserInfoAPI} from '@/api'

Vue.use(Vuex)

const actions = {
    // 获取用户信息
    getUserInfoActions(context){
        getUserInfoAPI().then(
            res=>{
                context.commit('updateUserInfo',res.data.data)
            }
        )
    }
}

const mutations = {
    // 保存token
    updateToken(state,newToken){
        state.token = newToken
        localStorage.setItem('token',newToken)
    },
    // 更新用户信息
    updateUserInfo(state,val){
        state.userInfo = val
    },
    // 获取单词书相应单词
    getReWordsInfo(state,val){
        state.ReWordsInfo.book=val.whichBook,
        state.ReWordsInfo.number=val.howManyWords
    },
    // 获取测试相关信息
    getExamInfo(state,val){
        state.ExamInfo = val
    },
    // 更新考试状态，true表示上次考试未结束，false表示已经结束
    updateIsExaming(state,val){
        state.isExaming=val
    }
}

const getters = {

}

const state = {
    // 考试状态
    isExaming:false,
    // 从本次储存中获取token
    token:localStorage.getItem('token'),
    // 保存用户信息
    userInfo:{},
    // 保存背单词相关信息
    ReWordsInfo:{},
    // 保存测试相关信息
    ExamInfo:{},
}      

export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})