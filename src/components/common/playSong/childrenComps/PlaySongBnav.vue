<template>
  <div class="PlaySongBnav">
    <div class="item img1">
      <img src="~assets/img/playSong/xunhuan.svg" alt="" />
    </div>
    <div class="item img1">
      <img src="~assets/img/playSong/s.svg" alt="" />
    </div>
    <div class="item img2" @click="playSong">
      <img :src="playImg" alt="" />
    </div>
    <div class="item img1">
      <img src="~assets/img/playSong/x.svg" alt="" />
    </div>
    <div class="item img1">
      <img src="~assets/img/playSong/liebiao.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PlaySongBnav",
  data() {
    return {
      // bof: require('assets/img/playSong/bofang.svg'),
      // ztin: require('assets/img/playSong/zanting.svg'),
      playImg: require("assets/img/playSong/bofang.svg"),
      isPlay: 0,
    };
  },
  methods: {
    playSong() {
      if (this.isPlay === 1) {
        this.playImg = require("assets/img/playSong/bofang.svg");
        this.isPlay = 0;
        this.$emit("playBtn");
      } else {
        this.playImg = require("assets/img/playSong/zanting.svg");
        this.$emit("playBtn");
        this.isPlay = 1;
      }
    },

    // 播放状态下
    playingImg() {
      this.playImg = require("assets/img/playSong/zanting.svg");
    },

    // 暂停状态下
    endImg() {
      this.playImg = require("assets/img/playSong/bofang.svg");
    },
  },
};
</script>
<style scoped>
.PlaySongBnav {
  width: 100%;
  height: 100px;
  /* background-color: red; */
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  text-align: center;
}
.item {
  flex: 1;
}
.img1 {
  margin-top: 20px;
}
.img2 {
  margin-top: 11px;
}
</style>