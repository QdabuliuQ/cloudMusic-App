import { request } from './request'

// 分类
export function videoCategory() {
    return request({
        url: '/video/group/list'
    })
}

// 全部视频
export function getAllVideo(offset) {
    return request({
        url: '/video/timeline/all',
        params: {
            offset,
        },    
    })
}

// 视频内容
export function getDetail(id, offset, cookie){
    return request({
        url: '/video/group',
        params: {
            id, 
            offset,
            cookie
        }
    })
}

// 视频详情
export function getVideoDetail(id){
    return request({
        url: '/video/detail',
        params: {
            id
        }
    })
}

// 视频数据
export function getVideoInfo(vid){
    return request({
        url: '/video/detail/info',
        params: {
            vid
        }
    })
}

// 视频url
export function getVideoUrl(id){
    return request({
        url: '/video/url',
        params: {
            id
        }
    })
}

// 相关视频
export function getSimiVideo(id){
    return request({
        url: '/related/allvideo',
        params: {
            id
        }
    })
}

// 视频评论
export function getVideoComment(id, limit, offset){
    return request({
        url: '/comment/video',
        params: {
            id, 
            limit, 
            offset
        }
    })
}
