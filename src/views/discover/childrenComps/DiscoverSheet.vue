<template>
  <div class="DiscoverSheet">
    <div class="topTitle">
      <div class="left">懂你的精选歌单</div>
      <div class="right">
        <div class="btn" @click="Sheet">查看更多</div>
      </div>
    </div>
    <div class="mui-content" style="">
      <div id="slider" class="mui-slider">
        <div
          id="sliderSegmentedControl"
          class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
        >
          <div class="mui-scroll">
            <div
              @click="toSheet(item.id)"
              v-for="(item, index) in sheetList"
              :key="index"
              class="mui-control-item"
              href="#item1mobile"
            >
              <sheet-item :sheetItem="item"></sheet-item>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sheetItem from "components/context/sheetItem/SheetItem";
import { toStringNum } from "common/common"
import { getHotSheet } from "network/discover";

export default {
  name: "DiscoverSheet",
  data() {
    return {
      offset: -1,
      sheetList: [], // 歌单数组
    };
  },
  components: {
    sheetItem,
  },
  methods: {
    toSheet(id) {
      this.$router.push("/playDetail/" + id + "&" + false);
    },

    Sheet(){
      this.$router.push("/discover/moreSheet");
    }
  },
  created() {
    getHotSheet("hot", "全部", 6, this.offset * 6).then((res) => {
      for (const item of res.data.playlists) {
        this.sheetList.push({
          id: item.id,
          rcmdtext: item.name,
          desc: item.description,
          picUrl: item.coverImgUrl,
          playCount: toStringNum(item.playCount),
        });
      }
    });
  },
};
</script>
<style scoped>
.DiscoverSheet{
    margin-top: .532623rem;
}
.mui-control-item {
  padding: 0.213049rem 0.186418rem 0.399467rem !important;
}
#slider {
  height: 4.101198rem;
}
#sliderSegmentedControl {
  height: 100%;
}
.topTitle {
  width: 100%;
  display: flex;
  padding: 0 0.319574rem;
}
.left {
  flex: 1;
  font-size: 0.426099rem;
  font-weight: 550;
  line-height: 0.665779rem;
}
.right {
  flex: 1;
}
.btn {
  float: right;
  width: 1.864181rem;
  height:  .585885rem;
  font-size: 0.319574rem;
  /* padding: .053262rem .159787rem; */
  border-radius: .585885rem;
  text-align: center;
  line-height:  .585885rem;
  border: 1px solid #919090;
}
</style>