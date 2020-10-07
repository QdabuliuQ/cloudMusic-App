import {request} from './request'

// 用户电台
export function getUserDJ(uid){
    return request({
        url: '/user/dj',
        params:{
            uid
        }
    })
}

// 获取用户创建的电台
export function userAudio(uid){
    return request({
        url: '/user/audio',
        params: {
            uid
        }
    })
}

// 获取订阅电台列表
export function getAudioList(){
    return request({
        url: '/dj/sublist'
    })
}

// 电台推荐
export function getRecommendAudio(){
    return request({
        url: '/dj/recommend'
    })
}

// 电台banner
export function getSwiper(){
    return request({
        url: '/dj/banner'
    })
}

// 电台今日优选
export function getPerfered(){
    return request({
        url: '/dj/today/perfered'
    })
}

// 获取精品电台
export function getTopList(limit){
    return request({
        url: '/dj/toplist/pay',
        params: {
            limit 
        }
    })
}

// 电台分类
export function getCateList(){
    return request({
        url: '/dj/catelist'
    })
}

// 电台分类推荐
export function getRecommend(type){
    return request({
        url: '/dj/recommend/type',
        params: {
            type
        }
    })
}