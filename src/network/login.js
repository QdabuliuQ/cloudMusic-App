import {request} from './request'

// 手机号登录
export function phoneLogin(phone,password){
    return request({
        url: '/login/cellphone',
        params: {
            phone,
            password
        }
    })
}

// 发送验证码
export function getCode(phone){
    return request({
        url: '/captcha/sent',
        params: {
            phone 
        }
    })
}

// 验证验证码
export function getCaptcha(phone,captcha){
    return request({
        url: '/captcha/verify',
        params:{
            phone,
            captcha
        }
    })
}

// 查询登陆状态
export function loginState(){
    return request({
        url: '/login/status'
    })
}

// 查询手机号是否注册
export function checkPhone(phone){
    return request({
        url: '/cellphone/existence/check',
        params:{
            phone
        }
    })
}

// 刷新登录状态
export function refreshLogin(){
    return request({
        url: '/login/refresh'
    })
}