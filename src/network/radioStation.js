import {request} from './request'

// 用户电台
export function getUserDJ(uid){
    return request({
        url: '/user/dj',
        params:{
            uid
        }
    })
}
