<template>
  <div class="DetailRadio">
    <div
      class="item"
      @click="toRadio(item.id)"
      v-for="(item, index) in radioList"
      :key="index"
    >
      <div class="left">
        <img :src="item.picUrl" alt="" />
      </div>
      <div class="right">
        <div class="box">
          <div class="title">{{ item.name }}</div>
          <div class="detail">{{ item.nickname }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchResult } from "network/search";
export default {
  name: "DetailRadio",
  data() {
    return {
      radioList: [],
      offset: 0,
      hasMore: "",
      djRadiosCount: 40,
    };
  },
  methods: {
    // 路由跳转
    toRadio(id) {
      this.$router.push("/stationDetail/" + id);
    },

    getSearchResult() {
      this.$loading.loadingShow();
      searchResult(
        this.$route.params.keywords,
        40,
        this.offset * 40,
        1009
      ).then((res) => {
        this.hasMore = res.data.result.djRadios || null;
        if (this.hasMore !== null) {
          for (const item of res.data.result.djRadios) {
            this.radioList.push({
              id: item.id,
              name: item.name,
              picUrl: item.picUrl,
              nickname: item.dj.nickname,
            });
          }
          this.offset++;
        } else {
          this.$toast.show("没有更多了:(", 1900);
          this.$loading.loadingNo();
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
        setTimeout(() => {
          this.getSearchResult();
        }, 1000);
      }
    },
  },
  created() {
    this.$loading.loadingShow();
    searchResult(this.$route.params.keywords, 40, this.offset * 40, 1009).then(
      (res) => {
        for (const item of res.data.result.djRadios) {
          this.radioList.push({
            id: item.id,
            name: item.name,
            picUrl: item.picUrl,
            nickname: item.dj.nickname,
          });
        }
        this.offset++;
      }
    );

    // 绑定滚动事件
    this.$nextTick(() => {
      document.addEventListener("scroll", this.linearScroll);
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.$loading.loadingNo();
    });
  },
  deactivated() {
    // 删除事件
    document.removeEventListener("scroll", this.linearScroll);
  },
};
</script>
<style scoped>
.DetailRadio {
  width: 100%;
  min-height: 13.315579rem;
  margin-bottom: 0.133156rem;
  margin-top: 2.396804rem;
}
.item {
  display: flex;
  height: 1.198402rem;
  width: 100%;
  margin-bottom: 0.399467rem;
}
.left {
  flex: 1.5;
}
.left img {
  width: 1.198402rem;
  height: 100%;
  border-radius: 0.133156rem;
}
.right {
  flex: 8.5;
  display: flex;
  align-items: center;
}
.title {
  width: 7.190413rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.372836rem;
  margin-left: 0.133156rem;
}
.detail {
  width: 7.190413rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.319574rem;
  color: rgb(150, 150, 150);
  height: 0.399467rem;
  line-height: 0.399467rem;
  margin-left: 0.133156rem;
}
</style>