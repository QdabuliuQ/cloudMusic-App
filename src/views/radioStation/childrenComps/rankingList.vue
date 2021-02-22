<template>
  <div class="rankingList">
    <menu-nav :navTitle="navTitle"></menu-nav>
    <tabnav :firstIndex='1' ref="rankTab" @tabToggle='tabToggle' :itemList="itemList"></tabnav>
    <mscroll style="top: 84px" :scrollY="true">
      <!-- 节目榜 -->
      <div v-show="showProgram" class="program">
        <div class="topContent">
          <div class="hour">
            24小时榜
            <img src="~assets/img/radioStation/Ranking/you.svg" alt="" />
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
                    <img
                      src="~assets/img/radioStation/Ranking/bof.svg"
                      alt=""
                    />
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
            <img src="~assets/img/radioStation/Ranking/tishi.svg" alt="" />
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
                <div class="tag">
                  <img
                    v-if="item.lastRank === -1"
                    class="new"
                    src="~assets/img/radioStation/Ranking/new.svg"
                    alt=""
                  />
                  <div class="upbox" v-else-if="item.lastRank - item.rank > 0">
                    <!-- <img
                      class="up"
                      src="~assets/img/radioStation/Ranking/shang.svg"
                      alt=""
                    /> -->
                    {{ item.lastRank - item.rank }}
                  </div>
                  <div class="no" v-else-if="item.lastRank - item.rank === 0">
                    - {{ " " + item.lastRank - item.rank }}
                  </div>
                  <div class="upbox" v-else-if="item.lastRank - item.rank < 0">
                    <img
                      class="down"
                      src="~assets/img/radioStation/Ranking/xia.svg"
                      alt=""
                    />{{ item.rank - item.lastRank }}
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
                      <img
                        src="~assets/img/radioStation/Ranking/redu.svg"
                        alt=""
                      />
                      {{ item.score }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="right">
                <div class="rightImg">
                  <img
                    src="~assets/img/radioStation/Ranking/bofang.svg"
                    alt=""
                  />
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
import anchorList from "./anchorList";   // 主播榜
import stationList from './stationList';  // 电台榜

import { toStringNum } from 'common/common'
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
      showProgram: true,  // 节目榜
      showAnchor: false,  // 主播榜
      showAudio: false,  // 电台榜
    };
  },
  components: {
    menuNav,
    tabnav,
    mscroll,
    anchorList,
    stationList
  },
  methods: {
    tabToggle(index){
      // this.$refs.rankTab.tabIndex = index;
      // this.$refs.rankTab.tabItem(index);
      switch (index) {
        case 0:
          this.showProgram = false;
          this.showAnchor = true;
          this.showAudio = false
          break;
        case 1:
          this.showProgram = true;
          this.showAnchor = false;
          this.showAudio = false
          break;
        case 2:
          this.showProgram = false;
          this.showAnchor = false;
          this.showAudio = true
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
      this.$loading.loadingNo();
    });
  },
};
</script>
<style scoped>
.rankingList {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #fff;
}
.topContent {
  padding: .45273rem .319574rem;
  border-bottom: 8px solid #f0efef;
}
.hour {
  font-size: 17px;
  height: 20px;
  line-height: 20px;
}
.topText {
  font-size: 17px;
  height: 20px;
  line-height: 20px;
}
.topText img {
  position: relative;
  top: 2px;
}
.hour img {
  width: 14px;
  position: relative;
  top: 1.5px;
}
.topList {
  width: 100%;
  height: 3.728362rem;
  display: flex;
  margin-top: 10px;
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
  border-radius: 5px;
  position: relative;
}
.playBtn {
  width: 0.532623rem;
  height: 0.532623rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  position: absolute;
  bottom: 5px;
  right: 5px;
  z-index: 5;
}
.playBtn img {
  width: 0.23968rem;
  position: relative;
  left: 0.029294rem;
  top: -0.08522rem;
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
  font-size: 13px;
  line-height: 0.45273rem;
}
.topImg .logo {
  width: 100%;
  height: 100%;
}
.hotProgram {
  padding: 17px 12px;
}
.hotList {
  margin-top: 12px;
}
.hotListItem {
  width: 100%;
  height: 1.331558rem;
  display: flex;
  margin-bottom: 10px;
}
.left {
  flex: 0.9;
  margin-right: 5px;
  font-size: 18px;
  font-weight: 550;
  /* line-height: ; */
  text-align: center;
  color: #6d6d6d;
}
.left span {
  line-height: 1.011984rem;
}
.userImg {
  flex: 1.4;
  overflow: hidden;
  border-radius: 5px;
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
  margin-left: 10px;
}
.right {
  flex: 1;
  text-align: center;
  display: flex;
}
.right img {
  width: 30px;
}
.rightImg {
  margin: auto;
}
.topActive {
  color: #da231b;
}
.title {
  width: 5.778961rem;
  font-size: 14px;
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
  padding-right: 8px;
  border-right: 1px solid #d8d8d8;
  font-size: 12px;
  color: #696969;
  line-height: 17px;
  position: relative;
  display: inline-block;
  display: inline;
  zoom: 1;
}
.detail img {
  width: 17px;
  height: 17px;
  border-radius: 50%;
  float: left;
  margin-right: 4px;
}
.redu img {
  width: 12px;
  position: relative;
  top: 1.5px;
}
.redu {
  font-size: 12px;
  color: #6d6d6d;
  margin-left: 8px;
}
.tag {
  height: 17px;
  position: relative;
  top: -0.399467rem;
  font-size: 12px;
  color: #696969;
}
.tag .new {
  height: 20px;
}
.upbox {
  width: 0.719041rem;
  text-align: center;
}
.tag .up {
  height: 13px;
  float: left;
  position: relative;
  top: 0.093209rem;
}
.down {
  height: 13px;
  float: left;
  position: relative;
  top: 0.114514rem;
}
</style>