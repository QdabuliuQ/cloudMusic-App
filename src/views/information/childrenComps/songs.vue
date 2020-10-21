<template>
  <div class="songs">
    <div class="topbox">
        <div class="left">{{title}}歌曲50</div>
        <div class="right">
            <div class="toggle" @click="toggle">
                <img :src="icon" alt="">{{toggleTitle}}
            </div>
        </div>
    </div>
    <div>
      <song-item :songList='songs'></song-item>
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
      songs: [],  // 歌曲列表
      icon: require('assets/img/information/songs/shijian.svg'),
      index: 0,  // 切换歌曲排列
      toggleTitle: '按时间排列',
      title: '热门',
    };
  },
  methods: {
    toggle(){
        if (this.index === 0) {
            this.songs = []
            this.songsList('time')
            this.toggleTitle = '按热度排列'
            this.icon = require('assets/img/information/songs/redu.svg')
            this.title = '最新'
            this.index = 1
        } else {
            this.songs = []
            this.songsList('hot')
            this.toggleTitle = '按时间排列'
            this.icon = require('assets/img/information/songs/shijian.svg')
            this.title = '热门'
            this.index = 0
        }
    },

    songsList(order) {
      this.$loading.loadingShow()
      getSongsList(this.artistId, order, 50).then((res) => {
        for (const item of res.data.songs) {
          this.songs.push({
              mv: item.mv,
              songName: item.name,
              id: item.id,
              singer: item.ar[0].name,
              zhuanji: item.al.name,
              yuanc: item.alia
          });
        }
        this.$loading.loadingNo()
      });
    },
  },
  created() {
    this.songsList('hot');
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
  margin-bottom: .133156rem;
  height: .665779rem;
  line-height: .665779rem;
  display: flex;
}
.left{
    flex: 1;
}
.right{
    flex: 1;
}
.toggle{
    font-size: .346205rem;
    line-height: .665779rem;
    float: right;
}
.toggle img{
    position: relative;
    top: 3px;
    right: 5px;
}
</style>