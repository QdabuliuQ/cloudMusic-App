import {request} from './request'

// 注册请求
export function register(phone,password,captcha,nickname){
    return request({
        url: '/register/cellphone',
        params:{
            phone,
            captcha,
            password,
            nickname
        }
    })
}