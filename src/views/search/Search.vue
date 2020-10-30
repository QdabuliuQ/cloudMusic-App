<template>
  <div class="Search">
    <div class="nav">
      <div class="left" @click="back">
        <img src="~assets/img/radioStation/fanhui.png" alt="" />
      </div>
      <div class="right">
        <div class="sous">
          <input
            @focus="toFocus"
            @blur="toBlur"
            @keyup.enter="toSearch"
            v-model="searchContent"
            :placeholder="searchContent"
            type="text"
          />
        </div>
      </div>
    </div>
    <transition>
      <search-suggest
        v-show="showSuggest"
        :keyword="searchContent"
      ></search-suggest>
    </transition>
    <div class="bContent">
      <search-hotdetail></search-hotdetail>
    </div>
  </div>
</template>

<script>
import SearchHotdetail from "./childrenComps/SearchHotdetail";
import SearchSuggest from "./childrenComps/SearchSuggest"; // 搜索建议

import { getDefault, getSearchHot } from "network/search";
export default {
  name: "Search",
  data() {
    return {
      searchContent: "",
      showSuggest: false, // 显示/隐藏搜索建议
      index: 0
    };
  },
  components: {
    SearchHotdetail,
    SearchSuggest,
  },
  created() {
    getDefault().then((res) => {
      this.searchContent = res.data.data.realkeyword;
    });
  },
  watch: {
    searchContent() {
      if (this.searchContent == "") {
        this.showSuggest = false
      } else if(this.index === 1){         
        this.showSuggest = true;
      }
    },
  },
  methods: {
    // 输入获得焦点的时候
    toFocus() {
      if (this.searchContent !== "") {
        this.index = 1;
        this.showSuggest = true;
      } else {
        this.index = 0;
        this.showSuggest = false;
      }
    },
    // 输入失去焦点的时候
    toBlur() {
      this.index = 0
      this.showSuggest = false;
    },

    back() {
      this.$router.push("/discover");
    },

    toSearch() {
      this.$router.push("/discover/search/searchDetail/" + this.searchContent);
    },
  },
};
</script>
<style scoped>
.v-enter {
  opacity: 0;
  /* 进来的时候从右 */
  transform: scale(0.1);
}
.v-leave-to {
  opacity: 0;
  /* 离开的时候向左 */
  transform: scale(0.1);
}

/* 动画执行期间 */
.v-enter-active,
.v-leave-active {
  /* 添加动画效果 */
  transition: all 0.2s linear;
}
.bContent {
  padding: 0.133156rem 0.372836rem 0.319574rem;
}
.Search {
  width: 100%;
  background-color: #fff;
  position: relative;
  z-index: 20;
}
.nav {
  width: 100%;
  height: 1.171771rem;
  background-color: #fff;
  display: flex;
}
.left {
  flex: 1;
  text-align: center;
}
.left img {
  width: 25px;
  height: 22px;
  margin-top: 10.5px;
}
.right {
  flex: 9;
  display: flex;
  align-items: center;
}
.sous {
  width: 90%;
  height: 80%;
  border-bottom: 1px solid rgb(190, 190, 190);
  margin-left: 0.266312rem;
}
.sous input {
  width: 100%;
  height: 100%;
  border: 0;
  padding: 0;
  font-size: 0.426099rem;
  color: rgb(133, 133, 133);
}
</style>