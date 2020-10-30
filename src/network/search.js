import {request} from './request'

// 搜索默认关键词
export function getDefault(){
    return request({
        url: '/search/default'
    })
}

// 热搜榜简略
export function getSearchHot(){
    return request({
        url: '/search/hot'
    })
}

// 热搜榜详情
export function getHotDetail(){
    return request({
        url: '/search/hot/detail'
    })
}

// 搜索结果
export function searchResult(keywords, limit, offset, type){
    return request({
        url: '/search',
        params: {
            keywords,
            limit,
            offset, 
            type
        }
    })
}

// 搜索建议
export function searchSuggest(keywords, type){
    return request({
        url: '/search/suggest',
        params: {
            keywords, 
            type
        }
    })
}
// export function searchSuggest(keywords, type){
//     return request({
//         url: '/search/multimatch',
//         params: {
//             keywords, 
//             type
//         }
//     })
// }