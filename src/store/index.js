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
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
