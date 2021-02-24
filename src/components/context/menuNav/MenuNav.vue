<template>
  <div class="RadioStationNav">
    <div class="left" @click="back">
      <i v-if="showBlackImg" style="color: #000; font-size: .373333rem" class="iconfont icon-fanhui"></i>
      <i v-if="showWriteImg" style="color: #fff; font-size: .373333rem" class="iconfont icon-fanhui"></i>
    </div>
    <div class="center">{{ navTitle }}</div>
    <div class="right" @click="toSub">
      <i v-if="rightImg" class="iconfont icon-fenxiang"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "RadioStationNav",
  props: {
    showBlackImg: {
      type: Boolean,
      default: true,
    },
    showWriteImg: {
      type: Boolean,
      default: false,
    },
    navTitle: {
      type: String,
      default: "",
    },
    rightImg: {
      type: Boolean,
      default: false,
    },
    // 返回按钮默认返回路径
    backPath: {
      type: String,
      default: '-1'
    }
  },
  methods: {
    back() {
      if (this.backPath == '-1') {
        this.$router.go(-1);
      } else {
        this.$router.push(this.backPath)
      }
      // this.$router.go(-1);
    },

    toSub() {
      if (this.rightImg) {
        this.$emit("openSub");
      }
    },
  },
};
</script>
<style scoped>
.RadioStationNav {
  width: 100%;
  height: 44px;
  /* font-size: .426667rem; */
  display: flex;
  /* border-bottom: 1.5px solid rgba(0, 0, 0, 0.1); */
  position: relative;
  z-index: 21;
  background-color: #fff;
}
.left {
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.left .iconfont{
  font-size: .373333rem;
}
.center {
  width: 7.456724rem;
  flex: 7;
  line-height: 44px;
  font-size: 18px;
  text-indent: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.right .icon-fenxiang {
  font-size: .373333rem;
}
</style>