<template>
  <div class="commentDynamic">
    <div class="left">
      <div class="useImg">
        <img :src="userImg" alt="" />
      </div>
    </div>
    <div class="right">
      <div class="title">
        <span>{{ nickName }} </span>分享评论:
      </div>
      <div class="time">{{ time | getTime }}</div>
      <div class="content" v-if="events.msg !== ''">{{ events.msg }}</div>
      <div class="boxContent">
        <div class="topBox">
          <span class="name">{{
            "@" + events.resource.user.nickname + ": "
          }}</span>
          <span>{{ events.resource.content }}</span>
        </div>
        <div class="bottomBox" @click="toPlay(shareJSON.id)">
          <img :src="shareJSON.album.img80x80" alt="" />
          {{ events.resource.resourceName }}
        </div>
      </div>
      <events-count
        @sComment="sComment"
        :commentLength="commentLength"
        :likedCount="likedCount"
        :shareCount="shareCount"
      ></events-count>
    </div>
  </div>
</template>

<script>
import eventsCount from "./eventsCount"; // 底部动态数据

export default {
  props: [
    "events",
    "userImg",
    "nickName",
    "time",
    "commentLength",
    "likedCount",
    "shareCount",
    "threadId",
  ],
  name: "commentDynamic",
  data() {
    return {
      shareJSON: {},
    };
  },
  methods: {
    toPlay(id) {
      this.$router.push("/playSong/" + id);
    },
    sComment() {
      this.$store.state.commentId = this.threadId;
    },
  },
  created() {
    // 解析 json 数据转为 js对象
    this.shareJSON = JSON.parse(this.events.resource.resourceInfo);
  },
  components: {
    eventsCount,
  },
};
</script>
<style scoped>
.commentDynamic {
  width: 100%;
  display: flex;
  padding-bottom: 0.399467rem;
  border-bottom: 1px solid #e6e6e6;
  margin-top: 0.399467rem;
}
.left {
  flex: 1.5;
}
.useImg {
  width: 1.065246rem;
  height: 1.065246rem;
  border-radius: 50%;
  overflow: hidden;
}
.useImg img {
  width: 100%;
  height: 100%;
}
.right {
  flex: 8.5;
}
.title {
  font-size: 0.399467rem;
  color: #000;
}
.title span {
  font-size: 0.399467rem;
  color: rgb(34, 110, 197);
}
.time {
  font-size: 0.346205rem;
  color: rgb(158, 158, 158);
}
.content {
  font-size: 15px;
  margin-top: 0.213049rem;
}
.boxContent {
  padding: 0.319574rem;
  border: 2px solid;
  border-image: linear-gradient(#bebebe, transparent) 1 90;
  margin-top: 0.213049rem;
}
.topBox {
  font-size: 0.399467rem;
  margin-bottom: 0.532623rem;
}
.topBox .name {
  color: #226ec5;
}
.bottomBox {
  width: 6.790945rem;
  height: 0.798935rem;
  line-height: 0.798935rem;
  font-size: 0.319574rem;
  color: #818181;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bottomBox img {
  width: 0.798935rem;
  height: 0.798935rem;
  border-radius: 5px;
  margin-right: 5px;
  float: left;
}
</style>
