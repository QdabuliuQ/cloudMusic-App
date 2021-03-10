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

// 收藏的mv
export function getVideo(cookie){
    return request({
        url: '/mv/sublist',
        params: {
            cookie
        }
    })
}

// 收藏的专辑
export function getAlbum(cookie, limit, offset){
    return request({
        url: '/album/sublist',
        params: {
            cookie,
            limit, 
            offset
        }
    })
}

// 收藏的歌手列表
export function getSinger(cookie){
    return request({
        url: '/artist/sublist',
        params: {
            cookie
        }
    })
}