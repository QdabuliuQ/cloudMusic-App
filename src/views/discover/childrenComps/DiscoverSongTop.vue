<template>
  <div class="DiscoverSongTop">
    <div class="topTitle">
      <div class="left">新歌速递</div>
      <div class="right"><div class="btn" @click="more">查看更多</div></div>
    </div>
    <el-carousel
      class="carousel"
      :interval="4000"
      :autoplay="false"
      :arrow="'never'"
      :indicator-position="'none'"
      type="card"
      height="4.926764rem"
    >
    <!-- 第一个for循环遍历出 三大部分 -->
      <el-carousel-item class="items" v-for="(item,index) in 3" :key="index">
        <!-- 第二个for循环遍历 每一个部分中的歌曲 -->
        <saItem v-for="(songItems, i) in songList[index]" :key="i" :itemDetail='songItems'></saItem>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import saItem from "./SAItem";
import { getSongsTop } from "network/discover";

export default {
  name: "DiscoverSongTop",
  data() {
    return {
      songList: [[], [], []], // 歌曲数组  二维数组嵌套
    };
  },
  components: {
    saItem,
  },
  methods: {
    more(){
      this.$router.push('/discover/moreSongs/')
    }
  },
  created() {
    // 获取新歌
    getSongsTop(0).then((res) => {
      let path = res.data.data;
      for (let i = 0; i < 9; i++) {
        if (i >= 0 && i < 3) {
          this.songList[0].push({
            id: path[i].id, // 歌曲id
            picUrl: path[i].album.picUrl, // 歌曲封面
            name: path[i].name, // 歌曲名称
            artists: path[i].artists,  // 演唱者 
          });
        } else if (i >= 3 && i < 6) {
            this.songList[1].push({
            id: path[i].id, // 歌曲id
            picUrl: path[i].album.picUrl, // 歌曲封面
            name: path[i].name, // 歌曲名称
            artists: path[i].artists,  // 演唱者
          });
        } else if (i >= 6 && i < 9) {
            this.songList[2].push({
            id: path[i].id, // 歌曲id
            picUrl: path[i].album.picUrl, // 歌曲封面
            name: path[i].name, // 歌曲名称
            artists: path[i].artists,  // 演唱者
          });
        }
      }
    });
  },
};
</script>
<style scoped>
.btn {
  float: right;
  width: 1.864181rem;
  height: 0.585885rem;
  font-size: 0.319574rem;
  border-radius: 0.585885rem;
  text-align: center;
  line-height: 0.585885rem;
  border: 1px solid #919090;
}
.carousel{
  margin-top: .266312rem;
}
.items {
  margin-left: -1.491345rem;
  width: 80%;
  height: 4.660453rem;
  background-color: #fff;
  padding: .266312rem .213049rem 0;
  border-radius: .213049rem;
  box-shadow: 2px 2px 10px rgba(131, 131, 131, 0.5);
}
.DiscoverSongTop {
  width: 100%;
  margin-top: 0.266312rem;
}
.topTitle {
  display: flex;
  padding: 0 0.319574rem;
}
.left {
  flex: 1;
  font-size: 0.426099rem;
  font-weight: 550;
}
.right {
  flex: 1;
}
</style>