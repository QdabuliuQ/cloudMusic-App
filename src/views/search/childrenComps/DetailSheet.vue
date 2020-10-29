<template>
  <div class="DetailSheet">
    <div
      class="item"
      @click="toSheet(item.id)"
      v-for="(item, index) in sheetList"
      :key="index"
    >
      <div class="left">
        <img :src="item.coverImgUrl" alt="" />
      </div>
      <div class="right">
        <div class="box">
          <div class="title">{{ item.name }}</div>
          <div class="detail">
            {{ item.trackCount + "首 " }}{{ "by " + item.creator + "，"
            }}{{ "播放" + item.playCount + "次" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchResult } from "network/search";
import { toStringNum } from "common/common";
export default {
  name: "DetailSheet",
  data() {
    return {
      offset: 0,
      sheetList: [],
      hasMore: true, // 更多数据
    };
  },
  methods: {
    toSheet(id) {
      this.$router.push("/playDetail/" + id + "&" + false);
    },

    getSearchResult() {
      if (this.hasMore) {
        this.$loading.loadingShow();
        searchResult(
          this.$route.params.keywords,
          30,
          this.offset * 30,
          1000
        ).then((res) => {
          this.hasMore = res.data.result.hasMore;
          let path = res.data.result.playlists;
          for (let i = 0; i < path.length; i++) {
            this.sheetList.push({
              id: path[i].id,
              name: path[i].name,
              coverImgUrl: path[i].coverImgUrl,
              playCount: toStringNum(path[i].playCount),
              trackCount: path[i].trackCount,
              creator: path[i].creator.nickname,
            });
          }
          this.$loading.loadingNo();
          this.offset++;
        });
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
        setTimeout(() => {
          this.getSearchResult();
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
.DetailSheet {
  width: 100%;
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