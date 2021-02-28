<template>
  <div class="PlaySongBnav">
    <div class="item img1">
      <i class="iconfont icon-xunhuan"></i>
    </div>
    <div class="item img1">
      <i class="iconfont icon-shangyishou"></i>
    </div>
    <div class="item img2" @click="playSong">
      <i class="iconfont" :class="playIcon"></i>
    </div>
    <div class="item img1">
      <i class="iconfont icon-xiayishou"></i>
    </div>
    <div class="item img1">
      <i class="iconfont icon-liebiao"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlaySongBnav",
  data() {
    return {
      playIcon: 'icon-gequbofang',
      isPlay: 0,
    };
  },
  methods: {
    playSong() {
      if (this.isPlay === 1) {
        this.playIcon = 'icon-gequbofang'
        this.isPlay = 0;
        this.$emit("playBtn");
      } else {
        this.playIcon = 'icon-gequtingzhi'
        this.$emit("playBtn");
        this.isPlay = 1;
      }
    },

    // 播放状态下
    playingImg() {
      this.playIcon = 'icon-gequtingzhi'
    },

    // 暂停状态下
    endImg() {
      this.playIcon = 'icon-gequbofang'
    },
  },
};
</script>
<style scoped>
.PlaySongBnav {
  width: 100%;
  height: 2.666667rem;
  /* background-color: red; */
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  text-align: center;
}
.item {
  flex: 1;
}
.img1 {
  margin-top: .533333rem;
  color: #fff;
}
.img1 .iconfont{
  font-size: .666667rem;
}
.img2 {
  margin-top: .293333rem;
}
.img2 .iconfont{
  color: #fff;
  font-size: 1.066667rem;
  position: relative;
  top: .266667rem;
}

</style>