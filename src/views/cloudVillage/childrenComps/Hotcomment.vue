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
        <div class="textBox">{{ item.content }}</div>
        <div class="time">{{ item.time | getTime("YYYY年MM月DD日") }}</div>
        <div class="music" @click="toMusic(item.songId)">
          <img :src="item.songCoverUrl" alt="" />
          <div class="singer">
            {{ item.songName }} -
            <span v-for="(singer, index) in item.singers" :key="index">{{
              index !== item.singers.length - 1
                ? singer.name + " / "
                : singer.name
            }}</span>
          </div>
        </div>
        <div class="bottomDetail">
          <div class="detailbox">
            <div class="like">
              <img src="~assets/img/cloudVillage/dianzan.svg" alt="" />
              <span>{{ item.likedCount }}</span>
            </div>
            <div class="like" @click="CommentFloor(item.id, item.songId)">
              <img src="~assets/img/cloudVillage/pinglun.svg" alt="" />
              <span>{{ item.replyCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <comment-list
      @loadingComment="loadingComment"
      :comLength="comLength"
      :isComment="true"
      :type="0"
      :t="2"
      ref="listShow"
      :comList="commentList"
    ></comment-list>
  </div>
</template>

<script>
import commentList from "components/context/commentList/CommentList";
import { getHotwall, getCommentFloor } from "network/cloudVillage";
export default {
  name: "Hotcomment",
  data() {
    return {
      list: [],
      time: 0, // 分页参数
      comLength: "",
      commentList: [],
      threadId: 0, // 评论id
      songId: 0, // 资源id
      hasMore: true, // 更多评论
    };
  },
  created() {
    getHotwall(this.$store.state.cookie).then((res) => {
      for (const item of res.data.data) {
        this.list.push({
          id: item.id,
          likedCount: item.likedCount < 1000 ? item.likedCount : "999+", // 点赞数
          replyCount: item.replyCount < 1000 ? item.replyCount : "999+", // 评论数
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
    // 加载评论
    loadingComment() {
      this.CommentFloor(this.threadId, this.songId);
    },

    // 路由跳转
    toMusic(id) {
      this.$router.push("/playSong/" + id);
    },

    toUser(id) {
      this.$router.push("/Information/" + id);
    },

    // 获取评论
    CommentFloor(threadId, songId) {
      this.songId = songId;
      this.$refs.listShow.toggle();
      if (this.threadId !== threadId) {
        this.$store.state.threadId = threadId; // 评论id
        
        this.$store.state.typeId = songId; // 资源id
        this.commentList = []; // 清空数组
        this.time = 0; // 清空分页参数
        getCommentFloor(threadId, songId, 0, 50, this.time).then((res) => {
          for (const item of res.data.data.comments) {
            this.commentList.push({
              content: item.content,
              avatarUrl: item.user.avatarUrl,
              userId: item.user.userId,
              nickname: item.user.nickname,
              time: item.time,
              likedCount: item.likedCount,
              content: item.content,
            });
          }
          this.comLength = "评论(" + res.data.data.totalCount + ")";
          this.time = res.data.data.time; // 分页参数
          this.hasMore = res.data.data.hasMore; // 更多数据
        });
      } else {
        if (this.hasMore) {
          getCommentFloor(threadId, songId, 0, 50, this.time).then((res) => {
            for (const item of res.data.data.comments) {
              this.commentList.push({
                content: item.content,
                avatarUrl: item.user.avatarUrl,
                userId: item.user.userId,
                nickname: item.user.nickname,
                time: item.time,
                likedCount: item.likedCount,
                content: item.content,
              });
            }
            this.time = res.data.data.time; // 分页参数
            this.hasMore = res.data.data.hasMore; // 更多数据
          });
        } else {
          this.$toast.show("没有更多了:(", 1900);
        }
      }
      this.threadId = threadId;
    },
  },
  components: {
    commentList,
  },
};
</script>
<style scoped>
.commentBox {
  width: 100%;
  padding: 0.319574rem;
  margin-bottom: 0.399467rem;
  position: relative;
  border-radius: 0.266312rem;
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
.content {
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
.fuhao {
  width: 100%;
  height: 0.532623rem;
  font-size: 2.130493rem;
  line-height: 60px;
  color: rgb(150, 150, 150);
  margin: 0.399467rem 0 0.213049rem;
}
.textBox {
  width: 100%;
  color: #fff;
  font-size: 0.45273rem;
  letter-spacing: 1px;
  line-height: 0.932091rem;
  font-weight: 550;
  margin-bottom: 0.213049rem;
}
.music {
  width: 100%;
  height: 0.798935rem;
  display: flex;
  align-items: center;
  color: #868686;
  font-size: 0.346205rem;
}
.music img {
  width: 0.798935rem;
  height: 100%;
  border-radius: 50%;
  float: left;
  margin-right: 0.186418rem;
}
.time {
  width: 100%;
  height: 0.532623rem;
  line-height: 0.532623rem;
  text-align: right;
  font-size: 0.346205rem;
  color: #868686;
  margin-bottom: 0.399467rem;
}
.singer {
  width: 7.456724rem;
  overflow: hidden;
  height: 0.798935rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 0.798935rem;
}
.bottomDetail {
  width: 100%;
  height: 0.532623rem;
  margin-top: 0.186418rem;
}
.detailbox {
  width: 50%;
  height: 100%;
  float: right;
}
.like {
  width: 50%;
  height: 100%;
  float: left;
  line-height: 0.585885rem;
  color: #fff;
  font-size: 0.359521rem;
}
.like img {
  width: 0.505992rem;
  float: left;
  margin-right: 0.186418rem;
}
</style>