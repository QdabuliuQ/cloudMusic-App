<template>
  <div class="moreSheet">
    <menu-nav class="nav" :navTitle="'歌单广场'"></menu-nav>
    <scrollnav
      class="snav"
      @tabToggle="tabToggle"
      :itemList="tagsList"
      :firstIndex="0"
    ></scrollnav>
    <div class="content">
      <sheet-item
        class="sheetitem"
        @click.native="toClick(item.id)"
        v-for="(item, index) in sheetDetail"
        :key="index"
        :sheetItem="item"
        :isSheet="true"
      ></sheet-item>
    </div>
  </div>
</template>

<script>
import menuNav from "components/context/menuNav/MenuNav";
import sheetItem from "components/context/sheetItem/SheetItem";
import scrollnav from "components/context/scrollNav/ScrollNav";
import mui from "assets/mui/js/mui.min.js"; // 引入 mui js 文件

import { toStringNum } from "common/common";
import { getHotSheet, getSheetTags } from "network/discover";

// 引入滑动模块
// .mui-scroll-wrapper 表示需要进行滑动的区域
mui(".mui-scroll-wrapper").scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

export default {
  name: "moreSheet",
  data() {
    return {
      tagsList: ["全部"], // 歌单分类列表
      aindex: 0,
      offset: 0,
      sheetDetail: [], // 歌单信息
      more: true, // 查看是否更多数据
      index: 0, // 切换索引
    };
  },
  components: {
    menuNav,
    sheetItem,
    scrollnav,
  },
  methods: {
    tabToggle(index) {
      if (this.index !== index) {
        this.sheetDetail = []; // 清空数据
        this.getSheet(index);
      }
      this.index = index;
    },

    // 歌单详情页跳转
    toClick(id) {
      this.$router.push("/playDetail/" + id + "&" + false);
    },

    // 获取歌单
    getSheet(index) {
      if (this.more) {
        getHotSheet("hot", this.tagsList[index], 30, this.offset * 30).then(
          (res) => {
            this.more = res.data.more;
            for (const item of res.data.playlists) {
              this.sheetDetail.push({
                id: item.id, // 歌单id
                rcmdtext: item.name, // 歌单名称
                picUrl: item.coverImgUrl, // 封面
                playCount: toStringNum(item.playCount), // 播放量
              });
            }
            this.$loading.loadingNo();
            this.offset++;
          }
        );
      } else {
        this.$toast.show("没有更多歌单啦", 1900);
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
          this.getSheet(this.index);
          this.$loading.loadingNo();
        }, 1000);
      }
    },
  },
  created() {
    // 标签栏
    getSheetTags().then((res) => {
      for (const item of res.data.tags) {
        this.tagsList.push(item.name);
      }
    });

    // 获取全部歌单数据
    getHotSheet("hot", "全部", 30, this.offset * 30).then((res) => {
      for (const item of res.data.playlists) {
        this.sheetDetail.push({
          id: item.id, // 歌单id
          rcmdtext: item.name, // 歌单名称
          picUrl: item.coverImgUrl, // 封面
          playCount: toStringNum(item.playCount), // 播放量
        });
      }
      this.offset++;
    });
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

    // 绑定滚动事件
    document.addEventListener("scroll", this.linearScroll);
  },
  deactivated () {
    document.removeEventListener("scroll", this.linearScroll)
  }
};
</script>
<style scoped>
.snav {
  position: fixed;
  top: 44px;
  z-index: 10;
  /* margin-top: 44px; */
}
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.mui-content {
  position: fixed;
  top: 1.171771rem;
  left: 0;
  right: 0;
  z-index: 10;
}
#slider {
  height: 1.091877rem;
  background-color: #fff;
}
#sliderSegmentedControl {
  height: 100%;
}
.moreSheet {
  touch-action: none;
  width: 100%;
  background-color: #fff;
}
.activeBorder {
  box-sizing: border-box;
  border-bottom: 2px solid red;
}
.active {
  color: red;
  box-sizing: border-box;
  border-bottom: 2px solid red;
}
.content {
  padding: 0.266312rem 0.319574rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 2.396804rem 0 1.331558rem;
  min-height: 13.315579rem;
  background-color: #fff;
}
.sheetitem {
  width: 30%;
  margin-bottom: 0.266312rem;
}
</style>