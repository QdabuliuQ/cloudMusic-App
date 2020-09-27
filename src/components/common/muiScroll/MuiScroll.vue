<template>
  <div id="refreshContainer" class="mui-scroll-wrapper">
    <div class="mui-scroll">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 使用 muiScroll 滚动组件之前必须先按照路径引入 js 文件
import mui from "assets/mui/js/mui.min.js"; // 引入 mui js 文件

export default {
  name: "MuiScroll",
  props: {
    //   是否回弹
    bounce: {
      type: Boolean,
      default: true,
    },
    // 是否垂直滚动
    scrollY: {
      type: Boolean,
      default: false,
    },
    // 是否水平滚动
    scrollX: {
      type: Boolean,
      default: false,
    },
    // 是否显示滚动条
    indicators: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      muiscroll: null,
    };
  },
  methods: {
    mscrollTo() {
      mui(".mui-scroll-wrapper").scroll().scrollTo(0, 0, 100);
    },
  },
  created() {
    console.log(this.$store.state.getComMore);
  },
  mounted() {
    mui.init();
    this.muiscroll = mui(".mui-scroll-wrapper").scroll({
      bounce: this.bounce, //是否回弹
      scrollY: this.scrollY, //是否竖向滚动
      scrollX: this.scrollX, //是否横向滚动
      startX: 0, //初始化时滚动至x
      startY: 0, //初始化时滚动至y
      deceleration: 0.0005,
      indicators: this.indicators, //是否显示滚动条
    });
    // console.log(this.muiscroll.scroll);
    // this.muiscroll.scrollTo(0,0)

    // 监听滚动
    var scroll = mui(".mui-scroll-wrapper").scroll();
    document
      .querySelector(".mui-scroll-wrapper")
      .addEventListener("scroll", (e) => {
        // 事件传递
        this.$emit("listenerMSC", scroll.y);

        // this.$emit('listenerMSC2',scroll.y)
      });
    try {
      mui.init({
        pullRefresh: {
          container: "#refreshContainer",
          // down: {
          //   contentdown: "下拉可以刷新",
          //   contentover: "释放立即刷新",
          //   contentrefresh: "正在刷新...",
          //   contentmore: "刷新完成",
          //   auto: false,
          //   callback: pullfresh, //下拉刷新（回调）
          // },
          up: {
            contentrefresh: "正在加载...",
            contentnomore: "没有更多数据了",
            callback: this.$store.state.getComMore(this.$store.state.songid, 50, this.$store.state.page), //上拉加载下一页，（回调）
          },
        },
      });
    } catch (error) {
      
    }

  },
};
</script>
<style>
* {
  touch-action: none;
}
</style>