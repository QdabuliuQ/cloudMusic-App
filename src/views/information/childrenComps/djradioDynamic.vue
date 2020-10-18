<template>
  <div class="djradioDynamic">
    <div class="left">
      <div class="useImg">
        <img :src="userImg" alt="" />
      </div>
    </div>
    <div class="right">
      <div class="title">
        <span class="blueActive">{{ nickName }}</span> 分享电台:
      </div>
      <div class="time">{{ time | getTime }}</div>
      <div class="content" v-if="events.msg !== ''">{{ events.msg }}</div>
      <div class="musicbox" @click="toPlay(events.djRadio.id)">
        <div class="musicContent">
          <div class="conLeft">
            <img :src="events.djRadio.img80x80" alt="" />
          </div>
          <div class="conRight">
            <div class="flexBox">
              <div class="songName">
                <div class="tag">{{ events.djRadio.category }}</div>
                {{ events.djRadio.name }}
              </div>
              <div class="singer">
                <span>
                  {{ events.djRadio.dj.nickname }} &nbsp;&nbsp;&nbsp;
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
    "pics",
  ],
  name: "djradioDynamic",
  components: {
    eventsCount,
  },
  methods: {
    toPlay(id) {
      this.$router.push("/stationDetail/" + id);
    },
  },
};
</script>
<style scoped>
.tag {
  float: left;
  font-size: 0.319574rem;
  padding: 1px 0.079893rem;
  border-radius: 5px;
  border: 1px solid red;
  color: red;
  transform: scale(0.75);
  position: relative;
  top: -2.5px;
}
.flexBox {
  position: relative;
  top: 0.053262rem;
}
.djradioDynamic {
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
.blueActive {
  font-size: 0.399467rem;
  color: #226ec5;
}
.time {
  font-size: 0.346205rem;
  color: rgb(158, 158, 158);
}
.content {
  font-size: 15px;
  margin-top: 0.213049rem;
}
.musicbox {
  width: 100%;
  height: 1.331558rem;
  background-color: #e6e6e6;
  border-radius: 0.133156rem;
  margin-top: 0.213049rem;
  display: flex;
  align-items: center;
}
.musicContent {
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
.songName {
  font-size: 0.399467rem;
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
</style>