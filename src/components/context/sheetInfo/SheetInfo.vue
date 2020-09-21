<template>
  <div class="SheetInfo">
    <menu-nav class="nav" :navTitle="navTitle"></menu-nav>
    
    <div class="box">
      <div class="zhezhao"></div>
      <div class="bimg" :style="{ background: 'url('+ sheetInfoContent.coverImgUrl +')' }"></div>
      <div class="zbox" >
          <div class="top" v-if="isShow" >
            <div class="img">
            <div class="bfl">▷ {{sheetInfoContent.playCount}}</div>
            <img class :src="sheetInfoContent.coverImgUrl" alt />
            </div>
            <div class="name">{{sheetInfoContent.name}}</div>
            <div class="user">
            <img class :src="sheetInfoContent.avatarUrl" alt />
            {{sheetInfoContent.nickname}} ＞
            </div>
            <tabbar>
            <tabbaritem path="/home" activeColor="red">
                <!-- 指定 slot 放入对应的插槽中 -->
                <img class="imgNav" slot="item-icon" src="~assets/img/sheetList/pinglun.svg" alt />
                <div class="item-text" slot="item-text">{{sheetInfoContent.commentCount}}</div>
            </tabbaritem>
            <tabbaritem path="/classify" activeColor="red">
                <img class="imgNav" slot="item-icon" src="~assets/img/sheetList/fenxiang.svg" alt />
                <div class="item-text" slot="item-text">分享</div>
            </tabbaritem>
            <tabbaritem path="/cart" activeColor="red">
                <img class="imgNav" slot="item-icon" src="~assets/img/sheetList/xiazai.svg" alt />
                <div class="item-text" slot="item-text">下载</div>
            </tabbaritem>
            <tabbaritem path="/profile" activeColor="red">
                <img class="imgNav" slot="item-icon" src="~assets/img/sheetList/duoxuan.svg" alt />
                <div class="item-text" slot="item-text">多选</div>
            </tabbaritem>
            </tabbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menuNav from "components/context/menuNav/MenuNav"; // 顶部导航栏
import tabbar from "components/common/tabbar/tabbar"; // 导航栏
import tabbaritem from "components/common/tabbar/tabbaritem";

import { getPlayDetial } from "network/sheetInfo"; // 获取歌单内容

export default {
  name: "SheetInfo",
  data() {
    return {
      navTitle: "歌单",
      sheetId: this.$route.params.id, // 保存路由传递的歌单id
      sheetInfoContent: {},
      isShow: false,
      size: "100% 140%",
    };
  },
  components: {
    menuNav,
    tabbar,
    tabbaritem,
  },
  created() {
    getPlayDetial(this.sheetId).then((res) => {
      let path = res.data.playlist;
      this.sheetInfoContent.commentCount = path.commentCount; // 歌单评论数
      this.sheetInfoContent.coverImgUrl = path.coverImgUrl; // 歌单封面
      this.sheetInfoContent.name = path.name; // 歌单名称
      this.sheetInfoContent.playCount = path.playCount; // 歌单播放量
      this.sheetInfoContent.trackCount = path.trackCount; // 歌单歌曲数量
      this.sheetInfoContent.avatarUrl = path.creator.avatarUrl; // 用户头像
      this.sheetInfoContent.nickname = path.creator.nickname; // 用户名
      this.sheetInfoContent.userId = path.creator.userId; // 用户id
      console.log(this.sheetInfoContent);
      this.isShow = true;
    });
  },
};
</script>
<style scoped>
.zhezhao{  
    width: 100%;
    height: 235px;
    background-color: rgba(0, 0, 0, 0.7);
    
    position: fixed;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
}
.zbox{
    width: 100%;
    height: 235px;
    padding: 0;
    position: relative;
    z-index: 15;
}
.bimg{
   width: 100%;
   top: 0;
   left: 0;
   height: 235px;
   padding: 0;
   position: absolute;
   opacity: 0.3;
   background-size: 100% 130%;
}
.nav {
  background-color: #fff;
  position: relative;
  z-index: 20;
}
.imgNav {
  margin-bottom: 1px;
}
.item-text {
  color: #fff;
}
.box {
  padding: 20px 15px 8px;
  height: 235px;
  position: relative;
  z-index: 15;
}
.top {
  width: 100%;
  height: 120px;
}
.img {
  width: 120px;
  height: 120px;
  border-radius: 5px;
  overflow: hidden;
  margin-right: 20px;
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
  width: 180px;
  float: right;
  margin-right: 25px;
  position: relative;
  color: #fff;
  top: 7px;
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.user {
  height: 30px;
  line-height: 30px;
  width: 180px;
  float: right;
  margin-right: 25px;
  margin-top: 15px;
  font-size: 13px;
  color: rgb(243, 243, 243);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.user img {
  width: 30px;
  height: 30px;
  /* margin-top: 5px;
        margin-left: 10px; */
  border-radius: 50%;
  float: left;
  margin-right: 7px;
}
</style>