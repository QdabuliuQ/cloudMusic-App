<template>
  <div class="dynamic" v-if="eventList.length !== 0">
    <div class="eventBox" v-for="(item, index) in eventList" :key="index">
      <!-- 歌曲分享组件 -->
      <music-dynamic
        v-if="item.type === 18"
        :threadId="item.threadId"
        :commentLength="item.commentLength"
        :likedCount="item.likedCount"
        :shareCount="item.shareCount"
        :events="item.events"
        :time="item.eventTime"
        :userImg="userImg"
        :nickName="nickName"
      ></music-dynamic>

      <!-- 评论分享组件 -->
      <comment-dynamic
        v-if="item.type === 31"
        :threadId="item.threadId"
        :commentLength="item.commentLength"
        :likedCount="item.likedCount"
        :shareCount="item.shareCount"
        :events="item.events"
        :time="item.eventTime"
        :userImg="userImg"
        :nickName="nickName"
      ></comment-dynamic>

      <!-- 歌单分享组件 -->
      <sheet-dynamic
        v-if="item.type === 13"
        :threadId="item.threadId"
        :commentLength="item.commentLength"
        :likedCount="item.likedCount"
        :shareCount="item.shareCount"
        :events="item.events"
        :time="item.eventTime"
        :userImg="userImg"
        :nickName="nickName"
      ></sheet-dynamic>

      <!-- 节目分享组件 -->
      <program-dynamic
        v-if="item.type === 17"
        :threadId="item.threadId"
        :commentLength="item.commentLength"
        :likedCount="item.likedCount"
        :shareCount="item.shareCount"
        :events="item.events"
        :time="item.eventTime"
        :userImg="userImg"
        :nickName="nickName"
      ></program-dynamic>

      <!-- 视频分享组件 -->
      <video-dynamic
        v-if="item.type === 41"
        :threadId="item.threadId"
        :commentLength="item.commentLength"
        :likedCount="item.likedCount"
        :shareCount="item.shareCount"
        :events="item.events"
        :time="item.eventTime"
        :userImg="userImg"
        :nickName="nickName"
      ></video-dynamic>

      <!-- 发布视频 -->
      <relvideo-dynamic
        v-if="item.type === 39"
        :threadId="item.threadId"
        :commentLength="item.commentLength"
        :likedCount="item.likedCount"
        :shareCount="item.shareCount"
        :events="item.events"
        :time="item.eventTime"
        :userImg="userImg"
        :nickName="nickName"
      ></relvideo-dynamic>

      <!-- 专栏文章 -->
      <article-dynamic
        v-if="item.type === 24"
        :threadId="item.threadId"
        :commentLength="item.commentLength"
        :likedCount="item.likedCount"
        :shareCount="item.shareCount"
        :events="item.events"
        :time="item.eventTime"
        :userImg="userImg"
        :nickName="nickName"
      ></article-dynamic>

      <!-- 分享动态 -->
      <life-dynamic
        v-if="item.type === 35"
        :threadId="item.threadId"
        :commentLength="item.commentLength"
        :likedCount="item.likedCount"
        :shareCount="item.shareCount"
        :events="item.events"
        :time="item.eventTime"
        :userImg="userImg"
        :nickName="nickName"
        :pics="item.pics"
      ></life-dynamic>

      <!-- mv分享 -->
      <mv-dynamic
        v-if="item.type === 21"
        :threadId="item.threadId"
        :commentLength="item.commentLength"
        :likedCount="item.likedCount"
        :shareCount="item.shareCount"
        :events="item.events"
        :time="item.eventTime"
        :userImg="userImg"
        :nickName="nickName"
        :pics="item.pics"
      ></mv-dynamic>

      <!-- 转发 -->
      <forward-dynamic
        v-if="item.type === 22"
        :threadId="item.threadId"
        :commentLength="item.commentLength"
        :likedCount="item.likedCount"
        :shareCount="item.shareCount"
        :events="item.events"
        :time="item.eventTime"
        :userImg="userImg"
        :nickName="nickName"
        :pics="item.pics"
      ></forward-dynamic>

      <!-- 电台分享 -->
      <djradio-dynamic
        v-if="item.type === 28"
        :threadId="item.threadId"  
        :commentLength="item.commentLength"
        :likedCount="item.likedCount"
        :shareCount="item.shareCount"
        :events="item.events"
        :time="item.eventTime"
        :userImg="userImg"
        :nickName="nickName"
        :pics="item.pics"
      ></djradio-dynamic>

      <!-- 专辑分享 -->
      <album-dynamic
        v-if="item.type === 19"
        :threadId="item.threadId"
        :commentLength="item.commentLength"
        :likedCount="item.likedCount"
        :shareCount="item.shareCount"
        :events="item.events"
        :time="item.eventTime"
        :userImg="userImg"
        :nickName="nickName"
        :pics="item.pics"
      ></album-dynamic>
    </div>
  </div>
  <div v-else class="noEvent">暂时还没有动态哦</div>
</template>

<script>
import { getUserEvent } from "network/user";

// 分享组件
import musicDynamic from "./musicDynamic"; // 音乐
import commentDynamic from "./commentDynamic"; // 评论
import sheetDynamic from "./sheetDynamic"; // 歌单
import programDynamic from "./programDynamic"; // 节目
import videoDynamic from "./videoDynamic"; // 视频
import relvideoDynamic from "./relvideoDynamic"; // 发布视频
import articleDynamic from "./articleDynamic"; // 专栏文章
import lifeDynamic from "./lifeDynamic"; // 动态
import mvDynamic from "./mvDynamic"; // mv
import forwardDynamic from "./forwardDynamic"; // 转发
import djradioDynamic from "./djradioDynamic"; // 电台
import albumDynamic from "./albumDynamic"; // 专辑

export default {
  props: ["userImg", "nickName"],
  name: "dynamic",
  data() {
    return {
      eventList: [], // 动态数组
      lastTime: -1, // 分页参数
      moreEvent: true, // 是否有更多动态数据
    };
  },
  beforeRouteUpdate(to, from, next) {
    if (to.fullPath != from.fullPath) {
      this.eventList = []; // 清空mv数据
      next();
      this.UserEvent()
    }
  },
  components: {
    musicDynamic,
    commentDynamic,
    sheetDynamic,
    programDynamic,
    videoDynamic,
    relvideoDynamic,
    articleDynamic,
    lifeDynamic,
    mvDynamic,
    forwardDynamic,
    djradioDynamic,
    albumDynamic,
  },
  methods: {
    UserEvent() {
      if (this.moreEvent) {
        getUserEvent(this.$route.params.uid, 30, this.lastTime).then((res) => {
          for (const item of res.data.events) {
            // 18 分享单曲
            // 19 分享专辑
            // 17 分享电台节目
            // 28 分享电台
            // 22 转发
            // 39 发布视频
            // 13 分享歌单
            // 35 动态
            // 24 分享专栏文章
            // 41、21 分享视频 / mv
            // 31 分享评论
            this.eventList.push({
              events: JSON.parse(item.json),
              type: item.type, // 分享类型
              eventTime: item.eventTime, // 发表时间
              commentLength: item.info.commentCount, // 评论数量
              likedCount: item.info.likedCount, // 点赞数量
              shareCount: item.info.shareCount, // 分享数量
              pics: item.pics, // 图片数组
              threadId: item.info.commentThread.id,  // 动态评论id
            });
          }
          this.lastTime = res.data.lasttime; // 保存请求到的分页参数
          this.moreEvent = res.data.more; // 布尔值 决定是否有更多数据
        });
      } else {
        this.$toast.show("没有更多动态了~", 1900);
      }
    },

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
          this.UserEvent();
          this.$loading.loadingNo();
        }, 1000);
      }
    },
  },
  created() {
    this.$loading.loadingShow();
    this.UserEvent();
  },
  mounted() {
    this.$nextTick(() => {
      this.$loading.loadingNo();
      window.addEventListener("scroll", this.linearScroll);
    });
  },
  // 销毁组件
  destroyed: function () {
    // 离开页面清除（移除）滚轮滚动事件
    window.removeEventListener("scroll", this.linearScroll);
  },
};
</script>
<style scoped>
.dynamic {
  width: 100%;
  padding: 0 15px 15px;
  margin-bottom: 1.198402rem;
  position: relative;
}
.eventBox {
  padding-bottom: 0.266312rem;
}
.noEvent {
  width: 100%;
  height: 7.989348rem;
  text-align: center;
  line-height: 7.989348rem;
  color: #8b8b8b;
  font-size: 0.399467rem;
}
</style>