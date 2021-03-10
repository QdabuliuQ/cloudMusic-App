<template>
  <div class="DiscoverSwiper">
    <!-- 使用 vant 组件库 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        class="swiperItem"
        v-for="(item, index) in swiperList"
        :key="index"
      >
        <a :href="item.url">
          <div class="img">
            <img :src="item.pic" alt="" />
            <div
              class="title"
              v-bind:style="{
                background:
                  item.titleColor === 'blue' ? '#326ef8' : item.titleColor,
              }"
            >
              <span>
                {{ item.typeTitle }}
              </span>
            </div>
          </div>
        </a>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getBanner } from "network/discover";

export default {
  name: "DiscoverSwiper",
  data() {
    return {
      swiperList: null,
    };
  },
  created() {
    getBanner(1).then((res) => {
      this.swiperList = res.data.banners;
    });
  },
};
</script>
<style scoped>
.my-swipe {
  width: 94%;
  height: 3.728362rem;
  border-radius: 0.213049rem;
  overflow: hidden;
  margin: 0.266312rem auto;
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
  padding: 0.079893rem 0.186418rem 0.106525rem;
  border-top-left-radius: 0.213049rem;
  font-size: 0.346205rem;
  text-align: center;
  right: 0;
  bottom: 0;
  color: #fff;
}
</style>