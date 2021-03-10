<template>
  <div class="LyricList">
    <div class="LyricListContent">
      <ul ref="list" v-if="lyricText.length !== 0">
        <li class="item" v-for="(item, index) in lyricText" :key="index">
          <!-- v-if="item !== '' && item !== '\n'" -->
          <div
            :class="{ active: index === activeIndex }"
            class="itemSpan"
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
      index: 0,
      yscroll: 0,
      songTime: 0, // 歌曲实时时间
      num: 0,
    };
  },
  methods: {
    
    timeUpDate() {
      let scrollHeight = 0
      let scrollViewHeight = document.getElementsByClassName("LyricListContent")[0].clientHeight / 2
        
      // 判断有没有歌词
      if (this.lyricText.length !== 0) {
        // 判断歌曲时间在歌词区间
        if (
          this.$store.state.navMusicDom.currentTime >= this.songLyric[this.index] && this.$store.state.navMusicDom.currentTime <= this.songLyric[this.index + 1]
        ) {
          let itemToTop = document.getElementsByClassName("itemSpan")[this.index].offsetTop
          let itemClientHeight = document.getElementsByClassName("itemSpan")[this.index].clientHeight  // 歌词item高度的一半
          if (itemToTop > scrollViewHeight) {
            scrollHeight = itemToTop - scrollViewHeight + itemClientHeight  // 计算滚动位置
            this.$refs.list.style.transform = "translateY(" + (-scrollHeight) + "px)";
          }
          this.index++; // 索引++
          this.activeIndex++; // 歌词索引++
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {

      let scrollHeight = 0
      this.$EventBus.$on('playEnd', ({playEnd}) => {
        if (playEnd) {
          scrollHeight = 0  // 滚动回顶部
          this.$refs.list.style.transform = "translateY(" + scrollHeight + "px)";  // 设置滚动位置
        }
      })
      // 监听歌曲播放
      this.$store.state.navMusicDom.addEventListener("timeupdate", this.timeUpDate);

      // 添加 seeked 事件，当拖拽进度的时候触发
      this.$store.state.navMusicDom.addEventListener("seeked", () => {
        let scrollViewHeight = document.getElementsByClassName("LyricListContent")[0].clientHeight / 2
        let seekedIndex = this.songLyric.filter( (item,index) => {  // 拖拽进度条后所在的歌词索引
          return this.$store.state.navMusicDom.currentTime >= item
        }).length  
        let itemToTop = document.getElementsByClassName("itemSpan")[seekedIndex].offsetTop  // 歌词item距离顶部的距离
        let itemClientHeight = document.getElementsByClassName("itemSpan")[seekedIndex].clientHeight  // 歌词item高度的一半
        if (itemToTop > scrollViewHeight) {  // 判断是否需要进行滚动
          scrollHeight = itemToTop - scrollViewHeight + itemClientHeight  // 计算滚动位置
          this.$refs.list.style.transform = "translateY(" + (-scrollHeight) + "px)";
        }
        this.index = seekedIndex;  // 修改索引
        this.activeIndex = seekedIndex;  // 修改索引
      });
    });
  },
  computed: {
    linearSet() {
      return this.$store.state.playSong.linearIndex;
    },
  },
  destroyed () {
    this.$store.state.navMusicDom.removeEventListener('timeupdate', this.timeUpDate)
  }
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
  font-size: .346667rem;
  letter-spacing: .053333rem;
  color: #757575;
}
.LyricListContent ul{
  transition: 0.3s linear;
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