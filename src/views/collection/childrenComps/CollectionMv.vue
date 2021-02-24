<template>
  <div class="CollectionMv">
    <div
      class="videoItem"
      @click="toMv(item.vid, item.type)"
      v-for="(item, index) in videoList"
      :key="index"
    >
      <div class="vleft">
        <img :src="item.coverUrl" alt="" />
        <div class="count">▷ {{ item.playTime }}</div>
      </div>
      <div class="vright">
        <div class="vbox">
          <div class="vtitle">{{ item.title }}</div>
          <div class="videoDetail">
            {{ item.durationms + " by " }}{{ item.creator }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getVideo } from "network/collection";
import { toStringNum, durationTime } from "common/common";
export default {
  name: "CollectionMv",
  data() {
    return {
      videoList: [],
    };
  },
  methods: {
    toMv(id, type) {
      if (type === 0) {
        this.$router.push("/mvplay/" + id + "&" + true);
      } else {
        this.$router.push("/mvplay/" + id + "&" + false);  
      }
    },
  },
  created() {
    this.$loading.loadingShow();
    getVideo(this.$store.state.cookie).then((res) => {
      for (const item of res.data.data) {
        this.videoList.push({
          vid: item.vid,
          coverUrl: item.coverUrl,
          title: item.title,
          durationms: durationTime(item.durationms),
          playTime: toStringNum(item.playTime),
          creator: item.creator[0].userName,
          type: item.type, // 0为mv  1为视频
        });
      }
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.$loading.loadingNo();
    });
  },
};
</script>
<style scoped>
.CollectionMv {
  width: 100%;
}
.videoItem {
  display: flex;
  height: 1.997337rem;
  margin-bottom: .266312rem;
}
.vleft {
  flex: 4;
  position: relative;
}
.count {
  position: absolute;
  right: 0.319574rem;
  top: .106667rem;
  color: #fff;
  font-size: 0.319574rem;
}
.vleft img {
  width: 3.462051rem;
  height: 100%;
  border-radius: 0.133156rem;
}
.vright {
  flex: 6;
  display: flex;
  align-items: center;
}
.vtitle {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 0.346205rem;
  margin-bottom: .106667rem;
}
.videoDetail {
  font-size: 0.319574rem;
  color: #a7a7a8;
}
</style>