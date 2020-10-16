<template>
  <div
    class="DetailPlay"
    v-if="detail !== {}"
    :style="{ background: 'url(' + detail.blurCoverUrl + ')', backgroundSize: size}"
  >
    <div class="content">
      <menu-nav
        class="nav"
        :navTitle="navTitle"
        :showWriteImg="true"
        :showBlackImg="false"
        :rightImg="true"
        @openSub="openSub"
      ></menu-nav>
      <div class="bbox">
        <transition name="logo" mode="out-in">
          <div class="logo" @click="toggleLogo" v-show="showLogo">
            <img :src="detail.coverUrl" alt="" />
          </div>
        </transition>
        <transition name="detail" mode="out-in">
            <div class="detail" @click="toggleDetail" v-show="showDetail">
              <div class="topbox" v-if="detail.radio">
                <div class="contentAudio">
                  <div class="top">来自电台</div>
                  <div class="bottom">
                    <div class="box1">
                      <img :src="detail.coverUrl" alt="" />
                    </div>
                    <div class="box2">
                      <div class="textBox">
                        <div class="name">{{ detail.radio.name }}</div>
                        <div class="sub">{{ detail.radio.subCount }}</div>
                      </div>
                    </div>
                    <div class="box3">
                      <div class="btn">
                        <img
                          src="~assets/img/radioStation/Detail/xing2.svg"
                          alt=""
                        />
                        订阅
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="title" v-if="detail.radio">
                <div class="tag">{{ detail.radio.category }}</div>
                <div class="serialNum">
                  {{ navTitle }} Vol.{{ detail.serialNum }}
                </div>
              </div>
              <div class="addTime" v-if="detail.radio">
                {{ detail.createTime | getTime }}创建 播放{{
                  detail.listenerCount
                }}次
              </div>
              <div class="desc" v-if="detail.radio">
                {{ detail.radio.desc }}
              </div>
            </div>
        </transition>
      </div>
      <div class="nav">
        <div class="PlaySongNav">
          <div class="navitem">
            <img src="~assets/img/playSong/xinaixin.svg" alt="" />
          </div>
          <div class="navitem">
            <img src="~assets/img/playSong/xiazai.svg" alt="" />
          </div>
          <div class="navitem">
            <img src="~assets/img/playSong/changge.svg" alt="" />
          </div>
          <div class="navitem" @click="isShowComment">
            <img src="~assets/img/playSong/pinglun.svg" alt="" />
          </div>
          <div class="navitem">
            <img src="~assets/img/playSong/gengduo.svg" alt="" />
          </div>
        </div>
      </div>
      <!-- 进度条 -->
      <div class="playbox">
        <div class="start">
          {{ minT > 9 ? minT : "0" + minT }}:{{
            secondT > 9 ? secondT : "0" + secondT
          }}
        </div>
        <div class="PlaySongTime">
          <van-slider
            class="box"
            v-model="value"
            active-color="#ee0a24"
            bar-height="3px"
            inactive-color="#cdcdcd"
            @change="onChange"
          >
            <template #button>
              <div class="custom-button"></div>
            </template>
          </van-slider>
        </div>
        <div class="end">{{ songLength }}</div>
      </div>
      <bnav ref="bnav" class="bnav" @playBtn="playBtn"></bnav>
      <audio ref="playAudio" id="audio" :src="audioSrc"></audio>
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
      />
      <transition>
        <comment
          :audioId="detail.id"
          v-if="ShowComment"
          @toback="toback"
        ></comment>
      </transition>
    </div>
  </div>
</template>

<script>
import menuNav from "components/context/menuNav/MenuNav"; // 导航栏
import bnav from "components/common/playSong/childrenComps/PlaySongBnav"; // 底部按钮
import comment from "./audioPlayComment";

import { getDetail, getCommentAudio } from "network/radioStation";
import { playSong } from "network/playSong";
import { durationTime } from "common/common";

export default {
  name: "DetailPlay",
  data() {
    return {
      navTitle: "",
      detail: {}, // 电台数据
      value: 0,
      songLength: 0, // 歌曲长度
      minT: 0,
      secondT: 0,
      audioSrc: "", // 节目url
      isPlay: 0, // 是否播放电台
      duration: 0, // 节目时长
      timer: null, // 定时器
      audioDom: null, // 播放器dom
      showShare: false, // 显示/隐藏分享面板
      options: [
        // 分享面板
        [
          { name: "微信", icon: "wechat" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
        ],
      ],
      ShowComment: false, // 评论面板
      showLogo: true, // 显示/隐藏封面
      showDetail: false, // 显示/隐藏节目信息
      size: '9.986684rem 17.762983rem'
    };
  },
  components: {
    menuNav,
    bnav,
    comment,
  },
  methods: {
    toggleLogo() {
      this.showLogo = false;
      this.showDetail = true;
    },

    toggleDetail() {
      this.showLogo = true;
      this.showDetail = false;
    },

    toback() {
      this.ShowComment = false;
    },

    openSub() {
      this.showShare = true;
    },

    isShowComment() {
      this.ShowComment = true;
    },

    // 监听进度条拖动
    onChange(value) {
      value <= 100 ? this.$refs.bnav.playingImg() : this.$refs.bnav.endImg();
      this.audioDom.pause();
      this.audioDom.currentTime = value / (100 / this.audioDom.duration);
      this.minT = Math.floor(this.audioDom.currentTime / 60); // 计算出分钟数
      this.secondT = (this.audioDom.currentTime % 60).toFixed(0); // 计算秒数
      this.audioDom.play();
      clearInterval(this.timer); // 清除定时器 防止多个定时器多开
      this.timer = setInterval(this.playAudio, 1000); // 更新时间
      this.isPlay = 1;
    },

    // 播放按钮
    playBtn() {
      if (this.isPlay === 0) {
        this.audioDom.play(); // 播放
        this.isPlay = 1;
        this.$refs.bnav.playingImg()
        this.timer = setInterval(this.playAudio, 1000); // 更新时间
        // 重新播放
        if (this.value >= 100) {
          // 清空各项数据
          this.value = 0;
          this.minT = 0;
          this.secondT = 0;
          this.audioDom.currentTime = 0;
          clearInterval(this.timer);
          this.timer = setInterval(this.playAudio, 1000); // 更新时间
        }
      } else {
        clearInterval(this.timer); // 清除定时器
        this.$refs.bnav.endImg()
        this.audioDom.pause(); // 暂停
        this.isPlay = 0;
      }
    },

    // 时间跟随
    playAudio() {
      let time = 100 / this.audioDom.duration; // 计算比例
      this.value += time; // 时间累加
      if (this.value >= 100) {
        this.$refs.bnav.endImg(); // 切换图标
        clearInterval(this.timer);
      }
      this.secondT++;
      if (this.secondT > 59) {
        this.minT++;
        this.secondT = 0;
      }
    },
  },
  created() {
    getDetail(this.$route.params.id).then((res) => {
      let path = res.data.program;
      this.detail.blurCoverUrl = path.blurCoverUrl; // 背景图片
      this.detail.coverUrl = path.coverUrl; // 电台封面
      this.navTitle = path.name; // 节目名称
      this.duration = path.duration;
      this.detail.duration = durationTime(path.duration); // 节目时长
      this.detail.commentCount = path.commentCount; // 评论数
      this.detail.serialNum = path.serialNum; // 排行
      this.detail.createTime = path.createTime; // 节目发布时间
      (this.detail.listenerCount = path.listenerCount), // 播放次数
        (this.detail.radio = {
          category: path.radio.category, // 电台所在分类
          desc: path.radio.desc, // 节目简介
          name: path.radio.name, // 电台名称
          subCount: path.radio.subCount + "人订阅", // 订阅人数
        }),
        (this.detail.id = path.mainSong.id); // 节目id
      this.songLength = this.detail.duration;
      // 获取url
      playSong(this.detail.id).then((res) => {
        this.audioSrc = res.data.data[0].url;
      });
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.audioDom = document.getElementById("audio");
    });
  },
};
</script>
<style scoped>
/* .logo-enter {
  opacity: 0;
}
.logo-leave-to {
  opacity: 0;
}

.logo-enter-active,
.logo-leave-active {
  transition: 1.2s all ease-in-out;
}

.detail-enter {
  opacity: 0;
  position: absolute;
  top: 0;
}
.detail-leave-to {
  opacity: 0;
  position: absolute;
  top: 0;
}

.detail-enter-active,
.lyric-leave-active {
  transition: 0.8s all ease-in-out;
} */
.logo-enter{
  opacity: 1;
  position: absolute;
  z-index: -10;
  transform: translateX(-9.320905rem);
}
.logo-leave-to{
  opacity: 1;
  position: absolute;
  z-index: -10;
  transform: translateX(-9.320905rem);
}

.logo-enter-active,.logo-leave-active{
  transition: 0.8s all ease-in-out;
}

.detail-enter{
  position: absolute;
  z-index: -10;
  opacity: 1;
  transform: translateX(9.320905rem);
}
.detail-leave-to{
  position: absolute;
  z-index: 1;
  opacity: 1;
  transform: translateX(18.641811rem);
}

.detail-enter-active,.detail-leave-active{
  transition: 0.8s all ease-in-out;
}


.desc {
  font-size: 13px;
  color: #afafaf;
}
.addTime {
  margin: 0.479361rem 0 0.479361rem;
  color: #8b8b8b;
  font-size: 12px;
}
.title {
  width: 100%;
  margin-top: 0.479361rem;
  margin-bottom: 0.479361rem;
}
.title .tag {
  float: left;
  padding: 0 5px;
  font-size: 12px;
  color: #da231b;
  border: 1px solid #da231b;
  transform: scale(0.8);
}
.title .serialNum {
  font-size: 13px;
  margin-left: 5px;
  color: #fff;
}
.DetailPlay {
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  position: relative;
  z-index: 61;
  background-color: #fff;
}
.nav {
  color: #fff;
  /* background-color: #fff; */
  background-color: transparent;
  font-size: 14px !important;
}
.content {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
}
.bbox {
  width: 100%;
  height: 11.984021rem;
}
.detail {
  width: 100%;
  padding: 15px;
  position: absolute;
  top: 1.171771rem;
}
.topbox {
  width: 100%;
  height: 2.663116rem;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.137);
}
.contentAudio {
  width: 100%;
  height: 100%;
  padding: 12px;
}
.top {
  font-size: 16px;
  color: #fff;
  height: 25%;
}
.bottom {
  width: 100%;
  height: 70%;
  margin-top: 2%;
  display: flex;
}
.box1 {
  flex: 2;
}
.box1 img {
  width: 1.278296rem;
  height: 1.278296rem;
  margin-top: 0.106525rem;
  border-radius: 10px;
}
.box2 {
  flex: 6;
  display: flex;
  align-items: center;
}
.box3 {
  flex: 2;
  display: flex;
  align-items: center;
}
.btn {
  width: 100%;
  height: 25px;
  line-height: 25px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  border-radius: 25px;
  background-color: #da231b;
}
.btn img {
  margin-top: 4px;
  position: relative;
  left: 0.213049rem;
  float: left;
}
.textBox {
  width: 100%;
}
.name {
  width: 5.05992rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: #fff;
}
.sub {
  width: 100%;
  height: 0.45273rem;
  line-height: 0.45273rem;
  font-size: 12px;
  color: #8b8b8b;
}
.logo {
  width: 7.190413rem;
  height: 7.190413rem;
  border-radius: 8px;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;
  top: 2.583222rem;
}
.logo img {
  width: 100%;
  height: 100%;
}
.PlaySongNav {
  display: flex;
}
.navitem {
  flex: 1;
  text-align: center;
}
.navitem img {
  width: 0.612517rem;
  height: 0.612517rem;
}
.playbox {
  height: 0.798935rem;
  display: flex;
  margin-top: 6px;
  color: #fff;
}
.start {
  font-size: 10px;
  line-height: 40px;
  text-align: center;
  flex: 1;
}
.end {
  font-size: 10px;
  line-height: 40px;
  text-align: center;
  flex: 1;
}
.time {
  float: right;
}
.PlaySongTime {
  height: 40px;
  flex: 6;
}
.box {
  position: relative;
  top: 18px;
  float: left;
}
.custom-button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  color: #fff;
  background-color: #ee0a24;
}
.bnav {
  height: 2.663116rem;
  background-color: transparent;
}
.v-enter {
  opacity: 0;
  /* 进来的时候从右 */
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  /* 离开的时候向左 */
  transform: translateX(-100%);
  position: absolute;
}

/* 动画执行期间 */
.v-enter-active,
.v-leave-active {
  position: absolute;
  /* 添加动画效果 */
  transition: all 0.2s linear;
}
</style>