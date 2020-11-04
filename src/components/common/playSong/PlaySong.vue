<template>
  <div
    class="songbox"
    :style="{
      background: 'url(' + bgimg + ') no-repeat ',
      backgroundSize: size,
    }"
  >
    <div class="PlaySong">
      <sheet-topnav
        @fx="fx"
        :navTitle="navTitle"
        :rightImg="rightImg"
      ></sheet-topnav>
      <transition name="logo" mode="out-in">
        <div v-show="showLogo" @click="isShowLogo" class="logo">
          <div ref="guanp" class="guanp">
            <img class="img" src="~assets/img/playSong/gp3.png" alt="" />
            <div class="songImg">
              <img :src="bgimg" alt="" />
            </div>
          </div>
        </div>
      </transition>
      <transition name="lyric" mode="out-in">
        <lyric-list
          @click.native="isShowLyric"
          v-show="showLyric"
          :lyricText="lyricText"
          :songLyric="songLyric"
          :value="value"
          :songTime="songTime"
          :cTime="cTime"
          :indexLyric="indexLyric"
          class="lyric"
        ></lyric-list>
      </transition>
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
      <!-- 按钮组 -->
      <bnav ref="bnav" @playBtn="playBtn"></bnav>
    </div>
    <!-- 评论组件 -->
    <transition>
      <comment-list
        @toback="toback"
        v-show="showComment"
        :showComment="showComment"
      ></comment-list>
    </transition>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
  </div>
</template>

<script>
import sheetTopnav from "components/context/sheetNav/SheetTopNav"; // 导航栏
import Bnav from "./childrenComps/PlaySongBnav"; // 底部导航栏
import PlaysongTime from "./childrenComps/PlaySongTime"; // 进度条
import LyricList from "components/common/lyricList/LyricList"; // 歌词列表
import commentList from "components/common/commentList/CommentList";

import { getSongDetial } from "network/played"; // 获取歌曲基本信息
import { playSong, getlyric } from "network/playSong"; // 获取音乐url 歌词 评论

import mscroll from "components/common/muiScroll/MuiScroll";

export default {
  name: "PlaySong",
  data() {
    return {
      navTitle: "", // 歌曲标题
      rightImg: require("assets/img/playSong/fenxiang.svg"),
      id: "", // 音乐id
      bgimg: "", // 封面图
      songUrl: "", // 音乐url
      singer: "", // 歌手
      songLength: 0, // 音乐长度
      audioDom: "", // audio标签
      value: 0,
      timeS: null, // 定时器
      songTime: 0, // 音乐总秒数
      secondT: 0, // 左侧进度条秒数
      minT: 0, // 左侧进度条分钟数
      size: "200% 300%", // 背景图大小
      rotateLogo: null, // 控制封面旋转
      rotateDeg: 0, // 封面旋转定时器
      showLogo: true, // 显示/隐藏logo
      lyricText: [], // 保存歌词
      cTime: 0, // 歌曲实时秒数
      songLyric: [], // 歌曲时间戳
      showLyric: false, // 歌曲列表显示/隐藏
      indexLyric: 0,
      isPlayM: 0, // 是否播放了音乐
      timeNew: 0,
      showComment: false, // 显示隐藏评论组件
      showShare: false, // 分享面板
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
    };
  },
  components: {
    sheetTopnav,
    Bnav,
    PlaysongTime,
    LyricList,
    commentList,
  },
  methods: {
    // 分享面板
    fx() {
      this.showShare = true;
    },

    toback() {
      this.showComment = false;
    },

    isShowComment() {
      this.showComment = true;
    },

    // 监听播放器
    timeupdate(currentTime) {
      this.cTime = this.audioDom.currentTime;
    },

    isShowLogo() {
      this.showLogo = false;
      this.showLyric = true;
    },

    isShowLyric() {
      this.showLogo = true;
      this.showLyric = false;
    },

    // 播放/暂停音乐
    playBtn() {
      // 操作dom 播放音乐
      if (this.$store.state.playSong.playNow) {
        this.$store.state.playSong.isPlayEnd = true;  // 播放暂停
        this.$store.state.playSong.playNow = false; // 修改判断条件
        this.$store.state.navMusicDom.pause(); // 暂停
        this.$refs.bnav.endImg(); // 切换图标
        clearInterval(this.rotateLogo); // 暂停封面旋转
        clearInterval(this.timeS); // 暂停时间
        // 当歌曲完全播放结束后
        if (this.value >= 100) {
          this.$store.state.playSong.isPlayEnd = false; // 重新播放
          this.$store.state.playSong.playNow = false; // 修改判断条件
          this.$refs.guanp.style.transform = "rotate(0deg)"; // 封面旋转重置
          this.$store.state.navMusicDom.currentTime = 0; // 重置播放时间
          this.$refs.bnav.playingImg(); // 更换图标
          this.value = 0; // 清空进度条
          this.minT = 0; // 清空时间
          this.secondT = 0; // 清空时间
          clearInterval(this.time); // 防止多个定时器  清除定时器
          this.timeS = setInterval(this.setInPlay, 1000); // 计算时间
          this.$store.state.navMusicDom.play(); // 重新播放音乐
        }
        // 目前处于播放状态
      } else {
        this.$store.state.playSong.isPlayEnd = false;
        this.$store.state.playSong.playNow = true; // 修改判断条件
        this.$store.state.navMusicDom.play(); // 播放音乐
        this.$refs.bnav.playingImg(); // 更换图片
        clearInterval(this.rotateLogo); // 防止多个定时器  清除定时器
        this.rotateLogo = setInterval(this.rotate, 30); // 封面旋转
        clearInterval(this.time); // 防止多个定时器  清除定时器
        this.timeS = setInterval(this.setInPlay, 1000);
      }
    },

    // 封装封面旋转方法
    rotate() {
      this.rotateDeg += 1;
      // 修改 style 的 transform 属性
      if (this.$refs.guanp) {
        this.$refs.guanp.style.transform = "rotate(" + this.rotateDeg + "deg)";
      }
    },

    // 封装方法
    setInPlay() {
      // 进度条时间更新
      this.secondT++;
      if (this.secondT > 59) {
        this.minT++;
        this.secondT = 0;
      }
      this.isPlayM += 1;
      // 控制 value 增加进度条会移动
      // 100 / 获取歌曲总秒数 = 每秒增加的 value
      // 当 value 到 100 的时候 音乐也会播放完成
      this.value += 100 / this.songTime;
      // 当 value 到100表示播放结束
      if (this.value >= 100) {
        this.$store.state.playSong.playNow = true; // 修改判断条件
        this.$store.state.playSong.isPlayEnd = true;  // 播放结束
        clearInterval(this.timeS); // value等于100表示播放结束
        this.value = 100;
        this.$refs.bnav.endImg();
        clearInterval(this.rotateLogo);
        if (this.$refs.guanp !== undefined) {
          this.$refs.guanp.style.transform = "rotate(0deg)";
        }
      }
    },

    // 监听audio加载事件
    songLoad() {
      this.songTime = this.$store.state.navMusicDom.duration.toFixed(2); // 保存歌曲时间
      let time = this.$store.state.navMusicDom.duration;
      let min =
        Math.floor(this.songTime / 60).toFixed(0) > 10
          ? Math.floor(this.songTime / 60).toFixed(0)
          : "0" + Math.floor(this.songTime / 60).toFixed(0); // 分钟
      let second =
        this.songTime % 60 > 9
          ? this.songTime % 60
          : "0" + (this.songTime % 60); // 秒数
      let length = (min + ":" + second).slice(5);
      this.songLength = (min + ":" + second).replace(length, " ");
    },

    // 歌曲进度跳转
    onChange(value) {
      this.cTime = this.$store.state.navMusicDom.currentTime
      this.setTime(value); // 调用方法
    },

    // 设置歌曲时间
    setTime(value) {
      clearInterval(this.rotateLogo); // 清除重复定时器
      clearInterval(this.timeS);
      this.$refs.bnav.playingImg(); // 切换图标
      this.$store.state.navMusicDom.pause(); // 先暂停歌曲

      let timeAll = 100 / this.$store.state.navMusicDom.duration; // 计算一秒增加多少 value
      this.$store.state.navMusicDom.currentTime = value / timeAll; // 计算出拖动按钮后  歌曲对应播放的时间点
      this.minT = Math.floor(this.$store.state.navMusicDom.currentTime / 60); // 计算出分钟数
      this.secondT = (this.$store.state.navMusicDom.currentTime % 60).toFixed(
        0
      ); // 计算秒数
      this.cTime = this.$store.state.navMusicDom.currentTime; // 将拖到后的秒数保存传递给 歌单滚动 组件
      this.$store.state.navMusicDom.play(); // 播放
      this.rotateLogo = setInterval(this.rotate, 30); // 开启定时器

      this.timeS = setInterval(this.setInPlay, 1000);
      if (this.value >= 100) {
        this.value = 100;
        this.$refs.bnav.endImg();
        clearInterval(this.timeS); // value等于100表示播放结束
      }
    },
  },
  created() {
    this.$store.state.playSong.isPlayEnd = true; // 进入页面即自动播放
    // 获取歌曲基本信息
    getSongDetial(this.$route.params.sid).then((res) => {
      let result = res.data.songs[0];
      this.singer = result.ar[0].name; // 歌手
      this.navTitle = result.name; // 歌曲名称
      this.id = result.id; // 歌曲id
      this.bgimg = result.al.picUrl; // 歌曲封面

      this.$store.state.playSong.songName = result.name; // 歌曲名称
      this.$store.state.playSong.singer = result.ar[0].name; // 歌手
      this.$store.state.playSong.picUrl = result.al.picUrl; // 歌曲封面
      playSong(this.id).then((res) => {
        // 歌曲url
        if (this.$store.state.playSong.songId !== this.$route.params.sid) {
          this.$store.state.playSong.index = 1; // 判断是否页面被打开
          this.$store.state.navMusicDom.src = res.data.data[0].url; // 歌曲url
          this.$store.state.navMusicDom.play(); // 获取完成url播放
          // 添加监听事件
          this.$store.state.navMusicDom.addEventListener("canplay", () => {
            this.songLoad(); // 获取音乐时长
            clearInterval(this.rotateLogo); // 暂停封面旋转
            clearInterval(this.timeS); // 暂停时间
            this.rotateLogo = setInterval(this.rotate, 30); // 封面旋转
            this.timeS = setInterval(this.setInPlay, 1000); // 时间更新
          });
        } else {
          this.songLoad(); // 获取音乐时长
          this.value = this.$store.state.navMusicDom.currentTime * (100 / this.$store.state.navMusicDom.duration)  // 更新时间
          this.setTime(this.value)
          clearInterval(this.rotateLogo); // 暂停封面旋转
          clearInterval(this.timeS); // 暂停时间
          this.rotateLogo = setInterval(this.rotate, 30); // 封面旋转
          this.timeS = setInterval(this.setInPlay, 1000); // 时间更新
        }
        this.$store.state.playSong.songId = this.$route.params.sid;
      });
    }),
      // 获取歌词
    getlyric(this.$route.params.sid).then((res) => {
        if (res.data.lrc !== undefined) {
          let text = res.data.lrc.lyric;
          let reg = /[\[|[0-9\:\.]|]]/gi; // 正则匹配去除 []
          let lyric = text.replace(reg, "");
          this.lyricText = lyric.split("]"); // 将字符串转为数组
          var reg2 = /\[(.+?)\]/g; // 正则匹配出时间
          let time = text.match(reg2); // match 选中匹配成功的内容

          for (let i = 0; i < time.length; i++) {
            time[i] = time[i].slice(1, 9); // slice 截取
            time[i] =
              parseFloat(time[i].slice(0, 2), 2) * 60 +
              parseFloat(time[i].slice(3, 8), 2); // 截取分秒计算秒数
          }

          this.songLyric = time;
          let num = 0;
          // for循环遍历歌词数组
          for (let i = 0; i < this.songLyric.length; i++) {
            // 检查是否有 NaN 设置为 0
            if (isNaN(this.songLyric[i])) {
              this.songLyric.splice(i, 1, (num += 0.15));
            }
            if (
              this.songLyric[i] == this.songLyric[i + 1] ||
              this.songLyric[i] >= this.songLyric[i + 1]
            ) {
              // console.log(this.songLyric[i]+ ',' + this.songLyric[i + 1]);
              this.songLyric.splice(i + 1, 1, this.songLyric[i + 1] + 0.5);
            }
          }
        }
      });
  },
  mounted () {
    this.$refs.bnav.playingImg();
  },
  destroyed () {
    clearInterval(this.rotateLogo); // 暂停封面旋转
    clearInterval(this.timeS); // 暂停时间
  }
};
</script>
<style scoped>
.PlaySongNav {
  width: 100%;
  height: 30px;
  display: flex;
}
.navitem {
  flex: 1;
  text-align: center;
}
.navitem img {
  margin-top: 6px;
  width: 20px;
  height: 20px;
}
.songbox {
  height: 95%;
  position: relative;
  z-index: 52;
  overflow-x: hidden;
}
.play {
  position: relative;
  z-index: 500;
}
.PlaySong {
  color: #fff;
  position: relative;
  z-index: 50;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
}
.logo {
  width: 100%;
  height: 70%;
  /* background-color: red; */
}
.guanp {
  width: 340px;
  height: 340px;
  margin: 0 auto;
  position: relative;
  top: 13%;
}
.logo .img {
  width: 340px;
  height: 340px;
}
.songImg {
  width: 155px;
  height: 155px;
  position: absolute;
  top: 88px;
  left: 96px;
  border-radius: 50%;
  overflow: hidden;
}
.songImg img {
  width: 102%;
  height: 102%;
}
.playbox {
  display: flex;
  margin-top: 6px;
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
.lyric {
  height: 70%;
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
.logo-enter {
  opacity: 1;
  position: absolute;
  z-index: -10;
  transform: translateX(-350px);
}
.logo-leave-to {
  opacity: 1;
  position: absolute;
  z-index: -10;
  transform: translateX(-350px);
}

.logo-enter-active,
.logo-leave-active {
  transition: 0.8s all ease-in-out;
}

.lyric-enter {
  position: absolute;
  z-index: -10;
  opacity: 1;
  transform: translateX(350px);
}
.lyric-leave-to {
  position: absolute;
  top: 42.5px;
  z-index: 1;
  opacity: 1;
  transform: translateX(700px);
}

.lyric-enter-active,
.lyric-leave-active {
  transition: 0.8s all ease-in-out;
}
</style>