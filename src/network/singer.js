import {request} from './request'

// 获取歌手描述
export function getSingerDetail(id){
    return request({
        url: '/artist/desc',
        params: {
            id
        }
    })
}

// 获取歌手歌曲
export function getSongsList(id,order,limit,offset){
    return request({
        url: '/artist/songs',
        params: {
            id,
            order,
            limit,
            offset
        }
    })
}

// 获取歌手mv
export function getSingerMv(id){
    return request({
        url: '/artist/mv',
        params: {
            id
        }
    })
}

// 歌手专辑
export function getSingerAlbum(id, limit, offset){
    return request({
        url: '/artist/album',
        params: {
            id,
            limit,
            offset
        }
    })
}

// 相似歌手
export function getSingerSimi(id){
    return request({
        url: '/simi/artist',
        params: {
            id
        }
    })
}