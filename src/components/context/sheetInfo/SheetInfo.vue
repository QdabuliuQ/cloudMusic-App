<template>
  <div class="SheetInfo">
    <menu-nav ref="sheetMenuNav" class="nav" :isWhite="isWhite" :navTitle="navTitle"></menu-nav>
    <div v-show="isTopNav" class="content2">
      <sheet-nav :trackCount="trackCount" :createId="createId"></sheet-nav>
    </div>
    <div class="box">
      <div  ref="sheetDetailBox" class="zhezhao"></div>
      <div
        class="bimg"
        :style="{ background: 'url(' + sheetInfoContent.coverImgUrl + ') no-repeat' }"
      ></div>
      <div class="zbox">
        <div class="top" v-if="isShow">
          <div class="img">
            <div class="bfl" v-if="$route.params.isAlbum == 'false'">
              ▷ {{ sheetInfoContent.playCount }}
            </div>
            <img class :src="sheetInfoContent.coverImgUrl" alt />
          </div>
          <div class="rightBox">
            <div class="name">{{ sheetInfoContent.name }}</div>
            <div class="user" v-if="index === 0">
              <img class :src="sheetInfoContent.avatarUrl" alt />
              {{ sheetInfoContent.nickname }} ＞
            </div>
            <div class="user" v-else>
              歌手：
              <span
                v-for="(item, index) in sheetInfoContent.nickname"
                :key="index"
              >
                {{ item.name }}
              </span>
            </div>
          </div>
        </div>
        <div class="bottom">
          <tabbar>
            <tabbaritem @click.native="showInfoComment" activeColor="red">
              <img
                class="imgNav"
                slot="item-icon"
                src="~assets/img/sheetList/pinglun.svg"
                alt
              />
              <div class="item-text" slot="item-text">
                {{
                  sheetInfoContent.commentCount > 0
                    ? sheetInfoContent.commentCount
                    : "评论"
                }}
              </div>
            </tabbaritem>
            <tabbaritem activeColor="red">
              <img
                class="imgNav"
                slot="item-icon"
                src="~assets/img/sheetList/fenxiang.svg"
                alt
              />
              <div class="item-text" slot="item-text">
                {{
                  sheetInfoContent.shareCount > 0
                    ? sheetInfoContent.shareCount
                    : "分享"
                }}
              </div>
            </tabbaritem>
            <tabbaritem activeColor="red">
              <img
                class="imgNav"
                slot="item-icon"
                src="~assets/img/sheetList/xiazai.svg"
                alt
              />
              <div class="item-text" slot="item-text">下载</div>
            </tabbaritem>
            <tabbaritem activeColor="red">
              <img
                class="imgNav"
                slot="item-icon"
                src="~assets/img/sheetList/duoxuan.svg"
                alt
              />
              <div class="item-text" slot="item-text">多选</div>
            </tabbaritem>
          </tabbar>
        </div>
      </div>
    </div>
    <div ref="content" class="content">
      <sheet-nav :trackCount="trackCount"></sheet-nav>
    </div>
    <div class="songItem">
      <song-item name="sheetInfo" :songList="songList"></song-item>
    </div>
    <transition>
      <info-comment @toback="toback" v-show="isShowinfoc"></info-comment>
    </transition>
  </div>
</template>

<script>
import menuNav from "components/context/sheetNav/SheetTopNav"; // 顶部导航栏
import tabbar from "components/common/tabbar/tabbar"; // 导航栏
import tabbaritem from "components/common/tabbar/tabbaritem";
import sheetNav from "components/context/sheetNav/SheetNav"; // 导航条
import songItem from "components/context/songItem/SongItem"; // 歌曲列表
import bscroll from "components/common/bscroll/Bscroll"; // 滚动组件
import infoComment from "./childrenComps/SheetInfoComment"; // 歌单评论组件

import { toStringNum } from "common/common"; // 播放量转换

import { getSongDetial, getUserSongList } from "network/played"; // 歌曲列表
import { getPlayDetial, getSheetComment } from "network/sheetInfo"; // 获取歌单内容 歌单评论
import { getAlbum, getAlbumDetail } from "network/album"; // 专辑

export default {
  name: "SheetInfo",
  data() {
    return {
      navTitle: "歌单®",
      sheetId: this.$route.params.id, // 保存路由传递的歌单id
      sheetInfoContent: {},
      isShow: false,
      size: "100% 140%",
      songListId: [], // 歌单歌曲id
      trackCount: 0, // 歌曲数量
      songList: [], // 歌曲列表
      isWhite: true,
      isTopNav: false, // 显示/隐藏导航栏
      isNavToTop: 0,
      isShowinfoc: false, // 显示/隐藏评论组件
      showCollection: false,
      createId: "",
      top: 999, // 导航栏距离顶部的距离
      index: 0, // 判断是专辑还是歌单
    };
  },
  methods: {
    // 显示评论
    showInfoComment() {
      this.isShowinfoc = true;
      this.$store.state.isShowNav = false;
    },

    // 隐藏评论
    toback() {
      this.isShowinfoc = false;
      this.$store.state.isShowNav = true;
    },

    // 监听滚动
    linearScroll() {
      if (pageYOffset >= this.top) {
        this.$refs.content.style =
          "position: fixed; top: 43px; left: 0; right: 0;";
      } else if (pageYOffset <= this.top) {
        this.$refs.content.style = "position: state;";
      }
    },
  },
  components: {
    menuNav,
    tabbar,
    tabbaritem,
    sheetNav,
    songItem,
    bscroll,
    infoComment,
  },
  created() {
    this.$store.state.sheetId = this.$route.params.id; // 保存目前歌单id
    // 获取歌单基本信息
    if (this.$route.params.isAlbum == "false") {
      getPlayDetial(this.sheetId).then((res) => {
        let path = res.data.playlist;
        this.sheetInfoContent.commentCount = path.commentCount; // 歌单评论数
        this.sheetInfoContent.coverImgUrl = path.coverImgUrl; // 歌单封面
        this.sheetInfoContent.name = path.name; // 歌单名称
        this.sheetInfoContent.playCount = path.playCount; // 歌单播放量
        this.sheetInfoContent.trackCount = path.trackCount; // 歌单歌曲数量
        this.trackCount = this.sheetInfoContent.trackCount;
        this.sheetInfoContent.avatarUrl = path.creator.avatarUrl; // 用户头像
        this.sheetInfoContent.nickname = path.creator.nickname; // 用户名
        this.sheetInfoContent.userId = path.creator.userId; // 用户id
        this.$store.state.createId = path.creator.userId;
        this.isShow = true;
        this.sheetInfoContent.playCount = toStringNum(
          this.sheetInfoContent.playCount
        );
        for (const item of path.trackIds) {
          this.songListId.push(item.id);
        }

        // 获取歌单歌曲列表
        getSongDetial(this.songListId.toString()).then((res) => {
          for (const item of res.data.songs) {
            // 选择性保存数据
            this.songList.push({
              mv: item.mv,
              songName: item.name,
              id: item.id,
              singer: item.ar,
              zhuanji: item.al.name,
              yuanc: item.alia,
            });
          }
          this.top = this.$refs.sheetDetailBox.clientHeight
        });
      });
    } else if (this.$route.params.isAlbum == "true") {
      getAlbum(this.sheetId).then((res) => {
        this.index = 1;
        this.sheetInfoContent.commentCount = res.data.album.info.commentCount; // 歌单评论数
        this.sheetInfoContent.coverImgUrl = res.data.album.picUrl; // 歌单封面
        this.sheetInfoContent.name = res.data.album.name; // 歌单名称
        this.sheetInfoContent.trackCount = res.data.album.size; // 歌单歌曲数量
        this.trackCount = this.sheetInfoContent.trackCount;
        this.sheetInfoContent.nickname = res.data.album.artists; // 用户名
        this.sheetInfoContent.userId = res.data.album.id; // 用户id
        this.$store.state.createId = res.data.album.id;
        for (const item of res.data.songs) {
          // 选择性保存数据
          this.songList.push({
            mv: item.mv,
            songName: item.name,
            id: item.id,
            singer: item.ar[0].name,
            zhuanji: item.al.name,
            yuanc: item.alia,
          });
        }
        this.isShow = true;
      });

      getAlbumDetail(this.sheetId).then((res) => {
        this.sheetInfoContent.shareCount = res.data.shareCount;
        this.top = this.$refs.sheetDetailBox.clientHeight
      });
    }
  },

  mounted() {
    document.addEventListener("scroll", this.linearScroll);
  },

  // 销毁阶段
  destroyed() {
    document.removeEventListener("scroll", this.linearScroll);
  },
};
</script>
<style scoped>
.bscroll {
  height: 100vh;
  top: 0;
  bottom: 0;
  position: relative;
}
.content2 {
  position: relative;
  z-index: 17;
}
.SheetInfo {
  position: relative;
  background-color: rgba(0, 0, 0, 0.8);
  margin-bottom: 40px;
}
.zhezhao {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  position: absolute;
  top: -0.026667rem;
  left: 0;
  z-index: 10;
}
.zbox {
  width: 100%;
  height: 90%;
  padding: 0;
  position: relative;
  z-index: 15;
}
.bimg {
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  padding: 0;
  position: absolute;
  filter: blur(5px);
  background-size:cover !important;
}
.songItem {
  min-height: 8.521971rem;
  padding: 0px 16px 8px;
  background-color: #fff;
}
.nav {
  /* background-color: #fff; */
  background-color: rgba(0, 0, 0);
  /* position: flex; */
  color: #fff;
  position: relative;
  position: fixed;
  z-index: 20;
  top: 0;
}
.imgNav {
  margin-bottom: 1px;
}
.item-text {
  color: #fff;
}
.box {
  margin-top: 45px;
  padding: 0.533333rem 0.4rem 0.213333rem;
  /* height: 6.4rem; */
  position: relative;
  z-index: 15;
}
.top {
  width: 100%;
  height: 3.195739rem;
}
.img {
  width: 35%;
  height: 100%;
  border-radius: 0.133333rem;
  overflow: hidden;
  /* margin-right: .532623rem; */
  float: left;
  position: relative;
}
.bfl {
  position: absolute;
  font-size: 0.32rem;
  color: #fff;
  right: 0.133333rem;
  top: 0.133333rem;
}
.img img {
  width: 100%;
  height: 100%;
}
.name {
  width: 4.793609rem;
  float: right;
  height: 0.533333rem;
  line-height: 0.533333rem;
  /* margin-right: .665779rem; */
  position: relative;
  color: #fff;
  top: 0.186667rem;
  font-size: 0.532623rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.user {
  line-height: 0.8rem;
  height: 0.8rem;
  width: 4.793609rem;
  float: right;
  /* margin-right: .665779rem; */
  margin-top: 0.399467rem;
  font-size: 0.346667rem;
  color: rgb(243, 243, 243);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rightBox {
  width: 60%;
  height: 100%;
  float: left;
}
.user img {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  float: left;
  margin-right: .186667rem;
}
.content {
  background-color: #000;
  width: 100%;
  padding: 0;
  position: relative;
  z-index: 18;
}
.bottom{
  width: 100%;
  height: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: .133333rem;
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