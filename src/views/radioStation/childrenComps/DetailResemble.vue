<template>
  <div class="DetailResemble">
    <div
      class="item"
      @click="toAudio(item.id)"
      v-for="(item, index) in audioList"
      :key="index"
    >
      <div class="left">
        <img :src="item.picUrl" alt="" />
      </div>
      <div class="center">
        <div class="box">
          <div class="title">{{ item.name }}</div>
          <div class="text">{{ item.rcmdtext }}</div>
          <div class="count">
            {{
              item.programCount == 0
                ? "最新上架，"
                : "节目：" + item.programCount + "，"
            }}
            {{ "订阅：" + item.subCount }}
          </div>
        </div>
      </div>
      <div class="right">
        <div class="btn">
          <i class="iconfont icon-dingyue"></i>
          订阅
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDjHot } from "network/radioStation";

export default {
  name: "DetailResemble",
  data() {
    return {
      audioList: [], // 热门电台
    };
  },
  methods: {
    getDj() {
      getDjHot(15, this.$store.state.hotOffset * 15).then((res) => {
        for (const item of res.data.djRadios) {
          this.audioList.push({
            id: item.id,
            name: item.name,
            rcmdtext: item.rcmdtext,
            picUrl: item.picUrl,
            subCount: item.subCount,
            nickname: item.dj.nickname,
            programCount: item.programCount,
          });
        }
        this.$store.state.hotOffset++;
      });
    },

    // 路由跳转
    toAudio(id) {
      this.$router.replace("/stationDetail/" + id);
      this.audioList = [];
      this.getDj();
      this.$emit("refresh");
    },
  },
  beforeRouteUpdate(to, from, next) {
    if (to.fullPath != from.fullPath) {
      this.audioList = []; // 清空mv数据
      next();
      this.getDj();
    }
  },
  created() {
    this.getDj();
  },
};
</script>
<style scoped>
.DetailResemble {
  width: 100%;
}
.item {
  width: 100%;
  height: 2.130493rem;
  display: flex;
  margin-bottom: .213333rem;
}
.left {
  flex: 2;
}
.center {
  flex: 5;
  display: flex;
  align-items: center;
}
.right {
  flex: 1.5;
  display: flex;
  align-items: center;
}
.left img {
  width: 100%;
  height: 100%;
  border-radius: .133333rem;
  overflow: hidden;
}
.box{
  margin-left: .213333rem;
}
.title {
  width: 4.793609rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: .4rem;
  margin-bottom: .16rem;
}
.text {
  width: 4.793609rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: .32rem;
  color: #838282;
  margin-bottom: .106667rem;
}
.count {
  width: 5.326232rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: .32rem;
  color: #838282;
}
.btn {
  width: 100%;
  height: .64rem;
  display: flex;
  align-items: center;
  color: var(--red);
  font-size: .32rem;
  border-radius: .666667rem;
  border: 1.5px solid var(--red);
  justify-content: center;
}
.btn .iconfont {
  margin-right: .106667rem;
}
</style>