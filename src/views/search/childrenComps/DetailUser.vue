<template>
  <div class="DetailUser">
    <div
      class="item"
      @click="toUser(item.id)"
      v-for="(item, index) in userList"
      :key="index"
    >
      <div class="left">
        <img class="uimg" :src="item.avatarUrl" alt="" />
        <div v-if="item.anchor" class="tag">
          <i class="iconfont icon-logo"></i>
        </div>
      </div>
      <div class="center">
        <div class="box">
          <div class="name">
            {{ item.nickname }}
            <img
              :src="item.gender == 1 ? nanImg : item.gender == 2 ? nvImg : ''"
            />
          </div>
          <div v-if="item.signature !== ''" class="text">
            {{ item.signature }}
          </div>
        </div>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import { searchResult } from "network/search";
export default {
  name: "DetailUser",
  data() {
    return {
      offset: 0,
      userList: [], // 歌手数组
      more: true, // 更多数据
      nanImg: require("assets/img/search/nan.svg"),
      nvImg: require("assets/img/search/nv.svg"),
    };
  },
  methods: {
    toUser(id) {
      this.$router.push("/Information/" + id);
    },

    getSearchResult() {
      if (this.more) {
        searchResult(
          this.$route.params.keywords,
          30,
          this.offset * 30,
          1002
        ).then((res) => {
          let path = res.data.result.userprofiles;
          for (let i = 0; i < path.length; i++) {
            this.userList.push({
              avatarUrl: path[i].avatarUrl,
              id: path[i].userId,
              nickname: path[i].nickname,
              signature: path[i].signature, // 描述
              anchor: path[i].anchor, // 是否音乐人
              gender: path[i].gender, // 1：男性 2：女性 0：隐藏
            });
          }
          this.offset++;
        });
      } else {
        this.$toast.show("没有更多了:(", 1900);
      }
    },

    // 监听滚动事件
    linearScroll() {
      // 滚动条距离顶部的距离
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 可视区的高度
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      // 滚动条可滚动的高度
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        this.$loading.loadingShow();
        setTimeout(() => {
          this.getSearchResult();
          this.$loading.loadingNo();
        }, 1000);
      }
    },
  },
  created() {
    this.getSearchResult();
  },
  activated() {
    this.$nextTick(() => {
      document.addEventListener("scroll", this.linearScroll);
    });
  },
  deactivated() {
    document.removeEventListener("scroll", this.linearScroll);
  },
};
</script>
<style scoped>
.box{
  margin-left: .133156rem;
}
.tag {
  position: absolute;
  width: 0.45273rem;
  height: 0.45273rem;
  background-color: red;
  border-radius: 50%;
  right: -2px;
  bottom: -2px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tag .iconfont {
  font-size: .32rem;
  color: #Fff;
}
.name img {
  position: relative;
  top: 2px;
}
.DetailUser {
  width: 100%;
  min-height: 13.315579rem;
  margin-bottom: 0.133156rem;
  margin-top: 2.396804rem;
}
.item {
  width: 100%;
  height: 1.198402rem;
  display: flex;
  margin-bottom: 0.399467rem;
}
.left {
  position: relative;
  flex: 1.5;
}
.left .uimg {
  width: 1.198402rem;
  height: 1.198402rem;
  border-radius: 50%;
}
.center {
  flex: 6.5;
  font-size: 0.399467rem;
  text-indent: 0.133156rem;
  display: flex;
  align-items: center;
}
.name {
  width: 6.924101rem;
  height: 0.532623rem;
}
.text {
  width: 5.992011rem;
  height: 0.532623rem;
  font-size: 0.319574rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(138, 138, 138);
}
.right {
  flex: 2;
  font-size: 0.319574rem;
  display: flex;
  align-items: center;
}
</style>