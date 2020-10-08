<template>
  <div class="ClassifyInfo">
    <menu-nav :navTitle="navTitle"></menu-nav>
    <mscroll style="top: 44px; bottom: 45px" :scrollY="true">
      <div
        class="content"
        v-infinite-scroll="loadAudio"
        infinite-scroll-distance="100"
        infinite-scroll-delay="500"
        infinite-scroll-immediate="fasle"
      >
        <info-item :audioList="audioList"></info-item>
      </div>
    </mscroll>
  </div>
</template>

<script>
import menuNav from "components/context/menuNav/MenuNav"; // 导航栏组件
import infoItem from "./ClassifyInfoItem"; // 电台列表组件
import mscroll from "components/common/muiScroll/MuiScroll"; // 滚动组件
import { getRecommend, getRecommendHot, getPaygift } from "network/radioStation";

export default {
  name: "ClassifyInfo",
  data() {
    return {
      audioList: [],
      offset: 0, // 请求页数
      count: 0, // 分类电台数量
      nowCount: 0, // 目前获取到的电台数量
      navTitle: "",
      index: 0,
    };
  },
  methods: {
    loadAudio(){
        this.$loading.loadingShow();
        setTimeout(() => {
          this.getAudio()
          this.$loading.loadingNo()
        },1000)
    },

    // 获取电台信息
    getAudio() {
      if (this.$route.params.type > 0) {
        getRecommendHot(this.$route.params.type, 30, this.offset).then((res) => {
          this.navTitle = res.data.djRadios[0].category;
          this.count = res.data.count;
          this.nowCount += res.data.djRadios.length;
          if (this.nowCount <= this.count) {
            for (const item of res.data.djRadios) {
              this.audioList.push({
                id: item.id, // 电台id
                rcmdtext: item.rcmdtext, // 电台标题
                name: item.name, // 电台名称
                price: item.price, // 电台价格
                programCount: item.programCount, // 节目数量
                subCount: item.subCount, // 订阅人数
                picUrl: item.picUrl, // 电台封面
              });
            }
            this.offset++;
          } else {
            this.$toast.show("没有更多了:(", 1900);
          }
        });
      } else if(this.$route.params.type == 0) {
        getPaygift(30, this.offset).then(res => {
          this.navTitle = '付费精选';
          this.nowCount += res.data.data.list.length;
          if (res.data.data.hasMore) {
            for (const item of res.data.data.list) {
              this.audioList.push({
                id: item.id, // 电台id
                rcmdtext: item.rcmdtext, // 电台标题
                name: item.name, // 电台名称
                price: item.originalPrice, // 电台价格
                programCount: item.programCount, // 节目数量
                subCount: item.subCount, // 订阅人数
                picUrl: item.picUrl, // 电台封面
              });
            }
            this.offset++;
          } else {
            this.$toast.show("没有更多了:(", 1900);
          }
        })
      }
    },
  },
  created() {
    this.getAudio();
  },
  components: {
    menuNav,
    infoItem,
    mscroll,
  },
};
</script>
<style scoped>
.ClassifyInfo {
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: #fff;
}
.content {
  padding: 10px 12px;
}
</style>