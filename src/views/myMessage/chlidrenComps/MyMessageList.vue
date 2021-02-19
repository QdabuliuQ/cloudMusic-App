<template>
  <div class="MyMessageList">
    <div class="box" ref="mySheet">
      <div class="top">
        <div class="left">
          创建歌单({{
            this.$store.state.profile.userId !== "" ? sheetLength : 0
          }})个
        </div>
        <div class="center">
          <i class="iconfont icon-add"></i>
        </div>
        <div class="right">
          <i class="iconfont icon-sandian"></i>
        </div>
      </div>
      <song-sheet :sheetList="sheetList"></song-sheet>
    </div>
    <div class="box2" ref="collection">
      <div class="top">
        <div class="left">收藏歌单({{ sheetCollectionLength }})个</div>
        <div class="center">
          <i class="iconfont icon-add"></i>
        </div>
        <div class="right">
          <i class="iconfont icon-sandian"></i>
        </div>
      </div>
      <song-sheet v-if="sheetCollectionLength !== 0"></song-sheet>
      <div class="nosheet" v-else>暂时还没有收藏歌单</div>
    </div>
  </div>
</template>

<script>
import songSheet from "components/context/songSheet/SongSheet"; // 歌曲列表

export default {
  name: "MyMessageList",
  data() {
    return {
      sheetList: "my", // 显示对应的歌单列表
    };
  },
  components: {
    songSheet,
  },
  computed: {
    // 计算创建的歌单数量
    sheetLength() {
      return (
        this.$store.state.playList.filter(
          (item) => item.creator === this.$store.state.profile.nickName
        ).length - 1
      );
    },

    sheetCollectionLength() {
      return this.$store.state.playList.filter(
        (item) => item.creator !== this.$store.state.profile.nickName
      ).length;
    },
  },
  mounted() {
    this.$nextTick(() => {
      // 保存滚动信息
      this.$store.state.mySheetToTop = this.$refs.mySheet.offsetTop;
      this.$store.state.collectionToTop = this.$refs.collection.offsetTop;
    });
  },
};
</script>
<style scoped>
.nosheet{
  width: 100%;
  height: 1.065246rem;
  line-height: 1.065246rem;
  color: #9b9b9b;
  text-align: center;
  font-size: .346205rem;
}
.MyMessageList {
  width: 100%;
  margin-top: 5px;
}
.box {
  padding: .32rem .346667rem;
  border-radius: .213333rem;
  background-color: #fff;
  box-shadow: var(--boxshaow);
}
.box2 {
  padding: .32rem .346667rem;
  border-radius: .213333rem;
  background-color: #fff;
  margin-top: .4rem;
  box-shadow: var(--boxshaow);
}
.top {
  width: 100%;
  display: flex;
  height: 25px;
  font-size: 13px;
  line-height: 25px;
  color: #9b9b9b;
}
.left {
  flex: 4;
  font-size: .32rem;
}
.center {
  flex: 5;
}
.center .icon-add {
  float: right;
  font-size: .426667rem;
}
.right {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
}
.right .icon-sandian{
  position: absolute;
  right: 0;
  font-size: .426667rem;
}
.img {
  flex: 1.5;
  background-color: #dbdbdb;
  border-radius: 8px;
  text-align: center;
  font-size: 13.5px;
}
.img img {
  width: 0.665779rem;
  height: 0.665779rem;
  margin-top: 0.266312rem;
}
.text {
  flex: 8;
  line-height: 1.198402rem;
  margin-left: 0.266312rem;
  font-size: 0.372836rem;
}
</style>