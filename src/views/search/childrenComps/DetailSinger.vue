<template>
  <div class="DetailSinger">
    <div
      class="item"
      @click="toSinger(item.accountId, item.id)"
      v-for="(item, index) in artistsList"
      :key="index"
    >
      <div class="left">
        <img :src="item.img1v1Url" alt="" />
      </div>
      <div class="center">
        {{ item.name
        }}<span class="a1" v-if="item.trans !== ' '">({{ item.trans }})</span>
      </div>
      <div class="right">
        <div v-if="item.accountId" class="box">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchResult } from "network/search";

export default {
  name: "DetailSinger",
  data() {
    return {
      offset: 0,
      artistsList: [], // 歌手数组
      result: null,
    };
  },
  methods: {
    toSinger(accountId, id) {
      if (accountId !== null) {
        this.$router.push("/Information/" + accountId);
      } else {
        this.$router.push("/Information/" + id);
      }
    },

    getSearchResult() {
      searchResult(this.$route.params.keywords, 30, this.offset * 30, 100).then((res) => {
        let path = res.data.result.artists;
        this.result = res.data.result.artists || null;
        if (this.result !== null) {
          for (let i = 0; i < path.length; i++) {
            this.artistsList.push({
              img1v1Url: path[i].img1v1Url,
              id: path[i].id,
              accountId: path[i].accountId || null,
              name: path[i].name,
              trans: path[i].trans || path[i].alias[0] || " ",
            });
          }
          this.offset++;
        } else {
          this.$toast.show("没有更多了:(", 1900);
        }
      });
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
.a1 {
  color: rgb(146, 146, 146);
}
.DetailSinger {
  width: 100%;
  min-height: 13.315579rem;
  background-color: #fff;
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
  flex: 1.5;
}
.left img {
  width: 1.198402rem;
  height: 1.198402rem;
  border-radius: 50%;
}
.center {
  flex: 6.5;
  line-height: 1.198402rem;
  font-size: 0.399467rem;
  text-indent: 0.133156rem;
}
.right {
  flex: 2;
  font-size: 0.319574rem;
  display: flex;
  align-items: center;
}
.box img {
  position: relative;
  top: 0.106525rem;
  margin-right: 0.079893rem;
}
</style>