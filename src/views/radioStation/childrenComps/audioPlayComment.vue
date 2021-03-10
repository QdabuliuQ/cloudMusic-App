<template>
  <div class="audioPlayComment">
    <div class="nav">
      <div class="left" @click="back">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div class="center">
        {{ commentTitle }}
      </div>
      <div class="rightbox" @click="fxiang">
        <i class="iconfont icon-fenxiang"></i>
      </div>
    </div>
    <mscroll class="conscroll" :scrollY="true">
      <div
        class="content"
        v-if="commentList.length > 0"
        v-infinite-scroll="loadComment"
        infinite-scroll-distance="100"
        infinite-scroll-delay="500"
        infinite-scroll-immediate="fasle"
      >
        <div class="item" v-for="(item, index) in commentList" :key="index">
          <div class="topbox">
            <div class="userImg">
              <img v-lazy="item.userImg" alt="" />
            </div>
            <div class="userName">
              <div>
                <div class="name">
                  {{ item.userName }}
                  <img
                    v-if="item.vipType !== 0"
                    src="~assets/img/common/vip1.svg"
                    alt=""
                  />
                </div>
                <div class="addtime">
                  {{ item.time | getTime }}
                </div>
              </div>
            </div>
            <div class="liked">
              <div class="count">
                {{ item.likedCount }}
                <i class="iconfont icon-zan"></i>
              </div>
            </div>
          </div>
          <div class="bottombox">
            <div class="left"></div>
            <div class="right">
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>
      <div v-else class="noComment">还没有评论哦~</div>
    </mscroll>
    <send-comment
      @successComment="successComment"
      :type="type"
      :id="$route.params.id"
      class="SendComment"
    ></send-comment>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
  </div>
</template>

<script>
import mscroll from "components/common/muiScroll/MuiScroll";
import { getCommentAudio } from "network/radioStation";
import sendComment from "components/context/sendComment/SendComment"; // 发送评论
export default {
  props: ["audioId"],
  name: "audioPlayComment",
  data() {
    return {
      showShare: false,
      commentTitle: "",
      commentList: [], // 评论数组
      options: [
        // 分享面板
        [
          { name: "微信", icon: "wechat" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
        ],
      ],
      offset: 0, // 评论分页
      commentLength: 1, // 评论数组数量
      type: 4,
    };
  },
  methods: {
    successComment(commentDetail) {
      this.commentList.unshift({
        content: commentDetail.content, // 评论内容
        likedCount: 0, // 喜欢数量
        time: commentDetail.time, // 发布时间戳
        userImg: commentDetail.avatarUrl, // 用户头像
        userName: commentDetail.nickname, // 用户昵称
        userId: commentDetail.id, // 用户id
        vipType: 0,
      });
    },

    back() {
      this.$emit("toback");
    },

    fxiang() {
      this.showShare = true;
    },

    // 下拉加载
    loadComment() {
      this.$loading.loadingShow();
      this.getComment();
      setTimeout(() => {
        this.$loading.loadingNo();
      });
    },

    getComment() {
      if (this.commentLength > 0) {
        getCommentAudio(this.$route.params.id, 30, this.offset * 30).then(
          (res) => {
            this.commentLength = res.data.comments.length;
            this.commentTitle = "评论(" + res.data.total + ")";
            if (res.data.hotComments) {
              for (const item of res.data.hotComments) {
                this.commentList.push({
                  userImg: item.user.avatarUrl, // 头像
                  userName: item.user.nickname, // 昵称
                  vipType: item.user.vipType, // 是否会员
                  userId: item.user.userId, // 用户id
                  time: item.time, // 发布时间
                  content: item.content, // 评论内容
                  likedCount: item.likedCount, // 点赞数
                });
              }
            }

            if (res.data.comments) {
              for (const item of res.data.comments) {
                this.commentList.push({
                  userImg: item.user.avatarUrl, // 头像
                  userName: item.user.nickname, // 昵称
                  vipType: item.user.vipType, // 是否会员
                  userId: item.user.userId, // 用户id
                  time: item.time, // 发布时间
                  content: item.content, // 评论内容
                  likedCount: item.likedCount, // 点赞数
                });
              }
            }
            this.offset++;
          }
        );
      } else {
        this.$toast.show("没有更多了:(", 1900);
      }
    },
  },
  components: {
    mscroll,
    sendComment,
  },
  created() {
    this.getComment();
  },
};
</script>
<style scoped>
.noComment {
  height: 13.315579rem;
  line-height: 13.315579rem;
  text-align: center;
  font-size: 0.479361rem;
  font-weight: 550;
  color: #9c9c9c;
}
.SendComment {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
}
.audioPlayComment {
  width: 100%;
  height: 100vh;
  background: #fff;
  position: absolute;
  top: 0;
  z-index: 62;
}
.CommentList {
  width: 100%;
  background: #fff;
  position: absolute;
  top: 0;
  z-index: 60;
}
.nav {
  width: 100%;
  height: 1.198402rem;
  display: flex;
  color: #fff;
  background-color: rgb(212, 81, 74);
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.5);
}
.left {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.left .iconfont {
  font-size: 0.426667rem;
  color: #fff;
}
.center {
  flex: 7;
  line-height: 1.198402rem;
  font-size: 0.45273rem;
}
.rightbox {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.rightbox .iconfont {
  font-size: 0.426667rem;
  color: #fff;
}
.comment {
  height: 13.848202rem;
}
.content {
  padding: 0.426099rem 0.319574rem;
}
.topbox {
  width: 100%;
  height: 1.065246rem;
  display: flex;
}
.userImg {
  flex: 1.3;
}
.userName {
  flex: 5;
  font-size: 0.346205rem;
  display: flex;
  align-items: center;
}
.name {
  position: relative;
  margin-bottom: .08rem;
}
.name img {
  height: 0.639148rem;
  margin-left: 0.079893rem;
  position: absolute;
  top: -0.079893rem;
}
.liked {
  flex: 2.2;
  display: flex;
  align-items: center;
  position: relative;
}
.addtime {
  font-size: 0.319574rem;
  color: #8b8b8b;
  margin-top: -0.106525rem;
}
.userImg img {
  width: 1.065246rem;
  height: 1.065246rem;
  border-radius: 50%;
  overflow: hidden;
}
.count {
  color: #8b8b8b;
  font-size: 0.372836rem;
  position: absolute;
  right: 0;
}
.count .iconfont {
  font-size: .32rem;
}
.bottombox {
  width: 100%;
  display: flex;
  padding-bottom: 0.186418rem;
}
.left {
  flex: 1.3;
}
.right {
  flex: 7;
  font-size: 0.364847rem;
  padding-bottom: 0.186418rem;
  margin-top: 0.186418rem;
  line-height: .48rem;
  border-bottom: 1px solid rgb(230, 230, 230);
}
.conscroll {
  top: 1.198402rem;
  background-color: #fff;
  height: calc(100vh - 1.065246rem - 1.065246rem);
}
</style>