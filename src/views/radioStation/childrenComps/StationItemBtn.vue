<template>
  <div class="StationItemBtn">
    <div class="item" @click="classify">
      <div class="itemImg">
        <i class="iconfont icon-feilei"></i>
      </div>
      <div>电台分类</div>
    </div>
    <div class="item" @click="ranking">
      <div class="itemImg">
        <i class="iconfont icon-paihang"></i>
      </div>
      <div>电台排行</div>
    </div>
    <div class="item" @click="buyAudio">
      <div class="itemImg">
        <i class="iconfont icon-jingpin"></i>
      </div>
      <div>付费精品</div>
    </div>
    <div class="item">
      <div class="itemImg">
        <i class="iconfont icon-juchang"></i>
      </div>
      <div>声之剧场</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "StationItemBtn",
  methods: {
    classify() {
      this.$emit("toClassify");
    },

    ranking() {
      this.$emit("toRanking");
    },

    buyAudio() {
      this.$router.push("/classifyInfo/" + 0);
    },
  },
};
</script>
<style scoped>
.StationItemBtn {
  width: 100%;
  height: 2.266667rem;
  background-color: #fff;
  display: flex;
}
.item {
  flex: 1;
  text-align: center;
  font-size: .32rem;
}
.itemImg {
  margin: .133333rem auto;
  width: 1.066667rem;
  height: 1.066667rem;
  border-radius: 50%;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
}
.itemImg .iconfont{
  color: #Fff;
  font-size: .426667rem;
}
</style>