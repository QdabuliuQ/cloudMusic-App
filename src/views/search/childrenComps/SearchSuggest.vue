<template>
  <div class="SearchSuggest">
    <div class="item1 box" @click="toSearch(keyword)">搜索 “{{ keyword }}”</div>
    <div
      class="item box"
      @click="toSearch(item.title)"
      :class="{ borderClass: index !== list.length }"
      v-for="(item, index) in list"
      :key="index"
    >
      <i class="iconfont icon-sousuo"></i>
      {{ item.title }}
    </div>
  </div>
</template>

<script>
import { searchSuggest } from "network/search";
import { debounce } from "common/common";

export default {
  props: ["keyword"],
  name: "SearchSuggest",
  data() {
    return {
      list: [],
      title: this.keyword,
      // crucial: this.keyword,
    };
  },
  methods: {
    // 路由跳转
    toSearch(keyword) {
      this.$emit('toRenovate')  // 事件传递
      this.$router.push("/discover/search/searchDetail/" + keyword);
    },

    getSearchSuggest() {
      if (this.keyword !== "" && this.title !== this.keyword) {
        this.list = []; // 当搜索的内容发生修改的时候  清空原来的内容
        searchSuggest(this.keyword, "mobile").then((res) => {
          for (const item of res.data.result.allMatch) {
            this.list.push({
              title: item.keyword,
            });
          }
        });
      }
      this.title = this.keyword;
    },
  },
  watch: {
    keyword() {
      // 创建变量接收 防抖 函数的返回值
      // 传入异步请求 ，延迟时间
      const func = debounce(this.getSearchSuggest, 1500);
      // 执行防抖函数返回的函数
      func();
    },
  },
};
</script>
<style scoped>
.SearchSuggest {
  width: 90%;
  /* height: 400px; */
  background-color: #fff;
  position: absolute;
  z-index: 20;
  margin-left: 5%;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.281);
}
.item1 {
  color: rgb(21, 117, 206) !important;
  box-sizing: border-box;
  text-indent: 0.399467rem;
  border-bottom: 1px solid #ececec;
}
.box {
  width: 100%;
  height: 1.331558rem;
  line-height: 1.331558rem;
  font-size: 0.412783rem;
  color: #8a8a8a;
}
.item .iconfont {
  margin-left: 0.399467rem;
  margin-right: .133333rem;
  font-size: .373333rem;
}
.borderClass {
  box-sizing: border-box;
  border-bottom: 1px solid #ececec;
}
</style>