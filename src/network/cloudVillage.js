import { request } from './request'

// 独家放送入口
export function getPrivatecontent() {
    return request({
        url: '/personalized/privatecontent'
    })
}

// 独家放送列表
export function getPrivateContentList(limit, offset) {
    return request({
        url: '/personalized/privatecontent/list',
        params: {
            limit, 
            offset
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

// 获取话题详情
export function getTopicDetail(actid) {
    return request({
        url: '/topic/detail',
        params: {
            actid
        }
    })
}

// 获取热门话题
export function getActiveDetail(actid) {
    return request({
        url: '/topic/detail/event/hot',
        params: {
            actid
        }
    })
}
