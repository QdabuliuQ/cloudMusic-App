<template>
  <div class="SearchHP">
    <div class="nav">
      <div class="left" @click="back">
        <img src="~assets/img/radioStation/fanhui.png" alt="" />
      </div>
      <div class="right">
        <div class="sous">
          <input
            @keyup.enter="toSearch"
            v-model="searchTest"
            :placeholder="searchTest"
            type="text"
          />
        </div>
      </div>
    </div>
    <scrollnav
      @tabToggle="tabToggle"
      class="snav"
      :firstIndex="0"
      :itemList="itemList"
    ></scrollnav>
    <div class="contentbox">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import scrollnav from "components/context/scrollNav/ScrollNav";
import detailSong from "./DetailSongs"; // 单曲
import detailAlbum from "./DetailAlbum"; // 专辑
import detailSinger from "./DetailSinger"; // 歌手
import detailSheet from "./DetailSheet"; // 歌单
import detailUser from "./DetailUser";  // 用户

import { getDefault } from "network/search";
/**
 * 1: 单曲,
 * 10: 专辑,
 * 100: 歌手,
 * 1000: 歌单,
 * 1002: 用户,
 * 1004: MV,
 * 1006: 歌词,
 * 1009: 电台,
 * 1014: 视频,
 * 1018:综合
 */
export default {
  name: "SearchDetail",
  data() {
    return {
      searchTest: "",
      itemList: [
        "综合",
        "单曲",
        "视频",
        "歌手",
        "专辑",
        "歌单",
        "主播电台", 
        "MV",       
        "用户",          
      ],
      song: false,  // 歌曲
      album: false,  // 专辑
      singer: false,  // 歌手
      sheet: false,  // 歌单
      user: true,  // 用户
      index: 0, // 判断路由
    };
  },
  methods: {
    back() {
      this.$router.replace('/discover/search')
    },

    toSearch() {
      //   this.$router.push("/discover/search/searchHP");
    },

    // 导航栏切换
    tabToggle(index) {
      switch (index) {
        case 0:  // 综合
          this.$router.replace('/discover/search/searchDetail/whole/' + this.$route.params.keywords)
          break; 
        case 1:  // 单曲
          this.$router.replace('/discover/search/searchDetail/song/' + this.$route.params.keywords)
          break;
        case 2:  // 视频
          break;
        case 3:  // 歌手
          this.$router.replace('/discover/search/searchDetail/singer/' + this.$route.params.keywords)
          break;
        case 4:  // 专辑
          this.$router.replace('/discover/search/searchDetail/album/' + this.$route.params.keywords)
          break;
        case 5:  // 歌单
          this.$router.replace('/discover/search/searchDetail/sheet/' + this.$route.params.keywords)
          break;
        case 6:  // 主播电台
          break;
        case 7:  // MV
          break;
        case 8:  // 用户
          this.$router.replace('/discover/search/searchDetail/user/' + this.$route.params.keywords)
          break;

        default:
          break;
      }
    },
  },
  created() {
    getDefault().then((res) => {
      this.searchTest = res.data.data.realkeyword;
    });
    // this.$router.replace('/discover/search/searchDetail/whole/' + this.$route.params.keywords)
  },
  components: {
    scrollnav,
    detailSong,
    detailAlbum,
    detailSinger,
    detailSheet,
    detailUser,
  },
};
</script>
<style scoped>
.contentbox {
  padding: 0.266312rem 0.372836rem;
  margin-bottom: 1.198402rem;
}
.SearchHP {
  width: 100%;
  background-color: #fff;
  position: relative;
  z-index: 20;
}
.nav {
  width: 100%;
  height: 1.171771rem;
  background-color: #fff;
  z-index: 20;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.snav {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 20;
}
.left {
  flex: 1;
  text-align: center;
}
.left img {
  width: 25px;
  height: 22px;
  margin-top: 10.5px;
}
.right {
  flex: 9;
  display: flex;
  align-items: center;
}
.sous {
  width: 90%;
  height: 80%;
  border-bottom: 1px solid rgb(190, 190, 190);
  margin-left: 0.266312rem;
}
.sous input {
  width: 100%;
  height: 100%;
  border: 0;
  padding: 0;
  font-size: 0.426099rem;
  color: rgb(133, 133, 133);
}
</style>