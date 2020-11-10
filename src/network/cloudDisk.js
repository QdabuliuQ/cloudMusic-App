import {request} from './request'

// 云盘
export function getDisk(limit, offset, cookie){
    return request({
        url: '/user/cloud',
        params: {
            limit, 
            offset, 
            cookie
        }
    })
}

// 云盘数据
export function getDiskDetail(id, cookie){
    return request({
        url: '/user/cloud/detail',
        params: {
            id,
            cookie
        }
    })
}
