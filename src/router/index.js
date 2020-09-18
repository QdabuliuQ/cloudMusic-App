import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 组件懒加载
const discover = () => import('views/discover/Discover')  // 发现页面组件
const myMessage = () => import('views/myMessage/MyMessage')  // 个人页面组件
const cloudVillage = () => import('views/cloudVillage/CloudVillage')  // 云村页面组件
const video = () => import('views/video/Video')  // 视频页面组件

//const login = () => import('components/context/login/Login')// 登录组件


const routes = [
  { path: '/', redirect: '/discover' },
  { 
    path: '/discover',
    component: discover,
  },

  // 个人页面
  { path: '/myMessage', component: myMessage },
  { path: '/myMessage/login', component: () => import('components/context/login/Login')  },
  { path: '/myMessage/login/phoneLogin', component: () => import('components/context/phoneLogin/PhoneLogin') },
  { path: '/myMessage/login/emailLogin', component: () => import('components/context/emailLogin/EmailLogin') },


  { path: '/cloudVillage', component: cloudVillage },
  { path: '/video', component: video }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
