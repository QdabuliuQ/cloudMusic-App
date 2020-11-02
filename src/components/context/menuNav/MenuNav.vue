<template>
  <div class="RadioStationNav">
    <div class="left" @click="back">
      <img
        v-if="showBlackImg"
        src="~assets/img/radioStation/fanhui.png"
        alt=""
      />
      <img
        v-if="showWriteImg"
        src="~assets/img/radioStation/fanhui2.png"
        alt=""
      />
    </div>
    <div class="center">{{ navTitle }}</div>
    <div class="right" @click="toSub">
      <img v-if="rightImg" src="~assets/img/playSong/fenxiang.svg" alt="" />
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
      this.$emit("openSub");
    },
  },
};
</script>
<style scoped>
.RadioStationNav {
  width: 100%;
  height: 44px;
  display: flex;
  border-bottom: 1.5px solid rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 21;
  background-color: #fff;
}
.left {
  flex: 1;
  text-align: center;
}
.left img {
  width: 25px;
  height: 22px;
  margin-top: 10.5px;
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
  text-align: center;
}
.right img {
  width: 24px;
  height: 24px;
  margin-top: 10px;
}
</style>