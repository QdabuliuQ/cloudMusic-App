import { request } from './request'

// 独家放送入口
export function getPrivatecontent() {
    return request({
        url: '/personalized/privatecontent'
    })
}

// 云村热评
export function getHotwall(cookie) {
    return request({
        url: '/comment/hotwall/list',
        params: {
            cookie
        }
    })
}

// 音乐日历
export function getCalendar(cookie, startTime, endTime) {
    return request({
        url: '/calendar',
        params: {
            cookie,
            startTime,
            endTime,

        }
    })
}

// 热门话题
export function getHotTopic(limit, offset, cookie){
    return request({
        url: '/hot/topic',
        params: {
            limit, 
            offset,
            cookie
        }
    })
}

// 楼层评论
export function getCommentFloor(parentCommentId, id, type, limit, time){
    return request({
        url: '/comment/floor',
        params:{
            parentCommentId, 
            id, 
            type,
            limit, 
            time
        }
    })
}