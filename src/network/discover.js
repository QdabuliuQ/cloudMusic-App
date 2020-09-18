import {request} from './request'

/**
 * 发现组件所有网络请求
 */

// 轮播图请求
export function getBanner(type){
    return request({
        url: '/banner',
        params:{
            type
        }
    })
}

// 首页信息
export function getHomepage(){
    return request({
        url: '/homepage/block/page ',
    })
}

// 获取新歌曲
export function getNewSong(){
    return request({
        url: '/recommend/songs'
    })
}