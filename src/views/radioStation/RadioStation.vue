<template>
  <div class="RadioStation">
    <menu-nav :navTitle="navTitle"></menu-nav>
    <mscroll style="top: 44px; bottom: 45px" :scrollY="true">
      <div class="top">
        <div class="title">
          我创建的电台<span>({{ radios.length }})</span>
        </div>
        <div class="content">
          <i class="iconfont icon-maikefeng"></i>
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
          <i class="iconfont icon-tuijian"></i>
          <span>为你推荐</span>
          <i class="iconfont icon-gengduo"></i>
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
import "assets/icon/RadioStation.css"  // 字体图标
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
  padding: .266667rem .32rem;
  width: 100%;
  height: 2.4rem;
  border-bottom: .16rem solid #ececec;
}
.title {
  height: .8rem;
  line-height: .8rem;
  font-size: .4rem;
}
.title span {
  font-size: .32rem;
  color: #a5a5a5;
}
.title .like {
  width: .586667rem;
  margin-left: .133333rem;
  margin-top: .08rem;
  margin-right: .133333rem;
  float: left;
}
.content {
  height: 1.066667rem;
  font-weight: 550;
  display: flex;
  align-items: center;
}
.content .iconfont {
  font-size: .426667rem;
  color: var(--red);
}
.content h2 {
  font-size: .373333rem;
  margin: 0;
  line-height: 1.066667rem;
  font-weight: 400;
  margin-left: .266667rem;
}
.myRadios {
  padding: .266667rem .32rem;
  height: 2.4rem;
  border-bottom: .16rem solid #ececec;
}
.content2 {
  width: 100%;
  height: 1.066667rem;
  line-height: 1.066667rem;
  text-align: center;
  color: #a5a5a5;
  font-size: .4rem;
}
.recommendAudio {
  padding: .266667rem .32rem;
}
.recommendTitle {
  margin-bottom: .133333rem;
  display: flex;
  align-items: center;
}
.recommendTitle .icon-tuijian{
  color: var(--red);
  font-size: .426667rem;
}
.recommendTitle .icon-gengduo{
  color: var(--red);
  font-size: .333333rem;
  margin-left: .186667rem;
}
.recommendTitle span{
  font-size: .36rem;
  color: #000;
  float: left;
  margin-left: .266667rem;
}
</style>