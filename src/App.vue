<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <music-navbar class="appnav"></music-navbar>
    <left-popup></left-popup>
    <transition mode="">
      <!-- exclude 不会保存对应的组件 -->
      <keep-alive
        exclude=
        "SheetInfo,PlaySong,MvPlay,ClassifyInfo,StationDetail,DetailPlay,Information,Played,FansList,Follow,moreAlbum,SearchDetail"
      >
        <!-- 在组件切换的时候添加动画 -->
        <router-view></router-view>
      </keep-alive>
    </transition>
    <play-nav></play-nav>
  </div>
</template>

<script>
import musicNavbar from "components/context/musicNavbar/MusicNavbar";
import LeftPopup from "views/leftPopup/LeftPopup"
import playNav from "./components/context/playNav/PlayNav";

export default {
  name: "App",
  components: {
    musicNavbar,
    playNav,
    LeftPopup,
  },
};
</script>

<style>
@import "assets/css/base.css";
::-webkit-scrollbar {
  display: none;
}
.appnav {
  position: relative;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0 -3px 5px rgba(0, 0, 0, 0.7);
  z-index: 19;
  
  /* margin-bottom: 2px; */
}
#app {
  overflow-x: hidden;
  background-color: #f0efef;
  /* height: 100%; */
}
.v-enter {
  opacity: 0;
  /* 进来的时候从右 */
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  /* 离开的时候向左 */
  transform: translateX(-100%);
}

/* 动画执行期间 */
.v-enter-active,
.v-leave-active {
  /* 添加动画效果 */
  transition: all 0.2s linear;
}
</style>
