<template>
  <div class="SongItem">
    <div class="item" v-for="(item, index) in songList" :key="index">
      <div class="itemBox" @click="play(item.id)">
        <div class="index" v-if="shouLeft">
          {{ index + 1 }}
        </div>
        <div class="left">
          <div class="leftContainer">
            <div class="name">
              {{ item.songName }}
              <span v-if="item.yuanc.length !== 0" class="yuanc"
                >({{ item.yuanc[0] }})</span
              >
            </div>
            <div class="singer">
              <span v-for="(item, index) in item.singer" :key="index"
                >{{ item.name }}
              </span>
              -
              {{ " " + item.zhuanji }}
            </div>
          </div>
        </div>
        <div class="mv">
          <i @click.stop="playMv(item.mv)" v-if="item.mv !== 0" class="iconfont icon-mv"></i>
        </div>
        <div class="more" @click.stop="moreMenu">
          <i class="iconfont icon-sandian"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongItem",
  props: {
    songList: {
      type: Array,
      default: [],
    },

    shouLeft: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    // 跳转到播放界面
    play(sid) {
      this.$router.push("/playSong/" + sid);
    },

    moreMenu() {
      console.log(22);
    },

    playMv(mid) {
      this.$router.push("/mvplay/" + mid);
    },
  },
};
</script>
<style scoped>
.item {
  width: 100%;
  height: 1.331558rem;
  border-bottom: 1px solid #e2e2e2ea;
  display: flex;
  align-items: center;
}
.yuanc {
  color: #868686;
  font-size: 0.399467rem !important;
}
.itemBox {
  width: 100%;
  height: 1.011984rem;
  position: relative;
  display: flex;
}
.name {
  width: 5.858855rem;
  height: .533333rem;
  line-height: .533333rem;
  font-size: 0.399467rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: .08rem;
}
.singer {
  width: 5.866667rem;
  height: .4rem;
  line-height: .4rem;
  color: #868686;
  margin-top: -0.079893rem;
  font-size: .32rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.index {
  flex: 0.52;
  font-size: 0.399467rem;
  text-align: center;
  margin-right: 0.266312rem;
  line-height: 1.065246rem;
}
.left {
  flex: 5;
  display: flex;
  align-items: center;
}
.mv {
  flex: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mv .icon-mv {
  font-size: .533333rem;
  color: var(--red);
}
.more {
  flex: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
}
.more .icon-sandian {
  font-size: .48rem;
  color: var(--fontColor);
}
</style>