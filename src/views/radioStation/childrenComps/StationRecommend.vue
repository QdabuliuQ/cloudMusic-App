<template>
  <div class="StationRecommend">
    <div class="head" @click="toClassifyView">
      <h2>{{ classifyName }}</h2>
      <i class="iconfont icon-gengduo"></i>
    </div>
    <perfered-item
      :recommendAudio="stationItem"
      :showTag="false"
      :showCreator="true"
    ></perfered-item>
  </div>
</template>

<script>
import perferedItem from "./StationItem"; // 电台推荐组件
import { getRecommend } from "network/radioStation"; // 网络请求

export default {
  name: "StationRecommend",
  props: ["classifyName", "classifyId"],
  data() {
    return {
      stationItem: [], // 分类模块数据
    };
  },
  components: {
    perferedItem,
  },
  methods: {
    toClassifyView() {
      this.$router.push("/classifyInfo/" + this.classifyId);
    },
  },
  created() {
    // 获取分类电台部分数据
    getRecommend(this.classifyId).then((res) => {
      for (let i = 0; i < 3; i++) {
        this.stationItem.push({
          picUrl: res.data.djRadios[i].picUrl,
          name: res.data.djRadios[i].name,
          desc: res.data.djRadios[i].desc,
          rcmdtext: res.data.djRadios[i].rcmdtext,
          id: res.data.djRadios[i].id,
        });
      }
    });
  },
};
</script>
<style scoped>
.StationRecommend {
  margin-bottom: .4rem;
}
.head h2 {
  font-size: .426667rem;
  float: left;
  font-weight: 440;
}
.head .more {
  width: 1.866667rem;
  text-align: center;
  border-radius: .533333rem;
  line-height: .48rem;
  height: .533333rem;
  font-size: .32rem;
  border: 1px solid #cdccdd;
  position: absolute;
  right: 0;
  top: -0.053333rem;
}
.head {
  width: 100%;
  height: .693333rem;
  position: relative;
  margin-bottom: .133333rem;
  display: flex;
  align-items: center;
}
.head .iconfont {
  margin-left: .133333rem;
}
</style>