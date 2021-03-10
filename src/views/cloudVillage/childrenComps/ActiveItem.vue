<template>
  <div class="ActiveItem">
    <div class="activeTopBox">
      <div class="topBoxImg">
        <img :src="itemDetail.user.avatarUrl" alt="" />
      </div>
      <div class="topBoxDetail">
        <div class="userDetail">
          <div class="usesInfo">
            <span style="color: #1a60c9">{{ itemDetail.user.nickname }}</span>
            分享单曲：
          </div>
          <div class="pushTime">{{ itemDetail.eventTime | getPushTime }}</div>
        </div>
      </div>
    </div>
    <div class="bottomBoxDetail">
      <div class="leftBox"></div>
      <div class="rightBox">
        <div class="infoText" v-html="activeInfo"></div>
        <div v-if="pics.length == 1" class="onePicBox">
          <img
            class="borderImg oneImg"
            style="min-width: 2.933333rem"
            :src="pics[0].originUrl"
            alt=""
          />
        </div>
        <div
          class="imgContainer"
          style="border-radius: 0.213333rem; overflow: hidden"
          v-else-if="pics.length > 1"
        >
          <div class="imgItem" v-for="(item, index) in pics" :key="index">
            <img
              style="min-width: 4rem; min-height: 4rem"
              :src="item.squareUrl"
              alt=""
            />
          </div>
        </div>
        <!-- 动态歌曲 -->
        <div v-if="song" class="song">
          <div @click="toPlay()" class="songDetail">
            <div class="songImg">
              <img :src="song.img80x80 ? song.img80x80 : song.album.img80x80 " alt="" />
            </div>
            <div class="songName">
              <div class="centerbox">
                <div class="songTitle">
                  {{ song.album.name }}
                </div>
                <div class="singer">
                  <span v-for="(singer, index) in song.artists" :key="index">{{
                    singer.name
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 动态视频 -->
        <div
          @click="toVideo()"
          v-else-if="video"
          class="video"
        >
          <div class="hasVideo" v-if="video.videoStatus != -1">
            <div class="mask">
              <i class="iconfont icon-bofang2"></i>
              <div class="videoDetial">
                <div class="time">{{ video.duration | videoTime }}</div>
                <div class="count">{{ videoPlayCount }}</div>
              </div>
            </div>
            <div class="img">
              <img :src="video.coverUrl" alt="" />
            </div>
          </div>
          <div v-else class="noVideo">
            <div class="imgBox">
              <img src="https://img.coolcr.cn/2021/03/08/6abbffab46ef6.png" alt="">
            </div>
          </div>
        </div>
        <!-- 动态详情 -->
        <div class="activeTab">
          <div class="activeTabItem">
            <i class="iconfont icon-fenxiang"></i>
            <span>{{
              itemDetail.info.shareCount == 0
                ? "分享"
                : itemDetail.info.shareCount
            }}</span>
          </div>
          <div class="activeTabItem">
            <i class="iconfont icon-pinglun"></i>
            <span>{{
              itemDetail.info.commentCount == 0
                ? "评论"
                : itemDetail.info.commentCount
            }}</span>
          </div>
          <div class="activeTabItem">
            <i class="iconfont icon-zan"></i>
            <span>{{
              itemDetail.info.likedCount == 0
                ? "点赞"
                : itemDetail.info.likedCount
            }}</span>
          </div>
        </div>
        <div style="clear: both"></div>
      </div>
      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script>
import "assets/icon/RadioStation.css"; // 字体图标
import { toStringNum } from "common/common";
export default {
  name: "ActiveItem",
  props: {
    itemDetail: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      activeInfo: "",
      pics: [], // 动态图片
      song: null, // 动态歌曲
      video: null, // 动态视频
      videoPlayCount: 0,
    };
  },
  filters: {
    getPushTime(value) {
      // 获取年份
      let dt = new Date(value);
      const y = dt.getFullYear(); // 获取年份
      const m = (dt.getMonth() + 1 + "").padStart(2, "0"); // 获取月份
      const d = (dt.getDate() + "").padStart(2, "0"); // 获取日期
      const h = (dt.getHours() + "").padStart(2, "0");
      const mi = (dt.getMinutes() + "").padStart(2, "0");
      const s = (dt.getSeconds() + "").padStart(2, "0");
      return `${y}-${m}-${d} ${h}:${mi}:${s}`;
    },

    videoTime(time) {
      // 获取时间
      let min = (Math.floor(time / 60) + "").padStart(2, "0"); // 分钟
      let second = (time - 60 * min + "").padStart(2, "0"); // 秒数
      return min + ":" + second;
    },
  },
  mounted() {
    let info = JSON.parse(this.itemDetail.json); // 编译json数据格式
    this.pics = this.itemDetail.pics;
    this.activeInfo = this.infoText(info.msg); // 对文本进行修改
    if (info.song) {
      this.song = info.song;
      console.log(this.song);
    } else if (info.video) {
      this.video = info.video;
      this.videoPlayCount = toStringNum(this.video.playTime);
    }
  },
  methods: {
    infoText(value) {
      let text = value.replace(/\r\n|\n|\r/g, "</br>"); // 匹配回车符
      let text2 = text.replace(/#/, '<span style="color: #1a60c9">#'); // 匹配#号
      text =
        text2.substring(0, text2.lastIndexOf("#")) +
        "#</span>" +
        text2.substring(text2.lastIndexOf("#") + 1);
      return text;
    },

    toPlay() {
      this.$router.push("/playSong/" + this.song.id);
    },

    toVideo() {
      this.$router.push("/mvplay/" + this.video.videoId + "&" + false);
    },
  },
};
</script>
<style scoped>
.activeTitleColor {
  color: #1a60c9 !important;
}
.borderImg {
  border-radius: 0.133333rem;
}
.onePicBox {
  width: 60%;
  height: 6.666667rem;
  overflow: hidden;
  border-radius: 0.213333rem;
  position: relative;
}
.oneImg {
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.ActiveItem {
  width: 100%;
  margin-bottom: 0.32rem;
  padding-bottom: 0.213333rem;
  border-bottom: 1px solid #e0e0e0;
}
.activeTopBox {
  height: 0.933333rem;
  width: 100%;
}
.topBoxImg {
  width: 13%;
  height: 100%;
  float: left;
}
.topBoxImg img {
  height: 100%;
  border-radius: 50%;
}
.topBoxDetail {
  width: 87%;
  height: 100%;
  float: right;
  display: flex;
  align-items: center;
}
.usesInfo {
  font-size: 0.32rem;
  color: var(--fontColor);
  min-height: 0.4rem;
}
.pushTime {
  font-size: 12px;
  height: 0.4rem !important;
  color: var(--fontColor);
  display: flex;
  align-items: center;
}
.bottomBoxDetail {
  width: 100%;
  margin-top: .133333rem;
}
.leftBox {
  width: 13%;
  height: 100%;
  float: left;
}
.rightBox {
  width: 87%;
  height: 100%;
  float: right;
}
.activeTile {
  font-size: 0.32rem;
}
.infoText {
  font-size: 0.32rem;
  color: #000;
  line-height: 0.453333rem;
  margin-bottom: 0.186667rem;
}
.activePics {
  width: 100%;
  height: auto;
}
.activePics img {
  width: 33%;
  height: 2.666667rem;
  float: left;
  margin-right: 0.32%;
  margin-bottom: 0.6%;
}
.song {
  width: 100%;
  height: 1.066667rem;
  border-radius: 0.213333rem;
  background-color: rgb(243, 243, 243);
  margin-top: 0.213333rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.songDetail {
  width: 95%;
  height: 80%;
}
.songImg {
  width: 15%;
  height: 100%;
  float: left;
}
.songImg img {
  height: 100%;
  border-radius: 0.213333rem;
}
.songName {
  width: 85%;
  height: 100%;
  float: right;
  /* 4rem */
}
.centerbox {
  margin-top: 0.08rem;
}
.songTitle {
  font-size: 0.32rem;
  width: 100%;
  min-width: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.singer {
  font-size: 12px;
}
.imgContainer {
  width: 100%;
}
.imgItem {
  width: 32%;
  height: 2.666667rem;
  margin-bottom: 1%;
  margin-left: 1%;
  float: left;
  position: relative;
  overflow: hidden;
}
.imgItem img {
  width: 100%;
  position: absolute;
  left: -50%;
  top: -50%;
  transform: translate(20%, 20%);
}
.video {
  width: 100%;
  height: 3.6rem;
  border-radius: 0.213333rem;
  overflow: hidden;
  position: relative;
}
.noVideo {
  width: 100%;
  height: 3.6rem;
  border-radius: 0.213333rem;
  
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.noVideo::before{
  content: '';
  width: 100%;
  height: 100%;
  filter: blur(7px);
  position: absolute;
  background-color: rgb(216, 216, 216);
}
.imgBox{
  width: 50%;
  position: relative;
  z-index: 5;
}
.noVideo img{
  width: 100%;
}
.video .img {
  position: relative;
  width: 100%;
  height: 100%;
}
.video .img img {
  width: 100%;
  position: absolute;
  top: -13%;
}
.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.411);
}
.mask .icon-bofang2 {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.753);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.videoDetial {
  width: 100%;
  height: 0.533333rem;
  position: absolute;
  bottom: 0;
  display: flex;
  padding: 0 0.213333rem;
}
.time {
  flex: 1;
  color: #fff;
  font-size: 0.32rem;
  display: flex;
  align-items: center;
}
.count {
  flex: 1;
  color: #fff;
  font-size: 0.32rem;
  text-align: end;
  line-height: 0.533333rem;
  text-indent: -0.213333rem;
}
.activeTab {
  height: 0.666667rem;
  display: flex;
  margin-top: 0.186667rem;
}
.activeTabItem {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.activeTabItem .iconfont {
  font-size: 0.32rem;
}
.activeTabItem span {
  font-size: 0.32rem;
  margin-left: 0.133333rem;
  color: var(--fontColor);
}
</style>