import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户基本信息
    profile: {
      nickName: '',
      avatarUrl: '',
      userId: '',
      backgroundUrl: '',
      level: '',
      listenSongs: ''
    },

    // 用户歌单信息
    playList: [],

    // 我的页面 滚动 距离
    mySheetToTop: 0,
    // 收藏组件 滚动 距离
    collectionToTop: 0,
    // 导航栏到底部距离
    navbarToTop: 0,

    playContent: {
      songName: '',  // 歌曲名称
      songImg: '',  // 歌曲封面
      endTime: '',  // 最后播放时间
      songurl: '',  // 歌曲url
      singer: '',  // 演唱者
      isPlayM: ''  // 是否播放了音乐
    },

    playSongComp: 0,  // 播放页面是否被打开
    navMusicDom: null,
    isend: false,  // 背部播放器是否结束
    showComment: false,  // 显示/隐藏评论面板
    getComMore: '',
    songid: '',
    page: '',
    isPlayEnd: false, // 内部播放器是否播放结束
    isShowNav: true,  // 显示隐藏底部播放导航栏
    createId: '',  // 目前所在的歌单创建者id
    sheetId: ''  // 目前所在的歌单id
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
