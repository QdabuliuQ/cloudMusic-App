import axios from 'axios'
import Vue from 'vue'

export function request(config) {
    // 创建一个 axios 对象
    const instance = axios.create({
        // 根路径
        baseURL: 'http://localhost:3000',
        // https://binaryify.github.io/NeteaseCloudMusicApi
        // baseURL: 'https://binaryify.github.io/NeteaseCloudMusicApi/',
        // 请求时间
        timeout: 5000,
    })

    instance.interceptors.request.use(config => {
        Vue.prototype.$loading.loadingShow();  // 显示加载动画
        return config
    })

    instance.interceptors.response.use(config => {
        Vue.prototype.$loading.loadingNo();  // 隐藏动画
        return config
    })
    // 返回 实例对象
    return instance(config)
}