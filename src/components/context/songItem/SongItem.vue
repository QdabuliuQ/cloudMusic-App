<template>
  <div class="SongItem">
    <div class="item" v-for="(item, index) in songList" :key="index">
      <div class="itemBox" @click="play(item.id)">
        <div class="index" v-if="shouLeft">
          {{ index + 1 }}
        </div>
        <div class="left">
          <div class="name">
            {{ item.songName }}
            <span v-if="item.yuanc.length !== 0" class="yuanc"
              >({{ item.yuanc[0] }})</span
            >
          </div>
          <div class="singer">
            <span v-for="(item, index) in item.singer" :key="index">{{ item.name }} </span> -
            {{ " " + item.zhuanji }}
          </div>
        </div>
        <div class="mv">
          <img
            v-if="item.mv !== 0"
            @click.stop="playMv(item.mv)"
            src="~assets/img/common/mv.svg"
            alt=""
          />
        </div>
        <div class="more" @click.stop="moreMenu">
          <img src="~assets/img/common/sandian.svg" alt="" />
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
      default: []
    },

    shouLeft: {
      type: Boolean,
      default: true
    }
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
  font-size: .399467rem !important;
}
.itemBox {
  width: 100%;
  height: 1.011984rem;
  position: relative;
  display: flex;
}
.name {
  width: 5.858855rem;
  /* margin-top: 2px; */
  font-size: .399467rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.singer {
  width: 220px;
  color: #868686;
  margin-top: -.079893rem;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.index {
  flex: 0.52;
  font-size: .399467rem;
  text-align: center;
  margin-right: .266312rem;
  line-height: 1.065246rem;
}
.left {
  flex: 5;
}
.mv {
  flex: 0.7;
}
.mv img {
  width: .69241rem;
  height: .585885rem;
  margin-top: .186418rem;
  float: right;
}
.more {
  flex: 0.7;
}
.more img {
  width: .559254rem;
  height: .559254rem;
  float: right;
  margin-top: .23968rem;
}
</style>