import Vue from 'vue'
import VueRouter from 'vue-router'


const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {

  return originalPush.call(this, location).catch(err => err)

}

Vue.use(VueRouter)

// 组件懒加载
const discover = () => import('views/discover/Discover')  // 发现页面组件
const myMessage = () => import('views/myMessage/MyMessage')  // 个人页面组件
const cloudVillage = () => import('views/cloudVillage/CloudVillage')  // 云村页面组件
const video = () => import('views/video/Video')  // 视频页面组件


// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

// const originalPush = VueRouter.prototype.push
//    VueRouter.prototype.push = function push(location) {
//    return originalPush.call(this, location).catch(err => err)
// }


const routes = [
  { path: '/', redirect: '/discover' },
  { 
    path: '/discover',
    component: discover,
  },
  { path: '/discover/moreSheet/', component: () => import('views/discover/childrenComps/moreComps/moreSheet') },  // 歌单广场
  { path: '/discover/moreSongs/', component: () => import('views/discover/childrenComps/moreComps/moreSongs') },  // 更多音乐
  { path: '/discover/moreAlbum/', component:  () => import('views/discover/childrenComps/moreComps/moreAlbum') },  // 新碟上架

  // 个人页面
  { path: '/myMessage', component: myMessage },
  // 个人--电台
  { path: '/myMessage/radioStation', component: () => import('views/radioStation/RadioStation') },  // 个人--电台
  { path: '/myMessage/radioStation/stationHomeP', component: () => import('views/radioStation/childrenComps/StationHomeP') },  // 电台首页
  { path: '/radioStation/', component: () => import('views/radioStation/childrenComps/StationHomeP') },
  { path: '/myMessage/radioStation/stationHomeP/stationClassify', component: () => import('views/radioStation/childrenComps/StationClassify') },  // 电台分类
  { path: '/myMessage/radioStation/stationHomeP/stationRanking', component: () => import('views/radioStation/childrenComps/rankingList') },  // 电台排位
  { path: '/classifyInfo/:type', component: () => import('views/radioStation/childrenComps/ClassifyInfo') },  // 电台分类详情
  { path: '/stationDetail/:rid', component: () => import('views/radioStation/childrenComps/StationDetail') },  // 电台详情
  { path: '/audioPlay/:id', component: () => import('views/radioStation/childrenComps/audioPlay') },  // 电台音乐播放
  { path: '/myMessage/follow', component: () => import('views/follow/Follow') },  // 个人--关注
  { path: '/myMessage/collection', component: () => import('views/collection/Collection') },  // 个人--收藏

  { path: '/played/:id', component: () => import('views/played/Played') },  // 最近播放
  { path: '/fansList/:id', component: () => import('components/context/fansList/FansList') },  // 粉丝
  { path: '/follow/:id', component: () => import('views/follow/Follow') },  // 关注

  { path: '/Information/:uid', component: () => import('views/information/Information') },  // 个人详情页

  { path: '/myMessage/login', component: () => import('components/context/login/Login') },  // 登录
  { path: '/myMessage/login/phoneLogin', component: () => import('components/context/phoneLogin/PhoneLogin') },  // 手机登录
  { path: '/myMessage/login/emailLogin', component: () => import('components/context/emailLogin/EmailLogin') },  // 邮箱登录

  { path: '/playDetail/:id&:isAlbum', component: () => import('components/context/sheetInfo/SheetInfo') },  // 歌单/专辑内容
  { path: '/playSong/:sid', component: () => import('components/common/playSong/PlaySong') },  // 播放界面
  { path: '/mvplay/:mid', component: () => import('components/context/mvPlay/MvPlay') },  // mv播放

  { path: '/cloudVillage', component: cloudVillage },
  { path: '/video', component: video }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
