<template>
  <div class="DetailSongs">
    <div class="topbox">
      <img src="~assets/img/played/bofang.svg" alt="" />
      播放全部
    </div>
    <songItem :songList="detail"></songItem>
  </div>
</template>

<script>
import songItem from "components/context/songItem/SongItem";
import { searchResult } from "network/search";

export default {
  name: "DetailSongs",
  data() {
    return {
      detail: [],
      offset: 0,
      result: 1, // 判断是否还有数据
      keyworks: this.$route.params.keywords,
    };
  },
  components: {
    songItem,
  },
  methods: {
    // 获取数据
    getSearchResult() {
      searchResult(this.keyworks, 30, this.offset * 30, 1).then((res) => {
        this.result = res.data.result.songs || null;
        if (this.result !== null) {
          for (let i = 0; i < res.data.result.songs.length; i++) {
            this.detail.push({
              id: res.data.result.songs[i].id,
              songName: res.data.result.songs[i].name,
              yuanc: [],
              singer: res.data.result.songs[i].ar,
              zhuanji: res.data.result.songs[i].album.name,
              mv: res.data.result.songs[i].mvid,
            });
          }
          this.offset++;
        } else {
          this.$toast.show('没有更多了:(',1900)
        }
      });
    },

    // 监听滚动事件
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
          this.getSearchResult();
          this.$loading.loadingNo();
        }, 1000);
      }
    },
  },
  created() {
    this.$loading.loadingShow();
    searchResult(this.$route.params.keywords, 40, this.offset * 40, 1).then(
      (res) => {
        for (const item of res.data.result.songs) {
          this.detail.push({
            id: item.id,
            songName: item.name,
            yuanc: [],
            singer: item.ar,
            zhuanji: item.album.name,
            mv: item.mvid,
          });
        }
        this.offset++;
      }
    );
  },
  mounted () {
    this.$nextTick(() => {
      this.$loading.loadingNo();
    })
  },
  activated() {
    this.$nextTick(() => {
      document.addEventListener("scroll", this.linearScroll);
    });
  },
  deactivated() {
    document.removeEventListener("scroll", this.linearScroll);
  },
};
</script>
<style scoped>
.DetailSongs {
  width: 100%;
  min-height: 13.315579rem;
}
.topbox {
  height: 0.665779rem;
  line-height: 0.665779rem;
  font-size: 0.426099rem;
  margin-bottom: 0.133156rem;
  margin-top: 2.396804rem;
}
.topbox img {
  float: left;
  width: 0.639148rem;
  margin-right: 0.266312rem;
}
</style>