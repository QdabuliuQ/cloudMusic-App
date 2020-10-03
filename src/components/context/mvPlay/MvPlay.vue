<template>
  <div class="MvPlay" v-if="hackReset">
    <div class="mvbox" @click="showSlider">
      <video class="mv" :src="mvUrl"></video>
      <div v-show="showPlay" @click="playPause" class="isPlay">
        <img :src="Play" alt="">
      </div>
      <div class="topShadowBox" v-show="showJd">
        <div class="back" @click="back">
          <img src="~assets/img/common/fanhui.svg" alt="">
        </div>
        <div class="title">
          {{mvDetail.name}}
        </div>
      </div>
      <!-- 时间按钮 -->
      <div class="bottomShadowBox" v-show="showJd">       
        <div class="nowTime">{{min > 9 ? min : "0" + min }}:{{second > 9 ? second : "0" + second }} / {{mvDetail.duration | mvTime}}</div>  
        <div class="quanp"><img src="~assets/img/mvPlay/quanping.svg" alt=""></div>
      </div>
      <!-- 进度条 -->
      <van-slider @change="onChange" class="jindu" v-model="value" active-color="#ee0a24">
        <template #button>
          <div v-show="showBtn" class="custom-button"></div>
        </template>
      </van-slider>
    </div>
    <mscroll
    class="conscroll"
    :scrollY="true">
    <div class="content2" v-show="showDetail">
      <!-- mv标题 -->
      <div class="mvName">
        {{ mvDetail.name }}
      </div>
      <!-- 播放量 -->
      <div class="playCount">{{ mvDetail.playCount }}</div>
      <div class="videoGroup">
        <!-- 标签 -->
        <div
          class="item"
          v-for="(item, index) in mvDetail.videoGroup"
          :key="index"
        >
          {{ item.name }}
        </div>
      </div>
      <!-- 发布时间 -->
      <div class="pushTime">
        {{ mvDetail.publishTime }}
      </div>
      <div class="tabbar">
        <div class="tabItem">
          <img class="img3" src="~assets/img/mvPlay/zan.svg" alt="" />
          <div class="count2 a4">{{ mvDetail.liked }}</div>
        </div>
        <div class="tabItem">
          <img class="img2" src="~assets/img/mvPlay/shouc.svg" alt="" />
          <div class="count2 a1">{{ mvDetail.subCount }}</div>
        </div>
        <div class="tabItem">
          <img class="img1" src="~assets/img/mvPlay/pinglun.svg" alt="" />
          <div class="count2 a2">{{ mvDetail.commentCount }}</div>
        </div>
        <div class="tabItem" @click="fxiang">
          <img class="img1" src="~assets/img/mvPlay/fenxiang.svg" alt="" />
          <div class="count2 a3">{{ mvDetail.shareCount }}</div>
        </div>
      </div>
    </div>
    <!-- 相关视频 -->
    <div class="videoContent">
      <h1>相关视频</h1>
      <div class="mvItem" @click="moreMv(item.id)" v-for="(item, index) in simiMv" :key="index">
        <div class="cover">
          <div class="num">▷ {{ item.playCount }}</div>
          <img :src="item.cover" alt="" />
        </div>
        <div class="text">
          <div class="name">
            {{ item.name }}
          </div>
          <div class="time">
            {{ item.duration | mvTime }} by {{ item.artistName }}
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
    </div>
    </mscroll>
    <!-- 分享面板 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
  </div>
</template>

<script>
import {
  getMvDetail,
  getMv,
  getMvInfo,
  getSimiMv,
  getMvComment,
} from "network/mvPlay"; // 网络请求
import { getUserDetail } from "network/user"; // 网络请求
import { toStringNum } from "common/common"; // 播放量转化
import mscroll from 'components/common/muiScroll/MuiScroll';

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
      likedImg: require("assets/img/commentList/zan.svg"),  
      options: [  // 分享面板
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
      showShare: false,  // 显示分享面板
      value: 0,  // 进度条
      showBtn: false,  // 移动滑块按钮
      mvUrl: '',  // url地址
      showJd: false,  // 显示时间
      showPlay: false,  // 显示/隐藏暂停播放按钮
      Play: require('assets/img/mvPlay/bofang.svg'),
      playIndex: 0,  // 判断是否播放
      now: '00:00',  // 实时播放时间
      second: 0,
      min: 0,
      timer: null,  // 定时器
      hackReset: true,  // 强制刷新组件
    };
  },
  components: {
    mscroll  
  },
  methods: {
    // 更多mv路由跳转
    moreMv(id){
      this.hackReset = false;
      this.$nextTick(() => {
        this.$router.go(0)
        this.$router.replace('/mvplay/' + id)
        this.getCommentList(this.$route.params.mid, 25, this.offset);
        this.hackReset = true;
      })
    },

    // 显示/隐藏按钮
    showSlider(){
      this.showBtn = true
      this.showJd = true
      this.showPlay = true
      setTimeout(() => {
        this.showBtn = false
        this.showJd = false
        this.showPlay = false
      },5000)
    },
    
    // 暂停/播放
    playPause(){
      this.mvDom = document.getElementsByClassName('mv')[0];
      if (this.playIndex === 0) {
        this.mvDom.play();
        this.timer = setInterval(this.getNowTime, 1000)
        this.Play = require('assets/img/mvPlay/zanting.svg')
        this.playIndex = 1
        if (this.value >= 100) {
          this.value = 0;
          this.min = 0;
          this.second = 0;
        }
      } else {
        this.mvDom.pause();
        clearInterval(this.timer)
        this.Play = require('assets/img/mvPlay/bofang.svg')
        this.playIndex = 0
      }
    },

    // 时间跳转
    onChange(value){
      this.mvDom.currentTime = value / ( 100 / (this.mvDetail.duration / 1000))
      this.min = Math.floor(this.mvDom.currentTime / 60)
      this.second = (this.mvDom.currentTime % 60).toFixed(0)
    },

    // 实时更新时间
    getNowTime(){
      this.value += 100 / (this.mvDetail.duration / 1000)
      this.second ++;
      if (this.second > 59) {
        this.min ++;
        this.second = 0;
      }
      if (this.value >= 100) {
        this.playIndex = 0
        this.Play = require('assets/img/mvPlay/bofang.svg')
        clearInterval(this.timer)
      }
    },

    // 退出
    back(){
      this.$router.go(-1)
    },

    // 打开分享面板
    fxiang(){
        this.showShare = true       
    },

    // 监听滚动到底部
    loadComment() {
        // 发送请求
        this.$loading.loadingShow();
        setTimeout(() => {
            this.getCommentList(this.mid, 25, this.offset)
            this.$loading.loadingNo()
        },1000)
    },

    MvDetail(mid) {
      // 获取mv数据
      getMvDetail(mid).then((res) => {
        let path = res.data.data;
        this.comCount = path.commentCount
        this.mvDetail.artistId = path.artistId; // 歌手id
        this.mvDetail.artistName = path.artistName; // 歌手名称
        this.mvDetail.commentCount = path.commentCount; // mv评论数量
        this.mvDetail.duration = path.duration; // mv时长(毫秒)
        this.mvDetail.name = path.name; // mv标题
        this.mvDetail.playCount = toStringNum(path.playCount) + "次观看"; // mv播放量
        this.mvDetail.publishTime = path.publishTime + " 发布"; // mv发布时间
        this.mvDetail.shareCount = path.shareCount; // mv分享数量
        this.mvDetail.subCount = path.subCount; // mv收藏数量
        this.mvDetail.videoGroup = path.videoGroup; // mv标签
        // mv详细数据
        getMvInfo(mid).then((res) => {
          this.mvDetail.liked = res.data.likedCount;  // 点赞数
          this.showDetail = true;
          this.$loading.loadingNo()
        });
      });
      // 相关视频
      getSimiMv(mid).then((res) => {
        for (const item of res.data.mvs) {
          this.simiMv.push({
            artistName: item.artistName, // 创作者
            cover: item.cover, // 封面
            duration: item.duration, // mv时长
            id: item.id, // mv id
            name: item.name, // mv名称
            playCount: toStringNum(item.playCount), // mv播放量
          });
        }
      });
    },
    // 封转方法
    getCommentList(id, list, offset) {
      // 发送网络请求
      getMvComment(id, list, offset).then((res) => {
        // 判断有没有热评数组
        if (res.data.hotComments) {
          this.hotLength = res.data.hotComments.length; // 保存热评数量
        }
        this.CommentLength += this.hotLength + res.data.comments.length // 获取数量
        // 判断评论数量
        if (this.CommentLength - 1 <= res.data.total) {
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
          // console.log(this.page);
        } else {
          this.$toast.show("没有更多评论了:(", 1900);
        }
      });
    },
  },
  created() {
    this.$loading.loadingShow();
    this.MvDetail(this.mid);
    getMv(this.mid).then(res => {
      this.mvUrl = res.data.data.url;
    })
    this.getCommentList(this.mid, 25, this.offset);
  },
  mounted () {
  },
};
</script>
<style scoped>
.isPlay{
  position: relative;
  z-index: 60;
  top: 40%;
  left: 43%;
}
.mv{
  position: absolute;
  /* top: -100px; */
  height: 190px;
  width: 100%;
}
.quanp{
  float: right;
}
.quanp img{
  width: 20px;
  height: 20px;
  margin-top: 3px;
  margin-right: 10px;
}
.nowTime{
  color: #fff;
  font-size: 14px;
  margin-top: 5px;
  margin-left: 10px;
  float: left;
}
.jindu{
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
.content2{
    padding: 10px 16px 0;
    border-bottom: 6px solid #ececec;
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
  height: 190px;
  position: relative;
}
.topShadowBox{
  position: absolute;
  top: 0;
  width: 100%;
  height: 30px;
  background: linear-gradient(rgb(61, 61, 61), transparent);
  display: flex;
}
.back{
  flex: 1;
  text-align: center;
}
.back img{
  width: 20px;
  height: 20px;
  margin-top: 5px;
}
.title{
  flex: 7;
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 30px;
  color: #fff;
}
.bottomShadowBox{
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  background: linear-gradient(transparent, rgb(70, 70, 70));
}
.mvName {
  font-weight: 550;
}
.playCount {
  margin-top: 10px;
  font-size: 13.5px;
  color: #818181;
  float: left;
}
.videoGroup {
  margin-left: 10px;
}
.item {
  float: left;
  height: 18px;
  line-height: 18px;
  text-align: center;
  margin-top: 11px;
  margin-left: 5px;
  font-size: 10px;
  padding: 0px 9px;
  border-radius: 26px;
  background-color: #ec4e46;
  color: #fff;
  transform: scale(0.9);
}
.pushTime {
  clear: both;
  position: relative;
  top: 7px;
  color: #818181;
  font-size: 13px;
}
.tabbar {
  width: 100%;
  height: 52px;
  padding-bottom: 5px;
  display: flex;
  margin-top: 20px;
}
.tabItem {
  text-align: center;
  flex: 1;
}
.img2 {
  width: 25px;
  height: 25px;
  position: relative;
  top: 3px;
}
.img3 {
  width: 24px;
  height: 24px;
  position: relative;
  top: 3px;
}
.img1 {
  width: 30px;
  height: 30px;
}
.count2 {
  font-size: 12px;
  color: #818181;
}
.a1 {
  position: relative;
  top: -3px;
}
.a2 {
  position: relative;
  top: -8px;
}
.a3 {
  position: relative;
  top: -7px;
}
.a4 {
  position: relative;
  top: -2px;
}
.videoContent {
  padding: 10px 16px;
  border-bottom: 6px solid #ececec;
}
.videoContent h1 {
  font-size: 15px;
}
.mvItem {
  width: 100%;
  height: 75px;
  display: flex;
  margin-top: 12px;
}
.cover {
  width: 140px;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
  flex: 2;
  position: relative;
  /* border: 1px solid #cdcdcd; */
}
.num {
  position: absolute;
  top: 0;
  right: 5px;
  font-size: 13px;
  color: #fff;
}
.text {
  flex: 3;
}
.cover img {
  width: 100%;
  height: 100%;
}
.name {
  font-size: 15px;
  margin-left: 10px;
  margin-top: 16px;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.time {
  font-size: 13px;
  margin-top: 4px;
  margin-left: 10px;
  color: #818181;
}
.mvComment {
  padding: 10px 16px;
  border-bottom: 6px solid #ececec;
}
.mvComment h1 {
  font-size: 15px;
  margin-bottom: 12px;
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
.name2 {
  position: relative;
}
.name2 img {
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
.conscroll {
  top: 190px;
  
  background-color: #fff;
  height: calc(100vh - 190px);
}
</style>