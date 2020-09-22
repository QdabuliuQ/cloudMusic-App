<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  props: {
    probeType: {
      type: Number, // 非实时派发scroll事件和位置参数, 类型由0,1,2,3, 
      default: 1
    },
    scrollX: {
      type: Boolean, // 是否横向滚动
      default: false
    },
    scrollY: {
      type: Boolean, // 是否纵向滚动
      default: true
    },
    click: {
      type: Boolean, // 是否派发点击事件
      default: true
    },
    listenScroll: {
      type: Boolean, // 监听滚动
      default: false
    },
    data: {
      type: Array, // 组件数据,可用于重新刷新scroll组件
      default: null
    },
    pullup: {
      type: Boolean, // 上拉加载更多,请求接口
      default: false
    },
    beforeScroll: {
      type: Boolean, // 滚动之前做些什么
      default: false
    },
    refreshDelay: {
      type: Number, // scroll刷新时间
      default: 20
    },
    eventPassthrough: {
      type: String, // 支持原生滚动
      default: ''
    },
},
  mounted() {
    // 也可以使用nextTick来初始化
    setTimeout(() => {
      this.initScroll();
    }, 20);
  },
  methods: {
    // 初始化
    initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      // 根据自己的需求传入配置项
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        scrollY: this.scrollY
      });

      if (this.listenScroll) {
        let me = this;
        this.scroll.on("scroll", pos => {
          me.$emit("scroll", pos);
        });
      }

      if (this.pullup) {
        this.scroll.on("scrollEnd", () => {
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit("scrollToEnd");
          }
        });
      }

      if (this.beforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScroll");
        });
      }
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  },
  watch: {
    // 这个可以设置data来刷新scroll组件
    data() {
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay);
    }
  },

  
};
</script>

<style scoped>
</style>