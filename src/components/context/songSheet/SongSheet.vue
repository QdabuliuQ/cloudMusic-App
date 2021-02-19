<template>
  <div class="songList">
    <div
      class="songSheet1"
      @click="sheetInfo(item.id)"
      v-for="(item, index) in $store.state.playList"
      :key="index"
    >
      <div
        class="songSheet"
        v-if="
          sheetList === 'my'
            ? item.creator === $store.state.profile.nickName && index !== 0
            : item.creator !== $store.state.profile.nickName
        "
      >
        <div class="left">
          <img :src="item.coverImgUrl" alt="" />
        </div>
        <div class="center">
          <div class="sheetDetail">
            <div class="listName">{{ item.name }}</div>
            <div class="count">
              {{ item.trackCount }}首
              {{
                item.creator !== $store.state.profile.nickName
                  ? " by " + item.creator
                  : ""
              }}
            </div>
          </div>
        </div>
        <div class="right">
          <i class="iconfont icon-sandian"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongSheet",
  props: ["sheetList"], // 显示的是收藏歌单还是创建歌单
  methods: {
    sheetInfo(id) {
      this.$router.push("/playDetail/" + id + "&" + false); // 跳转到歌单页面
    },
  },
};
</script>
<style scoped>
.left {
  flex: 1.5;
  border-radius: 8px;
  overflow: hidden;
}
.left img {
  width: 100%;
  height: 100%;
}
.sheetDetail{
  margin-left: .266667rem;
}
.listName {
  width: 5.866667rem;
  height: .586667rem;
  line-height: .586667rem;
  font-size: .4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.count {
  font-size: .32rem;
  height: .4rem;
  display: flex;
  align-items: center;
  color: #aaaaaa;
}
.center {
  flex: 7.5;
  display: flex;
  align-items: center;
}
.right {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
}
.right .icon-sandian {
  position: absolute;
  right: 0;
  font-size: 0.426667rem;
  color: #aaaaaa;
}
.songSheet {
  width: 100%;
  height: 1.198402rem;
  display: flex;
  /* position: relative;
  top: 5px; */
  margin-top: 9px;
}
</style>