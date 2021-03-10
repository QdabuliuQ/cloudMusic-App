<template>
  <div class="itemList">
    <div
      class="StationItem"
      @click="audioDetail(item.id)"
      v-for="(item, index) in recommendAudio"
      :key="index"
    >
      <div class="container" :class="[index == 1 ? 'centerClass': '']">
        <div class="cover">
          <div class="tag" v-if="showTag">付费精品</div>
          <div class="count" v-if="count">▷ {{ item.playCount }}</div>
          <img v-lazy="item.picUrl" alt="" />
          <div class="creator" v-if="showCreator">{{ item.name }}</div>
        </div>
        <div class="title">
          {{ item.rcmdtext == "" ? item.desc : item.rcmdtext }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StationItem",
  props: {
    recommendAudio: {
      type: Array,
      default: [],
    },
    showTag: {
      type: Boolean,
      default: false,
    },
    showCreator: {
      type: Boolean,
      default: false,
    },
    count: {
      type: Boolean,
      default: false,
    },
  },
  // recommendAudio 电台信息数组
  // showTag 是否是付费电台
  // showCreator 显示创作者
  // count 显示播放量
  methods: {
    audioDetail(rid) {
      this.$router.push("/stationDetail/" + rid);
    },
  },
  created() {},
};
</script>
<style scoped>
.StationItem {
  width: 31.5%;
  height: 3.91478rem;
  margin-bottom: 0.213333rem;
  position: relative;
}
.centerClass{
  /* margin: 0 .370933rem; */
}
.container{
  width: 100%;
  height: 100%;
}
.cover {
  width: 100%;
  height: 2.929427rem;
  border-radius: 0.186667rem;
  overflow: hidden;
  position: relative;
}
.count {
  position: absolute;
  right: 0.133156rem;
  top: 0;
  color: #fff;
  font-size: 0.319574rem;
}
.creator {
  position: absolute;
  bottom: 0;
  width: 95%;
  margin-left: 4%;
  height: 0.48rem;
  line-height: 0.48rem;
  font-size: 0.32rem;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tag {
  position: absolute;
  height: 0.533333rem;
  text-align: center;
  line-height: 0.533333rem;
  color: #fff;
  background-color: var(--red);
  font-size: 0.266667rem;
  padding: 0 0.106667rem;
  border-top-left-radius: 0.186667rem;
  border-bottom-right-radius: 0.186667rem;
}
.cover img {
  width: 100%;
  height: 100%;
}
.title {
  width: 100%;
  height: 0.933333rem;
  margin-top: 0.053333rem;
  font-size: 0.346667rem;
  line-height: 0.48rem;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.itemList {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
  justify-content: space-between; 
}
</style>