<template>
  <div class="rankingList">
    <menu-nav :navTitle="navTitle"></menu-nav>
    <tabnav
      class="tabnav"
      :firstIndex="1"
      ref="rankTab"
      @tabToggle="tabToggle"
      :itemList="itemList"
    ></tabnav>
    <mscroll :style="{ top: totop }" :scrollY="true">
      <!-- 节目榜 -->
      <div v-show="showProgram" class="program">
        <div class="topContent">
          <div class="hour">
            24小时榜
            <i class="iconfont icon-gengduo"></i>
          </div>
          <div class="topList">
            <div
              class="listItem"
              @click="toPlay(item.id)"
              v-for="(item, index) in topList"
              :key="index"
            >
              <div class="box">
                <div class="topImg">
                  <img class="logo" :src="item.coverUrl" alt="" />
                  <div class="playBtn">
                    <i class="iconfont icon-bofang"></i>
                  </div>
                </div>
                <div class="bottomText">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hotProgram">
          <div class="topText">
            热门节目
            <i class="iconfont icon-guanyu"></i>
          </div>
          <div class="hotList" v-if="proList.length !== 0">
            <div
              @click="toPlay(item.id)"
              class="hotListItem"
              v-for="(item, index) in proList"
              :key="index"
            >
              <div class="left">
                <span :class="{ topActive: index < 3 }">{{ index + 1 }}</span>
                <div class="tagRank">
                  <i v-if="item.lastRank === -1" class="iconfont icon-new"></i>
                  <div class="upbox upRank" v-else-if="item.lastRank - item.rank > 0">
                    <i class="iconfont icon-paimshang"></i>{{ item.lastRank - item.rank }}
                  </div>
                  <div class="no" v-else-if="item.lastRank - item.rank === 0">
                    - {{ " " + item.lastRank - item.rank }}
                  </div>
                  <div
                    class="upbox downRank"
                    v-else-if="item.lastRank - item.rank < 0"
                  >
                    <i class="iconfont icon-paimxia"></i
                    >{{ item.rank - item.lastRank }}
                  </div>
                </div>
              </div>
              <div class="userImg">
                <img v-lazy="item.coverUrl" alt="" />
              </div>
              <div class="center">
                <div class="centerbox">
                  <div class="title">{{ item.name }}</div>
                  <div class="detail">
                    <img :src="item.picUrl" alt="" />
                    <div class="creater">
                      {{ item.nickName }}
                    </div>
                    <div class="redu">
                      <i class="iconfont icon-redu"></i>
                      {{ item.score }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="right">
                <div class="rightImg">
                  <i class="iconfont icon-gequbofang"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <anchor-list v-if="showAnchor"></anchor-list>
      <station-list v-if="showAudio"></station-list>
    </mscroll>
  </div>
</template>

<script>
import menuNav from "components/context/menuNav/MenuNav";
import tabnav from "components/context/tabNav/TabNav";
import mscroll from "components/common/muiScroll/MuiScroll"; // 滚动组件
import anchorList from "./anchorList"; // 主播榜
import stationList from "./stationList"; // 电台榜
import "assets/icon/RadioStation.css"; // 字体图标
import "assets/icon/LeftPopup.css"; // 字体图标

import { toStringNum } from "common/common";
import { getProgramList, getProgramTopList } from "network/radioStation";

export default {
  name: "rankingList",
  data() {
    return {
      navTitle: "主播电台排行榜",
      itemList: ["主播榜", "节目榜", "电台榜"],
      offset: 0,
      topList: [], // 24小时榜
      proList: [], // 节目榜
      showProgram: true, // 节目榜
      showAnchor: false, // 主播榜
      showAudio: false, // 电台榜
      totop: 0, // 导航条距离顶部
    };
  },
  components: {
    menuNav,
    tabnav,
    mscroll,
    anchorList,
    stationList,
  },
  methods: {
    tabToggle(index) {
      switch (index) {
        case 0:
          this.showProgram = false;
          this.showAnchor = true;
          this.showAudio = false;
          break;
        case 1:
          this.showProgram = true;
          this.showAnchor = false;
          this.showAudio = false;
          break;
        case 2:
          this.showProgram = false;
          this.showAnchor = false;
          this.showAudio = true;
          break;
        default:
          break;
      }
    },

    // 路由跳转
    toPlay(id) {
      this.$router.push("/audioPlay/" + id);
    },

    programTopList() {
      getProgramTopList(3).then((res) => {
        for (const item of res.data.data.list) {
          this.topList.push({
            id: item.program.id,
            coverUrl: item.program.coverUrl,
            name: item.program.name,
          });
        }
      });
    },

    programList() {
      getProgramList(100).then((res) => {
        for (const item of res.data.toplist) {
          this.proList.push({
            lastRank: item.lastRank, // 上次排名清空 -1表示new
            score: toStringNum(item.score), // 节目热度
            rank: item.rank, // 目前排名  上次排名 lastRank - rank
            coverUrl: item.program.coverUrl, // 节目封面
            name: item.program.name, // 节目名称
            nickName: item.program.dj.nickname, // 创作者名称
            picUrl: item.program.dj.avatarUrl, // 创作者头像
            id: item.program.id,
          });
        }
      });
    },
  },
  created() {
    this.$loading.loadingShow();
    this.$store.state.isShowNav = false; // 隐藏底部播放栏
    this.programList();
    this.programTopList();
  },
  // 离开界面后
  deactivated() {
    this.$store.state.isShowNav = true;
  },
  mounted() {
    this.$nextTick(() => {
      this.totop = this.$refs.rankTab.$el.clientHeight + 44 + "px";
      this.$loading.loadingNo();
    });
  },
};
</script>
<style scoped>
.tabnav {
  position: relative;
  z-index: 11;
}
.rankingList {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #fff;
}
.topContent {
  padding: 0 0.319574rem 0.45273rem;
  margin-top: 0.4rem;
  border-bottom: 0.213333rem solid var(--fgx);
}
.hour {
  font-size: 0.426667rem;
  height: 0.533333rem;
  display: flex;
  align-items: center;
}
.hour .iconfont {
  font-size: 0.346667rem;
  margin-left: 0.133333rem;
}
.topText {
  font-size: 0.426667rem;
  height: 0.533333rem;
  display: flex;
  align-items: center;
}
.topText .iconfont {
  font-size: 0.373333rem;
  margin-left: 0.133333rem;
}
.hour img {
  width: 0.373333rem;
  position: relative;
  top: 0.04rem;
}
.topList {
  width: 100%;
  height: 3.728362rem;
  display: flex;
  margin-top: 0.266667rem;
}
.listItem {
  flex: 1;
  text-align: center;
}
.box {
  width: 90%;
  height: 100%;
  margin: 0 auto;
}
.topImg {
  width: 100%;
  height: 73%;
  overflow: hidden;
  border-radius: 0.133333rem;
  position: relative;
}
.playBtn {
  width: 0.532623rem;
  height: 0.532623rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  position: absolute;
  bottom: 0.133333rem;
  right: 0.133333rem;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.playBtn .iconfont {
  transform: scale(0.6);
  color: var(--red);
}
.bottomText {
  width: 100%;
  height: 25%;
  margin-top: 2%;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 0.346667rem;
  line-height: 0.45273rem;
}
.topImg .logo {
  width: 100%;
  height: 100%;
}
.hotProgram {
  padding: 0.453333rem 0.32rem;
}
.hotList {
  margin-top: 0.32rem;
}
.hotListItem {
  width: 100%;
  height: 1.331558rem;
  display: flex;
  margin-bottom: 0.266667rem;
}
.left {
  width: 0.8rem;
  max-width: 1.253333rem !important;
  margin-right: 0.133333rem;
  font-size: 0.48rem;
  font-weight: 550;
  text-align: center;
  color: #6d6d6d;
  position: relative;
}
.left span {
  line-height: 1.011984rem;
}
.userImg {
  flex: 1.4;
  overflow: hidden;
  border-radius: 0.133333rem;
}
.userImg img {
  width: 100%;
  height: 100%;
}
.center {
  flex: 6;
  display: flex;
  align-items: center;
}
.centerbox {
  margin-left: 0.266667rem;
}
.right {
  flex: 1;
  text-align: center;
  display: flex;
}
.right img {
  width: 0.8rem;
}
.rightImg {
  margin: auto;
}
.rightImg .iconfont{
  font-size: .453333rem;
  color: #696969;
}
.topActive {
  color: #da231b;
}
.title {
  width: 5.778961rem;
  height: .48rem;
  display: flex;
  align-items: center;
  margin-bottom: .133333rem;
  font-size: 0.373333rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.detail {
  width: 100%;
  display: flex;
  align-items: center;
}
.creater {
  padding-right: 0.213333rem;
  border-right: 0.026667rem solid #d8d8d8;
  font-size: 0.32rem;
  color: #696969;
  line-height: 0.453333rem;
  position: relative;
  display: inline-block;
  display: inline;
  zoom: 1;
}
.detail img {
  width: 0.453333rem;
  height: 0.453333rem;
  border-radius: 50%;
  float: left;
  margin-right: 0.106667rem;
}
.redu .icon-redu {
  font-size: 0.32rem;
  margin-right: .133333rem;
}
.redu {
  font-size: 0.32rem;
  display: flex;
  align-items: center;
  color: #6d6d6d;
  margin-left: 0.213333rem;
}
.tagRank {
  width: 100%;
  height: 0.533333rem;
  position: absolute;
  top: 70%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.tagRank .icon-new {
  color: #7bfc6a;
  font-size: 0.32rem;
  transform: scale(0.5) !important;
}
.upbox {
  width: 80%;
  text-align: center;
  font-size: 0.32rem;
}
.upRank {
  color: #ffba53;
  display: flex;
  align-items: center;
  justify-content: center;
}
.upbox .icon-paimshang {
  position: relative;
  /* left: -0.08rem; */
  color: #ffba53;
}
.upbox .icon-paimxia{
  position: relative;
  /* left: -0.08rem; */
  color: #74ccff;
}
.downRank{
  display: flex;
  align-items: center;
  justify-content: center;
  color: #74ccff;
}
.no {
  width: 100%;
  font-size: 0.32rem;
}
.tag .up {
  height: 0.346667rem;
  float: left;
  position: relative;
  top: 0.093209rem;
}
.down {
  height: 0.346667rem;
  float: left;
  position: relative;
  top: 0.114514rem;
}
</style>