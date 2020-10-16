<template>
  <div class="homepage">
    <sheet-item
      :title="'听歌排行'"
      :showDiv="true"
      :showImg="phImg"
      :showDivColor="'#ee5757'"
      :songCount="'累计听歌' + count + '首'"
    ></sheet-item>

    <sheet-item
      :title="likeSheet.name"
      :showDiv="true"
      :showImg="likeImg"
      :showDivColor="'#ebcece'"
      :songCount="likeSheet.trackCount + '首，'"
      :playCount="'播放' + likeSheet.playCount + '次'"
    ></sheet-item>

    <div class="createSheet">
      <div class="title">
        <span class="sp1">创建的歌单</span
        ><span class="sp2"
          >({{ createSheet.length }}个，被收藏{{ subscribedCount }}次)</span
        >
      </div>
      <sheet-item
        v-for="(item, index) in createSheet"
        :key="index"
        :title="item.name"
        :sheetImg="item.coverImgUrl"
        :songCount="item.trackCount + '首，'"
        :playCount="'播放' + item.playCount + '次'"
      ></sheet-item>
    </div>

    <div class="subSheet">
      <div class="title">
        <span class="sp1">收藏的歌单</span>
        <span class="sp2">({{ subSheet.length }})</span>
      </div>
      <sheet-item
        v-for="(item, index) in subSheet"
        :key="index"
        :title="item.name"
        :sheetImg="item.coverImgUrl"
        :songCount="item.trackCount + '首，by ' + item.nickname"
        :playCount="'，播放' + item.playCount + '次'"
      ></sheet-item>
    </div>
  </div>
</template>

<script>
import sheetItem from "./sheetItem";
import { getUserPlayList, getUserDetail } from "network/user";
import { toStringNum } from "common/common";

export default {
  props: ["count"],
  name: "homepage",
  data() {
    return {
      uid: "", // 用户id
      phImg: require("assets/img/information/paihang.svg"),
      likeImg: require("assets/img/information/aixin.svg"),
      likeSheet: {}, // 喜欢的音乐
      createSheet: [], // 创建的歌单
      subSheet: [], // 收藏的歌单
      subscribedCount: 0, // 歌单收藏总次数
    };
  },
  components: {
    sheetItem,
  },
  created() {
    this.uid = this.$route.params.uid;
    // 获取歌单
    getUserPlayList(this.$route.params.uid).then((res) => {
      this.likeSheet.id = res.data.playlist[0].id; // 歌单id
      this.likeSheet.name = res.data.playlist[0].name; // 歌单名称
      this.likeSheet.playCount = res.data.playlist[0].playCount; // 歌单播放次数
      this.likeSheet.trackCount = res.data.playlist[0].trackCount; // 歌单歌曲数量
      this.$set(this.likeSheet, this.likeSheet.name, res.data.playlist[0].name);

      for (let i = 1; i < res.data.playlist.length; i++) {
        if (res.data.playlist[i].creator.userId == this.uid) {
          this.createSheet.push({
            id: res.data.playlist[i].id, // 歌单id
            name: res.data.playlist[i].name, // 歌单名称
            coverImgUrl: res.data.playlist[i].coverImgUrl, // 歌单封面
            trackCount: res.data.playlist[i].trackCount, // 歌单歌曲数量
            playCount: toStringNum(res.data.playlist[i].playCount), // 歌单播放量
          });
          this.subscribedCount += res.data.playlist[i].subscribedCount; // 歌单被收藏数量
        } else {
          this.subSheet.push({
            id: res.data.playlist[i].id, // 歌单id
            name: res.data.playlist[i].name, // 歌单名称
            coverImgUrl: res.data.playlist[i].coverImgUrl, // 歌单封面
            trackCount: res.data.playlist[i].trackCount, // 歌单歌曲数量
            playCount: toStringNum(res.data.playlist[i].playCount), // 歌单播放量
            nickname: res.data.playlist[i].creator.nickname, // 创作者
          });
        }
      }
    });

    // getUserDetail(this.uid).then(res => {
    //     console.log(res);
    // })
  },
};
</script>
<style scoped>
.homepage {
  padding: 0 15px 15px;
  margin-bottom: 45px;
  background-color: #fff;
}
.createSheet {
  width: 100%;
  margin-top: 0.798935rem;
}
.subSheet {
  width: 100%;
  margin-top: 0.798935rem;
}
.title {
  margin-bottom: 10px;
}
.sp1 {
  font-size: 0.466045rem;
  font-weight: 550;
}
.sp2 {
  font-size: 0.346205rem;
  color: #929292;
  position: relative;
  left: 0.266312rem;
}
</style>