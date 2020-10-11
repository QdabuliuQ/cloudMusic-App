<template>
  <div class="StationDetail" v-if="detail">
    <menu-nav
      ref="nav"
      class="nav"
      :navTitle="navTitle"
      :showWriteImg="true"
      :showBlackImg="false"
    ></menu-nav>
    <mscroll style="bottom: 45px" :scrollY="true">
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
                  <img src="~assets/img/radioStation/Detail/wjx.svg" alt="" />
                  <span>订阅</span>
                </div>
              </div>
            </div>
            <tab-Nav
              ref="tabNav"
              @tabToggle="tabToggle"
              :itemList="itemList"
              class="tabnav"
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
          <detail-resemble v-show="showResemble"></detail-resemble>
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
    this.getDetail();
  },
  mounted() {
    
  },
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
  /* top: -20px; */
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
  bottom: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.peopleText {
  width: 92%;
  height: 36px;
  position: absolute;
  bottom: 45px;
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
  width: 250px;
  height: 18px;
  line-height: 18px;
  color: #fff;
  font-size: 15px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.peopleCount {
  width: 100%;
  height: 18px;
  line-height: 18px;
  color: rgb(228, 228, 228);
  font-size: 12px;
  margin: 0;
}
.btn {
  width: 80%;
  height: 28px;
  border-radius: 28px;
  margin-top: 4px;
  text-align: center;
  line-height: 28px;
  float: right;
  background-color: #da231b;
  color: #fff;
  font-size: 13px;
}
.btn img {
  width: 18px;
  position: relative;
  top: 4px;
  right: 2px;
}
.nav {
  position: absolute;
  top: 0;
  z-index: 31;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.829);
  border: 0 !important;
}
.bottom {
  padding: 10px 12px;
}
</style>