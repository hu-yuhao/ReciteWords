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
        url:'/revise/get',
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
export const updateBooksAPI = ({book,wordList})=>{
    return request({
        url:'',
        method:'POST',
        headers:{
            Authorization:store.state.token
        },
        data:{
            book,
            wordList
        }
    })
}

// 获取背单词单词列表
export const getWordListAPI = ({book,number})=>{
    return request({
        url:'/book/recite',
        method:'POST',
        headers:{
            Authorization:store.state.token
        },
        data:{
            book,
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

// 获得testList API
export const getExamQuestionAPI=({whichBookExam,examNumber,percentage})=>{
    return require({
        url:'',
        method:'POST',
        header:{
            Authorization:store.state.token
        },
        data:{
            book:whichBookExam,
            number:examNumber,
            percentage
        }
    })
}


// 提交本次考试记录API
export const sendExamRecordAPT=({})=>{
    return require({
        url:'',
        method:'POST',
        header:{
            Authorization:store.state.token
        },
        data:{
            
        }
    })
}

// 获取用户考试记录
export const getUserExamRecordAPI=()=>{
    return require({
        url:'',
        method:'',
        header:{
            Authorization:store.state.token
        }
    })
}


export const updateUserInfoAPI = ({username,nickname,email})=>{
    return request({
        url:'/revise/emailNickname',
        method:'POST',
        headers:{
            Authorization:store.state.token
        },
        data:{
            username,
            nickname,
            email,
        }

    })
}

export const updatePwdAPI = ({oldPwd,newPwd,rePwd})=>{
    return request({
        url:'/revise/password',
        method:'POST',
        headers:{
            Authorization:store.state.token
        },
        data:{
            passwordY:oldPwd,
            password:newPwd,
            repassword:rePwd
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








