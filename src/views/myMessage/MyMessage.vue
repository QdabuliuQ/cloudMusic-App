<template>
  <div class="MyMessage">
    <div class="MyMessage2">
      <my-message-user
        class="user"
        v-if="$store.state.profile.userId !== ''"
        @click.native="information"
      ></my-message-user>
      <my-message-login
        class="login"
        v-else
        @toLogin="toLogin"
      ></my-message-login>
      <my-message-menu></my-message-menu>
      <my-message-love class="loveBox" @click.native="toLove"></my-message-love>
    </div>
    <tab-control
      id="tabCon"
      ref="tab"
      :title="title"
    ></tab-control>
    <div class="MyMessage3">
      <my-message-list ref="songSheet"></my-message-list>
    </div>
  </div>
</template>

<script>
import MyMessageLogin from "./chlidrenComps/MyMessageLogin"; // 用户未登录组件
import MyMessageUser from "./chlidrenComps/MyMessageUser"; // 用户已登录组件
import MyMessageMenu from "./chlidrenComps/MyMessageMenu"; // 菜单栏
import MyMessageLove from "./chlidrenComps/MyMessageLove"; // 喜欢的音乐
import MyMessageList from "./chlidrenComps/MyMessageList"; // 歌单列表
import tabControl from "components/common/tabControl/TabControl";

import mui from "assets/mui/js/mui";

import muiScroll from "components/common/muiScroll/MuiScroll"; // 滚动组件

import { getUserPlayList, getSongs } from "network/user"; // 获取用户歌单

import Login from "components/context/login/Login"; // 用于登录界面

export default {
  name: "MyMessage",
  data() {
    return {
      // isShow: false,
      isFixed: false,
      title: ["创建歌单", "收藏歌单", "歌单助手"],
    };
  },
  methods: {
    information(){
      this.$router.push('/Information/' + this.$store.state.profile.userId)
    },

    // 登录组件
    toLogin() {
      // this.isShow = true
    },

    // 关闭登录
    closeLogin() {
      // this.isShow = false;
    },

    toLove() {
      this.$router.push("/playDetail/" + this.$store.state.playList[0].id);
    },
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      let totop = this.$refs.tab.$el.offsetTop;
      document.addEventListener("scroll", () => {
        if (pageYOffset >= totop) {
          this.$refs.tab.$el.style =
            "position: fixed; left: 0; right: 0; top: 44px; background-color: #fff; z-index: 10;";
          this.$refs.songSheet.$el.style = 'margin-top: '+ this.$refs.tab.$el.clientHeight +'px'
        } else if (pageYOffset < totop) {
          this.$refs.tab.$el.style =
            "position: static; backgroundColor: transparent";
          this.$refs.songSheet.$el.style = 'margin-top: 0px'
        }
      });
    });
  },
  components: {
    MyMessageLogin,
    MyMessageUser,
    MyMessageMenu,
    MyMessageLove,
    MyMessageList,
    tabControl,
    muiScroll,
    Login,
  },
};
</script>
<style scoped>
.MyMessage2 {
  margin-top: 1.171771rem;
  height: 100%;
  padding: 20px 15px 0;
}
.MyMessage3{
  height: 100%;
  padding: .133156rem .399467rem .532623rem;
  margin-bottom: 1.198402rem;
}
.jnavbar {
  margin-top: 44px;
  background-color: #fff;
  position: relative;
  padding: 0 15px;
  z-index: 15;
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
  position: absolute;
}

/* 动画执行期间 */
.v-enter-active,
.v-leave-active {
  /* 添加动画效果 */
  transition: all 0.2s linear;
}
</style>