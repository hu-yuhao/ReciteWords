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

// 获取用户数据API
export const getUserInfoAPI = ()=>{
    return request({
        url:'/revise/get',
        headers:{
           Authorization:store.state.token
        }
    })
}

// 获取对应单词书中的单词API
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

// 更新对应单词书中的单词API
export const updateBooksAPI = ({book,wordList})=>{
    return request({
        url:'/book/alterState',
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

// 获取背单词单词列表API
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


// 更新不记得次数API
export const updateWordsAPI = ({whichBook,wordList})=>{
    return request({
        url:'/book/alterCount',
        method:'POST',
        headers:{
            Authorization:store.state.token
        },
        data:{
            book:whichBook,
            wordList,
        }
    })
}

// 获得testList API
export const getExamQuestionAPI=({book,number,rate})=>{
    return request({
        url:'/test/question',
        method:'POST',
        headers:{
            Authorization:store.state.token
        },
        data:{
            book,
            number,
            rate
        }
    })
}


// 提交本次考试记录API
export const sendExamRecordAPT=({date,book,number,scores})=>{
    return request({
        url:'/test/recordingTest',
        method:'POST',
        headers:{
            Authorization:store.state.token
        },
        data:{
            date,
            book,
            number,
            scores
        }
    })
}

// 获取用户考试记录API
export const getUserExamRecordAPI=()=>{
    return request({
        url:'/test/getRecording',
        method:'GET',
        headers:{
            Authorization:store.state.token
        }
    })
}

// 更新用户基本信息API
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


// 更新用户密码API
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


// 更新用户头像API
export const updateUserAvatarAPI = (avatar) =>{
    return request({
        url:'/loadImg',
        method:"POST",
        headers:{
            Authorization:store.state.token
        },
        data:{
            avatar
        }
    })
}








