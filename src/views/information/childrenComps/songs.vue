<template>
  <div class="songs">
    <div class="topbox">
      <div class="left">{{ title }}歌曲50</div>
      <div class="right">
        <div class="toggle" @click="toggle">
          <i class="iconfont" :class="icon"></i>{{ toggleTitle }}
        </div>
      </div>
    </div>
    <div>
      <song-item :songList="songs"></song-item>
    </div>
  </div>
</template>

<script>
import SongItem from "components/context/songItem/SongItem";
import { getSongsList } from "network/singer";

export default {
  props: ["artistId"],
  name: "songs",
  components: {
    SongItem,
  },
  data() {
    return {
      songs: [], // 歌曲列表
      icon: 'icon-shijianpaihang',
      index: 0, // 切换歌曲排列
      toggleTitle: "按时间排列",
      title: "热门",
    };
  },
  methods: {
    toggle() {
      if (this.index === 0) {
        this.songs = [];
        this.songsList("time");
        this.toggleTitle = "按热度排列";
        this.icon = 'icon-redupaihang'
        this.title = "最新";
        this.index = 1;
      } else {
        this.songs = [];
        this.songsList("hot");
        this.toggleTitle = "按时间排列";
        this.icon = 'icon-shijianpaihang'
        this.title = "热门";
        this.index = 0;
      }
    },

    songsList(order) {
      getSongsList(this.artistId, order, 50).then((res) => {
        for (const item of res.data.songs) {
          this.songs.push({
            mv: item.mv,
            songName: item.name,
            id: item.id,
            singer: item.ar,
            zhuanji: item.al.name,
            yuanc: item.alia,
          });
        }
      });
    },
  },
  created() {
    this.songsList("hot");
  },
};
</script>
<style scoped>
.songs {
  padding: 0 0.399467rem 0.399467rem;
  margin-bottom: 45px;
  background-color: #fff;
  min-height: 7.856192rem;
  position: relative;
  z-index: -1;
}
.topbox {
  width: 100%;
  font-size: 0.426099rem;
  margin-bottom: 0.133156rem;
  height: 0.665779rem;
  line-height: 0.665779rem;
  display: flex;
}
.left {
  flex: 1;
  font-size: .4rem;
}
.right {
  flex: 1;
}
.toggle {
  font-size: 0.346205rem;
  line-height: 0.665779rem;
  float: right;
}
.toggle .iconfont {
  font-size: .32rem;
  margin-right: .106667rem;
}
</style>