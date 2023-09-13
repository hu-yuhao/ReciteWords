import request from '@/utils/require'
import store from '@/store'


export const registerAPI = ({username,password,repassword}) =>{
    return request({
        url:"/enroll",
        method:'POST',
        data:{
            username,
            password,
            repassword,
        }
    })
}

export const loginAPI = ({username,password})=>{
    return request({
        url:'/login',
        method:'POST',
        data:{
            username,
            password,
        }
    })
}

export const getUserInfoAPI = ()=>{
    return request({
        url:'',
        headers:{
           Authorization:store.state.token
        }
    })
}

export const getBooks = book=>{
    return request({
        url:'',
        method:'GET',
        headers:{
            Authorization:store.state.token
        },
        params:{
            whichBook:book
        }
    })
}

export const updateBooks = Book=>{
    return request({
        url:'',
        method:'GET',
        headers:{
            Authorization:store.state.token
        },
        params:{
            whichBook:Book
        }
    })
}

export const getWordListAPI = ({whichBook,number})=>{
    return request({
        url:'',
        method:'GET',
        headers:{
            Authorization:store.state.token
        },
        params:{
            whichBook,
            number
        }
    })
}

export const updateWordsAPI = ({whichBook,wordList})=>{
    return request({
        url:'',
        method:'',
        headers:{
            Authorization:store.state.token
        },
        params:{
            whichBook,
            wordList,
        }
    })
}

export const updateUserInfoAPT = ({username,nickname,email})=>{
    return request({
        url:'',
        method:'',
        headers:{
            Authorization:store.state.token
        },
        date:{
            username,
            nickname,
            email,
        }

    })
}