import {request} from './request'

// 获取mv信息
export function getMvDetail(mvid){
    return request({
        url: '/mv/detail',
        params: {
            mvid
        }
    })
}

// 获取mv详细数据
export function getMvInfo(mvid){
    return request({
        url: '/mv/detail/info',
        params:{
            mvid
        }
    })
}

// 获取mv url地址
export function getMv(id, r=1080){
    return request({
        url: '/mv/url',
        params: {
            id,
            r
        }
    })
}

// 获取相似mv
export function getSimiMv(mvid){
    return request({
        url: '/simi/mv',
        params: {
            mvid
        }
    })
}

// 获取歌手信息
export function getSinger(id){
    return request({
        url: '/artist/desc',
        params: {
            id
        }
    })
}

// 获取mv评论
export function getMvComment(id, limit, offset){
    return request({
        url: '/comment/mv',
        params: {
            id,
            limit,
            offset
        }
    })
}
