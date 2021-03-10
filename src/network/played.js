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

// 获取用户歌单
// export function getUserSongList(){
//     return request({
//         url: '/playlist/detail'
//     })
// }


// 获取歌曲详情
export function getSongDetial(ids,limit,offset){
    return request({
        url: '/song/detail',
        params: {
            ids,
            limit,
            offset
        }
    })
}

// 获取歌曲评论
export function getComment(id,limit=50,offset){
    return request({
        url: '/comment/music',
        params: {
            id,
            limit,
            offset
        }
    })
}

// 获取楼层评论
export function getCommentFloor(parentCommentId, id, tpye){
    return request({
        url: '/comment/floor',
        params: {
            parentCommentId,  // 楼层id
            id,  // 歌曲id
            tpye  // 评论类型 0: 歌曲 1: mv  2: 歌单  3: 专辑  4: 电台  5: 视频             
        }
    })
}