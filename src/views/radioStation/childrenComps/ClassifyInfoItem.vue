<template>
  <div class="list">
    <div
      class="ClassifyInfoItem"
      @click="audioDetail(item.id)"
      v-for="(item, index) in audioList"
      :key="index"
    >
      <div class="picUrl">
        <div class="tag" v-if="item.price != 0"><span>付费精品</span></div>
        <img v-lazy="item.picUrl" alt="" />
      </div>
      <div class="text">
        <div class="content">
          <p class="name" style="margin-bottom: .133333rem">{{ item.name }}</p>
          <p class="rcmdtext" style="margin-bottom: .133333rem">{{ item.rcmdtext }}</p>
          <p class="programCount">
            节目：{{ item.programCount }}，{{
              item.subCount < 500 ? "最新上架" : "订阅：" + item.subCount
            }}
          </p>
          <p class="price" v-if="item.price !== 0" style="margin-bottom: 0">
            ￥ {{ item.price / 100 }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClassifyInfoItem",
  props: ["audioList"],
  methods: {
    audioDetail(rid) {
      this.$router.push("/stationDetail/" + rid);
    },
  },
};
</script>
<style scoped>
.list {
  width: 100%;
}
.ClassifyInfoItem {
  width: 100%;
  height: 2.666667rem;
  display: flex;
  margin-bottom: .24rem;
  
}
.picUrl {
  flex: 2.1;
  border-radius: .133333rem;
  overflow: hidden;
  position: relative;
}
.picUrl img {
  width: 100%;
  height: 100%;
}
.picUrl .tag {
  position: absolute;
  height: .48rem;
  text-align: center;
  border-bottom-right-radius: .133333rem;
  line-height: .48rem;
  top: 0;
  left: 0;
  font-size: .293333rem;
  padding: 0 .053333rem;
  color: #fff;
  background-color: #da231b;
}
.tag span {
  display: inline-block;
  transform: scale(0.8);
}
.text {
  flex: 5;
  display: flex;
  align-items: center;
}
.content {
  width: 95%;
  margin-left: 5%;
}
.name {
  font-size: .373333rem;
}
.rcmdtext {
  font-size: .32rem;
  /* margin-bottom: .08rem; */
  color: #a0a0a0;
}
.programCount { 
  font-size: .32rem;
  color: #a0a0a0;
  margin-bottom: 0 !important;
}
.price {
  color: #da231b;
}
</style>