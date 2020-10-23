import {request} from './request'

// 专辑信息
export function getAlbum(id){
    return request({
        url: '/album',
        params: {
            id
        }
    })
}

// 专辑数据
export function getAlbumDetail(id){
    return request({
        url: '/album/detail/dynamic',
        params: {
            id
        }
    })
}

// 专辑评论
export function getAlbumComment(id, limit, offset){
    return request({
        url: '/comment/album',
        params: {
            id,
            limit,
            offset
        }
    })
}