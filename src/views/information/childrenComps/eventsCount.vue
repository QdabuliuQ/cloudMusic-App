<template>
  <div class="eventsCount">
    <div class="content">
      <div class="left">
        <img src="~assets/img/information/events/fx.svg" alt="" />
        {{ shareCount == 0 ? "转发" : shareCount }}
      </div>
      <div class="center" @click="showComment">
        <img src="~assets/img/information/events/pl.svg" alt="" />
        {{ commentLength == 0 ? "评论" : commentLength }}
      </div>
      <div class="right">
        <img src="~assets/img/information/events/dz.svg" alt="" />
        {{ likedCount == 0 ? "赞" : likedCount }}
      </div>
    </div>
    <commentBox ref="commentList"></commentBox>
  </div>
</template>

<script>
import commentBox from "components/context/commentBox/CommentBox";

export default {
  props: ["commentLength", "likedCount", "shareCount", "threadId"],
  name: "eventsCount",
  data() {
    return {};
  },
  beforeRouteUpdate(to, from, next) {
    if (to.fullPath != from.fullPath) {
      this.$refs.commentList.show = false;
    //   this.$store.state.isShowNav = true;
      next()
    }
  },
  methods: {
    showComment() {
      this.$emit("sComment");
      this.$refs.commentList.show = true;
    },
  },
  components: {
    commentBox,
  },
  created() {
    // this.commentId = this.threadId
  },
};
</script>
<style scoped>
.eventsCount {
  width: 100%;
  height: 0.665779rem;
  display: flex;
  align-items: center;
  margin-top: 0.399467rem;
}
.content {
  display: flex;
  width: 100%;
  height: 85%;
  font-size: 0.346205rem;
}
.content img {
  float: left;
  position: relative;
  top: 2px;
  margin-right: 0.266312rem;
}
.left {
  flex: 1;
  line-height: 0.559254rem;
}
.center {
  flex: 1;
  line-height: 0.559254rem;
}
.right {
  flex: 1;
  line-height: 0.559254rem;
}
</style>