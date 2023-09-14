import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import {getUserInfoAPI} from '@/api'

Vue.use(Vuex)

const actions = {
    getUserInfoActions(context){
        getUserInfoAPI().then(
            res=>{
                context.commit('updateUserInfo',res.date.date)
            }
        )
    }
}

const mutations = {
    updateToken(state,newToken){
        state.token = newToken
        // localStorage.setItem('token',newToken)
    },
    updateUserInfo(state,val){
        state.userInfo = val
    },
    getReWordsInfo(state,val){
        state.ReWordsInfo.whichBook=val.whichBook,
        state.ReWordsInfo.howManyWords=val.howManyWords
    },
    getExamInfo(state,val){
        state.ExamInfo.whichBookExam=val.whichBook,
        state.ExamInfo.examNumber=val.examNumber,
        state.ExamInfo.percentage=val.percentage
    }
}

const getters = {

}

const state = {
    token:'',
    // token:localStorage.getItem('token')
    userInfo:{
        nickname:'huyuhao'
    },
    ReWordsInfo:{
        whichBook:'',
        howManyWords:0
    },
    ExamInfo:{
        whichBookExam:'',
        examNumber:0,
        percentage:0,
    },
    book1:[
                {id:'1',word:'hello',meaning:'你好',count:0,state:false},
                {id:"2",word:'he',meaning:'他',count:1,state:true}
            ],
    book2:[
                {id:'1',word:'hellofg',meaning:'你好',count:'0',state:false},
                {id:"2",word:'hdfgefdg',meaning:'他',count:'1',state:true}
            ],
    book3: [
                {id:'1',word:'hello',meaning:'你好',count:'0',state:false},
                {id:"2",word:'he',meaning:'他',count:'1',state:true},
                {id:'3',word:'hello',meaning:'你好',count:'0',state:false},
                {id:"4",word:'heasdg',meaning:'他',count:'1',state:true},
                {id:'5',word:'hellosdg',meaning:'你好',count:'0',state:false},
                {id:"6",word:'headsg',meaning:'他',count:'1',state:true},
                {id:'7',word:'hellosadg',meaning:'你好',count:'0',state:false},
                {id:"8",word:'hesadg',meaning:'他',count:'1',state:true},
                {id:'9',word:'helloasdfg',meaning:'你好',count:'0',state:false},
                {id:"10",word:'hedsgdfsg',meaning:'他',count:'1',state:true},
                {id:'11',word:'hello',meaning:'你好',count:'0',state:false},
                {id:"12",word:'he',meaning:'他',count:'1',state:true},
                {id:'13',word:'hello',meaning:'你好',count:'0',state:false},
                {id:"14",word:'he',meaning:'他',count:'1',state:true},
                {id:'15',word:'hello',meaning:'你好',count:'0',state:false},
                {id:"16",word:'he',meaning:'他',count:'1',state:true},
                {id:'17',word:'hello',meaning:'你好',count:'0',state:false},
                {id:"18",word:'he',meaning:'他',count:'1',state:true},
                {id:'19',word:'hello',meaning:'你好',count:'0',state:false},
                {id:"20",word:'he',meaning:'他',count:'1',state:true}
            ]
}      

export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters,
    plugins:[createPersistedState()]
})