import {request} from './request'

// 获取最近播放歌曲
export function getPlayList(uid, type=0){
    return request({
        url: '/user/record',
        params:{
            uid,
            type
        }
    })
}

// 获取歌曲详情
export function getSongDetial(ids){
    return request({
        url: '/song/detail',
        params: {
            ids
        }
    })
}