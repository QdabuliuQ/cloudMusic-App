import {request} from './request'

// 获取用户基本信息
export function getUserDetail(uid){
    return request({
        url: '/user/detail',
        params: {
            uid
        }
    })
}

// 获取用户详细信息
export function getUserSubcount(){
    return request({
        url: '/user/subcount'
    })
}

// 获取用户歌单
export function getUserPlayList(uid){
    return request({
        url: '/user/playlist',
        params:{
            uid
        }
    })
}

export function getSongs(){
    return request({
        url: '/recommend/songs'
    })
}