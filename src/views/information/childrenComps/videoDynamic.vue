<template>
  <div class="videoDynamic">
    <div class="left">
      <div class="useImg">
        <img :src="userImg" alt="" />
      </div>
    </div>
    <div class="right">
      <div class="title">
        <span>{{ nickName }} </span>分享视频:
      </div>
      <div class="time">{{ time | getTime }}</div>
      <div class="content" v-if="events.msg !== ''">{{ events.msg }}</div>
      <div class="video" v-if="events.video.videoId !== ''">
        <div class="logo">
          <img :src="events.video.coverUrl" alt="" />
        </div>
        <div class="box" @click="toPlay(events.video.videoId)">
          <div class="play">
            <i class="iconfont icon-bofang"></i>
          </div>
          <div class="playDetail">
            <div class="detailLeft">
              <span>{{ playCount }}</span>
            </div>
            <div class="detailRight">
              <div class="rightdetail">
                <span>{{ timeMV }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="novideo" v-else>该视频已删除</div>
      <events-count
        @sComment='sComment'
        :commentLength="commentLength"
        :likedCount="likedCount"
        :shareCount="shareCount"
      ></events-count>
    </div>
  </div>
</template>

<script>
import { toStringNum, durationTime } from "common/common";
import eventsCount from "./eventsCount"; // 底部动态数据

export default {
  props: [
    "events",
    "userImg",
    "nickName",
    "time",
    "commentLength",
    "likedCount",
    "shareCount",
    "threadId"
  ],
  name: "videoDynamic",
  data() {
    return {
      playCount: 0,
      timeMV: 0,
    };
  },
  components: {
    eventsCount,
  },
  methods: {
    toPlay(id) {
      //   this.$router.push('/mvplay/' + id)
    },

    sComment() {
      this.$store.state.commentId = this.threadId;
    },
  },
  created() {
    setTimeout(() => {
      if (this.events.video.videoStatus !== -1) {
      this.playCount = toStringNum(this.events.video.playTime);
      this.timeMV =
        (this.events.video.duration / 60 <= 9
          ? "0" + Math.floor(this.events.video.duration / 60)
          : Math.floor(this.events.video.duration / 60)) +
        ":" +
        (this.events.video.duration % 60 <= 9
          ? "0" + Math.floor(this.events.video.duration % 60)
          : Math.floor(this.events.video.duration % 60)
        ).toFixed(0);
    }
    })
  },
};
</script>
<style scoped>
.videoDynamic {
  width: 100%;
  display: flex;
  padding-bottom: 0.399467rem;
  margin-top: 0.399467rem;
  border-bottom: 1px solid #e6e6e6;
}
.left {
  flex: 1.5;
}
.useImg {
  width: 1.065246rem;
  height: 1.065246rem;
  border-radius: 50%;
  overflow: hidden;
}
.useImg img {
  width: 100%;
  height: 100%;
}
.right {
  flex: 8.5;
}
.title {
  font-size: 0.399467rem;
  color: #000;
}
.title span {
  font-size: 0.399467rem;
  color: rgb(34, 110, 197);
}
.time {
  font-size: 0.346205rem;
  color: rgb(158, 158, 158);
}
.content {
  font-size: 15px;
  margin-top: 0.213049rem;
}
.video {
  width: 100%;
  height: 3.994674rem;
  margin-top: 0.213049rem;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}
.novideo {
  width: 100%;
  height: 1.065246rem;
  margin-top: 0.213049rem;
  line-height: 1.065246rem;
  text-align: center;
  border-radius: 0.213049rem;
  background-color: #f1f0f0;
  color: rgb(170, 170, 170);
  font-size: 0.372836rem;
}
.logo {
  width: 100%;
  height: 100%;
  position: absolute;
}
.logo img {
  width: 100%;
  height: 100%;
}
.box {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
}
.playDetail {
  width: 100%;
  height: 0.532623rem;
  position: absolute;
  bottom: 0;
  color: #fff;
  font-size: 0.372836rem;
  display: flex;
}
.play {
  margin: auto;
}
.play .iconfont {
  font-size: 1.066667rem;
  color: #Fff;
}
.detailLeft {
  flex: 1;
  line-height: 0.532623rem;
  text-indent: 0.213049rem;
  float: left;
}
.detailRight {
  flex: 1;
  line-height: 0.532623rem;
  text-indent: 0.213049rem;
}
.rightdetail {
  float: right;
}
.rightdetail img {
  width: 0.372836rem;
  margin-right: 0.133156rem;
}
.rightdetail span {
  margin-right: 0.213049rem;
}
</style>