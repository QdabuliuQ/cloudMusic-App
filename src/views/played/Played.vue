<template>
  <div class="Played">
    <menu-nav class="navbar" :navTitle="navTitle"></menu-nav>
    <mui-scroll ref="playedSC" style="top: 44px; bottom: 45px" :scrollY="true">
      <div class="box">
        <div class="topbox">
          <i class="iconfont icon-gequbofang"></i>
          <div class="text">
            播放全部<span class="count">(共{{ songList.length }}首)</span>
          </div>
        </div>
        <song-item :songList="songList"></song-item>
      </div>
    </mui-scroll>
  </div>
</template>

<script>
import menuNav from "components/context/menuNav/MenuNav";
import songItem from "components/context/songItem/SongItem"; // 歌曲列表
import muiScroll from "components/common/muiScroll/MuiScroll"; // 滚动组件

import { getPlayList, getSongDetial } from "network/played"; // 网络请求

export default {
  name: "Played",
  data() {
    return {
      navTitle: "最近播放",
      songList: [], // 歌曲列表
      songId: [], // 歌曲id
    };
  },
  methods: {},
  components: {
    menuNav,
    songItem,
    muiScroll,
  },
  created() {
    this.$loading.loadingShow();
    // 获取数据
    getPlayList(this.$route.params.id, 0).then((res) => {
      for (const item of res.data.allData) {
        // 选择性保存数据
        this.songList.push({
          mv: item.song.mv,
          songName: item.song.name,
          id: item.song.id,
          singer: item.song.ar,
          zhuanji: item.song.al.name,
          yuanc: item.song.alia,
        });
      }
      this.$loading.loadingNo();
    });
  },
  mounted() {},
};
</script>
<style scoped>
.box {
  padding: .213333rem .426667rem;
  /* height: 300px; */
  background-color: #fff;
}
.navbar {
  position: relative;
  z-index: 20;
  background-color: #fff;
}
.topbox {
  width: 100%;
  height: 1.066667rem;
  line-height: 1.066667rem;
  font-size: .4rem;
  display: flex;
  align-items: center;
}
.topbox .icon-gequbofang {
  font-size: .48rem;
  color: var(--red);
}
.text {
  margin-left: .266667rem;
}
.count {
  font-size: .346667rem;
  color: #999999;
}
</style>