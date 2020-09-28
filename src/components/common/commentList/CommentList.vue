<template>
  <div class="CommentList">
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
    <mscroll 
    class="conscroll"
    :scrollY="true">
        <div class="content"
        v-if="commentList.length > 0"
        v-infinite-scroll="loadComment"
        infinite-scroll-distance="100"
        infinite-scroll-delay="500"
        infinite-scroll-immediate="fasle">
            <div class="item"    
            v-for="(item, index) in commentList" 
            :key="index">
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
import { getComment } from "network/played"; // 评论请求
import mscroll from 'components/common/muiScroll/MuiScroll';
import mui from "assets/mui/js/mui.min.js"; // 引入 mui js 文件

export default {
  props: ['showComment'],
  name: "CommentList",
  data() {
    return {
      commentTitle: "", // 评论数量
      page: 0, // 评论页数
      commentList: [], // 评论内容
      likedImg: require("assets/img/commentList/zan.svg"),
      getComMore: null,
      showShare: false,  // 分享面板
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' },
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
        ],
      ],
      CommentLength: 0,  // 目前评论数量
      hotLength: 0  // 热评数量
    };
  },
  components: {
      mscroll
  },
  methods: {
    getIndex(index){
      this.listIndex = index
    },

    // 分享组件
    fxiang(){
      this.showShare = true;
    },

    // 监听上拉加载
    loadComment(){
      // 发送请求
      if (this.showComment) {
        this.$loading.loadingShow();
        setTimeout(() => {
          this.getCommentList(this.$route.params.sid, 25, this.page)
          this.$loading.loadingNo()
        },1000)
      }
      
    },

    back() {
      this.$emit("toback");
    },

    // 封转方法
    getCommentList(sid, list, page){      
      // 发送网络请求
      getComment(sid, list, page).then((res) => {
        // 判断有没有热评数组
        if (res.data.hotComments) {
          this.hotLength = res.data.hotComments.length;  // 保存热评数量
        }
        this.CommentLength = this.hotLength + list * (page + 1)  // 获取数量
        this.commentTitle = "评论(" + res.data.total + ")";
        // 判断评论数量
        if (this.CommentLength < res.data.total) {
          if (res.data.hotComments) {
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
          this.page ++;  // 页数增加
        } else {
          this.$toast.show('没有更多了:(',1900)
        }
      });
      
    }
  },
  created() {
    // 获取评论
    this.getCommentList(this.$route.params.sid, 25, this.page)
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
  height: 45px;
  display: flex;
  color: #Fff;
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
    top: 45px;
    background-color: #fff;
    height: calc(100vh - 40px);
}
</style>