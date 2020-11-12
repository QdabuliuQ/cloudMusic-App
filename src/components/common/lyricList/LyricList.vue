<template>
  <div class="LyricList">
    <div class="LyricListContent">
      <ul ref="list" v-if="lyricText.length !== 0">
        <li class="item" v-for="(item, index) in lyricText" :key="index">
          <div
            :class="{ active: index === activeIndex }"
            class="itemSpan"
            v-if="item !== '' && item !== '\n'"
          >
            {{ item }}
          </div>
        </li>
      </ul>
      <div class="nolyric" v-else>暂时还没有歌词</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LyricList",
  props: ["lyricText", "songLyric", "value", "cTime", "indexLyric"],
  data() {
    return {
      activeIndex: 0,
      valueTime: 0,
      index: 0,
      yscroll: 0,
      zindex: 0,
      itemSumH: 0,
      songText: [],
      songTime: 0, // 歌曲实时时间
      num: 0,
    };
  },
  methods: {
    setTime() {
      console.log(this.$store.state.navMusicDom.currentTime);
      setTimeout(() => {
        for (let i = 0; i < this.songLyric.length; i++) {
          if (
            this.$store.state.navMusicDom.currentTime >= this.songLyric[i] &&
            this.$store.state.navMusicDom.currentTime <=
              this.songLyric[i + 1] &&
            document.getElementsByClassName("itemSpan")[i].offsetTop >
              document.getElementsByClassName("LyricListContent")[0]
                .clientHeight /
                2
          ) {
            console.log(i);
            let scroll =
              document.getElementsByClassName("itemSpan")[i].offsetTop -
              document.getElementsByClassName("LyricListContent")[0]
                .clientHeight /
                2;
            this.yscroll =
              scroll +
              document.getElementsByClassName("itemSpan")[i].clientHeight /
                2;
            this.$refs.list.style.transform =
              "translateY(" + -this.yscroll + "px)";
            this.activeIndex = i;
            this.index = i;
            this.zindex = i;
          } else if (
            this.$store.state.navMusicDom.currentTime >= this.songLyric[i] &&
            this.$store.state.navMusicDom.currentTime <=
              this.songLyric[i + 1] &&
            document.getElementsByClassName("itemSpan")[i].offsetTop <
              document.getElementsByClassName("LyricListContent")[0]
                .clientHeight /
                2
          ) {
            console.log(i);
            this.activeIndex = i;
            this.index = i;
            this.zindex = i;
          }
        }
      }, 1000);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.setTime();
      this.$store.state.navMusicDom.addEventListener("timeupdate", () => {
        // 判断有没有歌词
        if (this.lyricText.length !== 0) {
          // 判断歌曲时间在歌词区间
          if (
            this.$store.state.navMusicDom.currentTime >=
              this.songLyric[this.index] &&
            this.$store.state.navMusicDom.currentTime <=
              this.songLyric[this.index + 1]
          ) {
            var huiche = /^\n/; // 正则匹配回车符
            if (huiche.test(this.lyricText[this.index])) {
            } else {
              if (document.getElementsByClassName("active")[0] !== undefined) {
                if (
                  document.getElementsByClassName("itemSpan")[this.zindex]
                    .offsetTop >
                  document.getElementsByClassName("LyricListContent")[0]
                    .clientHeight /
                    2
                ) {
                  console.log();
                  this.yscroll =
                    document.getElementsByClassName("itemSpan")[this.zindex]
                      .offsetTop -
                    document.getElementsByClassName("LyricListContent")[0]
                      .clientHeight /
                      2 +
                    document.getElementsByClassName("itemSpan")[this.zindex]
                      .clientHeight /
                      2;
                  this.$refs.list.style.transform =
                    "translateY(" + -this.yscroll + "px)";
                  this.$refs.list.style.transition = "0.3s linear";
                }
              }
              this.zindex++;
            }
            this.index++; // 索引++
            this.activeIndex++; // 歌词索引++
          }
        }
      });

      // 添加 seeked 事件，当进度发生变化的时候触发
      this.$store.state.navMusicDom.addEventListener("seeked", () => {
        if (this.$store.state.navMusicDom.currentTime < 1) {
          this.index = 0; // 清空索引
          this.zindex = 0;
          this.activeIndex = 0;
          this.yscroll = 0; // 清空滚动距离
          this.$refs.list.style.transform = "translateY(0px)"; // 滚动回顶部
        } else {
          // for 循环遍历歌词数组  songLyric歌词时间数组
          for (let i = 0; i < this.songLyric.length; i++) {
            // 判断滚动到哪个歌词区间
            if (
              this.$store.state.navMusicDom.currentTime >= this.songLyric[i] &&
              this.$store.state.navMusicDom.currentTime < this.songLyric[i + 1] &&
              document.getElementsByClassName("itemSpan")[i].offsetTop >
                document.getElementsByClassName("LyricListContent")[0]
                  .clientHeight /
                  2
            ) {
              let scroll =
                document.getElementsByClassName("itemSpan")[i].offsetTop -
                document.getElementsByClassName("LyricListContent")[0]
                  .clientHeight /
                  2;
              this.yscroll =
                scroll +
                document.getElementsByClassName("itemSpan")[i]
                  .clientHeight /
                  2;
              this.$refs.list.style.transform =
                "translateY(" + -this.yscroll + "px)";
              this.activeIndex = i;
              this.index = i;
              this.zindex = i;
              break;
            }
          }
        }
      });
    });
  },
  computed: {
    linearSet() {
      return this.$store.state.playSong.linearIndex;
    },
  },
};
</script>
<style scoped>
.noItem {
  float: left;
  width: 100%;
  height: 0.553928rem;
}
.playbox {
  width: 100%;
}
.list {
  transition: all 0.5s linear;
}
.LyricListContent {
  width: 80%;
  position: relative;
  top: 3%;
  margin: 0 auto;
  height: 90%;
  text-align: center;
  overflow: hidden;
  font-size: 15px;
  letter-spacing: 2px;
  color: #757575;
  /* transform: translateY(); */
  /* transition: ; */
}
.active {
  color: #fff;
}
.item {
  margin-top: 17px;
}
.nolyric {
  position: relative;
  font-size: 20px;
  color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>