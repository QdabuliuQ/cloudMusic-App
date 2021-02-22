<template>
  <div class="SearchHP" :key="i">
    <div class="nav">
      <div class="left" @click="back">
        <!-- <img src="~assets/img/radioStation/fanhui.png" alt="" /> -->
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
        class="suggestBox"
        v-show="showSuggest"
        :keyword="searchContent"
        @toRenovate='toRenovate'
      ></search-suggest>
    </transition>
    <scrollnav
      @tabToggle="tabToggle"
      class="snav"
      :firstIndex="0"
      :itemList="itemList"
    ></scrollnav>
    <div class="contentbox">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import scrollnav from "components/context/scrollNav/ScrollNav";
import detailSong from "./DetailSongs"; // 单曲
import detailAlbum from "./DetailAlbum"; // 专辑
import detailSinger from "./DetailSinger"; // 歌手
import detailSheet from "./DetailSheet"; // 歌单
import detailUser from "./DetailUser"; // 用户
import SearchSuggest from "./SearchSuggest"; // 搜索建议

import { getDefault } from "network/search";
/**
 * 1: 单曲,
 * 10: 专辑,
 * 100: 歌手,
 * 1000: 歌单,
 * 1002: 用户,
 * 1004: MV,
 * 1006: 歌词,
 * 1009: 电台,
 * 1014: 视频,
 * 1018:综合
 */
export default {
  name: "SearchDetail",
  data() {
    return {
      itemList: [
        "综合",
        "单曲",
        "视频",
        "歌手",
        "专辑",
        "歌单",
        "主播电台",
        "MV",
        "用户",
      ],
      song: false, // 歌曲
      album: false, // 专辑
      singer: false, // 歌手
      sheet: false, // 歌单
      user: true, // 用户
      index: 0, // 判断路由
      searchContent: '',
      showSuggest: false, // 显示/隐藏搜索建议
      i: 0
    };
  },
  watch: {
    // 监听搜索内容
    searchContent() {
      if (this.searchContent == "") {
        this.showSuggest = false
      } else if(this.index === 1){         
        this.showSuggest = true;
      }
    },
  },
  methods: {
    toRenovate(){
      this.i ++
    },

    // 退出
    back() {
      this.$router.replace("/discover/search");
    },
    // 输入获得焦点的时候
    toFocus() {
      console.log(2);
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
    // 点击搜索
    toSearch() {
      this.$router.push("/discover/search/searchDetail/" + this.searchContent);
    },

    // 导航栏切换
    tabToggle(index) {
      switch (index) {
        case 0: // 综合
          this.$router.replace(
            "/discover/search/searchDetail/whole/" + this.$route.params.keywords
          );
          break;
        case 1: // 单曲
          this.$router.replace(
            "/discover/search/searchDetail/song/" + this.$route.params.keywords
          );
          break;
        case 2: // 视频
          this.$router.replace(
            "/discover/search/searchDetail/video/" + this.$route.params.keywords
          );
          break;
        case 3: // 歌手
          this.$router.replace(
            "/discover/search/searchDetail/singer/" +
              this.$route.params.keywords
          );
          break;
        case 4: // 专辑
          this.$router.replace(
            "/discover/search/searchDetail/album/" + this.$route.params.keywords
          );
          break;
        case 5: // 歌单
          this.$router.replace(
            "/discover/search/searchDetail/sheet/" + this.$route.params.keywords
          );
          break;
        case 6: // 主播电台
          this.$router.replace(
            "/discover/search/searchDetail/radio/" + this.$route.params.keywords
          );
          break;
        case 7: // MV
          this.$router.replace(
            "/discover/search/searchDetail/mv/" + this.$route.params.keywords
          );
          break;
        case 8: // 用户
          this.$router.replace(
            "/discover/search/searchDetail/user/" + this.$route.params.keywords
          );
          break;

        default:
          break;
      }
    },
  },
  created() {
    getDefault().then((res) => {
      this.searchContent = res.data.data.realkeyword;
    });
    // this.$router.replace('/discover/search/searchDetail/whole/' + this.$route.params.keywords)
  },
  components: {
    scrollnav,
    detailSong,
    detailAlbum,
    detailSinger,
    detailSheet,
    detailUser,
    SearchSuggest,
  },
};
</script>
<style scoped>
.suggestBox{
  top: 1.198402rem;
  position: absolute;
  z-index: 21 !important;
}
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
.contentbox {
  padding: 0.266312rem 0.372836rem;
  margin-bottom: 1.198402rem;
}
.SearchHP {
  width: 100%;
  background-color: #fff;
  position: relative;
  z-index: 20;
}
.nav {
  width: 100%;
  height: 1.171771rem;
  background-color: #fff;
  z-index: 20;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.snav {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 20;
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