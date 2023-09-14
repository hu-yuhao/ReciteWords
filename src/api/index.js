import request from '@/utils/require'
import store from '@/store'

//  注册API
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

// 登录API
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


// 获取用户数据
export const getUserInfoAPI = ()=>{
    return request({
        url:'',
        headers:{
           Authorization:store.state.token
        }
    })
}


// 获取对应单词书中的单词
export const getBooksAPI = book=>{
    return request({
        url:'/book/show',
        method:'POST',
        headers:{
            Authorization:store.state.token
        },
        data:{
            book
        }
    })
}


// 更新对应单词书中的单词
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

// 获取背单词单词列表
export const getWordListAPI = ({whichBook,number})=>{
    return request({
        url:'',
        method:'GET',
        headers:{
            Authorization:store.state.token
        },
        params:{
            book:whichBook,
            number
        }
    })
}


// 更新不记得次数
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

export const updatePwdAPI = ({oldPwd,newPwd,rePwd})=>{
    return request({
        url:'',
        method:'',
        headers:{
            Authorization:store.state.token
        },
        date:{
            oldPwd,
            newPwd,
            rePwd
        }
    })
}

export const updateUserAvatarAPI = (avatar) =>{
    return require({
        url:'',
        method:"",
        headers:{
            Authorization:store.state.token
        },
        data:{
            avatar
        }
    })
}