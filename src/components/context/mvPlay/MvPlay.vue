<template>
  <div class="MvPlay" v-if="hackReset">
    <div class="mvbox" @click="showSlider">
      <!-- x5-video-player-type启动h5播放器 -->
      <!-- x5-video-orientation设置landscape横屏播放 -->
      <video
        class="mv"
        :src="mvUrl"
        x5-video-player-type="h5"
        x5-video-orientation="landscape"
      ></video>
      <transition name="mv">
        <div v-show="showPlay" @click="playPause" class="isPlay animate">
          <i class="iconfont" :class="[playImg ? 'icon-gequbofang' : 'icon-gequtingzhi']"></i>
        </div>
      </transition>
      <transition name="mv">
        <div class="topShadowBox animate" v-show="showJd">
          <div class="back" @click="back">
            <i class="iconfont icon-fanhui"></i>
          </div>
          <div class="title">
            {{ mvDetail.name }}
          </div>
        </div>
      </transition>
      <!-- 时间按钮 -->
      <transition name="mv">
        <div class="bottomShadowBox animate" v-show="showJd">
          <div class="nowTime" v-if="$route.params.isMv == true">
            {{ min > 9 ? min : "0" + min }}:{{
              second > 9 ? second : "0" + second
            }}
            / {{ mvDetail.duration | mvTime }}
          </div>
          <div class="nowTime" v-else>
            {{ min > 9 ? min : "0" + min }}:{{
              second > 9 ? second : "0" + second
            }}
            / {{ mvDetail.duration }}
          </div>
          <div class="quanp">
            <i @click.stop="viewMv" class="iconfont icon-quanping"></i>
          </div>
        </div>
      </transition>
      <!-- 进度条 -->
      <transition name="mv">
        <van-slider
          @change="onChange"
          class="jindu"
          v-model="value"
          active-color="#ee0a24"
        >
          <template #button>
            <div v-show="showBtn" class="custom-button"></div>
          </template>
        </van-slider>
      </transition>
    </div>
    <mscroll class="conscroll" :scrollY="true">
      <div class="content2" v-show="showDetail">
        <!-- mv标题 -->
        <div class="mvName">
          {{ mvDetail.name }}
        </div>
        <div class="detailContainer">
          <!-- 播放量 -->
          <div class="playCount">{{ mvDetail.playCount }}</div>
          <!-- 标签 -->
          <div
            class="item"
            v-for="(item, index) in mvDetail.videoGroup"
            :key="index"
          >
            {{ item.name }}
          </div>
          <!-- 发布时间 -->
          <div class="pushTime" v-if="$route.params.isMv == true">
            {{ mvDetail.publishTime }} 发布
          </div>
          <div class="pushTime" v-else>
            {{ mvDetail.publishTime | getTime("YYYY-MM-DD") }} 发布
          </div>
        </div>
        <div class="tabbar">
          <div class="tabItem">
            <div class="itemContainer">
              <i class="iconfont icon-zan"></i>
              <div class="count2">{{ mvDetail.liked }}</div>
            </div>
          </div>
          <div class="tabItem" @click="collectionMv">
            <div class="itemContainer">
              <i class="iconfont icon-shipingshoucang" :class="[isCollect ? 'collect' : '']"></i>
            <div class="count2" :class="[isCollect ? 'collect' : '']">{{ mvDetail.subCount }}</div>
            </div>
          </div>
          <div class="tabItem">
            <div class="itemContainer">
               <i class="iconfont icon-pinglun"></i>
            <div class="count2">{{ mvDetail.commentCount }}</div>
            </div>
          </div>
          <div class="tabItem" @click="fxiang">
            <div class="itemContainer">
              <i class="iconfont icon-fenxiang"></i>
            <div class="count2">{{ mvDetail.shareCount }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 相关视频 -->
      <div class="videoContent">
        <h1>相关视频</h1>
        <div
          class="mvItem"
          @click="moreMv(item.id)"
          v-for="(item, index) in simiMv"
          :key="index"
        >
          <div class="cover">
            <div class="num">▷ {{ item.playCount }}</div>
            <img :src="item.cover" alt="" />
          </div>
          <div class="text">
            <div class="name">
              {{ item.name }}
            </div>
            <div class="time" v-if="$route.params.isMv == true">
              {{ item.duration | mvTime }} by {{ item.artistName }}
            </div>
            <div class="time" v-else>
              {{ item.duration }} by {{ item.artistName }}
            </div>
          </div>
        </div>
      </div>
      <!-- 评论组件 -->
      <div class="mvComment">
        <h1>精彩评论</h1>
        <div
          class="content"
          v-if="commentList.length > 0"
          v-infinite-scroll="loadComment"
          infinite-scroll-distance="100"
          infinite-scroll-delay="500"
          infinite-scroll-immediate="fasle"
        >
          <div class="itemC" v-for="(item, index) in commentList" :key="index">
            <div class="topbox">
              <div class="userImg">
                <img v-lazy="item.userImg" alt="" />
              </div>
              <div class="userName">
                <div class="userContainer">
                  <div class="name2">
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
                  <i class="icon-zan iconfont"></i>
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
      </div>
    </mscroll>
    <!-- 分享面板 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
    <send-comment
      @successComment="successComment"
      :type="type"
      :id="$route.params.mid"
      class="SendComment"
    ></send-comment>
    <transition>
      <full-screen
        @toBack="toBack"
        :videoTitle="mvDetail.name"
        :videoUrl="mvUrl"
        v-if="isShow"
      ></full-screen>
    </transition>
  </div>
</template>

<script>
import "assets/icon/Video.css"
import {
  getMvDetail,
  getMv,
  getMvInfo,
  getSimiMv,
  getMvComment
} from "network/mvPlay"; // 网络请求
import {
  getVideoDetail,
  getVideoInfo,
  getVideoUrl,
  getSimiVideo,
  getVideoComment,
} from "network/video";
import { toStringNum, durationTime, formatDuring } from "common/common"; // 播放量转化
import mscroll from "components/common/muiScroll/MuiScroll"; // 滚动组件
import FullScreen from "components/common/fullScreen/FullScreen"; // 全屏播放
import SendComment from "components/context/sendComment/SendComment"; // 发送评论

export default {
  name: "MvPlay",
  data() {
    return {
      mid: this.$route.params.mid, // mvid
      mvDetail: {}, // mv数据
      showDetail: false, // 显示/隐藏
      simiMv: [], // 相关mv
      commentList: [], // 评论内容
      offset: 0, // 评论页数
      CommentLength: 0, // 目前评论数量
      hotLength: 0, // 热评数量
      playImg: true,
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
      showShare: false, // 显示分享面板
      value: 0, // 进度条
      showBtn: false, // 移动滑块按钮
      mvUrl: "", // url地址
      showJd: false, // 显示时间
      showPlay: false, // 显示/隐藏暂停播放按钮
      playIndex: 0, // 判断是否播放
      now: "00:00", // 实时播放时间
      second: 0,
      min: 0,
      timer: null, // 定时器
      hackReset: true, // 强制刷新组件
      commentLength: 1, // 判断评论是否加载完成
      isShow: false, // 全屏播放
      type: 0, // 判断数据类型
      isCollect: false,  // 是否收藏视频
    };
  },
  computed: {
    currentTime() {
      return this.$store.state.viewPlay.currentTime; // 保存
    },

    isPlaying() {
      return this.$store.state.viewPlay.playing; // 监听是否正在播放
    },
  },
  // 监听路由变化
  beforeRouteUpdate(to, from, next) {
    if (to.fullPath != from.fullPath) {
      this.mvDetail = {}; // 清空mv数据
      this.simiMv = []; // 清空相关视频
      this.commentList = []; // 清空评论内容
      this.CommentLength = 0; // 重置评论数量
      this.value = 0; // 重置进度条
      this.second = 0; // 重置秒数
      this.min = 0; // 重置分钟
      clearInterval(this.timer); // 清除定时器
      this.showDetail = false;
      next();
      this.MvDetail(); // 获取mv信息
      this.getMvUrl(); // 获取mvurl
      this.getCommentList(); // 获取mv评论
    }
  },
  components: {
    mscroll,
    FullScreen,
    SendComment,
  },
  methods: {
    // 发送评论成功后
    successComment(commentDetail) {
      this.commentList.unshift({
        content: commentDetail.content, // 评论内容
        likedCount: 0, // 喜欢数量
        time: commentDetail.time, // 发布时间戳
        userImg: commentDetail.avatarUrl, // 用户头像
        userName: commentDetail.nickname, // 用户昵称
        userId: commentDetail.id, // 用户id
      });
    },

    // 更多mv路由跳转
    moreMv(id) {
      this.$router.push("/mvplay/" + id + "&" + this.$route.params.isMv);
    },
    // 全屏播放
    viewMv() {
      this.$store.state.viewPlay.viewOpen = true; // 全屏模式
      this.isShow = true;
      this.mvDom.pause(); // 暂停外部的播放器
      this.$store.state.viewPlay.currentTime = this.mvDom.currentTime; // 保存最后的时间
      if (this.value < 100 && this.playIndex == 1) {
        this.$store.state.viewPlay.outPlaying = true; // 正在播放
      } else {
        this.$store.state.viewPlay.outPlaying = false; // 暂停
      }
    },
    // 退出全屏
    toBack() {
      this.$store.state.viewPlay.viewOpen = false; // 普通模式
      this.isShow = false;
      if (this.$store.state.viewPlay.playing) {
        this.playImg = false
        this.mvDom.currentTime = this.$store.state.fullSecreenVideo.currentTime;
        this.mvDom.play(); // 播放外部播放器
        clearInterval(this.timer); // 清除定时器
        this.timer = setInterval(this.getNowTime, 1000); // 开始计时
      } else {
        this.mvDom.currentTime = this.$store.state.fullSecreenVideo.currentTime;
        this.playImg = true
        this.mvDom.pause(); // 播放外部播放器
        clearInterval(this.timer); // 清除定时器
      }
    },

    // 显示/隐藏按钮
    showSlider() {
      this.showBtn = true;
      this.showJd = true;
      this.showPlay = true;
      setTimeout(() => {
        this.showBtn = false;
        this.showJd = false;
        this.showPlay = false;
      }, 5000);
    },

    // 暂停/播放
    playPause() {
      if (this.playIndex === 0) {  // 0 表示暂停
        this.mvDom.play();
        clearInterval(this.timer); // 清除定时器
        this.timer = setInterval(this.getNowTime, 1000);
        this.playImg = false
        this.playIndex = 1; // 1表示正在播放
        if (this.value >= 100) {
          this.value = 0;
          this.min = 0;
          this.second = 0;
        }
      } else {  // 1 表示播放
        this.mvDom.pause();
        clearInterval(this.timer);
        this.playImg = true
        this.playIndex = 0; // 0表示暂停
      }
    },

    // 时间跳转
    onChange(value) {
      this.mvDom.currentTime = value / (100 / (this.mvDetail.length / 1000)); // 设置时间
      this.mvDom.play(); // 播放音乐
      this.playImg = false // 修改图标
      this.playIndex = 1; // 修改索引
      this.min = Math.floor(this.mvDom.currentTime / 60);
      this.second = (this.mvDom.currentTime % 60).toFixed(0);
    },

    // 实时更新时间
    getNowTime() {
      this.value += 100 / (this.mvDetail.length / 1000);
      this.second++;
      if (this.second > 59) {
        this.min++;
        this.second = 0;
      }
      if (this.value >= 100) {
        this.playIndex = 0;
        this.playImg = true
        clearInterval(this.timer);
      }
    },

    // 退出
    back() {
      this.$router.go(-1);
    },

    // 打开分享面板
    fxiang() {
      this.showShare = true;
    },

    // 监听滚动到底部
    loadComment() {
      // 发送请求
      this.$loading.loadingShow();
      setTimeout(() => {
        this.getCommentList(this.$route.params.mid, 25, this.offset);
        this.$loading.loadingNo();
      }, 1000);
    },

    MvDetail() {
      // 判断 mv / video
      if (this.$route.params.isMv == "true") {
        // 获取mv数据
        getMvDetail(this.$route.params.mid).then((res) => {
          this.type = 1;
          let path = res.data.data;
          this.comCount = path.commentCount;
          this.mvDetail.artistId = path.artistId; // 歌手id
          this.mvDetail.artistName = path.artistName; // 歌手名称
          this.mvDetail.commentCount = path.commentCount; // mv评论数量
          this.mvDetail.duration = durationTime(path.duration); // mv时长(毫秒)
          this.mvDetail.length = path.duration;
          this.mvDetail.name = path.name; // mv标题
          this.mvDetail.playCount = toStringNum(path.playCount) + "次观看"; // mv播放量
          this.mvDetail.publishTime = path.publishTime; // mv发布时间
          this.mvDetail.shareCount = path.shareCount; // mv分享数量
          this.mvDetail.subCount = path.subCount; // mv收藏数量
          this.mvDetail.videoGroup = path.videoGroup; // mv标签
          // mv详细数据
          getMvInfo(this.$route.params.mid).then((res) => {
            this.mvDetail.liked = res.data.likedCount; // 点赞数
            this.$loading.loadingNo();
            this.showDetail = true;
          });
        });
        // 相关视频
        getSimiMv(this.$route.params.mid).then((res) => {
          for (const item of res.data.mvs) {
            this.simiMv.push({
              artistName: item.artistName, // 创作者
              cover: item.cover, // 封面
              duration: durationTime(item.duration), // mv时长
              id: item.id, // mv id
              name: item.name, // mv名称
              playCount: toStringNum(item.playCount), // mv播放量
            });
          }
        });
      } else {
        getVideoDetail(this.$route.params.mid).then((res) => {
          this.type = 5;
          let path = res.data.data;
          this.comCount = path.commentCount;
          this.mvDetail.artistId = path.artistId; // 歌手id
          this.mvDetail.artistName = path.artistName; // 歌手名称
          this.mvDetail.commentCount = path.commentCount; // mv评论数量
          this.mvDetail.duration = formatDuring(path.durationms); // mv时长(毫秒)
          this.mvDetail.length = path.durationms;
          this.mvDetail.name = path.title; // mv标题
          this.mvDetail.playCount = toStringNum(path.playTime) + "次观看"; // mv播放量
          this.mvDetail.publishTime = path.publishTime; // mv发布时间
          this.mvDetail.shareCount = path.shareCount; // mv分享数量
          this.mvDetail.subCount = path.subscribeCount; // mv收藏数量
          this.mvDetail.videoGroup = path.videoGroup; // mv标签
          // mv详细数据
          getVideoInfo(this.$route.params.mid).then((res) => {
            this.mvDetail.liked = res.data.likedCount; // 点赞数
            this.$loading.loadingNo();
            this.showDetail = true;
          });
        });

        getSimiVideo(this.$route.params.mid).then((res) => {
          for (const item of res.data.data) {
            this.simiMv.push({
              artistName: item.creator[0].userName, // 创作者
              cover: item.coverUrl, // 封面
              duration: durationTime(item.durationms), // mv时长
              id: item.vid, // mv id
              name: item.title, // mv名称
              playCount: toStringNum(item.playTime), // mv播放量
            });
          }
        });
      }
    },
    // 获取mv播放url
    getMvUrl() {
      if (this.$route.params.isMv == "true") {
        getMv(this.$route.params.mid).then((res) => {
          this.mvUrl = res.data.data.url;
        });
      } else {
        getVideoUrl(this.$route.params.mid).then((res) => {
          this.mvUrl = res.data.urls[0].url;
        });
      }
    },
    // 封转方法
    getCommentList() {
      if (this.$route.params.isMv == "true") {
        // 发送网络请求
        if (this.commentLength > 0) {
          getMvComment(this.$route.params.mid, 30, this.offset * 30).then(
            (res) => {
              // 判断评论数量
              this.commentLength = res.data.comments.length;
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
              this.offset++; // 页数增加
            }
          );
        } else {
          this.$toast.show("没有更多评论了:(", 1900);
        }
      } else {
        // 发送网络请求
        if (this.commentLength > 0) {
          getVideoComment(this.$route.params.mid, 30, this.offset * 30).then(
            (res) => {
              // 判断评论数量
              this.commentLength = res.data.comments.length;
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
              this.offset++; // 页数增加
            }
          );
        } else {
          this.$toast.show("没有更多评论了:(", 1900);
        }
      }
    },

    // 收藏mv
    collectionMv() {
      if (this.isCollect) {
        this.isCollect = !this.isCollect
      } else {
        this.isCollect = !this.isCollect
      }
    }
  },
  created() {
    this.$loading.loadingShow();
    this.MvDetail(); // 获取mv/视频信息
    this.getMvUrl(); // 获取mv/视频url
    this.getCommentList(); // 获取mv/视频评论
    if (this.$store.state.navMusicDom) {
      this.$store.state.navMusicDom.pause();
    }
  },
  mounted() {
    setTimeout(() => {
      this.showDetail = true;
    }, 1300);

    this.$nextTick(() => {
      this.mvDom = document.getElementsByClassName("mv")[0];
    });
  },
  destroyed () {
    if (this.$store.state.navMusicDom) {
      this.$store.state.navMusicDom.play();
    }
  }
};
</script>
<style scoped>
.collect{
  color: var(--red) !important;
}
.mv-enter {
  opacity: 0;
}
.mv-leave-to {
  opacity: 0;
}
.mv-enter-active,
.mv-leave-active {
  /* 添加动画效果 */
  transition: all 0.15s linear;
}
.SendComment {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}
.v-enter {
  opacity: 0;
}
.v-leave-to {
  opacity: 0;
}

/* 动画执行期间 */
.v-enter-active,
.v-leave-active {
  /* 添加动画效果 */
  transition: all 0.2s linear;
}
.isPlay {
  position: relative;
  z-index: 60;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.isPlay .iconfont {
  color: #Fff;
  font-size:.933333rem;
}
.mv {
  position: absolute;
  height: 5.05992rem;
  width: 100%;
}
.quanp {
  float: right;
  margin-top: 0.133156rem;
  margin-right: 0.266312rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.quanp .iconfont {
  font-size: .373333rem;
  color: #Fff;
}
.nowTime {
  color: #fff;
  font-size: 0.372836rem;
  margin-top: 0.133156rem;
  margin-left: 0.266312rem;
  float: left;
}
.jindu {
  position: absolute;
  bottom: 0;
}
.custom-button {
  width: 13px;
  height: 13px;
  color: #fff;
  background-color: #ee0a24;
  border-radius: 100px;
}
.content2 {
  padding: 0.266312rem 0.426099rem 0;
  border-bottom: 0.159787rem solid #ececec;
}
.MvPlay {
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 60;
  top: 0;
  display: flex;
  background-color: #fff;
}
.mvbox {
  width: 100%;
  height: 5.05992rem;
  position: relative;
}
.topShadowBox {
  position: absolute;
  top: 0;
  width: 100%;
  height: 0.798935rem;
  display: flex;
  align-items: center;
  background: linear-gradient(rgb(61, 61, 61), transparent);
  display: flex;
}
.back {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.back .icon-fanhui {
  font-size: .373333rem;
  color: #fff;
}
.title {
  flex: 7;
  width: 6.65779rem;
  font-size: .346667rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
}
.bottomShadowBox {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0.798935rem;
  background: linear-gradient(transparent, rgb(70, 70, 70));
}
.mvName {
  display: flex;
  align-items: center;
  font-size: 0.373333rem;
  font-weight: 550;
}
.playCount {
  margin-top: .266667rem;
  font-size: .32rem;
  color: #818181;
  float: left;
  margin-right: .186667rem;
}
.videoGroup {
  margin-left: 10px;
}
.item {
  float: left;
  height: 0.532623rem;
  line-height: 0.559254rem;
  text-align: center;
  margin-top: 11px;
  font-size: 10px;
  padding: 0px .24rem;
  border-radius: 0.69241rem;
  background-color: #ec4e46;
  color: #fff;
  transform: scale(0.9);
}
.pushTime {
  clear: both;
  position: relative;
  top: 0.186418rem;
  color: #818181;
  font-size: 0.346205rem;
}
.tabbar {
  width: 100%;
  height: 1.38482rem;
  display: flex;
  margin-top: .533333rem;
  margin-bottom: .533333rem;
}
.tabItem {
  text-align: center;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tabItem .iconfont{
  position: relative;
  top: .16rem;
  font-size:.586667rem;
}
.count2 {
  font-size: .32rem;
  position: relative;
  top: .266667rem;
  color: #818181;
}
.videoContent {
  padding: 0.266312rem 0.426099rem;
  border-bottom: 6px solid #ececec;
}
.videoContent h1 {
  font-size: 0.399467rem;
}
.mvItem {
  /* width: 100%; */
  height: 1.997337rem;
  display: flex;
  margin-top: 0.319574rem;
}
.cover {
  /* width: 140px; */
  height: 100%;
  border-radius: 0.159787rem;
  overflow: hidden;
  flex: 3;
  position: relative;
  /* border: 1px solid #cdcdcd; */
}
.num {
  position: absolute;
  top: 0;
  right: 0.133156rem;
  font-size: 0.346205rem;
  color: #fff;
}
.text {
  flex: 5;
}
.cover img {
  width: 100%;
  height: 100%;
}
.name {
  font-size: 0.399467rem;
  margin-left: 0.266312rem;
  margin-top: 0.426099rem;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.time {
  font-size: 0.346205rem;
  margin-top: 0.106525rem;
  margin-left: 0.266312rem;
  color: #818181;
}
.mvComment {
  padding: 0.266312rem 0.426099rem;
  border-bottom: 6px solid #ececec;
}
.mvComment h1 {
  font-size: 0.399467rem;
  margin-bottom: 0.319574rem;
}
.topbox {
  width: 100%;
  height: 1.065246rem;
  display: flex;
}
.userImg {
  flex: 1.2;
}
.userName {
  flex: 5;
  font-size: 0.346205rem;
  display: flex;
  align-items: center;
}
.name2 {
  position: relative;
  margin-bottom: .106667rem;
  font-size: .346667rem;
}
.name2 img {
  height: 0.639148rem;
  margin-left: 0.079893rem;
  position: absolute;
  top: -0.08rem;
}
.liked {
  flex: 2.2;
  display: flex;
  align-items: center;
  position: relative;
}
.addtime {
  font-size: .32rem;
  color: #8b8b8b;
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
  display: flex;
  align-items: center;
}
.count .iconfont {
  font-size: .32rem;
  margin-left: .106667rem;
}
.bottombox {
  width: 100%;
  display: flex;
  margin: 0.186418rem 0;
}
.left {
  flex: 1.2;
}
.right {
  flex: 7;
  font-size: 0.364847rem;
  padding-bottom: .266667rem;
  border-bottom: 1px solid rgb(230, 230, 230);
}
.conscroll {
  top: 5.05992rem;
  background-color: #fff;
  height: calc(100vh - 5.05992rem - 1.065246rem);
}
</style>