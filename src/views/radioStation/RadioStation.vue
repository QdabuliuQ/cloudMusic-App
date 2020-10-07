<template>
  <div class="RadioStation">
    <menu-nav :navTitle="navTitle"></menu-nav>
    <mscroll style="top: 44px; bottom: 45px" :scrollY="true">
      <div class="top">
        <div class="title">
          我创建的电台<span>({{ radios.length }})</span>
        </div>
        <div class="content">
          <img src="~assets/img/radioStation/maikefeng.svg" alt="" />
          <h2>申请做主播</h2>
        </div>
      </div>
      <div class="myRadios">
        <div class="title">
          我订阅的电台<span>({{ myRadios.length }})</span>
        </div>
        <div class="content2">您还没有订阅电台~</div>
      </div>
      <div class="recommendAudio">
        <div class="title recommendTitle" @click="StationHomeP">
          <img class="like" src="~assets/img/radioStation/xin.svg" alt="" />
          <span>为你推荐</span>
          <img class="toright" src="~assets/img/radioStation/you.svg" alt="">
        </div>
        <station-item :recommendAudio="recommendAudio"></station-item>
      </div>
    </mscroll>
  </div>
</template>

<script>
import MenuNav from "components/context/menuNav/MenuNav"; // 导航栏组件
import StationItem from "./childrenComps/StationItem"; // 推荐电台组件
import mscroll from "components/common/muiScroll/MuiScroll"; // 滚动组件

import {
  getUserDJ,
  userAudio,
  getAudioList,
  getRecommendAudio,
} from "network/radioStation";
import { loginState, refreshLogin } from "network/login";

export default {
  name: "RadioStation",
  data() {
    return {
      navTitle: "我的电台",
      radios: [], // 创建的电台
      myRadios: [], // 订阅的电台
      recommendAudio: [], // 推荐电台数据
    };
  },
  methods: {
    StationHomeP(){
      this.$router.push('/myMessage/radioStation/stationHomeP')
    }
  },
  components: {
    MenuNav,
    StationItem,
    mscroll,
  },
  created() {
    // 获取用户电台
    userAudio(this.$store.state.profile.userId).then((res) => {
      this.radios = res.data.djRadios;
    });

    // 推荐电台
    getRecommendAudio().then((res) => {
      for (const item of res.data.djRadios) {
        this.recommendAudio.push({
          id: item.id, // 电台id
          picUrl: item.picUrl, // 电台封面
          rcmdtext: item.rcmdtext, // 电台标题
        });
      }
    });

    // 订阅电台
    getAudioList().then((res) => {
      this.myRadios = res.data.djRadios;
    });
  },
};
</script>
<style scoped>
.RadioStation {
  position: relative;
  z-index: 20;
  background-color: #fff;
  height: 100vh;
}
.top {
  padding: 10px 12px;
  width: 100%;
  height: 90px;
  border-bottom: 6px solid #ececec;
}
.title {
  height: 30px;
  line-height: 30px;
  font-size: 15px;
}
.title span {
  font-size: 12px;
  color: #a5a5a5;
}
.title .like {
  width: 22px;
  margin-left: 5px;
  margin-top: 3px;
  margin-right: 5px;
  float: left;
}
.content {
  height: 40px;
  line-height: 40px;
  font-weight: 550;
}
.content img {
  width: 35px;
  margin-left: 10px;
  float: left;
  margin-top: 2.5px;
  margin-right: 5px;
}
.content h2 {
  font-size: 16px;
  margin: 0;
  line-height: 40px;
}
.myRadios {
  padding: 10px 12px;
  height: 90px;
  border-bottom: 6px solid #ececec;
}
.content2 {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #a5a5a5;
  font-size: 15px;
}
.recommendAudio {
  padding: 10px 12px;
}
.recommendTitle {
  margin-bottom: 5px;
}
.recommendTitle span{
  font-size: 15px;
  font-weight: 550;
  color: #000;
  float: left;
}
.toright{
  width: 14px;
  margin-top: 8px;
  margin-left: 4px;
}
</style>