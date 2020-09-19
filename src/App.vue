<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <music-navbar class="appnav"></music-navbar>
    <transition mode="">
      <!-- exclude 不会保存对应的组件 -->
      <keep-alive>
        <!-- 在组件切换的时候添加动画 -->
          <router-view></router-view>
      </keep-alive>
    </transition>
  </div>  
</template>

<script>
import musicNavbar from 'components/context/musicNavbar/MusicNavbar'

export default {
  name: 'App',
  components: {
    musicNavbar
  }
}
</script>

<style>
  @import 'assets/css/base.css';
  .appnav{
    position: fixed;
    left: 0;
    right: 0;
    background-color: #fff;
    box-shadow: 0 -3px 5px rgba(0,0,0,0.7);
    /* z-index: 99; */
    /* margin-bottom: 2px; */
  }
  #app{
    overflow-x:hidden;
    background-color: #f0efef;
  }
  .v-enter{
    opacity: 0;
    /* 进来的时候从右 */
    transform: translateX(100%);
  }
  .v-leave-to{
    opacity: 0;
    /* 离开的时候向左 */
    transform: translateX(-100%);
    position: absolute;
  }

  /* 动画执行期间 */
  .v-enter-active,.v-leave-active{
      /* 添加动画效果 */
      transition: all 0.2s linear;
  }
</style>
