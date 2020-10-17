<template>
  <div class="forwardDynamic">
      <div class="left">
      <div class="useImg">
        <img :src="userImg" alt="" />
      </div>
    </div>
    <div class="right">
      <div class="title">
        <span>{{ nickName }} </span>转发:
      </div>
      <div class="time">{{ time | getTime }}</div>
      <div class="content" v-if="events.msg !== ''">{{ events.msg }}</div>
      <div class="forwardBox">
          <div class="topbox">
              <span class="blueActive">{{'@' + events.event.user.nickname + ': '}}</span>
              {{jsonDetail.msg}}
          </div>
          <div class="pics" v-if="events.event.pics.length !== 0">
              <div class="item" @click="showPic" v-for="(item,index) in events.event.pics" :key="index">
                  <img :src="item.format === 'gif' ? item.pcSquareUrl : item.originUrl" alt="">
              </div>
          </div>
          <div class="infoForward" @click="toPlay(jsonDetail.song.id)">
            <div class="info">
              <div class="infoleft">
                <img :src="jsonDetail.song.album.img80x80" alt="">
              </div>
              <div class="inforight">
                <div class="infoDetail">
                  <div class="name">{{jsonDetail.song.name}}</div>
                  <div class="singer">
                    <span v-for="(item,index) in jsonDetail.song.artists" :key="index">
                      {{item.name }}
                    </span>
                  </div>
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
    <van-image-preview class="imgShow" v-model="show" :images="images">
    </van-image-preview>
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
    "pics"
  ],
  data () {
      return {
          jsonDetail: null, 
          show: false,
          images: [],  // 图片数组  
      }
  },
  components: {
    eventsCount
  },
  methods: {
    toPlay(id){
      this.$router.push("/playSong/" + id);
    },

    showPic(){
      this.show = true
      this.$store.state.isShowNav = false;  // 隐藏底部播放栏
    }
  },
  name: "forwardDynamic",
  created () {
      this.jsonDetail = JSON.parse(this.events.event.json)

      for (const item of this.events.event.pics) {
        this.images.push(item.originUrl)
      }
  }
};
</script>
<style scoped>
.infoForward{
  width: 100%;
  height: 1.331558rem;
  background-color: #fff;
  border-radius: .133156rem;
  display: flex;
  align-items: center;
}
.info{
  width: 95%;
  height: 80%;
  margin: auto;
  display: flex;
}
.infoleft{
  flex: 2;
}
.infoleft img{
  width: 1.065246rem;
  height: 1.065246rem;
  border-radius: .133156rem;
}
.inforight{
  flex: 8;
  display: flex;
  align-items: center;
}
.name{
  width: 5.592543rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: .372836rem;
}
.singer{
  width: 5.592543rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: .319574rem;
  color: rgb(139, 139, 139);
}
.blueActive {
  font-size: 0.399467rem;
  color: #226ec5;
}
.pics{
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 0.213049rem;
}
.item{
    width: 32%;
    height: 2.396804rem;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: .186418rem;
}
.item img{
    width: 100%;
    height: 100%;
}
.forwardDynamic {
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
.forwardBox{
    width: 100%;
    padding: .213049rem;
    background-color: #e6e6e6;
    border-radius: .213049rem;
    margin-top: 0.213049rem;
}
.topbox{
    font-size: 0.399467rem;
}
</style>