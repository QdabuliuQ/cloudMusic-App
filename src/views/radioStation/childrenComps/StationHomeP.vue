<template>
  <div class="StationHomeP">
    <menu-nav :navTitle="navTitle"></menu-nav>
    <mscroll style="top: 44px; bottom: 45px" :scrollY="true">
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
      <item-btn class="itemBtn" @toRanking='toRanking' @toClassify="toClassify"></item-btn>
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
        v-for="(item,index) in recommendTem" 
        :key="index" 
        :classifyName='item.name'
        :classifyId='item.id'></recommend>
      </div>
    </mscroll>
  </div>
</template>

<script>
import mscroll from "components/common/muiScroll/MuiScroll"; // 滚动组件
import menuNav from "components/context/menuNav/MenuNav"; // 顶部导航栏组件
import itemBtn from "./StationItemBtn"; // 按钮组件
import perferedItem from "./StationItem"; // 电台推荐组件
import recommend from './StationRecommend';  // 电台分类推荐组件

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
      recommendTem: [],  // 分类推荐数据
      paygiftIndex: 0,
    };
  },
  components: {
    mscroll,
    menuNav,
    itemBtn,
    perferedItem,
    recommend
  },
  methods: {
    // 事件传播/路由跳转
    toClassify(){
      this.$router.push('/myMessage/radioStation/stationHomeP/stationClassify')
    },

    toRanking(){
      this.$router.push('/myMessage/radioStation/stationHomeP/stationRanking')
    },

    // 付费精选
    paygift(){
      this.$router.push('/classifyInfo/'+this.paygiftIndex)
    }
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
              name: item.name
          })
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
.my-swipe {
  width: 94%;
  height: 3.728362rem;
  border-radius: 8px;
  overflow: hidden;
  margin: 10px auto;
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
  padding: 2px 5px 2px;
  border-top-left-radius: 8px;
  background-color: #da231b;
  font-size: 12px;
  text-align: center;
  right: 0;
  bottom: 0;
  color: #fff;
}
.itemBtn {
  border-bottom: 1px solid #f1f1f1;
}
.content {
  padding: 10px 12px;
}
.recommend {
  margin-bottom: 15px;
}
.recommend h2 {
  font-size: 16px;
  margin-bottom: 10px;
}
.topList {
  margin-bottom: 15px;
}
.head h2 {
  font-size: 16px;
}
.head .more {
  width: 70px;
  text-align: center;
  border-radius: 20px;
  line-height: 18px;
  height: 20px;
  font-size: 12px;
  border: 1px solid #cdccdd;
  position: absolute;
  right: 0;
  top: -2px;
}
.head {
  width: 100%;
  height: 26px;
  position: relative;
}
</style>