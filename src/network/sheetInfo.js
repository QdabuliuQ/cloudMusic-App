
import {request} from './request'

// 获取歌单详情
export function getPlayDetial(id){
    return request({
        url: '/playlist/detail',
        params: {
            id
        }
    })
}

// 获取歌单评论
export function getSheetComment(id,limit=25){
    return request({
        url: '/comment/playlist',
        params:{
            id,
            limit
        }
    })
}