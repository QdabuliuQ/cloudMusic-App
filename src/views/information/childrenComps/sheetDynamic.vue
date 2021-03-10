<template>
  <div class="sheetDynamic">
    <div class="left">
      <div class="useImg">
        <img :src="userImg" alt="" />
      </div>
    </div>
    <div class="right">
      <div class="title">
        <span>{{ nickName }} </span>分享歌单:
      </div>
      <div class="time">{{ time | getTime }}</div>
      <div class="content" v-if="events.msg !== ''">{{ events.msg }}</div>
      <div class="box" @click="toSheet(events.playlist.id)">
        <div class="contentbox" v-if="events.playlist !== undefined">
          <div class="conLeft">
            <img :src="events.playlist.coverImgUrl" alt="" />
          </div>
          <div class="conRight">
            <div class="flexBox">
              <div class="songName">
                <div class="tag">歌单</div>
                {{ events.playlist.name }}
              </div>
              <div class="singer">
                <span>
                  {{
                    "by " + events.playlist.creator.nickname
                  }}
                  &nbsp;&nbsp;&nbsp;
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <events-count
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
  name: "sheetDynamic",
  methods: {
    toSheet(id) {
      this.$router.push("/playDetail/" + id +'&'+ false);
    },

    sComment() {
      this.$store.state.commentId = this.threadId;
    },
  },
  components: {
    eventsCount,
  },
};
</script>
<style scoped>
.sheetDynamic {
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
  margin-top: .133333rem;
  height: .4rem;
  font-size: .32rem;
  color: #000;
}
.title span {
  font-size: .32rem;
  color: rgb(34, 110, 197);
}
.time {
  font-size: .32rem;
  color: rgb(158, 158, 158);
}
.content {
  font-size: 15px;
  margin-top: 0.213049rem;
}
.box {
  width: 100%;
  height: 1.331558rem;
  background-color: var(--boxColor);
  border-radius: 0.133156rem;
  margin-top: 0.213049rem;
  display: flex;
  align-items: center;
}
.contentbox {
  margin: 0 auto;
  width: 95%;
  height: 1.065246rem;
  display: flex;
}
.conLeft {
  flex: 1.8;
}
.conLeft img {
  width: 1.065246rem;
  height: 1.065246rem;
  border-radius: 5px;
}
.conRight {
  flex: 8.2;
  display: flex;
  align-items: center;
}
.flexBox {
  position: relative;
  top: 0.053262rem;
}
.songName {
  font-size: .346667rem;
  color: #000;
  width: 5.858855rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 0.479361rem;
  line-height: 0.479361rem;
}
.singer {
  font-size: 0.319574rem;
  color: rgb(131, 131, 131);
  width: 5.858855rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 0.479361rem;
  line-height: 0.479361rem;
}
.tag {
  float: left;
  padding: 2px;
  font-size: 0.319574rem;
  position: relative;
  top: -0.066578rem;
  color: #da231b;
  border-radius: 5px;
  border: 1px solid #da231b;
  transform: scale(0.7);
}
</style>