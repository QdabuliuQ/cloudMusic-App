<template>
  <div class="DiscoverProgram">
    <div class="topTitle">
      <div class="left">{{ title }}</div>
      <div class="right"><div class="btn" @click="moreProgram">查看更多</div></div>
    </div>
    <div class="mui-content" style="">
      <div id="slider" class="mui-slider">
        <div
          id="sliderSegmentedControl"
          class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
        >
          <div class="mui-scroll">
            <div
              @click="toProgram(item.id)"
              v-for="(item, index) in programList"
              :key="index"
              class="mui-control-item"
              href="#item1mobile"
            >
              <sheet-item 
              :showCount="false"
              :showImg="true"
              :sheetItem="item"
              :isSheet='false'></sheet-item>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProgram } from "network/discover";
import sheetItem from "components/context/sheetItem/SheetItem"

export default {
  name: "DiscoverProgram",
  data() {
    return {
      title: "",
      programList: [],
    };
  },
  components: {
      sheetItem
  },
  methods: {
    toProgram(id){
        this.$router.push('/audioPlay/' + id)
    },
    moreProgram(){
      this.$router.push('/radioStation/')
    }
  },
  created() {
    getProgram().then((res) => {
      this.title = res.data.name;
      for (const item of res.data.programs) {
          this.programList.push({
              picUrl: item.coverUrl,  // 封面
              id: item.id,  // id
              name: item.name,  // 标题
              desc: item.radio.desc,  // 介绍
          })
      }
    });
  },
};
</script>
<style scoped>
.mui-control-item {
  margin-top: 0 !important;
  /* height: 4.207723rem; */
  padding: 0.213049rem 0.186418rem 0.399467rem !important;
}
#slider {
  height: 4.207723rem;
}
#sliderSegmentedControl {
  height: 100%;
}
.DiscoverProgram {
  margin-top: 0.532623rem;
}
.mui-content{
  background-color: var(--bgc);
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
  height: 0.585885rem;
  font-size: 0.319574rem;
  /* padding: .053262rem .159787rem; */
  border-radius: 0.585885rem;
  text-align: center;
  line-height: 0.585885rem;
  border: 1px solid #919090;
}
</style>