<template>
  <div class="StationDetail" v-if="detail">
    <menu-nav
      ref="nav"
      class="nav"
      :navTitle="navTitle"
      :showWriteImg="true"
      :showBlackImg="false"
    ></menu-nav>
    <mscroll ref="msc" style="bottom: 0px" :scrollY="true">
      <div
        class="bbox"
        v-infinite-scroll="loadAudio"
        infinite-scroll-distance="100"
        infinite-scroll-delay="500"
        infinite-scroll-immediate="fasle"
      >
        <div class="top">
          <div ref="content" class="content">
            <div class="peopleText">
              <div class="left">
                <div class="peopleName">{{ detail.name }}</div>
                <div class="peopleCount">{{ detail.subCount }}人已订阅</div>
              </div>
              <div class="right">
                <div class="btn">
                  <span>订阅</span>
                </div>
              </div>
            </div>
            <tab-Nav
              ref="tabNav"
              @tabToggle="tabToggle"
              :itemList="itemList"
              class="tabnav"
              :firstIndex='1'
            ></tab-Nav>
          </div>
          <img
            class="backImg"
            v-show="detail.picUrl"
            :src="detail.picUrl"
            alt=""
          />
        </div>
        <div class="bottom">
          <detail-message
            v-show="showMessage"
            :detail="detail"
          ></detail-message>
          <detail-program :loadIndex='loadIndex' v-show="showProgram"></detail-program>
          <detail-resemble @refresh='refresh' v-show="showResemble"></detail-resemble>
        </div>
      </div>
    </mscroll>
  </div>
</template>

<script>
import menuNav from "components/context/menuNav/MenuNav"; // 导航栏组件
import TabNav from "components/context/tabNav/TabNav"; // 导航组件
import DetailMessage from "./DetailMessage"; // 用户详情
import DetailProgram from "./DetailProgram"; // 用户节目
import DetailResemble from "./DetailResemble"; // 用户相似
import mscroll from "components/common/muiScroll/MuiScroll"; // 滚动组件
import { getAudioDetail } from "network/radioStation";

export default {
  name: "StationDetail",
  data() {
    return {
      navTitle: "电台",
      detail: {}, // 用户信息
      itemList: ["详情", "节目", "相似"], // 导航栏
      tabNavtoTop: 0,
      backG: 0,
      scrolly: 0,
      showMessage: false, // 详情界面
      showProgram: true, // 节目界面
      showResemble: false, // 相似界面
      loadIndex: 0,  // 监听下拉加载
    };
  },
  // 监听路由变化
  beforeRouteUpdate(to, from, next) {
    if (to.fullPath != from.fullPath) {
      this.detail = {}; // 清空mv数据
      next();
      this.getDetail();
    }
  },
  methods: {
    // 滚动到顶部
    refresh(){
      this.$refs.msc.mscrollTo();
      this.$refs.tabNav.tabIndex = 1
      this.$refs.tabNav.tabItem(1)
    },

    // 下拉加载
    loadAudio(){
      if (this.showProgram) {
        this.loadIndex ++;
      }
    },

    // 导航栏切换
    tabToggle(index) {
      switch (index) {
        case 0:
          this.showMessage = true;
          this.showProgram = false;
          this.showResemble = false;
          break;
        case 1:
          this.showProgram = true;
          this.showMessage = false;
          this.showResemble = false;
          break;
        case 2:
          this.showResemble = true;
          this.showMessage = false;
          this.showProgram = false;
          break;
        default:
          break;
      }
    },

    // 获取电台详情
    getDetail() {
      getAudioDetail(this.$route.params.rid).then((res) => {
        let path = res.data.djRadio;
        this.detail.name = path.name; // 用户名称
        this.detail.picUrl = path.picUrl; // 用户头像
        this.detail.subCount = path.subCount; // 用户粉丝
        this.detail.programCount = path.programCount; // 节目数量
        this.detail.commentDatas = path.commentDatas; // 用户信息热评
        this.detail.desc = path.desc; // 用户简介
        this.detail.category = path.category; // 电台分类
        this.detail.avatarUrl = path.dj.avatarUrl; // 创作者头像
        this.detail.nickname = path.dj.nickname; // 创作者昵称
        this.detail.signature = path.dj.signature; // 用户宣言
        this.detail.rewardCount = path.dj.rewardCount; // 用户赞赏次数
        this.detail.uid = path.dj.userId; // 用户id
        // 使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上
        this.$set(this.detail, this.detail.picUrl, path.picUrl);
      });
    },

    
  },
  components: {
    menuNav,
    TabNav,
    DetailMessage,
    DetailProgram,
    DetailResemble,
    mscroll,
  },
  created() {
    this.$store.state.isShowNav = false;  // 隐藏底部播放栏
    if (this.$store.state.navMusicDom) {
      this.$store.state.navMusicDom.pause();
    }
    this.getDetail();
  },
  destroyed() {
    this.$store.state.isShowNav = true;
    if (this.$store.state.navMusicDom) {
      this.$store.state.navMusicDom.play();
    }
  }
};
</script>
<style scoped>
.StationDetail {
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: #fff;
}
.top {
  width: 100%;
  height: 50vh;
  position: relative;
}
.top .backImg {
  position: absolute;
  filter: blur(5px);
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.content {
  position: relative;
  height: 100%;
  z-index: 30;
  background-color: rgba(0, 0, 0, 0.729);
}
.tabnav {
  position: absolute;
  bottom: -0.16rem;
  border-top-left-radius: .533333rem;
  border-top-right-radius: .533333rem;
}
.peopleText {
  width: 92%;
  height: .96rem;
  position: absolute;
  bottom: 1.2rem;
  margin-left: 4%;
  display: flex;
}
.left {
  flex: 7;
}
.right {
  flex: 3;
}
.peopleName {
  width: 6.666667rem;
  height: .48rem;
  line-height: .48rem;
  color: #fff;
  font-size: .4rem;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.peopleCount {
  width: 100%;
  height: .48rem;
  line-height: .48rem;
  color: rgba(212, 212, 212, 0.842);
  font-size: .32rem;
  margin: 0;
}
.btn {
  width: 80%;
  height: .746667rem;
  border-radius: .746667rem;
  margin-top: .106667rem;
  text-align: center;
  line-height: .746667rem;
  float: right;
  background-color: #da231b;
  color: #fff;
  font-size: .346667rem;
}
.btn img {
  width: .48rem;
  position: relative;
  top: .106667rem;
  right: .053333rem;
}
.nav {
  position: absolute;
  top: 0;
  z-index: 31;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.9);
  border: 0 !important;
}
.bottom {
  padding: .266667rem .32rem;
}
</style>