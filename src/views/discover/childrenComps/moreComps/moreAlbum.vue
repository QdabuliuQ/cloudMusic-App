<template>
  <div class="moreAlbum">
    <menunav class="nav" :navTitle="'更多专辑'"></menunav>
    <scrollnav
      @tabToggle="tabToggle"
      class="snav"
      :itemList="tagList"
      :firstIndex="0"
    ></scrollnav>
    <div class="topBox">
      <div class="video">
        <video
          style="width: 100%; height: 4.793609rem; object-fit: fill"
          src="~assets/video/album.mp4"
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
    <div class="content">
      <div
        class="albumItem"
        @click="albumShow(item.id)"
        v-for="(item, index) in albumList"
        :key="index"
      >
        <div class="topimg">
          <img class="img" @load="imgload(index)" v-lazy="item.picUrl" alt="" />
          <img
            v-show="item.showBlack"
            class="bgcImg"
            src="~assets/img/discover/moreAlbum/heiyuan.svg"
            alt=""
          />
        </div>
        <div class="albumname">{{ item.name }}</div>
        <div class="artist">{{ item.artist }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import menunav from "components/context/menuNav/MenuNav";
import scrollnav from "components/context/scrollNav/ScrollNav";

import { getAlbum } from "network/discover";

export default {
  name: "moreAlbum",
  data() {
    return {
      offset: 0,
      tagList: ["全部", "华语", "欧美", "韩国", "日本"],
      albumList: [], // 专辑数组
      name: "推荐",
      test: "Recommend",
      Area: "全部",
      loading: false,     
    };
  },
  components: {
    menunav,
    scrollnav,
  },
  methods: {
    // 图片加载事件
    imgload(index){
      this.albumList[index].showBlack = true
    },

    // 路由跳转
    albumShow(id) {
      this.$router.push("/playDetail/" + id + "&" + true);
    },

    // 导航栏切换
    tabToggle(index) {
      switch (index) {
        case 0:
          this.album("ALL", "hot");
          this.Area = "全部";
          this.name = "全部";
          this.test = "Recommend";
          break;
        case 1:
          this.album("ZH", "hot");
          this.Area = "华语";
          this.name = "华语";
          this.test = "Mandarin Music";
          break;
        case 2:
          this.album("EA", "hot");
          this.Area = "欧美";
          this.name = "欧美";
          this.test = "Western Music";
          break;
        case 3:
          this.album("KR", "hot");
          this.Area = "韩国";
          this.name = "韩国";
          this.test = "Korean Music";
          break;
        case 4:
          this.album("JP", "hot");
          this.Area = "日本";
          this.name = "日本";
          this.test = "Japanese Music";
          break;
        default:
          break;
      }
    },

    // 封装方法
    album(area, type) {
      this.$loading.loadingShow();
      if (this.Area !== area) {
        this.offset = 0;
        this.albumList = [];
        getAlbum(30, this.offset * 30, area, type).then((res) => {
          for (const item of res.data.monthData) {
            this.albumList.push({
              id: item.id,
              name: item.name,
              picUrl: item.picUrl,
              artist: item.artist.name,
              showBlack: false,
            });
            this.$loading.loadingNo();
          }
        });
      }
      this.Area = area;
    },

    // 下拉加载
    loadingAlbum() {
      this.$loading.loadingShow();
      this.offset = 1;
      getAlbum(30, this.offset * 30, this.Area, "hot").then((res) => {
        for (const item of res.data.monthData) {
          this.albumList.push({
            id: item.id,
            name: item.name,
            picUrl: item.picUrl,
            artist: item.artist.name,
            showBlack: false,
          });
          this.$loading.loadingNo();
        }
        this.offset++;
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
          this.loadingAlbum();
          this.$loading.loadingNo();
        }, 1000);
      }
    },
  },
  created() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.album("ALL", "hot");
  },

  mounted() {
    // 绑定滚动事件
    document.addEventListener("scroll", this.linearScroll);
  },
  destroyed () {
    document.removeEventListener("scroll", this.linearScroll)
  }
};
</script>
<style scoped>
.nav {
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
}
.snav {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 19;
}
.moreAlbum {
  width: 100%;
  background-color: #fff;
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
.topBox {
  margin-top: 2.237017rem;
  width: 100%;
  height: 4.527297rem;
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
.content {
  padding: 0.266312rem 0.399467rem;
  margin-top: 0.266312rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 1.331558rem;
}
.albumItem {
  width: 45%;
  height: 4.793609rem;
  margin-bottom: 0.213049rem;
}
.topimg {
  width: 3.595206rem;
  height: 3.462051rem;
  position: relative;
}
.topimg .img {
  width: 100%;
  height: 100%;
  border-radius: 0.213049rem;
  position: relative;
  z-index: 5;
}
.bgcImg {
  position: absolute;
  right: -0.532623rem;
  top: 0;
}
.albumname {
  width: 4.12783rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.372836rem;
  margin-top: 0.133156rem;
}
.artist {
  width: 4.12783rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.319574rem;
  color: #b3b1b1;
}
</style>