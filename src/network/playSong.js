import {request} from './request'

// 获取音乐url
export function playSong(id){
    return request({
        url: '/song/url',
        params:{
            id
        }
    })
}

// 获取歌词
export function getlyric(id){
    return request({
        url: '/lyric',
        params:{
            id
        }
    })
}