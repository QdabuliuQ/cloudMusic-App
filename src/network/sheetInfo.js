
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

// 收藏/不收藏歌单
export function collectionSheet(t, id){
    return request({
        url: '/playlist/subscribe',
        params: {
            t,
            id
        }
    })
}