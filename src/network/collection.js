import {request} from './request'

// 获取专辑列表
export function getSublist(id,limit=50,offset=0){
    return request({
        url: '/album/sublist',
        params: {
            id,
            limit,
            offset
        }
    })
}

// 
export function getVideo(uid){
    return request({
        url: '/mv/sublist',
        params: {
            uid
        }
    })
}