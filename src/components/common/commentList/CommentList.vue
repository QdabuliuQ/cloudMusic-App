<template>
  <div class="CommentList">
    <div class="nav">
      <div class="left" @click="back">
        <img src="~assets/img/commentList/fanhui.svg" alt="" />
      </div>
      <div class="center">
        {{ commentTitle }}
      </div>
      <div class="rightbox">
        <img src="~assets/img/commentList/fenxiang.svg" alt="" />
      </div>
    </div>
    <mscroll 
    class="conscroll"
    :scrollY="true">
        <div class="content" v-if="commentList.length > 0">
            <div class="item" v-for="(item, index) in commentList" :key="index">
                <div class="topbox">
                <div class="userImg">
                    <img :src="item.userImg" alt="" />
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
  </div>
</template>

<script>
import { getComment } from "network/played"; // 评论请求
import mscroll from 'components/common/muiScroll/MuiScroll';

export default {
  name: "CommentList",
  data() {
    return {
      commentTitle: "", // 评论数量
      page: 0, // 评论页数
      commentList: [], // 评论内容
      likedImg: require("assets/img/commentList/zan.svg"),
      getComMore: null
    };
  },
  components: {
      mscroll
  },
  methods: {
    back() {
      this.$emit("toback");
    },

    getCommentList(sid, list, page){
        getComment(sid, list, page).then((res) => {
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

            for (const itemc of res.data.comments) {
                this.commentList.push({
                commentId: itemc.commentId, // 评论楼层id
                content: itemc.content, // 评论内容
                likedCount: itemc.likedCount, // 喜欢数量
                time: itemc.time, // 发布时间戳
                userImg: itemc.user.avatarUrl, // 用户头像
                authStatus: itemc.user.authStatus, // 用户身份认证  1 表示歌手
                userName: itemc.user.nickname, // 用户昵称
                userId: itemc.user.userId, // 用户id
                vipType: itemc.user.vipType, // 是否开通会员
                });
            }
            this.page ++;
        });
    }
  },
  created() {
    // 获取评论
    this.getCommentList(this.$route.params.sid, 50, this.page)
    this.$store.state.getComMore = this.getCommentList
    this.$store.state.songid = this.$route.params.sid,
    this.$store.state.page = this.page
  },
  mounted () {
    
  }
};
</script>
<style scoped>
.CommentList {
  width: 100%;
  background: #fff;
  position: absolute;
  top: 0;
  z-index: 60;
}
.nav {
  width: 100%;
  height: 40px;
  display: flex;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.5);
}
.left {
  flex: 1;
}
.left img {
  width: 25px;
  height: 20px;
  position: relative;
  top: 10px;
  margin-left: 6px;
}
.center {
  flex: 7;
  line-height: 40px;
}
.rightbox {
  flex: 1;
}
.rightbox img {
  width: 22px;
  height: 22px;
  position: relative;
  top: 9px;
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
  flex: 1.2;
}
.right {
  flex: 7;
  font-size: 13.7px;
  padding-bottom: 7px;
  border-bottom: 1px solid rgb(230, 230, 230);
}
.conscroll{
    top: 40px;
    background-color: #fff;
    height: calc(100vh - 40px);
}
</style>