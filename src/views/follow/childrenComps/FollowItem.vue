<template>
  <div class="followList">
    <div
      class="item"
      @click="information(item.userId)"
      v-for="(item, index) in followList"
      :key="index"
    >
      <div class="itembox">
        <div class="img">
          <img :src="item.avatarUrl" alt="" />
        </div>
        <div class="text">
          <span class="name">{{ item.nickname }}</span>
          <img
            v-if="item.vipType !== 0"
            class="imgvip"
            src="~assets/img/common/vip1.svg"
            alt=""
          />
          <div
            class="btn"
            v-if="uid == $store.state.profile.userId"
            @click="isFollow(item.userId, index)"
            :class="{ isFollows: item.followBtn }"
          >
            <img :src="item.followBtn ? noFollowImg : isFollowImg" alt="" />
            {{ item.btntext }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getIsFollow } from "network/follow";

export default {
  name: "FollowItem",
  data() {
    return {
      isIndex: 1,
      followIndex: 0,
      isFollowImg: require("assets/img/follow/gou.svg"),
      noFollowImg: require("assets/img/follow/hao.svg"),
    };
  },
  props: ["followList", "uid"],
  methods: {
    // userid 用户id
    // index 索引
    isFollow(userId, index) {
      // followBtn 为 false 表示已关注
      // true 为 未关注
      if (this.followList[index].followBtn) {
        this.followList[index].btntext = "已关注";
        this.followList[index].followBtn = false;
      } else {
        this.followList[index].btntext = "关注";
        this.followList[index].followBtn = true;
      }
    },

    information(id) {
      this.$router.push("/Information/" + id);
    },
  },
};
</script>
<style scoped>
.item {
  width: 100%;
  height: 1.59787rem;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  align-items: center;
}
.itembox {
  display: flex;
  width: 100%;
  height: 1.198402rem;
}
.img {
  width: 1.198402rem;
  height: 100%;
  margin-left: 7.5px;
  border-radius: 50%;
  overflow: hidden;
}
.img img {
  width: 100%;
  height: 100%;
}
.text {
  flex: 5;
  margin-left: .399467rem;
  line-height: 45px;
}
.name {
  font-size: 15px;
}
.qm {
  line-height: 1.065246rem;
  overflow: hidden; /*溢出隐藏*/
  text-overflow: ellipsis; /*以省略号...显示*/
  white-space: nowrap; /*强制不换行*/
}
.imgvip {
  /* width: 15px; */
  width: 1.59787rem;
  height: .69241rem;
  margin-left: -.372836rem;
  position: relative;
  top: .186418rem;
}
.isFollows {
  background-color: #da231b !important;
  color: #fff !important;
}
.btn {
  text-align: center;
  line-height: .798935rem;
  font-size: .346205rem;
  width: 2.130493rem;
  height: .798935rem;
  border-radius: .798935rem;
  margin-top: .159787rem;
  color: #000;
  background-color: rgb(231, 231, 231);
  border: 1px solid #cdccdc;
  float: right;
}
.btn img {
  position: relative;
  top: 3px;
}
</style>