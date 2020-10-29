<template>
  <div class="WholeMore">
    {{ moreText }}
    <img src="~assets/img/search/yjt.svg" alt="" />
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
  name: "WholeMore",
};
</script>
<style scoped>
.WholeMore {
  width: 100%;
  height: 1.065246rem;
  font-size: 0.372836rem;
  line-height: 1.065246rem;
  text-align: center;
}
img {
  position: relative;
  top: 0.079893rem;
}
</style>