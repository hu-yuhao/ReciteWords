import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getUserInfoAPI from '@/api'

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
    }
}

const getters = {

}

const state = {
    token:'',
    // token:localStorage.getItem('token')
    userInfo:{
        nickname:'huyuhao'
    }
}

export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters,
    plugins:[createPersistedState()]
})