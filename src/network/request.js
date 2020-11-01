import axios from 'axios'

export function request(config){
    // 创建一个 axios 对象
    const instance = axios.create({
        // 根路径
        baseURL: 'http://localhost:3000',
        // 请求时间
        timeout: 5000,
    })
    // 返回 实例对象
    return instance(config)
}