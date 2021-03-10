<template>
  <div class="WholeMore">
    <div>{{ moreText }}</div>
    <i class="iconfont icon-gengduo"></i>
  </div>
</template>

<script>
export default {
  props: {
    moreText: {
      type: String,
      default: "",
    },
  },
  data () {
    return {
      shouImg: false,  
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.shouImg = true
    })
  },
  name: "WholeMore",
};
</script>
<style scoped>
.WholeMore {
  width: 100%;
  height: 1.065246rem;
  font-size: 0.372836rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.iconfont {
  font-size: .346667rem;
  position: relative;
  top: .026667rem;
  margin-left: .133333rem;
}
</style>