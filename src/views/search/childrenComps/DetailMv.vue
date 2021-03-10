<template>
  <div class="DetailMv">
    <div class="videoItem" @click="toMv(item.id)" v-for="(item, index) in mvList" :key="index">
      <div class="vleft">
        <img :src="item.coverUrl" alt="" />
        <div class="count">▷ {{ item.playTime }}</div>
      </div>
      <div class="vright">
        <div class="vbox">
          <div class="vtitle">{{ item.title }}</div>
          <div class="videoDetail">
            {{ item.durationms + " by " }}{{ item.creator }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchResult } from "network/search";
import { toStringNum, durationTime } from "common/common";
export default {
  name: "DetailMv",
  data() {
    return {
      offset: 0,
      mvList: [],
      more: 1,
    };
  },
  methods: {
    //   路由跳转
    toMv(id){
        this.$router.push('/mvplay/' + id)
    },

    // 获取数据
    getSearchResult() {
      if (this.more !== 0) {
        searchResult(
          this.$route.params.keywords,
          40,
          this.offset * 40,
          1004
        ).then((res) => {
          
          this.more = res.data.result.mvCount;
          if (res.data.result.mvs !== null) {
            for (const item of res.data.result.mvs) {
              this.mvList.push({
                id: item.id,
                title: item.name,
                durationms: durationTime(item.duration),
                playTime: toStringNum(item.playCount),
                coverUrl: item.cover,
                artistName: item.artistName,
              });
            }
            this.offset++;
          }
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
    this.$loading.loadingShow();
    searchResult(this.$route.params.keywords, 40, this.offset * 40, 1004).then(
      (res) => {
        for (const item of res.data.result.mvs) {
          this.mvList.push({
            id: item.id,
            title: item.name,
            durationms: durationTime(item.duration),
            playTime: toStringNum(item.playCount),
            coverUrl: item.cover,
            artistName: item.artistName,
          });
        }
        this.offset++;
      }
    );
  },
  destroyed() {
    document.removeEventListener("scroll", this.linearScroll);
  },
  mounted() {
    this.$nextTick(() => {
      document.addEventListener("scroll", this.linearScroll);
      this.$loading.loadingNo();
    });
  },
};
</script>
<style scoped>
.DetailMv {
  width: 100%;
  min-height: 13.315579rem;
  margin-bottom: 0.133156rem;
  margin-top: 2.396804rem;
  background-color: #fff;
}
.videoItem {
  display: flex;
  height: 1.997337rem;
  margin-bottom: 0.213049rem;
}
.vleft {
  flex: 4;
  position: relative;
}
.count {
  position: absolute;
  right: 0.319574rem;
  top: 0;
  color: #fff;
  font-size: 0.319574rem;
}
.vleft img {
  width: 3.462051rem;
  height: 100%;
  border-radius: 0.133156rem;
}
.vright {
  flex: 6;
  display: flex;
  align-items: center;
}
.vtitle {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 0.346205rem;
}
.videoDetail {
  font-size: 0.319574rem;
  color: #a7a7a8;
}
</style>