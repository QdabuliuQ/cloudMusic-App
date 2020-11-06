<template>
  <div class="Hotcomment">
    <div
      class="commentBox"
      :style="{ background: 'url(' + item.songCoverUrl + ')' }"
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="zhez"></div>
      <div class="content">
        <div class="topbox" @click="toUser(item.userId)">
          <img :src="item.avatar" alt="" />
          <span>{{ item.nickname }}</span>
        </div>
        <div class="fuhao">“</div>
        <div class="textBox">{{item.content}}</div>
        <div class="time">{{item.time | getTime('YYYY年MM月DD日')}}</div>
        <div class="music" @click="toMusic(item.songId)">
          <img :src="item.songCoverUrl" alt="">
          <div class="singer">{{item.songName}} - <span v-for="(singer,index) in item.singers" :key="index">{{ index !== item.singers.length - 1 ? singer.name + ' / ' : singer.name }}</span></div>
        </div>
        <div class="bottomDetail">
          <div class="detailbox">
            <div class="like">
              <img src="~assets/img/cloudVillage/dianzan.svg" alt="">
              <span>{{item.likedCount}}</span>
            </div>
            <div class="like">
              <img src="~assets/img/cloudVillage/pinglun.svg" alt="">
              <span>{{item.replyCount}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotwall } from "network/cloudVillage";
export default {
  name: "Hotcomment",
  data() {
    return {
      list: [],
    };
  },
  created() {
    getHotwall(this.$store.state.cookie).then((res) => {
      for (const item of res.data.data) {
        this.list.push({
          id: item.id,
          likedCount: item.likedCount < 1000 ? item.likedCount : '999+', // 点赞数
          replyCount: item.replyCount < 1000 ? item.replyCount : '999+', // 评论数
          content: item.content, // 评论内容
          threadId: item.threadId, // 评论id
          time: item.time, // 发布时间
          songName: item.simpleResourceInfo.name, // 歌曲名称
          singers: item.simpleResourceInfo.artists, // 歌手名称
          songCoverUrl: item.simpleResourceInfo.songCoverUrl, // 歌曲封面
          songId: item.simpleResourceInfo.songId, // 歌曲id
          avatar: item.simpleUserInfo.avatar, // 用户头像
          nickname: item.simpleUserInfo.nickname, // 用户昵称
          userId: item.simpleUserInfo.userId, // 用户id
        });
      }
    });
  },
  methods: {
    // 路由跳转
    toMusic(id){
      this.$router.push('/playSong/' + id)
    },

    toUser(id){
      this.$router.push('/Information/' + id)
    }
  }
};
</script>
<style scoped>
.commentBox {
  width: 100%;
  padding: .319574rem;
  margin-bottom: .399467rem;
  position: relative;
  border-radius: .266312rem;
  overflow: hidden;
  box-shadow: 0 5px 4px rgba(121, 121, 121, 0.322);
}
.topbox {
  width: 100%;
  height: 0.798935rem;
  line-height: 0.798935rem;
  font-size: 0.346205rem;
  color: #fff;
}
.zhez {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.705);
}
.content{
  position: relative;
  z-index: 11;
}
.topbox img {
  width: 0.798935rem;
  height: 0.798935rem;
  border-radius: 50%;
  margin-right: 0.186418rem;
  float: left;
}
.fuhao{
  width: 100%;
  height: .532623rem;
  font-size: 2.130493rem;
  line-height: 60px;
  color: rgb(150, 150, 150);
  margin: .399467rem 0 .213049rem;
}
.textBox{
  width: 100%;
  color: #fff;
  font-size: .45273rem;
  letter-spacing: 1px;
  line-height: .932091rem;
  font-weight: 550;
  margin-bottom: .213049rem;
}
.music{
  width: 100%;
  height: .798935rem;
  display: flex;
  align-items: center;
  color: #868686;
  font-size: .346205rem;
}
.music img{
  width: .798935rem;
  height: 100%;
  border-radius: 50%;
  float: left;
  margin-right: .186418rem;
}
.time{
  width: 100%;
  height: .532623rem;
  line-height: .532623rem;
  text-align: right;
  font-size: .346205rem;
  color: #868686;
  margin-bottom: .399467rem;
}
.singer{
  width: 7.456724rem;
  overflow: hidden;
  height: .798935rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: .798935rem;
}
.bottomDetail{
  width: 100%;
  height: .532623rem;
  margin-top: .186418rem;
}
.detailbox{
  width: 50%;
  height: 100%;
  float: right;
}
.like{
  width: 50%;
  height: 100%;
  float: left;
  line-height: .585885rem;
  color: #fff;
  font-size: .359521rem;
}
.like img{
  width: .505992rem;
  float: left;
  margin-right: .186418rem;
}
</style>