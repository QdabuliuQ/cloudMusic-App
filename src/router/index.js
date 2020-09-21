import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 组件懒加载
const discover = () => import('views/discover/Discover')  // 发现页面组件
const myMessage = () => import('views/myMessage/MyMessage')  // 个人页面组件
const cloudVillage = () => import('views/cloudVillage/CloudVillage')  // 云村页面组件
const video = () => import('views/video/Video')  // 视频页面组件


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes = [
  { path: '/', redirect: '/discover' },
  { 
    path: '/discover',
    component: discover,
  },

  // 个人页面
  { path: '/myMessage', component: myMessage },
  // 个人--电台
  { path: '/myMessage/radioStation', component: () => import('views/radioStation/RadioStation') },
  { path: '/myMessage/follow', component: () => import('views/follow/Follow') },  // 个人--关注
  { path: '/myMessage/played', component: () => import('views/played/Played') },  // 个人--最近播放
  { path: '/myMessage/collection', component: () => import('views/collection/Collection') },  // 个人--收藏
  // 个人--登录
  { path: '/myMessage/login', component: () => import('components/context/login/Login') },
  { path: '/myMessage/login/phoneLogin', component: () => import('components/context/phoneLogin/PhoneLogin') },
  { path: '/myMessage/login/emailLogin', component: () => import('components/context/emailLogin/EmailLogin') },

  { path: '/playDetail/:id', component: () => import('components/context/sheetInfo/SheetInfo') },  // 歌单内容

  { path: '/cloudVillage', component: cloudVillage },
  { path: '/video', component: video }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
