import {request} from './request'

// 动态评论
export function getDynamicCom(threadId){
    return request({
        url: '/comment/event',
        params: {
            threadId
        }
    })
}