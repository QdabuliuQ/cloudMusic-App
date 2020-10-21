<template>
  <div class="Mv">
    <mvitem :vedioList="mvList"></mvitem>
  </div>
</template>

<script>
import mvitem from "./MvItem";
import { getSingerMv } from "network/singer";
import { toStringNum,durationTime } from "common/common";

export default {
  props: ["artistId"],
  name: "Mv",
  data() {
    return {
      mvList: [],
    };
  },
  components: {
    mvitem,
  },
  created() {
    getSingerMv(this.artistId).then((res) => {
      console.log(res);
      for (const item of res.data.mvs) {
        this.mvList.push({
          id: item.id, // id
          name: item.name, // 名称
          duration: durationTime(item.duration), // 时长
          playCount: toStringNum(item.playCount), // 播放量
          publishTime: item.publishTime, // 发布时间
          imgurl16v9: item.imgurl16v9, // 封面
        });
      }
    });
  },
};
</script>
<style scoped>
.Mv {
  width: 100%;
  margin-bottom: 45px;
  background-color: #fff;
  min-height: 7.856192rem;
  position: relative;
  z-index: -1;
}
</style>