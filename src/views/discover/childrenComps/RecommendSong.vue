<template>
  <div class="RecommendSong">
    <menunav class="nav" :navTitle="'每日推荐'"></menunav>
    <div class="content">
      <song-item :songList="songList" :shouLeft="false"></song-item>
    </div>
  </div>
</template>

<script>
import menunav from "components/context/menuNav/MenuNav";
import songItem from "components/context/songItem/SongItem";
import { getRecommendSong } from "network/discover";
export default {
  name: "RecommendSong",
  data() {
    return {
      songList: [],
    };
  },
  components: {
    menunav,
    songItem,
  },
  created() {
    getRecommendSong(this.$store.state.cookie).then((res) => {
      console.log(res);
      for (const item of res.data.data.dailySongs) {
        this.songList.push({
          id: item.id,
          songName: item.name,
          yuanc: [],
          singer: item.ar,
          zhuanji: item.al.name,
          mv: item.mv,
        });
      }
    });
  },
};
</script>
<style scoped>
.content {
  padding: 0.266312rem 0.372836rem;
}
.RecommendSong {
  width: 100%;
  background-color: #fff;
}
.content {
  margin: 45px 0 1.198402rem;
}
.nav {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}
</style>