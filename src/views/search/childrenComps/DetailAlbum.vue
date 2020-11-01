<template>
  <div class="DetailAlbum">
    <div
      class="albumItem"
      @click="showAlbum(item.id)"
      v-for="(item, index) in albumList"
      :key="index"
    >
      <div class="left">
        <img :src="item.picUrl" alt="" />
        <div class="bgcImg">
          <img src="~assets/img/information/yuan.svg" alt="" />
        </div>
      </div>
      <div class="right">
        <div class="content">
          <div class="title">
            {{ item.name }}
            <span class="sp" v-if="item.alias.length !== 0"
              >({{ item.alias[0] }})</span
            >
          </div>
          <div class="detail">
            {{ item.publishTime | getTime("YYYY.MM.DD") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchResult } from "network/search";

export default {
  name: "DetailAlbum",
  data() {
    return {
      albumList: [], // 专辑
      offset: 0,
      albumCount: 40,
      result: null,
    };
  },
  methods: {
    showAlbum(id) {
      this.$router.push("/playDetail/" + id + "&" + true);
    },

    getSearchResult() {
      searchResult(this.$route.params.keywords, 30, this.offset * 30, 10).then(
        (res) => {
          let path = res.data.result.albums;
          this.result = res.data.result.songs || null;
          if (this.result !== null) {
            for (let i = 0; i < path.length; i++) {
              this.albumList.push({
                id: item.id,
                name: item.name,
                picUrl: item.picUrl,
                publishTime: item.publishTime,
                alias: item.alias,
              });
            }
            this.offset++;
          } else {
            this.$toast.show('没有更多了:(',1900)
          }
        }
      );
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
    this.$loading.loadingShow();
    searchResult(this.$route.params.keywords, 30, this.offset * 30, 10).then(
      (res) => {
        for (const item of res.data.result.albums) {
          this.albumList.push({
            id: item.id,
            name: item.name,
            picUrl: item.picUrl,
            publishTime: item.publishTime,
            alias: item.alias,
          });
        }
        this.offset++;
      }
    );
  },
  mounted () {
    this.$nextTick(() => {
      this.$loading.loadingNo();
    })
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
.DetailAlbum {
  width: 100%;
  min-height: 13.315579rem;
  margin-bottom: 0.133156rem;
  margin-top: 2.396804rem;
  background-color: #fff;
}
.albumItem {
  width: 100%;
  height: 1.331558rem;
  display: flex;
  margin-bottom: 0.213049rem;
  position: relative;
}
.left {
  flex: 1.8;
}
.left img {
  width: 1.331558rem;
  height: 1.331558rem;
  border-radius: 0.133156rem;
}
.right {
  flex: 8.2;
  display: flex;
  align-items: center;
}
.bgcImg {
  width: 1.331558rem;
  height: 1.331558rem;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0.266312rem;
}
.content {
  margin-left: 0.266312rem;
}
.title {
  width: 6.65779rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 0.479361rem;
  line-height: 0.479361rem;
  font-size: 0.399467rem;
}
.sp {
  color: #979797;
}
.detail {
  height: 0.479361rem;
  line-height: 0.479361rem;
  font-size: 0.319574rem;
  color: #979797;
}
</style>