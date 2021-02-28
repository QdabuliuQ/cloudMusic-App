<template>
  <div class="bottomPlay" v-show="isShowNav">
    <audio ref="navAudio" id="navMusic" :src="$store.state.musicUrl"></audio>
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
      <i class="iconfont" :class="isPlay"></i>
    </div>
    <div class="list">
      <i class="iconfont icon-liebiao"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomPlay",
  data() {
    return {
      img: 'https://img.coolcr.cn/2021/02/28/79161388ab39a.png',
      isPlay: 'icon-gequbofang',
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
        this.isPlay = 'icon-gequbofang';
        this.$store.state.navMusicDom.pause();
        this.$store.state.playSong.playNow = false;
      } else {
        this.isPlay = 'icon-gequtingzhi';
        this.$store.state.navMusicDom.play();
        this.$store.state.playSong.playNow = true;
      }
    },
  },
  watch: {
    playImg() {
      if (this.playImg) {
        this.isPlay = 'icon-gequtingzhi';
      } else {
        this.isPlay = 'icon-gequbofang';
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.state.navMusicDom = document.getElementById("navMusic"); // 保存到VUEX中
      // 监听是否播放结束事件
      this.$store.state.navMusicDom.addEventListener("ended", () => {
        this.isPlay = 'icon-gequbofang'
        this.$store.state.playSong.playNow = false
        this.playImg = false
      }, false);
      // 监听暂停事件
      this.$store.state.navMusicDom.addEventListener("pause", function () {
        this.isPlay = 'icon-gequbofang'
      });

      // 监听播放结束事件
      this.$store.state.navMusicDom.addEventListener("play", function () {
        this.isPlay = 'icon-gequtingzhi'
      });
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
  display: flex;
  align-items: center;
  justify-content: center;
}
.cd img {
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
  display: flex;
  align-items: center;
  justify-content: center;
}
.play .iconfont {
  position: relative;
  top: .013333rem;
  font-size: .533333rem;
}
.list {
  width: 1.283622rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.list .iconfont {
  position: relative;
  top: .013333rem;
  font-size: .533333rem;
}
</style>