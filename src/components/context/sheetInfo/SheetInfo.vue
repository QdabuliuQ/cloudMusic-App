<template>
  <div class="SheetInfo">
    <menu-nav class="nav" :isWhite="isWhite" :navTitle="navTitle"></menu-nav>
    <div v-show="isTopNav" class="content2">
      <sheet-nav :trackCount="trackCount" :createId='createId'></sheet-nav>
    </div>
    <!-- <mui-scroll
    id="infoScroll"
    style="top: 44px; bottom: 45px" 
    :scrollY="true"
    ref="mscroll">
      <div class="box">
        <div class="zhezhao"></div>
        <div class="bimg" :style="{ background: 'url('+ sheetInfoContent.coverImgUrl +')' }"></div>
        <div class="zbox">
          <div class="top" v-if="isShow">
            <div class="img">
              <div class="bfl">▷ {{sheetInfoContent.playCount}}</div>
              <img class :src="sheetInfoContent.coverImgUrl" alt />
            </div>
            <div class="rightBox">
              <div class="name">{{sheetInfoContent.name}}</div>
              <div class="user">
                <img class :src="sheetInfoContent.avatarUrl" alt />
                {{sheetInfoContent.nickname}} ＞
              </div>
            </div>
            <tabbar>
              <tabbaritem @click.native="showInfoComment" activeColor="red">
                <img class="imgNav" slot="item-icon" src="~assets/img/sheetList/pinglun.svg" alt />
                <div class="item-text" slot="item-text">{{sheetInfoContent.commentCount}}</div>
              </tabbaritem>
              <tabbaritem activeColor="red">
                <img class="imgNav" slot="item-icon" src="~assets/img/sheetList/fenxiang.svg" alt />
                <div class="item-text" slot="item-text">分享</div>
              </tabbaritem>
              <tabbaritem activeColor="red">
                <img class="imgNav" slot="item-icon" src="~assets/img/sheetList/xiazai.svg" alt />
                <div class="item-text" slot="item-text">下载</div>
              </tabbaritem>
              <tabbaritem activeColor="red">
                <img class="imgNav" slot="item-icon" src="~assets/img/sheetList/duoxuan.svg" alt />
                <div class="item-text" slot="item-text">多选</div>
              </tabbaritem>
            </tabbar>
          </div>
        </div>
      </div>
      <div ref="content" class="content">
        <sheet-nav :trackCount="trackCount"></sheet-nav>
      </div>
      <div class="songItem">
        <song-item name="sheetInfo" :songList="songList"></song-item>
      </div>
    </mui-scroll> -->
    <div class="box">
        <div class="zhezhao"></div>
        <div class="bimg" :style="{ background: 'url('+ sheetInfoContent.coverImgUrl +')' }"></div>
        <div class="zbox">
          <div class="top" v-if="isShow">
            <div class="img">
              <div class="bfl">▷ {{sheetInfoContent.playCount}}</div>
              <img class :src="sheetInfoContent.coverImgUrl" alt />
            </div>
            <div class="rightBox">
              <div class="name">{{sheetInfoContent.name}}</div>
              <div class="user">
                <img class :src="sheetInfoContent.avatarUrl" alt />
                {{sheetInfoContent.nickname}} ＞
              </div>
            </div>
            <tabbar>
              <tabbaritem @click.native="showInfoComment" activeColor="red">
                <img class="imgNav" slot="item-icon" src="~assets/img/sheetList/pinglun.svg" alt />
                <div class="item-text" slot="item-text">{{sheetInfoContent.commentCount}}</div>
              </tabbaritem>
              <tabbaritem activeColor="red">
                <img class="imgNav" slot="item-icon" src="~assets/img/sheetList/fenxiang.svg" alt />
                <div class="item-text" slot="item-text">分享</div>
              </tabbaritem>
              <tabbaritem activeColor="red">
                <img class="imgNav" slot="item-icon" src="~assets/img/sheetList/xiazai.svg" alt />
                <div class="item-text" slot="item-text">下载</div>
              </tabbaritem>
              <tabbaritem activeColor="red">
                <img class="imgNav" slot="item-icon" src="~assets/img/sheetList/duoxuan.svg" alt />
                <div class="item-text" slot="item-text">多选</div>
              </tabbaritem>
            </tabbar>
          </div>
        </div>
      </div>
      <div ref="content" class="content">
        <sheet-nav :trackCount="trackCount"></sheet-nav>
      </div>
      <div class="songItem">
        <song-item name="sheetInfo" :songList="songList"></song-item>
      </div>
    <transition>
      <info-comment @toback="toback" v-show="isShowinfoc"></info-comment>
    </transition>
  </div>
</template>

<script>
import menuNav from "components/context/sheetNav/SheetTopNav"; // 顶部导航栏
import tabbar from "components/common/tabbar/tabbar"; // 导航栏
import tabbaritem from "components/common/tabbar/tabbaritem";
import sheetNav from "components/context/sheetNav/SheetNav"; // 导航条
import songItem from "components/context/songItem/SongItem"; // 歌曲列表
import muiScroll from "components/common/muiScroll/MuiScroll"; // 滚动组件
import bscroll from "components/common/bscroll/Bscroll"  // 滚动组件
import infoComment from './childrenComps/SheetInfoComment'  // 歌单评论组件

import { toStringNum } from "common/common"; // 播放量转换

import { getSongDetial, getUserSongList } from "network/played"; // 歌曲列表
import { getPlayDetial, getSheetComment } from "network/sheetInfo"; // 获取歌单内容 歌单评论

export default {
  name: "SheetInfo",
  data() {
    return {
      navTitle: "歌单®",
      sheetId: this.$route.params.id, // 保存路由传递的歌单id
      sheetInfoContent: {},
      isShow: false,
      size: "100% 140%",
      songListId: [], // 歌单歌曲id
      trackCount: 0, // 歌曲数量
      songList: [], // 歌曲列表
      isWhite: true,
      isTopNav: false,  // 显示/隐藏导航栏
      isNavToTop: 0,
      isShowinfoc: false,  // 显示/隐藏评论组件
      showCollection: false,
      createId: '',
      top: 0,  // 导航栏距离顶部的距离
    };
  },
  methods: {
    // 显示评论
    showInfoComment(){
      this.isShowinfoc = true;
      this.$store.state.isShowNav = false
    },

    // 隐藏评论
    toback(){
      this.isShowinfoc = false;
      this.$store.state.isShowNav = true
    },

    // 监听滚动
    linearScroll(){   
      if (pageYOffset >= this.top) {
        this.$refs.content.style = 'position: fixed; top: 64px; left: 0; right: 0;'
      } else if (pageYOffset < this.top) {
        this.$refs.content.style = 'position: state;'
      }
    }
  },
  components: {
    menuNav,
    tabbar,
    tabbaritem,
    sheetNav,
    songItem,
    muiScroll,
    bscroll,
    infoComment
  },
  created() {
    this.$store.state.sheetId = this.$route.params.id  // 保存目前歌单id
    this.$loading.loadingShow();
    // 获取歌单基本信息
    getPlayDetial(this.sheetId).then((res) => {
      let path = res.data.playlist;
      this.sheetInfoContent.commentCount = path.commentCount; // 歌单评论数
      this.sheetInfoContent.coverImgUrl = path.coverImgUrl; // 歌单封面
      this.sheetInfoContent.name = path.name; // 歌单名称
      this.sheetInfoContent.playCount = path.playCount; // 歌单播放量
      this.sheetInfoContent.trackCount = path.trackCount; // 歌单歌曲数量
      this.trackCount = this.sheetInfoContent.trackCount;
      this.sheetInfoContent.avatarUrl = path.creator.avatarUrl; // 用户头像
      this.sheetInfoContent.nickname = path.creator.nickname; // 用户名
      this.sheetInfoContent.userId = path.creator.userId; // 用户id
      this.$store.state.createId = path.creator.userId;
      this.isShow = true;
      this.sheetInfoContent.playCount = toStringNum(
        this.sheetInfoContent.playCount
      );
      for (const item of path.trackIds) {
        this.songListId.push(item.id);
      }

      // 获取歌单歌曲列表
      getSongDetial(this.songListId.toString()).then((res) => {
        for (const item of res.data.songs) {
          // 选择性保存数据
          this.songList.push({
            mv: item.mv,
            songName: item.name,
            id: item.id,
            singer: item.ar[0].name,
            zhuanji: item.al.name,
            yuanc: item.alia,
          });
        }
      });     
    });
  },

  mounted () {
    // 保存滚动高度
    this.$nextTick(() => {
      this.top = this.$refs.content.offsetTop
      this.$loading.loadingNo()
    })
    document.addEventListener('scroll', this.linearScroll)
  },

  // 销毁阶段
  destroyed(){
    document.removeEventListener('scroll',this.linearScroll)
  }
};
</script>
<style scoped>
.bscroll{
  height: 100vh;
  top: 0;
  bottom: 0;
  position: relative;
}
.content2{
  position: relative;
  z-index: 17;
}
.SheetInfo{
  /* position: relative;
  z-index: 5; */
  background-color:  rgba(0, 0, 0, 0.8);
  margin-bottom: 40px;
  /* height: 100vh; */
}
.zhezhao {
  width: 100%;
  height: 235px;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}
.zbox {
  width: 100%;
  height: 235px;
  padding: 0;
  position: relative;
  z-index: 15;
}
.bimg {
  width: 100%;
  top: 0;
  left: 0;
  height: 235px;
  padding: 0;
  position: absolute;
  opacity: 0.3;
  background-size: 100% 130%;
}
.songItem {
  padding: 0px 16px 8px;
  background-color: #fff;
}
.nav {
  /* background-color: #fff; */
  background-color: rgba(0,0,0);
  /* position: flex; */
  color: #fff;
  position: relative;
  position: fixed;
  z-index: 20;
  top: 0;
}
.imgNav {
  margin-bottom: 1px;
}
.item-text {
  color: #fff;
}
.box {
  margin-top: 40px;
  
  padding: 20px 15px 8px;
  height: 235px;
  position: relative;
  z-index: 15;
}
.top {
  width: 100%;
  height: 3.195739rem;
}
.img {
  width: 35%;
  height: 100%;
  /* width: 3.195739rem;
  height: 3.195739rem; */
  border-radius: 5px;
  overflow: hidden;
  /* margin-right: .532623rem; */
  float: left;
  position: relative;
}
.bfl {
  position: absolute;
  font-size: 12px;
  color: #fff;
  right: 5px;
  top: 0;
}
.img img {
  width: 100%;
  height: 100%;
}
.name {
  width: 4.793609rem;
  float: right;
  /* margin-right: .665779rem; */
  position: relative;
  color: #fff;
  top: 7px;
  font-size: .532623rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.user {
  line-height: .798935rem;
  width: 4.793609rem;
  float: right;
  /* margin-right: .665779rem; */
  margin-top: .399467rem;
  font-size: 13px;
  color: rgb(243, 243, 243);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rightBox{
  width: 60%;
  height: 100%;
  float: left;
}
.user img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  float: left;
  margin-right: 7px;
}
.content {
  background-color: #000;
  width: 100%;
  padding: 0;
  margin-top: -20px;
  position: relative;
  z-index: 18;
}
.v-enter{
  opacity: 0;
  /* 进来的时候从右 */
  transform: translateX(100%);
}
.v-leave-to{
  opacity: 0;
  /* 离开的时候向左 */
  transform: translateX(-100%);
  position: absolute;
}

/* 动画执行期间 */
.v-enter-active,.v-leave-active{
    /* 添加动画效果 */
    transition: all 0.2s linear;
}
</style>