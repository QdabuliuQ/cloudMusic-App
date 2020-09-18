import {request} from './request'

export function getUserDetail(uid){
    return request({
        url: '/user/detail',
        params: {
            uid
        }
    })
}