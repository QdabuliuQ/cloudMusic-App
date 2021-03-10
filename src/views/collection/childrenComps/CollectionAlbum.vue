<template>
  <div class="CollectionAlbum">
    <div
      class="albumItem"
      @click="showAlbum(item.id)"
      v-for="(item, index) in albumList"
      :key="index"
    >
      <div class="left">
        <img :src="item.picUrl" alt="" />
        <div class="bgcImg">
          <img src="https://img.coolcr.cn/2021/03/08/2b7d972a3ad72.png" alt="" />
        </div>
      </div>
      <div class="right">
        <div class="content">
          <div class="title">
            {{ item.name }}
          </div>
          <div class="detail">
            <span v-for="(item, index) in item.artists" :key="index">{{
              item.name
            }}</span>
            {{ item.size }} 首
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAlbum } from "network/collection";
export default {
  name: "CollectionAlbum",
  data() {
    return {
      offset: 0,
      albumList: [],
      more: true,
    };
  },
  methods: {
    showAlbum(id){
      this.$router.push('/playDetail/' + id+'&'+true)
    },

    album() {
      if (this.more) {
        getAlbum(this.$store.state.cookie, 10, this.offset * 10).then((res) => {
          this.more = res.data.hasMore;
          for (const item of res.data.data) {
            this.albumList.push({
              picUrl: item.picUrl,
              name: item.name,
              artists: item.artists,
              size: item.size,
              id: item.id
            });
          }
          this.offset ++ 
        });
      } else {
        this.$toast.show('没有更多了:(', 1900)
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
      if (Math.ceil(scrollTop) + clientHeight == scrollHeight ) {
        setTimeout(() => {
          this.album();
        }, 1000);
      }
    },
  },
  created() {
    this.$loading.loadingShow();
    this.album();
  },
  mounted() {
    this.$nextTick(() => {
      this.$loading.loadingNo();
      document.addEventListener("scroll", this.linearScroll);
    });
  },
  destroyed() {
    // 删除事件
    document.removeEventListener("scroll", this.linearScroll);
  },
};
</script>
<style scoped>
.CollectionAlbum {
  width: 100%;
  background-color: #fff;
  min-height: 13.315579rem;
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
  position: relative;
  z-index: 1;
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
  z-index: 0;
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