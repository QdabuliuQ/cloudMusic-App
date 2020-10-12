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

// 推荐类型
export function getCategory(){
    return request({
        url: '/dj/category/recommend'
    })
}


// 电台类别热门
export function getRecommendHot(cateId, limit, offset,){
    return request({
        url: '/dj/radio/hot',
        params: {
            cateId,
            limit,
            offset,      
        }
    })
}

// 付费推荐
export function getPaygift(limit,offset){
    return request({
        url: '/dj/paygift',
        params: {
            limit,
            offset
        }
    })
}

// 电台详情
export function getAudioDetail(rid){
    return request({
        url: '/dj/detail',
        params: {
            rid
        }
    })
}

// 获取电台节目详情
export function getDjProgram(rid,limit,offset,asc){
    return request({
        url:'/dj/program',
        params: {
            rid,
            limit,
            offset,
            asc
        }
    })
}

export function getProgramDetail(id){
    return request({
        url: '/dj/program/detail',
        params:{
            id
        }
    })
}

// 获取热门电台推荐
export function getDjHot(limit, offset){
    return request({
        url: '/dj/hot',
        params: {
            limit,
            offset
        }
    })
}

// 获取电台节目详情
export function getDetail(id){
    return request({
        url: '/dj/program/detail',
        params: {
            id
        }
    })
}

// 获取电台节目评论
export function getCommentAudio(id,limit,offset){
    return request({
        url: '/comment/dj',
        params: {
            id,
            limit,
            offset
        }
    })
}