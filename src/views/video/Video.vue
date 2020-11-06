<template>
  <div class="Video">
    <scrollnav
      ref="videoNav"
      class="snav"
      :itemList="itemList"
      :firstIndex="0"
      @tabToggle="tabToggle"
    ></scrollnav>
    <div class="content" v-if="hasmore">
      <mv-item
        :vedioList="vedioList"
        :isShowDetail="true"
        :isShowTag="false"
        :isMv="false"
      ></mv-item>
    </div>
    <div class="nocontent" v-else>
      {{ msg }}
    </div>
  </div>
</template>

<script>
import scrollnav from "components/context/scrollNav/ScrollNav"; // 导航栏
import mvItem from "components/context/mv/MvItem"; // 视频组件

import { toStringNum, durationTime } from "common/common";
import { videoCategory, getDetail } from "network/video";
export default {
  name: "Video",
  data() {
    return {
      itemList: [0], // 分类列表
      itemId: [], // id列表
      offset: 0, // 分页
      withCredentials: true,
      vedioList: [], // 视频数组
      activeId: 0, // 处于活跃状态的分类
      activeIndex: 0, // 处于活跃状态的分类
      hasmore: true, // 是否有数据
      msg: "", // 提示
      more: true,
    };
  },
  components: {
    scrollnav,
    mvItem,
  },
  methods: {
    // 导航栏切换
    tabToggle(index) {
      // 判断是否切换导航栏
      if (this.activeIndex !== index) {
        this.more = true;
        this.vedioList = []; // 清空数组
        this.offset = 0; // 清空页数
        this.getVideoDetail(this.itemId[index]); // 调用方法
      }
      this.activeIndex = index;
    },

    // 封装方法
    getVideoDetail(id) {
      if (this.more) {
        getDetail(id, this.offset, this.$store.state.cookie).then((res) => {
          this.$loading.loadingShow();
          this.hasmore = res.data.hasmore;
          this.more = res.data.hasmore;
          this.msg = res.data.msg;
          for (const item of res.data.datas) {
            this.vedioList.push({
              imgurl16v9: item.data.coverUrl, // 封面
              playCount: toStringNum(item.data.playTime), // 播放量
              duration: durationTime(item.data.durationms), // 时长
              name: item.data.title, // 标题
              id: item.data.vid, // vid
              avatarUrl: item.data.creator.avatarUrl, // 作者头像
              nickname: item.data.creator.nickname, // 作者昵称
              praisedCount: item.data.praisedCount, // 点赞数
              commentCount: item.data.commentCount, // 评论数
            });
          }
          this.offset++;
          this.$nextTick(() => {
            this.$loading.loadingNo();
          });
        });
      } else {
        this.$toast.show("没有更多了:(", 1900);
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
        setTimeout(() => {
          this.getVideoDetail(this.activeId);
        }, 1000);
      }
    },
  },
  created() {
    videoCategory().then((res) => {
      this.itemList = []; // 清空数组内容
      this.activeId = res.data.data[0].id; // 保存第一项id
      for (let i = 0; i < 13; i++) {
        this.itemList.push(res.data.data[i].name);
        this.itemId.push(res.data.data[i].id);
      }

      // 视频列表
      this.getVideoDetail(this.itemId[0]);
    });
  },
  activated() {
    this.$nextTick(() => {
      document.addEventListener("scroll", this.linearScroll);
    });
  },
  deactivated() {
    document.removeEventListener("scroll", this.linearScroll);
  },
};
</script>
<style scoped>
.Video {
  width: 100%;
  background-color: #fff;
}
.snav {
  background-color: #fff;
  top: 44px;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 12;
}
.content {
  margin-top: 2.237017rem;
  margin-bottom: 1.198402rem;
}
.nocontent {
  width: 100%;
  min-height: 17.310253rem;
  font-size: 0.532623rem;
  background-color: #fff;
  text-align: center;
  line-height: 17.310253rem;
}
</style>