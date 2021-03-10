import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push

Vue.use(VueRouter)
// 解决路由重复点击保存问题
VueRouter.prototype.replace = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalReplace.call(this, location).catch(err => err)
}

// 组件懒加载
// 发现页面
const discover = () => import(/* webpackChunkName: "group-discover" */ 'views/discover/Discover') // 发现页面组件
const recommendSong = () => import(/* webpackChunkName: "group-discover" */ 'views/discover/childrenComps/RecommendSong') // 日推
const moreSheet = () => import(/* webpackChunkName: "group-discover" */ 'views/discover/childrenComps/moreComps/moreSheet') // 歌单广场
const moreSongs = () => () => import(/* webpackChunkName: "group-discover" */ 'views/discover/childrenComps/moreComps/moreSongs') // 更多音乐
const moreAlbum = () => import(/* webpackChunkName: "group-discover" */ 'views/discover/childrenComps/moreComps/moreAlbum') // 新碟上架
const moreSinger = () => import(/* webpackChunkName: "group-discover" */ 'views/discover/childrenComps/moreComps/moreSinger') // 更多歌手
// const moreSongs = () => import(/* webpackChunkName: "group-discover" */ 'views/discover/childrenComps/moreComps/moreSongs') // 更多音乐

// 搜索页面
const search = () => import(/* webpackChunkName: "group-search" */ 'views/search/Search') // 搜索组件
const searchDetail = () => import(/* webpackChunkName: "group-search" */ 'views/search/childrenComps/SearchDetail') // 搜索详情
const DetailSongs = () => import(/* webpackChunkName: "group-search" */ 'views/search/childrenComps/DetailSongs') // 歌曲
const DetailSinger = () => import(/* webpackChunkName: "group-search" */ 'views/search/childrenComps/DetailSinger') // 歌手
const DetailUser = () => import(/* webpackChunkName: "group-search" */ 'views/search/childrenComps/DetailUser') // 用户
const DetailAlbum = () => import(/* webpackChunkName: "group-search" */ 'views/search/childrenComps/DetailAlbum') // 专辑
const DetailSheet = () => import(/* webpackChunkName: "group-search" */ 'views/search/childrenComps/DetailSheet') // 歌单
const DetailWhole = () => import(/* webpackChunkName: "group-search" */ 'views/search/childrenComps/DetailWhole') // 综合 
const DetailVideo = () => import(/* webpackChunkName: "group-search" */ 'views/search/childrenComps/DetailVideo') // 视频
const DetailRadio = () => import(/* webpackChunkName: "group-search" */ 'views/search/childrenComps/DetailRadio') // 电台
const DetailMv = () => import(/* webpackChunkName: "group-search" */ 'views/search/childrenComps/DetailMv') // mv  

// 个人页面
const myMessage = () => import(/* webpackChunkName: "group-myMessage" */ 'views/myMessage/MyMessage') // 个人页面组件
const RadioStation = () => import(/* webpackChunkName: "group-myMessage-station" */ 'views/radioStation/RadioStation') // 个人--电台
const StationHomeP = () => import(/* webpackChunkName: "group-myMessage-station" */ 'views/radioStation/childrenComps/StationHomeP') // 电台首页
const StationHomeP2 = () => import(/* webpackChunkName: "group-myMessage-station" */ 'views/radioStation/childrenComps/StationHomeP')
const StationClassify = () => import(/* webpackChunkName: "group-myMessage-station" */ 'views/radioStation/childrenComps/StationClassify') // 电台分类
const rankingList = () => import(/* webpackChunkName: "group-myMessage-station" */ 'views/radioStation/childrenComps/rankingList') // 电台排位
const ClassifyInfo = () => import(/* webpackChunkName: "group-myMessage-station" */ 'views/radioStation/childrenComps/ClassifyInfo') // 电台分类详情
const StationDetail = () => import(/* webpackChunkName: "group-myMessage-station" */ 'views/radioStation/childrenComps/StationDetail') // 电台详情
const audioPlay = () => import(/* webpackChunkName: "group-myMessage-station" */ 'views/follow/Follow') // 电台音乐播放
const Follow = () => import(/* webpackChunkName: "group-myMessage-other" */ 'views/radioStation/childrenComps/audioPlay') // 个人--关注 
const Collection = () => import(/* webpackChunkName: "group-myMessage-other" */ 'views/collection/Collection') // 收藏
const CollectionMv = () => import(/* webpackChunkName: "group-myMessage-other" */ 'views/collection/childrenComps/CollectionMv')  // 收藏mv
const CollectionAlbum = () => import(/* webpackChunkName: "group-myMessage-other" */ 'views/collection/childrenComps/CollectionAlbum') // 收藏专辑
const CollectionSingers = () => import(/* webpackChunkName: "group-myMessage-other" */ 'views/collection/childrenComps/CollectionSingers') // 歌手
const Played = () => import(/* webpackChunkName: "group-myMessage-other" */ 'views/played/Played') // 最近播放
const FansList = () => import(/* webpackChunkName: "group-myMessage-other" */ 'components/context/fansList/FansList') // 粉丝
const UserFollow = () => import(/* webpackChunkName: "group-myMessage-other" */ 'views/follow/Follow') // 关注
const Information = () => import(/* webpackChunkName: "group-myMessage-other" */ 'views/information/Information') // 个人详情页
const CloudDisk = () => import(/* webpackChunkName: "group-myMessage-other" */ 'views/cloudDisk/CloudDisk') // 云盘
const Login = () => import(/* webpackChunkName: "group-myMessage-login" */ 'components/context/login/Login') // 登录
const PhoneLogin = () => import(/* webpackChunkName: "group-myMessage-login" */ 'components/context/phoneLogin/PhoneLogin') // 手机登录

// 歌曲播放
const SheetInfo = () => import(/* webpackChunkName: "group-myMessage-play" */ 'components/context/sheetInfo/SheetInfo') // 歌单/专辑内容
const SheetInfoComment = () => import(/* webpackChunkName: "group-myMessage-play" */ 'components/context/sheetInfo/childrenComps/SheetInfoComment')// 歌单/专辑 评论
const PlaySong = () => import(/* webpackChunkName: "group-myMessage-play" */ 'components/common/playSong/PlaySong') // 播放界面
const MvPlay = () => import(/* webpackChunkName: "group-myMessage-play" */ 'components/context/mvPlay/MvPlay') // mv/视频播放

// 云村
const cloudVillage = () => import(/* webpackChunkName: "group-cloudVillage" */ 'views/cloudVillage/CloudVillage') // 云村页面组件
const PrivateContent = () => import(/* webpackChunkName: "group-cloudVillage" */ 'views/cloudVillage/childrenComps/PrivateContent')  // 热评
const MusicTopic = () => import(/* webpackChunkName: "group-cloudVillage" */ 'views/cloudVillage/childrenComps/MusicTopic') // 音乐日历
const TopicDetail = () => import(/* webpackChunkName: "group-cloudVillage" */ 'views/cloudVillage/childrenComps/TopicDetail') // 音乐日历

// 视频播放
const video = () => import(/* webpackChunkName: "group-video" */ 'views/video/Video') // 视频页面组件

const routes = [{
    path: '/',
    redirect: '/discover'
  },
  {
    path: '/discover',
    component: discover,
  },
  {
    path: '/discover/recommendSong',
    component: recommendSong
  }, // 日推
  {
    path: '/discover/moreSheet/',
    component: moreSheet,
  }, // 歌单广场
  {
    path: '/discover/moreSongs/',
    component: moreSongs,
  }, // 更多音乐
  {
    path: '/discover/moreAlbum/',
    component: moreAlbum
  }, // 新碟上架
  {
    path: '/discover/moreSinger/',
    component: moreSinger
  }, // 更多歌手
  {
    path: '/discover/search',
    component: search
  }, // 搜索组件
  {
    path: '/discover/search/searchDetail/:keywords',
    component: searchDetail, // 搜索详情
    children: [{
        path: '/discover/search/searchDetail/:keywords',
        redirect: '/discover/search/searchDetail/whole/:keywords'
      },
      {
        path: '/discover/search/searchDetail/song/:keywords',
        component: DetailSongs // 歌曲
      },
      {
        path: '/discover/search/searchDetail/singer/:keywords',
        component: DetailSinger // 歌手
      },
      {
        path: '/discover/search/searchDetail/user/:keywords',
        component: DetailUser, // 用户
      },
      {
        path: '/discover/search/searchDetail/album/:keywords',
        component: DetailAlbum, // 专辑
      },
      {
        path: '/discover/search/searchDetail/sheet/:keywords',
        component: DetailSheet, // 歌单
      },
      {
        path: '/discover/search/searchDetail/whole/:keywords',
        component: DetailWhole, // 综合 
      },
      {
        path: '/discover/search/searchDetail/video/:keywords',
        component: DetailVideo, // 视频
      },
      {
        path: '/discover/search/searchDetail/radio/:keywords',
        component: DetailRadio, // 电台
      },
      {
        path: '/discover/search/searchDetail/mv/:keywords',
        component: DetailMv, // mv  
      }
    ]
  },
  // 个人页面
  {
    path: '/myMessage',
    component: myMessage
  },
  // 个人--电台
  {
    path: '/myMessage/radioStation',
    component: RadioStation
  }, // 个人--电台
  {
    path: '/myMessage/radioStation/stationHomeP',
    component: StationHomeP
  }, // 电台首页
  {
    path: '/radioStation/',
    component: StationHomeP2
  },
  {
    path: '/myMessage/radioStation/stationHomeP/stationClassify',
    component: StationClassify
  }, // 电台分类
  {
    path: '/myMessage/radioStation/stationHomeP/stationRanking',
    component: rankingList
  }, // 电台排位
  {
    path: '/classifyInfo/:type',
    component: ClassifyInfo
  }, // 电台分类详情
  {
    path: '/stationDetail/:rid',
    component: StationDetail,
  }, // 电台详情
  {
    path: '/audioPlay/:id',
    component: audioPlay
  }, // 电台音乐播放
  {
    path: '/myMessage/follow',
    component: Follow
  }, // 个人--关注
  {
    path: '/myMessage/collection',
    component: Collection,
    children: [{
        path: '/mv',
        component: CollectionMv,
      }, // 收藏mv
      {
        path: '/album',
        component: CollectionAlbum,
      }, // 收藏专辑
      {
        path: '/singer',
        component: CollectionSingers
      } // 歌手
    ]
  }, // 个人--收藏

  {
    path: '/played/:id',
    component: Played
  }, // 最近播放
  {
    path: '/fansList/:id',
    component: FansList
  }, // 粉丝
  {
    path: '/follow/:id',
    component: UserFollow
  }, // 关注

  {
    path: '/Information/:uid',
    component: Information
  }, // 个人详情页

  {
    path: '/myMessage/login',
    component: Login
  }, // 登录
  {
    path: '/myMessage/login/phoneLogin',
    component: PhoneLogin
  }, // 手机登录
  {
    path: '/myMessage/cloudDisk',
    component: CloudDisk
  }, // 云盘

  {
    path: '/playDetail/:id&:isAlbum',
    component: SheetInfo,
  }, // 歌单/专辑内容
  { 
    path: '/playComment/:id&:isAlbum', component: SheetInfoComment
  },// 歌单/专辑 评论
  {
    path: '/playSong/:sid',
    component: PlaySong
  }, // 播放界面
  {
    path: '/mvplay/:mid&:isMv',
    component: MvPlay
  }, // mv/视频播放

  {
    path: '/cloudVillage',
    component: cloudVillage,
    children: [{
        path: '/cloudVillage',
        redirect: '/hotcomment'
      },
      {
        path: '/hotcomment',
        component: PrivateContent
      }, // 热评
      {
        path: '/musicTopic',
        component: MusicTopic,
      }, // 音乐日历
    ]
  },
  {
    path: '/video',
    component: video
  },
  { 
    path: '/topicDetail/:id', 
    component: TopicDetail
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // 解决页面切换滚动位置和上一个页面一致的问题
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
export default router