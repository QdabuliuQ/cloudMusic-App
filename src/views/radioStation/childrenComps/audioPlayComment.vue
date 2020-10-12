<template>
  <div class="audioPlayComment">
    <div class="nav">
      <div class="left" @click="back">
        <img src="~assets/img/commentList/fanhui.svg" alt="" />
      </div>
      <div class="center">
        {{ commentTitle }}
      </div>
      <div class="rightbox" @click="fxiang">
        <img src="~assets/img/commentList/fenxiang.svg" alt="" />
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
            <div class="liked">
              <div class="count">
                {{ item.likedCount }}
                <img :src="likedImg" alt="" />
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
    </mscroll>
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
      likedImg: require("assets/img/commentList/zan.svg"),
      commentLength: 1, // 评论数组数量
    };
  },
  methods: {
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
        this.$toast.show('没有更多了:(', 1900)
      }
    },
  },
  components: {
    mscroll,
  },
  created() {
    this.getComment();
  },
};
</script>
<style scoped>
.audioPlayComment {
  width: 100%;
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
  height: 45px;
  display: flex;
  color: #fff;
  background-color: rgb(212, 81, 74);
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.5);
}
.left {
  flex: 1;
}
.left img {
  width: 25px;
  height: 20px;
  position: relative;
  top: 12.5px;
  margin-left: 6px;
}
.center {
  flex: 7;
  line-height: 45px;
  font-size: 17px;
}
.rightbox {
  flex: 1;
}
.rightbox img {
  width: 22px;
  height: 22px;
  position: relative;
  top: 11px;
  margin-left: 9px;
}
.comment {
  height: 520px;
}
.content {
  padding: 16px 12px;
}
.topbox {
  width: 100%;
  height: 40px;
  display: flex;
}
.userImg {
  flex: 1.3;
}
.userName {
  flex: 5;
  font-size: 13px;
  margin-top: 2px;
}
.name {
  position: relative;
}
.name img {
  height: 24px;
  margin-left: 3px;
  position: absolute;
  top: -3px;
}
.liked {
  flex: 2.2;
}
.addtime {
  font-size: 12px;
  color: #8b8b8b;
  margin-top: -4px;
}
.userImg img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}
.count {
  color: #8b8b8b;
  margin-top: 8px;
  font-size: 14px;
  float: right;
}
.count img {
  position: relative;
  top: 1px;
}
.bottombox {
  width: 100%;
  display: flex;
  padding-bottom: 7px;
}
.left {
  flex: 1.3;
}
.right {
  flex: 7;
  font-size: 13.7px;
  padding-bottom: 7px;
  border-bottom: 1px solid rgb(230, 230, 230);
}
.conscroll {
  top: 45px;
  background-color: #fff;
  height: calc(100vh - 40px);
}
</style>