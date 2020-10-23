<template>
  <div class="itemList">
    <div
      class="StationItem"
      @click="audioDetail(item.id)"
      v-for="(item, index) in recommendAudio"
      :key="index"
    >
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
  margin-bottom: 8px;
  position: relative;
}
.cover {
  width: 100%;
  height: 2.929427rem;
  border-radius: 7px;
  overflow: hidden;
  position: relative;
}
.count {
  position: absolute;
  right: .133156rem;
  top: 0;
  color: #fff;
  font-size: 0.319574rem;
}
.creator {
  position: absolute;
  bottom: 0;
  width: 95%;
  margin-left: 4%;
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tag {
  position: absolute;
  height: 20px;
  text-align: center;
  line-height: 20px;
  color: #fff;
  background-color: #da231b;
  font-size: 10px;
  padding: 0 4px;
  border-top-left-radius: 7px;
  border-bottom-right-radius: 7px;
}
.cover img {
  width: 100%;
  height: 100%;
}
.title {
  width: 100%;
  height: 35px;
  margin-top: 2px;
  font-size: 13px;
  line-height: 18px;
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