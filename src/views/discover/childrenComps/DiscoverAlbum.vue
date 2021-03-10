<template>
  <div class="DiscoverAlbum">
    <div class="topTitle">
      <div class="left">新碟上架</div>
      <div class="right">
          <div class="btn" @click="more">查看更多</div>
      </div>
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
      <el-carousel-item class="items" v-for="(item,index) in albunList.length" :key="index">
        <!-- 第二个for循环遍历 每一个部分中的歌曲 -->
        <saItem :isAlbum='true' v-for="(albunItems, i) in albunList[index]" :key="i" :itemDetail='albunItems'></saItem>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getNewAlbum } from "network/discover";
import saItem from "./SAItem";

export default {
  name: "DiscoverAlbum",
  data() {
    return {
      offset: 0,
      albunList: [[],[],[]],  // 二维数组
    };
  },
  components: {
      saItem,
  },
  methods: {
    more(){
      this.$router.push('/discover/moreAlbum/')
    }
  },
  created() {
    getNewAlbum(9, this.offset * 9, "ALL", "new").then((res) => {
      let path = res.data.monthData;
      if (res.data.monthData.length <= 3) {
        this.albunList = [[]]
      } else if (res.data.monthData.length <= 6) {
        this.albunList = [[],[]]
      } else if (res.data.monthData.length <= 9) {
        this.albunList = [[],[],[]]
      }
      for (let i = 0; i < 9; i++) {
        if (res.data.monthData.length > i && i >= 0 && i < 3) {
          this.albunList[0].push({
            id: path[i].id, // 歌曲id
            picUrl: path[i].picUrl, // 歌曲封面
            name: path[i].name, // 歌曲名称
            artists: path[i].artists,  // 演唱者 
          });
        } else if (res.data.monthData.length > i && i >= 3 && i < 6) {
            this.albunList[1].push({
            id: path[i].id, // 歌曲id
            picUrl: path[i].picUrl, // 歌曲封面
            name: path[i].name, // 歌曲名称
            artists: path[i].artists,  // 演唱者
          });
        } else if (res.data.monthData.length > i && i >= 6 && i < 9) {
            this.albunList[2].push({
            id: path[i].id, // 歌曲id
            picUrl: path[i].picUrl, // 歌曲封面
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
  height:  .585885rem;
  font-size: 0.319574rem;
  border-radius: .585885rem;
  text-align: center;
  line-height:  .585885rem;
  border: 1px solid #919090;
}
.DiscoverAlbum {
  width: 100%;
  margin-top: 0.266312rem;
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