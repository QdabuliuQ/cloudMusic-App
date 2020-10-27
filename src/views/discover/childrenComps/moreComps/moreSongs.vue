<template>
  <div class="moreSongs">
    <menu-nav class="nav" :navTitle="'最新音乐'"></menu-nav>
    <scroll-nav
      class="snav"
      @tabToggle="tabToggle"
      :itemList="itemList"
      :firstIndex="0"
    ></scroll-nav>
    <div class="topBox">
      <div class="video">
        <video
          style="width: 100%; height: 4.793609rem; object-fit: fill"
          src="~assets/video/music.mp4"
          loop="loop"
          autoplay
        ></video>
      </div>
      <div class="zhez"></div>
      <div class="title">
        <div class="name">{{ name }}</div>
        <div class="test">{{ test }}</div>
      </div>
    </div>
    <sheet-nav :trackCount="songLength"></sheet-nav>
    <div class="box">
      <song-item :songList="songList"></song-item>
    </div>
  </div>
</template>

<script>
import menuNav from "components/context/menuNav/MenuNav";
import scrollNav from "components/context/scrollNav/ScrollNav";
import sheetNav from "components/context/sheetNav/SheetNav"; // 导航条
import songItem from "components/context/songItem/SongItem"; // 歌曲列表

import { getSongsTop } from "network/discover";

export default {
  name: "moreSongs",
  data() {
    return {
      itemList: ["全部", "华语", "欧美", "韩国", "日本"],
      name: "推荐",
      test: "Recommend",
      songList: [], // 歌曲数祖
      songLength: 0, // 歌曲数量
      index: 0, // 默认显示
    };
  },
  components: {
    menuNav,
    scrollNav,
    sheetNav,
    songItem,
  },
  methods: {
    // 导航栏切换
    tabToggle(index) {
      switch (index) {
        case 0:
          this.toggleSongs(0);
          this.name = "推荐";
          this.test = "Recommend";
          break;
        case 1:
          this.toggleSongs(7);
          this.name = "华语";
          this.test = "Mandarin Music";
          break;
        case 2:
          this.toggleSongs(96);
          this.name = "欧美";
          this.test = "Western Music";
          break;
        case 3:
          this.toggleSongs(16);
          this.name = "韩国";
          this.test = "Korean Music";
          break;
        case 4:
          this.toggleSongs(8);
          this.name = "日本";
          this.test = "Japanese Music";
          break;
        default:
          break;
      }
    },

    // 封装方法
    toggleSongs(index) {
      this.$loading.loadingShow();
      if (this.index !== index) {
        this.songList = [];
        getSongsTop(index).then((res) => {
          this.songLength = res.data.data.length;
          for (const item of res.data.data) {
            this.songList.push({
              id: item.id,
              songName: item.name,
              yuanc: [],
              singer: item.artists,
              zhuanji: item.album.name,
              mv: item.mvid,
            });
          }
          setTimeout(() => {
            this.$loading.loadingNo();
          }, 1000);
        });
      }
      this.index = index;
      setTimeout(() => {
        this.$loading.loadingNo();
      }, 500);
    },
  },
  created() {
    this.$loading.loadingShow();
    getSongsTop(0).then((res) => {
      this.songLength = res.data.data.length;
      for (const item of res.data.data) {
        this.songList.push({
          id: item.id,
          songName: item.name,
          yuanc: [],
          singer: item.artists,
          zhuanji: item.album.name,
          mv: item.mvid,
        });
      }
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.$loading.loadingNo();
    });
  },
};
</script>
<style scoped>
.snav {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 15;
}
.nav {
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
}
.video {
  width: 100%;
  height: 100%;
  position: absolute;
}
.zhez {
  position: absolute;
  width: 100%;
  height: 4.793609rem;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9;
}
.box {
  padding: 0 0.346205rem;
  margin-bottom: 1.278296rem;
}
.moreSongs {
  width: 100%;
  background-color: #fff;
}
.topBox {
  margin-top: 2.237017rem;
  width: 100%;
  height: 4.793609rem;
  position: relative;
  z-index: 10;
  top: -0.079893rem;
  background-color: #fff;
  border-bottom: 8px solid #ebebeb;
}
.title {
  width: 100%;
  height: 28%;
  position: absolute;
  z-index: 10;
  margin-left: 0.399467rem;
  bottom: 0;
  color: #fff;
}
.name {
  width: 100%;
  font-weight: 550;
  margin-bottom: 0.133156rem;
}
.test {
  width: 100%;
  font-size: 0.346205rem;
  letter-spacing: 1px;
  color: #b3b1b1;
}
</style>