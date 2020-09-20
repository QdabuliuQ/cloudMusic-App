import {request} from './request'

// 获取用户关注列表
export function getUserFollow(uid){
    return request({
        url: '/user/follows',
        params:{
            uid
        }
    })
}

// 关注/取关用户
// t = 1 为关注用户，其他是取消
export function getIsFollow(id,t){
    return request({
        url: '/follow',
        params: {
            id,
            t 
        }
    })
}