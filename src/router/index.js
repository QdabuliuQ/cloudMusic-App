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
const discover = () => import('views/discover/Discover') // 发现页面组件
const myMessage = () => import('views/myMessage/MyMessage') // 个人页面组件
const cloudVillage = () => import('views/cloudVillage/CloudVillage') // 云村页面组件
const video = () => import('views/video/Video') // 视频页面组件

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
    component: () => import('views/discover/childrenComps/RecommendSong')
  }, // 日推
  {
    path: '/discover/moreSheet/',
    component: () => import('views/discover/childrenComps/moreComps/moreSheet')
  }, // 歌单广场
  {
    path: '/discover/moreSongs/',
    component: () => import('views/discover/childrenComps/moreComps/moreSongs')
  }, // 更多音乐
  {
    path: '/discover/moreAlbum/',
    component: () => import('views/discover/childrenComps/moreComps/moreAlbum')
  }, // 新碟上架
  {
    path: '/discover/moreSinger/',
    component: () => import('views/discover/childrenComps/moreComps/moreSinger')
  }, // 更多歌手
  {
    path: '/discover/search',
    component: () => import('views/search/Search')
  }, // 搜索组件
  {
    path: '/discover/search/searchDetail/:keywords',
    component: () => import('views/search/childrenComps/SearchDetail'),
    children: [{
        path: '/discover/search/searchDetail/:keywords',
        redirect: '/discover/search/searchDetail/whole/:keywords'
      },
      {
        path: '/discover/search/searchDetail/song/:keywords',
        component: () => import('views/search/childrenComps/DetailSongs'), // 歌曲
      },
      {
        path: '/discover/search/searchDetail/singer/:keywords',
        component: () => import('views/search/childrenComps/DetailSinger'), // 歌手
      },
      {
        path: '/discover/search/searchDetail/user/:keywords',
        component: () => import('views/search/childrenComps/DetailUser'), // 用户
      },
      {
        path: '/discover/search/searchDetail/album/:keywords',
        component: () => import('views/search/childrenComps/DetailAlbum'), // 专辑
      },
      {
        path: '/discover/search/searchDetail/sheet/:keywords',
        component: () => import('views/search/childrenComps/DetailSheet'), // 歌单
      },
      {
        path: '/discover/search/searchDetail/whole/:keywords',
        component: () => import('views/search/childrenComps/DetailWhole'), // 综合 
      },
      {
        path: '/discover/search/searchDetail/video/:keywords',
        component: () => import('views/search/childrenComps/DetailVideo'), // 视频
      },
      {
        path: '/discover/search/searchDetail/radio/:keywords',
        component: () => import('views/search/childrenComps/DetailRadio'), // 电台
      },
      {
        path: '/discover/search/searchDetail/mv/:keywords',
        component: () => import('views/search/childrenComps/DetailMv'), // mv  
      }
    ]
  },

  {
    path: '/discover/search/searchDetail/song/:keywords',
    component: () => import('views/search/childrenComps/DetailSongs')
  }, // 歌曲
  // 个人页面
  {
    path: '/myMessage',
    component: myMessage
  },
  // 个人--电台
  {
    path: '/myMessage/radioStation',
    component: () => import('views/radioStation/RadioStation')
  }, // 个人--电台
  {
    path: '/myMessage/radioStation/stationHomeP',
    component: () => import('views/radioStation/childrenComps/StationHomeP')
  }, // 电台首页
  {
    path: '/radioStation/',
    component: () => import('views/radioStation/childrenComps/StationHomeP')
  },
  {
    path: '/myMessage/radioStation/stationHomeP/stationClassify',
    component: () => import('views/radioStation/childrenComps/StationClassify')
  }, // 电台分类
  {
    path: '/myMessage/radioStation/stationHomeP/stationRanking',
    component: () => import('views/radioStation/childrenComps/rankingList')
  }, // 电台排位
  {
    path: '/classifyInfo/:type',
    component: () => import('views/radioStation/childrenComps/ClassifyInfo')
  }, // 电台分类详情
  {
    path: '/stationDetail/:rid',
    component: () => import('views/radioStation/childrenComps/StationDetail'),
    // redirect: '/stationProgram',
    // children: [
    //   { path: '/stationProgram', component: import('views/radioStation/childrenComps/DetailProgram') }
    // ]
  }, // 电台详情
  {
    path: '/audioPlay/:id',
    component: () => import('views/radioStation/childrenComps/audioPlay')
  }, // 电台音乐播放
  {
    path: '/myMessage/follow',
    component: () => import('views/follow/Follow')
  }, // 个人--关注
  {
    path: '/myMessage/collection',
    component: () => import('views/collection/Collection'),
    children: [{
        path: '/mv',
        component: () => import('views/collection/childrenComps/CollectionMv'),
      }, // 收藏mv
      {
        path: '/album',
        component: () => import('views/collection/childrenComps/CollectionAlbum'),
      }, // 收藏专辑
      {
        path: '/singer',
        component: () => import('views/collection/childrenComps/CollectionSingers'),
      } // 歌手
    ]
  }, // 个人--收藏

  {
    path: '/played/:id',
    component: () => import('views/played/Played')
  }, // 最近播放
  {
    path: '/fansList/:id',
    component: () => import('components/context/fansList/FansList')
  }, // 粉丝
  {
    path: '/follow/:id',
    component: () => import('views/follow/Follow')
  }, // 关注

  {
    path: '/Information/:uid',
    component: () => import('views/information/Information')
  }, // 个人详情页

  {
    path: '/myMessage/login',
    component: () => import('components/context/login/Login')
  }, // 登录
  {
    path: '/myMessage/login/phoneLogin',
    component: () => import('components/context/phoneLogin/PhoneLogin')
  }, // 手机登录
  {
    path: '/myMessage/cloudDisk',
    component: () => import('views/cloudDisk/CloudDisk')
  }, // 云盘

  {
    path: '/playDetail/:id&:isAlbum',
    component: () => import('components/context/sheetInfo/SheetInfo'),
  }, // 歌单/专辑内容
  { 
    path: '/playComment/:id&:isAlbum', component: () => import('components/context/sheetInfo/childrenComps/SheetInfoComment') 
  },// 歌单/专辑 评论
  {
    path: '/playSong/:sid',
    component: () => import('components/common/playSong/PlaySong')
  }, // 播放界面
  {
    path: '/mvplay/:mid&:isMv',
    component: () => import('components/context/mvPlay/MvPlay')
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
        component: () => import('views/cloudVillage/childrenComps/PrivateContent')
      }, // 热评
      {
        path: '/musicTopic',
        component: () => import('views/cloudVillage/childrenComps/MusicTopic'),
      }, // 音乐日历
    ]
  },
  {
    path: '/video',
    component: video
  },
  { 
    path: '/topicDetail/:id', 
    component: () => import('views/cloudVillage/childrenComps/TopicDetail') 
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