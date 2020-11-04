<template>
  <div class="bottomPlay" v-show="isShowNav">
    <audio ref="navAudio" id="navMusic" :src="musicUrl"></audio>
    <div class="cd">
      <img :src="$store.state.playSong.picUrl || img" alt="" />
    </div>
    <div class="text">
      <div class="item top">
        {{
          $store.state.playSong.songName === ""
            ? ""
            : $store.state.playSong.songName
        }}
      </div>
      <div class="item bottom">
        {{
          $store.state.playSong.singer === ""
            ? ""
            : $store.state.playSong.singer
        }}
      </div>
    </div>
    <div class="play" @click="isPlaySong">
      <img :src="isPlay" alt="" />
    </div>
    <div class="list">
      <img src="~assets/img/common/liebiao.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomPlay",
  data() {
    return {
      img: require("assets/img/common/cd2.png"),
      isPlay: require("assets/img/common/shipin.svg"),
      musicUrl: require("assets/audio/ceshi.mp3"),
      navMusic: null, // audio DOM元素
      isAudio: false,
      navPlay: false, // 控制外部播放器 播放/暂停
    };
  },
  computed: {
    // 监听显示/隐藏播放导航栏
    isShowNav() {
      return this.$store.state.isShowNav;
    },

    playImg: {
      get(){
        return this.$store.state.playSong.isPlayEnd;
      },
      set(v){
        this.$store.state.playSong.isPlayEnd = v
      }
    },
  },
  methods: {
    // 切换图标
    isPlaySong() {
      if (this.$store.state.playSong.playNow) {
        this.isPlay = require("assets/img/common/shipin.svg");
        this.$store.state.navMusicDom.pause();
        this.$store.state.playSong.playNow = false;
      } else {
        this.isPlay = require("assets/img/common/zanting.svg");
        this.$store.state.navMusicDom.play();
        this.$store.state.playSong.playNow = true;
      }
    },
  },
  watch: {
    playImg() {
      if (this.playImg) {
        this.isPlay = require("assets/img/common/zanting.svg");
      } else {
        this.isPlay = require("assets/img/common/shipin.svg");
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.state.navMusicDom = document.getElementById("navMusic"); // 保存到VUEX中

      this.$store.state.navMusicDom.addEventListener("ended", () => {
        this.isPlay = require("assets/img/common/shipin.svg");
        this.$store.state.playSong.playNow = false
        this.playImg = false
      }, false);
    });
  },
};
</script>
<style scoped>
.custom-button {
  width: 13px;
  height: 13px;
  color: #fff;
  background-color: #ee0a24 !important;
  border-radius: 100px;
}
.bottomPlay {
  width: 100%;
  height: 45px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 48;
  bottom: 0;
  display: flex;
}
.cd {
  width: 1.038615rem;
}
.cd img {
  position: relative;
  top: 7px;
  margin-left: 7px;
  width: 32px;
  height: 32px;
  overflow: hidden;
  border-radius: 50%;
}
.text {
  width: 6.396538rem;
  font-size: 14px;
}
.top {
  width: 220px;
  margin-top: 5px;
  margin-left: 0.266312rem;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bottom {
  width: 220px;
  font-size: 13px;
  margin-left: 0.266312rem;
  color: #a0a0a0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item {
  height: 17px;
}
.play {
  width: 1.283622rem;
}
.play img {
  width: 31px;
  height: 31px;
  margin-top: 8px;
  margin-left: 8px;
}
.list {
  width: 1.283622rem;
}
.list img {
  width: 28px;
  margin-left: 9px;
  height: 28px;
  margin-top: 9px;
}
</style>