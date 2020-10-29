<template>
  <div class="HotDetail">
    <div class="topbox">
      <div class="left">热搜榜</div>
      <div class="right">
        <div class="btn">
          <img src="~assets/img/search/bofang.svg" alt="" />
          播放全部
        </div>
      </div>
    </div>
    <div class="bottomBox">
      <div
        class="item"
        v-for="(item, index) in itemList"
        :key="index"
        :class="{ topSearch: index <= 2 }"
      >
        <div class="leftBox">
          <div class="ranking" :class="{ color: index <= 2 }">
            {{ index + 1 }}
          </div>
          <div class="text">{{ item.searchWord }}</div>
          <!-- <div class="img">
            <img v-if="item.iconUrl !== null" :src="item.iconUrl" alt="" />
          </div> -->
        </div>
      </div>
    </div>
    <div class="hotList">
      <div class="topbox">
        <div class="left">今日热搜</div>
        <div class="right"></div>
      </div>
      <div class="bottomBox">
        <div
          class="item"
          v-for="(item, index) in hotList"
          :key="index"
          :class="{ topSearch: index <= 2 }"
        >
          <div class="leftBox">
            <div class="ranking" :class="{ color: index <= 2 }">
              {{ index + 1 }}
            </div>
            <div class="text">{{ item.first }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotDetail, getSearchHot } from "network/search";
export default {
  name: "SearchHotdetail",
  data() {
    return {
      itemList: [],  // 歌曲
      hotList: [],  // 热搜
    };
  },
  created() {
    getHotDetail().then((res) => {
      for (const item of res.data.data) {
        this.itemList.push({
          searchWord: item.searchWord, // 搜索内容
          iconUrl: item.iconUrl || null, // icon
        });
      }
    });

    getSearchHot().then((res) => {
      for (const item of res.data.result.hots) {
        this.hotList.push({
          first: item.first,
        })
      }
    });
  },
};
</script>
<style scoped>
.color {
  color: red !important;
}
.ranking {
  width: 10%;
  height: 100%;
  float: left;
  margin-right: 0.133156rem;
  color: #afafaf;
}
.text {
  height: 100%;
  float: left;
}
.topSearch {
  font-weight: 550;
}
.HotDetail {
  width: 100%;
}
.topbox {
  width: 100%;
  height: 1.331558rem;
  display: flex;
  border-bottom: 1px solid #e6e6e6;
}
.left {
  flex: 1;
  font-size: 0.372836rem;
  font-weight: 550;
  letter-spacing: 1px;
  line-height: 1.331558rem;
}
.right {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
}
.btn {
  height: 0.665779rem;
  width: 2.396804rem;
  float: right;
  border: 1px solid #afafaf;
  border-radius: 0.665779rem;
  text-align: center;
  font-size: 0.346205rem;
  position: absolute;
  right: 0;
}
.btn img {
  width: 0.319574rem;
  position: relative;
  top: 0.039947rem;
}
.bottomBox {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 0.266312rem;
  border-bottom: 1px solid #e6e6e6;
}
.item {
  width: 50%;
  height: 0.665779rem;
  line-height: 0.665779rem;
  font-size: 0.372836rem;
  position: relative;
  margin-bottom: 0.266312rem;
}
.img {
  float: left;
  margin-left: 0.133156rem;
}
.img img {
  width: 0.505992rem;
  height: 0.399467rem;
  transform: scale(1.15);
}
</style>