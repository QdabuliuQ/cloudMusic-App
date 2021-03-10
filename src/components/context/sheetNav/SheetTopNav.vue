<template>
  <div class="RadioStationNav">
    <div class="left" @click="back">
      <i class="iconfont icon-fanhui"></i>
    </div>
    <div class="center">{{ navTitle }}</div>
    <div class="right" @click="fxiang">
      <i v-if="rightImg" class="iconfont icon-fenxiang"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "RadioStationNav",
  props: ["navTitle", "rightImg"],
  methods: {
    back() {
      this.$router.go(-1);
    },

    fxiang() {
      if (this.rightImg) {
        this.$emit("fx");
      }
    },
  },
};
</script>
<style scoped>
.RadioStationNav {
  width: 100%;
  height: 44px;
  display: flex;
  /* box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.6) !important; */
  border-bottom: 1.5px solid rgba(0, 0, 0, 0.1);
}
.left {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.left .icon-fanhui {
  font-size: 0.4rem;
}
.center {
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
  font-size: 0.4rem;
}
</style>