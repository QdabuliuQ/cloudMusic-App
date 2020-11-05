import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cookie: false, // 保存cookie
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

    navMusicDom: null,
    showComment: false,  // 显示/隐藏评论面板
    getComMore: '',
    songid: '',
    page: '',
    isShowNav: true,  // 显示隐藏底部播放导航栏
    createId: '',  // 目前所在的歌单创建者id
    sheetId: '',  // 目前所在的歌单id
    hotOffset: 0,  // 获取热门电台推荐 分页参数
    commentId: 0,  // 动态评论id
    toggleInformation: 0,  // 记录是否进入用户信息界面
    playSong: {  // 当前播放的音乐数据
      index: 0,
      playNow: true,  // 默认播放音乐
      songId: 0,  // 判断是否切歌
      linearIndex: 0,  // 判断是否拖动进度条
      isPlayEnd: '',  // 判断是否播放结束
      songName: '',  // 目前歌曲播放名称
      singer: '',  // 目前歌曲演唱者
      picUrl: '',  // 目前歌曲封面
    },  

    fullSecreenVideo: null,  // 全屏播放器
    viewPlay: {
      currentTime: 0,  // 外部播放器实时时间
      viewOpen: false,  // 判断全屏播放是否打开
      playing: false,  // 判断是否正在播放
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
