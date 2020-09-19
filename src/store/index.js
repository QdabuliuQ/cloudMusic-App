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
    navbarToTop: 0
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
