<template>
  <div class="Mv">
    <mvitem v-if="mvList.length !== 0" :vedioList="mvList"></mvitem>
    <div class="noMv" v-else>
      暂时还没有MV哦
    </div>
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
.noMv{
  width: 100%;
  min-height: 6.65779rem;
  text-align: center;
  line-height: 6.65779rem;
  font-size: .505992rem;
  color: rgb(141, 139, 139);
}
</style>