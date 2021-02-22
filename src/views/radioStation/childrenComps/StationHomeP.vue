<template>
  <div class="StationHomeP">
    <menu-nav class="nav" :navTitle="navTitle"></menu-nav>
    <div class="container">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item
          class="swiperItem"
          v-for="(item, index) in bannerList"
          :key="index"
        >
          <a :href="item.url">
            <div class="img">
              <img :src="item.pic" alt="" />
              <div class="title">{{ item.typeTitle }}</div>
            </div>
          </a>
        </van-swipe-item>
      </van-swipe>
      <item-btn
        class="itemBtn"
        @toRanking="toRanking"
        @toClassify="toClassify"
      ></item-btn>
      <div class="content">
        <div class="recommend">
          <h2>电台推荐</h2>
          <perfered-item
            :recommendAudio="recommendAudio"
            :showTag="false"
            :showCreator="true"
          ></perfered-item>
        </div>
        <div class="topList">
          <div class="head">
            <h2>精品推荐</h2>
            <div class="more" @click="paygift">全部精品</div>
          </div>
          <perfered-item
            :recommendAudio="TopList"
            :showTag="true"
            :showCreator="true"
          ></perfered-item>
        </div>
        <!-- 分类模块 -->
        <recommend
          v-for="(item, index) in recommendTem"
          :key="index"
          :classifyName="item.name"
          :classifyId="item.id"
        ></recommend>
      </div>
    </div>
  </div>
</template>

<script>
import menuNav from "components/context/menuNav/MenuNav"; // 顶部导航栏组件
import itemBtn from "./StationItemBtn"; // 按钮组件
import perferedItem from "./StationItem"; // 电台推荐组件
import recommend from "./StationRecommend"; // 电台分类推荐组件
// import "assets/icon/RadioStation.css"  // 字体图标
import {
  getSwiper,
  getPerfered,
  getTopList,
  getCateList,
  getRecommend,
} from "network/radioStation"; // 网络请求

export default {
  name: "StationHomeP",
  data() {
    return {
      navTitle: "电台",
      bannerList: [], // 轮播图数据
      recommendAudio: [], // 推荐电台数据
      TopList: [], // 付费精品数据
      recommendTem: [], // 分类推荐数据
      paygiftIndex: 0,
    };
  },
  components: {
    menuNav,
    itemBtn,
    perferedItem,
    recommend,
  },
  methods: {
    // 事件传播/路由跳转
    toClassify() {
      this.$router.push("/myMessage/radioStation/stationHomeP/stationClassify");
    },

    toRanking() {
      this.$router.push("/myMessage/radioStation/stationHomeP/stationRanking");
    },

    // 付费精选
    paygift() {
      this.$router.push("/classifyInfo/" + this.paygiftIndex);
    },
  },
  created() {
    // 轮播图
    getSwiper().then((res) => {
      for (const item of res.data.data) {
        this.bannerList.push({
          url: item.url, // 地址
          typeTitle: item.typeTitle, // 标签
          pic: item.pic, // 图片
        });
      }
    });

    // 精品推荐
    getPerfered().then((res) => {
      for (const item of res.data.data) {
        this.recommendAudio.push({
          name: item.name,
          picUrl: item.picUrl,
          rcmdtext: item.rcmdText,
          id: item.id,
        });
      }
    });

    // 付费精品电台
    getTopList(3).then((res) => {
      for (const item of res.data.data.list) {
        this.TopList.push({
          name: item.creatorName,
          id: item.id,
          rcmdtext: item.name,
          picUrl: item.picUrl,
        });
      }
    });

    // 分类id 名称
    getCateList().then((res) => {
      for (const item of res.data.categories) {
        this.recommendTem.push({
          id: item.id,
          name: item.name,
        });
      }
    });
  },
};
</script>
<style scoped>
.StationHomeP {
  width: 100%;
  position: relative;
  background-color: #fff;
  height: 100vh;
}
.nav {
  position: fixed !important;
  top: 0;
  z-index: 21;
  background-color: #fff;
}
.container {
  margin-top: 55px;
}
.my-swipe {
  width: 94%;
  height: 3.728362rem;
  border-radius: 0.213333rem;
  overflow: hidden;
  margin: 0.266667rem auto;
}
.swiperItem {
  width: 100%;
  height: 100%;
}
.swiperItem img {
  width: 100%;
  height: 100%;
}
.img {
  width: 100%;
  height: 100%;
  position: relative;
}
.title {
  position: absolute;
  padding: 0.053333rem 0.133333rem 0.053333rem;
  border-top-left-radius: 0.213333rem;
  background-color: #da231b;
  font-size: 0.32rem;
  text-align: center;
  right: 0;
  bottom: 0;
  color: #fff;
}
.itemBtn {
  border-bottom: 1px solid #f1f1f1;
}
.content {
  padding: 0.266667rem 0.32rem;
}
.recommend {
  margin-bottom: 0.4rem;
}
.recommend h2 {
  font-size: 0.426667rem;
  margin-bottom: 0.266667rem;
  font-weight: 440;
}
.topList {
  margin-bottom: 0.4rem;
}
.head h2 {
  font-size: 0.426667rem;
  font-weight: 440;
}
.head .more {
  width: 1.866667rem;
  border-radius: 0.533333rem;
  line-height: 0.48rem;
  height: 0.533333rem;
  font-size: 0.32rem;
  border: 1px solid #cdccdd;
  position: absolute;
  right: 0;
  top: -0.053333rem;
  color: #b1b1b1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.head {
  width: 100%;
  height: 0.693333rem;
  position: relative;
}
</style>