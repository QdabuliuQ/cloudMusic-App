import { request } from './request'

/**
 * 发现组件所有网络请求
 */

// 轮播图请求
export function getBanner(type) {
    return request({
        url: '/banner',
        params: {
            type
        }
    })
}

// 首页信息
export function getHomepage(refresh) {
    return request({
        url: '/homepage/block/page',
        params: {
            refresh
        }
    })
}

// 获取新歌曲
export function getNewSong() {
    return request({
        url: '/recommend/songs'
    })
}

// 热门话题
export function getTopic(limit, offset) {
    return request({
        url: '/hot/topic',
        params: {
            limit,
            offset
        }
    })
}

// 热门歌单
export function getHotSheet(order, cat = "全部", limit, offset) {
    return request({
        url: '/top/playlist',
        params: {
            order,
            cat,
            limit,
            offset
        }
    })
}

// 新歌速递
export function getSongsTop(type) {
    return request({
        url: '/top/song',
        params: {
            type
        }
    })
}

// 推荐节目
export function getProgram() {
    return request({
        url: '/program/recommend'
    })
}

// 最新MV
export function getNewMv(area, limit) {
    return request({
        url: '/mv/first',
        params: {
            area,
            limit
        }
    })
}

// 云村热评
export function getHotComment() {
    return request({
        url: '/comment/hotwall/list'
    })
}

// 新碟上架
export function getNewAlbum(limit, offset, area, type) {
    return request({
        url: '/top/album',
        params: {
            limit,
            offset,
            area,
            type
        }
    })
}

// 热门歌手
export function getHotSinger(limit, offset) {
    return request({
        url: '/top/artists',
        params: {
            limit,
            offset
        }
    })
}

// 歌单标签列表
export function getSheetTags() {
    return request({
        url: '/playlist/hot'
    })
}

// 新碟上架
export function getAlbum(limit, offset, area, type) {
    return request({
        url: '/top/album',
        params: {
            limit,
            offset,
            area,
            type
        }
    })
}

// 歌手分类
export function getSinger(limit, offset, type, area) {
    return request({
        url: '/artist/list',
        params: {
            limit,
            offset,
            type,
            area
        }
    })
} 

// 日推歌曲
export function getRecommendSong(cookie){
    return request({
        url: '/recommend/songs',
        params: {
            cookie
        }
    })
}
