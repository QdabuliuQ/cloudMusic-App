<template>
  <div>
<!--  -->
  </div>
</template>

<script>
import { getComment, getCommentFloor } from "network/played"; // 网络请求
import mscroll from 'components/common/muiScroll/MuiScroll'

export default {
  name: "PlaySongNav",
  data() {
    return {
      show: false,
      commentTitle: "", // 评论数量
      page: 0, // 评论页数
      commentList: [], // 评论内容
      likedImg: require("assets/img/commentList/zan.svg"),
    };
  },
  components: {
      mscroll
  },
  methods: {
    // 显示评论面板
    isShowComment() {
      this.show = true;
    },
  },
  created() {
    // 获取评论
    getComment(this.$route.params.sid, 50, this.page).then((res) => {
      console.log(res);
      this.commentTitle = "评论(" + res.data.total + ")";
      for (const item of res.data.hotComments) {
        this.commentList.push({
          commentId: item.commentId, // 评论楼层id
          content: item.content, // 评论内容
          likedCount: item.likedCount, // 喜欢数量
          time: item.time, // 发布时间戳
          userImg: item.user.avatarUrl, // 用户头像
          authStatus: item.user.authStatus, // 用户身份认证  1 表示歌手
          userName: item.user.nickname, // 用户昵称
          userId: item.user.userId, // 用户id
          vipType: item.user.vipType, // 是否开通会员
        });
      }
    });
  },
};
</script>
<style scoped>
.PlaySongNav {
  width: 100%;
  height: 30px;
  display: flex;
}
.navitem {
  flex: 1;
  text-align: center;
}
.navitem img {
  margin-top: 6px;
  width: 20px;
  height: 20px;
}
.content {
  padding: 0 12px 10px;
}
.comment {
  height: 550px;
}
.topbox {
  width: 100%;
  height: 40px;
  display: flex;
}
.userImg {
  flex: 1.2;
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
.time {
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
  flex: 1.2;
}
.right {
  flex: 7;
  font-size: 13.7px;
  padding-bottom: 7px;
  border-bottom: 1px solid rgb(230, 230, 230);
}
</style>