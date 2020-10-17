<template>
  <div class="lifeDynamic">
    <div class="left">
      <div class="useImg">
        <img :src="userImg" alt="" />
      </div>
    </div>
    <div class="right">
      <div class="title">
        <span class="blueActive">{{ nickName }} </span>
      </div>
      <div class="time">{{ time | getTime }}</div>
      <div class="content" v-if="events.msg !== ''">{{ events.msg }}</div>
      <div class="picbox">
        <div
          class="item"
          @click="showPic"
          v-for="(item, index) in pics"
          :key="index"
        >
          <img :src="item.originUrl" alt="" />
        </div>
      </div>
      <events-count
        :commentLength="commentLength"
        :likedCount="likedCount"
        :shareCount="shareCount"
      ></events-count>
    </div>
    <van-image-preview class="imgShow" v-model="show" :images="images">
    </van-image-preview>
  </div>
</template>

<script>
import eventsCount from "./eventsCount"; // 底部动态数据
export default {
  props: [
    "events",
    "userImg",
    "nickName",
    "time",
    "commentLength",
    "likedCount",
    "shareCount",
    "pics",
  ],
  name: "lifeDynamic",
  data() {
    return {
      show: false,
      images: [],
    };
  },
  methods: {
    showPic() {
      this.show = true;
      this.$store.state.isShowNav = false; // 隐藏底部播放栏
    },
  },
  watch: {
    show() {
      if (!this.show) {
        this.$store.state.isShowNav = true; // 显示底部播放栏
      }
    },
  },
  created() {
    for (const item of this.pics) {
      this.images.push(item.originUrl);
    }
  },
  components: {
    eventsCount,
  },
};
</script>
<style scoped>
.lifeDynamic {
  width: 100%;
  display: flex;
  padding-bottom: 0.399467rem;
  border-bottom: 1px solid #e6e6e6;
  margin-top: 0.399467rem;
}
.left {
  flex: 1.5;
}
.useImg {
  width: 1.065246rem;
  height: 1.065246rem;
  border-radius: 50%;
  overflow: hidden;
}
.useImg img {
  width: 100%;
  height: 100%;
}
.right {
  flex: 8.5;
}
.title {
  font-size: 0.399467rem;
  color: #000;
}
.blueActive {
  font-size: 0.399467rem;
  color: #226ec5;
}
.time {
  font-size: 0.346205rem;
  color: rgb(158, 158, 158);
}
.content {
  font-size: 15px;
  margin-top: 0.213049rem;
}
.picbox {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 0.213049rem;
}
.item {
  width: 32%;
  height: 2.52996rem;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 5px;
}
.item img {
  width: 100%;
  height: 100%;
}
</style>