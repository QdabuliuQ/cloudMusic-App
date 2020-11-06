<template>
  <div class="TabNav">
    <div class="mui-content" style="">
      <div id="slider" class="mui-slider">
        <div
          id="sliderSegmentedControl"
          class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
        >
          <div class="mui-scroll">
            <a
              @click="tabItem(index)"
              class="mui-control-item"
              v-for="(item, index) in itemList"
              :key="index"
              :class="{ active: index === tabIndex }"
            >
              <div class="item" :key="index">
                <span class="spItem">{{ item }}</span>
              </div>
            </a>
            <span class="bottomBor"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Move } from "common/tool";
import mui from "assets/mui/js/mui.min.js"; // 引入 mui js 文件

// 引入滑动模块
// .mui-scroll-wrapper 表示需要进行滑动的区域
mui(".mui-scroll-wrapper").scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

export default {
  props: ["itemList", "firstIndex"],
  name: "TabNav",
  data() {
    return {
      tabIndex: 1,
      timer: null,
      aindex: 0,
    };
  },
  methods: {
    tabItem(index) {
      this.$emit("tabToggle", index);
      this.tabIndex = index;
      let span = document.getElementsByClassName("spItem")[index];
      let bottomBor = document.getElementsByClassName("bottomBor")[0];
      bottomBor.style.width = span.offsetWidth + "px";
      Move(bottomBor, "left", span.offsetLeft, 35);
    },
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      bounce: true, //是否回弹
      scrollY: false, //是否竖向滚动
      scrollX: true, //是否横向滚动
      startX: 0, //初始化时滚动至x
      startY: 0, //初始化时滚动至y
      indicators: true, //是否显示滚动条
    });

    this.$nextTick(() => {
      setTimeout(() => {
        this.tabItem(0)
      },300)
    });
  },
};
</script>
<style scoped>
.mui-active {
  color: #000 !important;
}
.mui-content {
  background-color: transparent !important;
}
.mui-scroll {
  height: 1.091877rem !important;
}
.mui-control-item {
  height: 1.091877rem;
  padding: 0 0.399467rem !important;
}
#slider {
  height: 1.091877rem;
  background-color: #fff;
}
#sliderSegmentedControl {
  height: 100%;
}
.TabNav {
  width: 100%;
  height: 1.171771rem;
  background-color: #fff;
  box-sizing: border-box;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  position: relative;
  box-sizing: border-box;
  touch-action: none;
}
.item {
  flex: 1;
  line-height: 1.171771rem;
  text-align: center;
  font-size: 0.372836rem;
}
.item span {
  padding: 0.133156rem 0.266312rem 0.266312rem;
}
.active {
  color: #e93d34 !important;
}
.bottomBor {
  width: 48px;
  height: 2px !important;
  background-color: #da231b;
  position: absolute;
  bottom: 0;
  left: 163px;
  padding: 0 !important;
}
</style>