<template>
  <div class="articleDynamic">
      <div class="left">
      <div class="useImg">
        <img :src="userImg" alt="" />
      </div>
    </div>
    <div class="right">
      <div class="title">
        <span>{{ nickName }} </span>分享专栏文章:
      </div>
      <div class="time">{{ time | getTime }}</div>
      <div class="content" v-if="events.msg !== ''">{{ events.msg }}</div>
      <div class="box">
          <div class="detail">
              <div class="leftDetail">
                  <div class="textbox">
                      <div class="mianTitle">
                          {{events.topic.title}}
                      </div>
                      <div class="creator">
                          {{'by ' + events.topic.creator.nickname}}
                      </div>
                  </div>
              </div>
              <div class="rightDetail">
                  <img :src="events.topic.rectanglePicUrl" alt="">
              </div>
          </div>
      </div>
      <events-count
        @sComment='sComment'
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
    "threadId"
  ],
  name: "articleDynamic",
  components: {
      eventsCount
  },
  methods: {
    sComment(){
      this.$store.state.commentId = this.threadId
    }
  }
};
</script>
<style scoped>
.articleDynamic {
  width: 100%;
  display: flex;
  padding-bottom: 0.399467rem;
  margin-top: 0.399467rem;
  border-bottom: 1px solid #e6e6e6;
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
.box{
    width: 100%;
    height: 2.396804rem;
    background-color: rgb(230, 230, 230);
    margin-top: 0.213049rem;
    overflow: hidden;
    border-radius: 5px;
    display: flex;
    align-items: center;
}
.detail{
    width: 95%;
    height: 85%;
    display: flex;
    margin: 0 auto;
}
.mianTitle{
    font-size: .372836rem;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}
.creator{
    width: 3.994674rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    color: #696969;
}
.leftDetail{
    flex: 6;
    display: flex;
    align-items: center;
}
.textbox{
    width: 90%;
}
.rightDetail{
    flex: 4;
    overflow: hidden;
    border-radius: 5px;
}
.rightDetail img{
    width: 100%;
    height: 100%;
}
</style>