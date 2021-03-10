<template>
  <div class="musicDynamic">
    <div class="left">
      <div class="useImg">
        <img :src="userImg" alt="" />
      </div>
    </div>
    <div class="right">
      <div class="title">
        <span class="blueActive">{{ nickName }} </span>分享单曲:
      </div>
      <div class="time">{{ time | getTime }}</div>
      <div class="content" v-if="events.msg !== ''" v-html="name"></div>
      <div class="musicbox" @click="toPlay(events.song.id)">
        <div class="musicContent">
          <div class="conLeft">
            <img :src="events.song.album.blurPicUrl" alt="" />
          </div>
          <div class="conRight">
            <div class="flexBox">
              <div class="songName">
                {{ events.song.name }}
              </div>
              <div class="singer">
                <span v-for="(item, index) in events.song.artists" :key="index">
                  {{ item.name }} &nbsp;&nbsp;&nbsp;
                </span>
              </div>
            </div>
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
import { getSongDetial } from "network/played";
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
  name: "musicDynamic",
  components: {
    eventsCount,
  },
  data() {
    return {
      name: "",
      index: 0,
    };
  },
  methods: {
    toPlay(id) {
      this.$router.push("/playSong/" + id);
    },

    userName() {
      var reg = /@.*?(?=\:)/g;
      if (reg.test(this.events.msg)) {
        let arr = this.events.msg.match(reg);
        if (arr !== null) {
          for (let i = 0; i < arr.length; i++) {
            this.name = this.events.msg.replace(
              reg,
              '<span class="blueActive uname">' + arr[i] + "</span>"
            );
          }
        }
      } else {
        this.name = this.events.msg
      }
    },

    sComment(){
      this.$store.state.commentId = this.threadId
    }
  },
  created() {
    this.userName();
  },
  mounted() {
    setTimeout(() => {
      for (
        let j = 0;
        j < document.getElementsByClassName("uname").length;
        j++
      ) {
        document.getElementsByClassName("uname")[j].style = "color: #226ec5";
      }
    }, 300);
  },
};
</script>
<style scoped>
.musicDynamic {
  width: 100%;
  display: flex;
  padding-bottom: .266667rem;
  border-bottom: 1px solid #e6e6e6;
  margin-top: 0.399467rem;
}
.flexBox {
  position: relative;
  top: 0.053262rem;
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
  width: 7.723036rem;
  flex: 8.5;
}
.title {
  font-size: .32rem;
  color: #000;
  margin-top: .16rem;
  height: .4rem;
}
.blueActive {
  font-size: .32rem;
  color: #226ec5;
}
.time {
  font-size: .32rem;
  color: rgb(158, 158, 158);
  height: .4rem;
}
.content {
  width: 7.723036rem;
  font-size: .36rem;
  line-height: .506667rem;
  margin-top: 0.213049rem;
  word-wrap:break-word;
}
.musicbox {
  width: 100%;
  height: 1.331558rem;
  background-color: var(--boxColor);
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
  font-size: .32rem;
  color: rgb(131, 131, 131);
  width: 5.858855rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 0.479361rem;
  line-height: 0.479361rem;
}
</style>