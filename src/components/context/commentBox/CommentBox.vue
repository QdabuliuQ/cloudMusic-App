<template>
  <div class="CommentBox">
    <van-action-sheet 
    v-model="show" 
    :title="comLength"
    :lock-scroll='false'
    class="commentDetail">
      <div class="content" v-if="comHot.length !== 0 && comList.length !== 0">
        <div class="topComment" v-if="comHot.length !== 0">
          <div class="perCom">精彩评论</div>
          <div class="commentItem" v-for="(item, index) in comHot" :key="index">
            <div class="left">
              <img :src="item.avatarUrl" alt="" />
            </div>
            <div class="right">
              <div class="top">
                <div class="uDetail">
                  <div class="name">{{ item.nickname }}</div>
                  <div class="time">{{ item.time | getTime }}</div>
                </div>
                <div class="like">
                  {{ item.likedCount }}
                  <img src="~assets/img/commentList/zan.svg" alt="" srcset="" />
                </div>
              </div>
              <div class="bottom">
                {{ item.content }}
              </div>
            </div>
          </div>
        </div>
        <div class="commentList" v-if="comList.length !== 0">
          <div class="perCom">最新评论</div>
          <div
            class="commentItem"
            v-for="(item, index) in comList"
            :key="index"
          >
            <div class="left">
              <img :src="item.avatarUrl" alt="" />
            </div>
            <div class="right">
              <div class="top">
                <div class="uDetail">
                  <div class="name">{{ item.nickname }}</div>
                  <div class="time">{{ item.time | getTime }}</div>
                </div>
                <div class="like">
                  {{ item.likedCount }}
                  <img src="~assets/img/commentList/zan.svg" alt="" srcset="" />
                </div>
              </div>
              <div class="bottom">
                {{ item.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="noComment">
          动态还没有评论哦~
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { getDynamicCom } from "network/dynamic";

export default {
  name: "CommentBox",
  props: ["isShow", "commentId"],
  data() {
    return {
      show: false,
      cthreadId: 0,
      comLength: "",
      comHot: [], // 热评数组
      comList: [], // 普通评论数组
    };
  },
  watch: {
    show() {
      if (this.show) {
        this.$loading.loadingShow();
        this.comid = this.$store.state.commentId;
        getDynamicCom(this.comid).then((res) => {
          this.comLength = "评论(" + res.data.total + ")";
          for (const item of res.data.hotComments) {
            this.comHot.push({
              content: item.content, // 评论内容
              likedCount: item.likedCount, // 点赞数
              commentId: item.commentId, // 评论id
              time: item.time, // 发布时间
              nickname: item.user.nickname, // 用户名
              userId: item.user.userId, // 用户id
              avatarUrl: item.user.avatarUrl, // 用户头像
            });
          }

          for (const item of res.data.comments) {
            this.comList.push({
              content: item.content, // 评论内容
              likedCount: item.likedCount, // 点赞数
              commentId: item.commentId, // 评论id
              time: item.time, // 发布时间
              nickname: item.user.nickname, // 用户名
              userId: item.user.userId, // 用户id
              avatarUrl: item.user.avatarUrl, // 用户头像
            });
          }
          this.$loading.loadingNo();
        });
        this.$store.state.isShowNav = false; // 隐藏底部播放栏
      } else {
        this.$store.state.isShowNav = true;
      }
    },
  },
  methods: {
    getCommentId() {},
  },
};
</script>
<style scoped>
.commentList{
    margin-top: .266312rem;
}
.noComment{
    height: 13.315579rem;
    line-height: 13.315579rem;
    text-align: center;
    font-size: .479361rem;
    font-weight: 550;
    color: #9c9c9c;
}
.van-action-sheet__header{
    height: 1.198402rem;
    line-height: 1.198402rem;
    box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.116);
    position: fixed;
    border-top-left-radius: .532623rem;
    border-top-right-radius: .532623rem;
    z-index: 15;
    left: 0;
    right: 0;
    background-color: #fff;
}
.perCom {
  font-size: 0.399467rem;
  font-weight: 550;
  margin-bottom: 0.213049rem;
}
.content {
  padding: 0 0.399467rem 0.399467rem;
  height: 13.315579rem;
  position: relative;
  margin-top: 1.438083rem;
}
.commentItem {
  width: 100%;
  display: flex;
  margin-bottom: 0.213049rem;
}
.left {
  flex: 1.5;
}
.left img {
  width: 1.065246rem;
  height: 1.065246rem;
  border-radius: 50%;
}
.right {
  flex: 8.5;
  padding-bottom: 0.266312rem;
  border-bottom: 1px solid #e9e9e9;
  /* border-image: linear-gradient(#fff, #000); */
}
.top {
  width: 100%;
  height: 1.065246rem;
  display: flex;
  align-items: center;
  position: relative;
}
.name {
  font-size: 0.346205rem;
  height: 0.399467rem;
  line-height: 0.399467rem;
}
.time {
  font-size: 0.319574rem;
  height: 0.399467rem;
  line-height: 0.399467rem;
  color: rgb(156, 156, 156);
}
.like {
  font-size: 0.346205rem;
  position: absolute;
  right: 0;
  color: rgb(161, 161, 161);
}
.like img {
  width: 0.372836rem;
  margin-left: 0.133156rem;
}
.bottom {
  font-size: 0.372836rem;
  margin-top: 0.213049rem;
}
</style>