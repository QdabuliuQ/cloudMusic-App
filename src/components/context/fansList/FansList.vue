<template>
  <div class="FansList">
    <menunav class="nav" :navTitle="navTitle"></menunav>
    <div class="content">
      <div
        class="item"
        @click="userDetail(item.userId)"
        v-for="(item, index) in FansArr"
        :key="index"
      >
        <div class="left">
          <img :src="item.avatarUrl" alt="" />
        </div>
        <div class="center">
          <span>{{ item.nickname }}</span>
          <img
            v-if="item.vipType !== 0"
            class="imgvip"
            src="~assets/img/common/vip1.svg"
            alt=""
          />
        </div>
        <div class="right">
          <img src="~assets/img/common/sandian.svg" alt="" />
        </div>
      </div>
      <div class="tip" v-if="FansArr.length >= 100">下载APP查看更多</div>
    </div>
  </div>
</template>

<script>
import menunav from "components/context/menuNav/MenuNav";
import { getUserFans } from "network/user";

export default {
  name: "FansList",
  components: {
    menunav,
  },
  data() {
    return {
      navTitle: "粉丝",
      lasttime: -1,
      FansArr: [], // 粉丝数组
    };
  },
  methods: {
    userFans() {
      getUserFans(this.$route.params.id, 100, this.lasttime).then((res) => {
        for (const item of res.data.followeds) {
          this.FansArr.push({
            nickname: item.nickname, // 昵称
            userId: item.userId, // 用户id
            avatarUrl: item.avatarUrl, // 用户头像
            vipType: item.vipType, // 用户vip
          });
        }
        this.$loading.loadingNo()
      });
    },

    userDetail(id) {
      this.$router.push("/Information/" + id);
    },
  },
  created() {
    this.$loading.loadingShow()
    this.userFans();
  },
};
</script>
<style scoped>
.imgvip {
  width: 60px;
  height: 26px;
  margin-left: -14px;
  position: relative;
  top: 7px;
}
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.FansList {
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
}
.content {
  margin: 44px 0 1.198402rem;
  padding: 0.399467rem 0.479361rem 0;
}
.item {
  display: flex;
  width: 100%;
  padding: 0.186418rem 0 0.133156rem;
  border-bottom: 1px solid #e2e2e2;
}
.left {
  flex: 1.5;
}
.left img {
  width: 1.331558rem;
  height: 1.331558rem;
  border-radius: 50%;
}
.center {
  width: 6.284953rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 6.5;
  line-height: 1.331558rem;
  font-size: 0.426099rem;
  text-indent: 0.266312rem;
}
.right {
  flex: 1.5;
  text-align: center;
}
.right img {
  width: 0.665779rem;
  position: relative;
  top: 0.346205rem;
  float: right;
}
.tip {
  width: 100%;
  height: 1.065246rem;
  line-height: 1.065246rem;
  text-align: center;
  font-size: 0.45273rem;
  color: #929292;
}
</style>