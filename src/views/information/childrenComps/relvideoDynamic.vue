<template>
  <div class="relvideoDynamic">
    <div class="left">
      <div class="useImg">
        <img :src="userImg" alt="" />
      </div>
    </div>
    <div class="right">
      <div class="title">
        <span>{{ nickName }} </span>发布视频:
      </div>
      <div class="time">{{ time | getTime }}</div>
      <div class="content" v-if="events.msg !== ''">{{ events.msg }}</div>
      <div class="video">
        <div class="logo">
          <img :src="events.video.coverUrl" alt="" />
        </div>
        <div class="box" @click="toPlay(events.video.videoId)">
          <div class="play">
            <img src="~assets/img/information/events/bofang.svg" alt="" />
          </div>
          <div class="playDetail">
            <div class="detailLeft">
              <span>{{'▷ '+ playCount }}</span>
            </div>
            <div class="detailRight">
              <div class="rightdetail">
                <img src="~assets/img/information/events/durtaion.svg" alt="" />
                <span>{{ timeMV }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <events-count
        :commentLength="commentLength"
        :likedCount="likedCount"
        :shareCount="shareCount"
      ></events-count>
    </div>
  </div>
</template>

<script>
import eventsCount from './eventsCount'  // 底部动态数据
import { toStringNum,durationTime } from "common/common";
export default {
  props: [
    "events",
    "userImg",
    "nickName",
    "time",
    "commentLength",
    "likedCount",
    "shareCount",
  ],
  data() {
    return {
      playCount: 0,
      timeMV: 0,
    };
  },
  name: "relvideoDynamic",
  components: {
      eventsCount
  },
  created () {
    this.playCount = toStringNum(this.events.video.playTime);
    this.timeMV = 
    (this.events.video.duration / 60 <= 9 ? '0' + Math.floor(this.events.video.duration / 60) : Math.floor(this.events.video.duration / 60))
     + ':' + 
    (this.events.video.duration % 60 <= 9 ? '0'+ Math.floor(this.events.video.duration % 60) : Math.floor(this.events.video.duration % 60))
  }
};
</script>
<style scoped>
.relvideoDynamic {
  width: 100%;
  display: flex;
  padding-bottom: 0.399467rem;
  border-bottom: 1px solid #e6e6e6;
  margin-top: 0.399467rem;
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
  z-index: 10;
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
.play img {
  width: 0.798935rem;
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
.rightdetail{
    float: right;
}
.rightdetail img{
    width: .372836rem;
    margin-right: .133156rem;
}
.rightdetail span{
    margin-right: 0.213049rem;
}
</style>