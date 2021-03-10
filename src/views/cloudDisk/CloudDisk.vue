<template>
  <div class="CloudDisk">
    <menunav class="nav" :songList="songList" :navTitle="'音乐云盘'"></menunav>
    <div class="SheetNav">
      <i class="iconfont icon-gequbofang"></i>
      <span
        >播放全部<span class="a">(共{{ trackCount }}首)</span></span
      >
    </div>
    <div class="content">
      <song-item :songList="songList"></song-item>
      <div class="box">歌曲永久保存，随时随地多端畅听</div>
    </div>
    <div class="btn">
      <i class="iconfont icon-shangchuan"></i>
    </div>
  </div>
</template>

<script>
import menunav from "components/context/menuNav/MenuNav";
import songItem from "components/context/songItem/SongItem";
import { getDisk } from "network/cloudDisk";
export default {
  name: "CloudDisk",
  data() {
    return {
      offset: 0,
      songList: [],
      trackCount: 0,
      more: true,
    };
  },
  components: {
    menunav,
    songItem,
  },
  methods: {
    disk() {
      if (this.more) {
        getDisk(30, this.offset * 30, this.$store.state.cookie).then((res) => {
          this.trackCount = res.data.count;
          for (const item of res.data.data) {
            this.songList.push({
              id: item.simpleSong.id,
              songName: item.songName,
              singer: [{ name: item.artist }],
              yuanc: item.simpleSong.alia || [],
              zhuanji: item.album,
              mv: item.simpleSong.mv,
            });
          }
          this.more = res.data.hasMore;
          this.offset++;
        });
      } else {
        this.$toast.show("没有更多了:(", 1900);
      }
    },

    linearScroll() {
      // 滚动条距离顶部的距离
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 可视区的高度
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      // 滚动条可滚动的高度
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        this.$loading.loadingShow();
        setTimeout(() => {
          this.disk();
          this.$loading.loadingNo();
        }, 1000);
      }
    },
  },
  created() {
    this.disk();
  },
  mounted() {
    this.$nextTick(() => {
      this.$loading.loadingNo();
      window.addEventListener("scroll", this.linearScroll);
    });
  },

  destroyed() {
    window.addEventListener("scroll", this.linearScroll);
  },
};
</script>
<style scoped>
.CloudDisk {
  width: 100%;
  position: relative;
}
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.btn {
  width: 1.12rem;
  height: 1.12rem;
  border-radius: 50%;
  background-color: var(--red);
  position: fixed;
  left: 0.266312rem;
  bottom: 1.464714rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn .iconfont {
  color: #fff;
  font-size: .48rem;
}
.content {
  margin-top: 1.198402rem;
  padding: 0 0.319574rem 0.319574rem;
  background-color: #fff;
  min-height: 15.978695rem;
}
.SheetNav {
  position: sticky;
  top: 42.5px;
  width: 100%;
  height: 1.198402rem;
  background-color: #fff;
  line-height: 1.198402rem;
  font-size: .4rem;
  display: flex;
  align-items: center;
}
.SheetNav .iconfont {
  font-size: .48rem;
  margin-left: .266667rem;
  margin-right: .133333rem;
  color: var(--red);
}
.SheetNav span {
  font-size: .386667rem;
}
.SheetNav .a {
  color: rgb(143, 143, 143);
  font-size: 0.346205rem;
}
.collectionTrue {
  background-color: #da231b !important;
  color: #fff !important;
}
.collection {
  width: 100px;
  height: 0.852197rem;
  margin-top: 0.173103rem;
  margin-right: 0.266312rem;
  line-height: 0.852197rem;
  border-radius: 0.852197rem;
  float: right;
  font-size: 0.372836rem;
  color: #000;
  text-align: center;
  background-color: rgb(214, 214, 214);
}
.collection img {
  width: 0.479361rem;
  margin: 0;
  position: relative;
  top: 0px;
  left: 0.45273rem;
}
.box {
  width: 100%;
  height: 1.331558rem;
  line-height: 1.331558rem;
  text-align: center;
  color: #808080;
  font-size: 0.346205rem;
}
</style>