<template>
  <div class="FullScreen">
    <div class="playBox" @click="showSet" ref="playBox">
      <transition name="FullScreen">
        <!--  v-show="showSetBox" -->
        <div class="setBox">
          <div class="topBox">
            <div class="left" @click="back">
              <i class="iconfont icon-fanhui"></i>
            </div>
            <div class="center">{{ videoTitle }}</div>
            <div class="right">
              <i class="iconfont icon-fenxiang"></i>
            </div>
          </div>
          <div class="playBtn" @click.stop="playBtn">
            <i class="iconfont" :class="[Play]"></i>
          </div>
          <div class="bottomBox">
            <van-slider
              disabled
              bar-height="5px"
              class="sliderBox"
              v-model="value"
              active-color="#ee0a24"
            >
              <template #button>
                <div class="custom-button"></div>
              </template>
            </van-slider>
          </div>
        </div>
      </transition>
      <div class="playVideo">
        <video
          @canplay="canplay"
          id="fullSecreenVideo"
          style="width: 100%; height: 100%"
          :src="videoUrl"
        ></video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FullScreen",
  data() {
    return {
      value: 0,
      Play: 'icon-gequtingzhi',
      showSetBox: false,
      playing: true,
      percentTime: 0,
      timer: null, // 控制定时器
    };
  },
  props: {
    videoUrl: {
      type: String,
      default: "",
    },
    videoTitle: {
      type: String,
      default: "",
    },
  },
  methods: {
    onChange() {},
    back() {
      this.$store.state.fullSecreenVideo.currentTime = this.$store.state.fullSecreenVideo.currentTime
      this.$emit("toBack");
    },

    // 显示/隐藏面板
    showSet() {
      if (this.showSetBox) {
        this.showSetBox = false;
      } else {
        this.showSetBox = true;
        setTimeout(() => {
          this.showSetBox = false;
        }, 5000);
      }
    },

    // 暂停/播放
    playBtn() {
      if (this.playing) {  // 正在播放下
        this.$store.state.fullSecreenVideo.pause();
        this.Play = 'icon-gequbofang';
        this.playing = false;
        this.$store.state.viewPlay.playing = false;
        clearInterval(this.timer);
      } else { 
        if (this.value >= 100) {
          this.value = 0;
          this.$store.state.fullSecreenVideo.currentTime = 0;
        }
        this.$store.state.fullSecreenVideo.play();
        this.Play = 'icon-gequtingzhi';
        this.playing = true;
        this.$store.state.viewPlay.playing = true;
        clearInterval(this.timer);
        this.timer = setInterval(this.linearPlay, 1000);
      }
    },

    linearPlay() {
      this.value += this.percentTime;
      if (this.value >= 100) {
        this.value = 100;
        this.Play = 'icon-gequbofang'; // 修改图标
        this.playing = false;
        this.$store.state.viewPlay.playing = false;
      }
    },

    // 监听video加载完成
    canplay() {
      this.$store.state.fullSecreenVideo = document.getElementById(
        "fullSecreenVideo"
      );
      this.percentTime = 100 / this.$store.state.fullSecreenVideo.duration;
      this.value = this.$store.state.viewPlay.currentTime * this.percentTime;
    },
  },
  created() {
    this.$nextTick(() => {
      
    });
  },
  mounted() {
    this.$nextTick(() => {
      var conW =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      var conH =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      //  console.log(conH+'--'+conW);
      this.$refs.playBox.style.width = conH + "px";
      this.$refs.playBox.style.height = conW + "px";

      setTimeout(() => {
        this.$store.state.fullSecreenVideo.currentTime = this.$store.state.viewPlay.currentTime; // 将外部保存的时间放入内部播放器
      // 判断外部播放器是否正在播放
      if (this.$store.state.viewPlay.outPlaying) {
        this.$store.state.fullSecreenVideo.play();
        this.Play = 'icon-gequtingzhi';
        this.$store.state.viewPlay.playing = true; // 正在播放
        this.playing = true;
        this.timer = setInterval(this.linearPlay, 1000);
      } else {
        this.$store.state.fullSecreenVideo.pause();
        this.playing = false;
        this.Play = 'icon-gequbofang';
        this.$store.state.viewPlay.playing = false; // 暂停播放
        clearInterval(this.timer);
      }
      }, 500);
    });
  },
  destroyed() {
    this.$store.state.fullSecreenVideo.pause(); // 暂停内部播放器
    this.$store.state.viewPlay.currentTime = this.$store.state.fullSecreenVideo.currentTime; // 销毁阶段 保存时间
  },
};
</script>
<style scoped>
.FullScreen-enter {
  opacity: 0;
}
.FullScreen-leave-to {
  opacity: 0;
}
.FullScreen-enter-active,
.FullScreen-leave-active {
  /* 添加动画效果 */
  transition: all 0.2s linear;
}
.playBtn {
  width: 2.130493rem;
  height: 2.130493rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.playBtn .iconfont {
  font-size: 1.066667rem;
  color: #fff;
}
.custom-button {
  width: 13px;
  height: 13px;
  color: #fff;
  background-color: #ee0a24;
  border-radius: 50%;
}
.FullScreen {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* */
  background-color: rgba(0, 0, 0, 0.9);
  position: absolute;
  z-index: 300;
}
.playBox {
  width: 100%;
  height: 100%;
  transform: rotateZ(90deg);
  position: absolute;
  bottom: 3.888149rem;
  left: -3.888149rem;
}
.setBox {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 302;
}
.topBox {
  width: 100%;
  height: 1.331558rem;
  display: flex;
  background: linear-gradient(rgba(0, 0, 0, 0.6), transparent);
}
.left {
  flex: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;
}
.left .iconfont {
  font-size: .453333rem;
  color: #fff;
}
.center {
  flex: 8.8;
  line-height: 1.331558rem;
  color: #fff;
  font-size: .426667rem;
  width: 10.652463rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.right {
  flex: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;
}
.right .iconfont {
  font-size: .453333rem;
  color: #fff;
}
.bottomBox {
  width: 100%;
  height: 1.331558rem;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
}
.sliderBox {
  width: 90%;
  margin: auto;
  height: 0.266312rem;
}
.playVideo {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 301;
}
</style>