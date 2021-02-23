<template>
  <div class="RankingItem">
    <div class="hotProgram">
      <div class="topText">
        {{topText}}
      </div>
      <div class="hotList" v-if="proList.length !== 0">
        <div
          @click="toPlay(item.id)"
          class="hotListItem"
          v-for="(item, index) in proList"
          :key="index"
        >
          <div class="left">
            <span :class="{ topActive: index < 3 }">{{ index + 1 }}</span>
          </div>
          <div class="userImg" :class="{isRadius: isRadius}">
            <div v-if="item.userType !== 0" class="mlogo">
              <i class="iconfont icon-logo"></i>
            </div>
            <img class="coverUrl" v-lazy="item.coverUrl" alt="" />
          </div>
          <div class="center">
            <div class="centerbox">
              <div class="title">{{ item.name }}</div>
              <div class="detail" v-if="showDetail">
                <img :src="item.picUrl" alt="" />
                <div class="creater">
                  {{ item.nickName }}
                </div>
                <div class="redu">
                  <i class="iconfont icon-redu"></i>
                  {{ item.score }}
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="rightImg" v-if="showImg">
              <i class="iconfont icon-gequbofang"></i>
            </div>
            <div class="showHot" v-else-if="showHot">
              <i class="iconfont icon-redu"></i>
              {{item.score}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "assets/icon/RadioStation.css"; // 字体图标
import { toStringNum } from "common/common";
export default {
  props: ["topText", "proList", "showDetail", "showImg", "showHot", "isRadius"],
  name: "RankingItem",
};
</script>
<style scoped>
.topText {
  font-size: 0.453333rem;
}
.RankingItem {
  width: 100%;
}
.hotProgram {
  padding: 0.453333rem 0.32rem;
}
.hotList {
  margin-top: 12px;
}
.hotListItem {
  width: 100%;
  height: 1.331558rem;
  display: flex;
  margin-bottom: 10px;
}
.left {
  flex: 0.9;
  margin-right: .133333rem;
  font-size: .426667rem;
  font-weight: 550;
  /* line-height: ; */
  text-align: center;
  color: #6d6d6d;
  display: flex;
  align-items: center;
  justify-content: center;
}
.left span {
  line-height: 1.011984rem;
}
.userImg {
  flex: 1.4;
  /* overflow: hidden; */
  border-radius: 0.133333rem;
  position: relative;
}
.mlogo {
  width: 0.479361rem;
  height: 0.479361rem;
  position: absolute;
  z-index: 5;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  background-color: #da231b;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mlogo .icon-logo {
  color: #fff;
  font-size: 0.32rem;
  position: relative;
  top: 0.026667rem;
}
.isRadius {
  border-radius: 50%;
}
.userImg .coverUrl {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.center {
  flex: 5;
  display: flex;
  align-items: center;
}
.centerbox {
  margin-left: 0.266667rem;
}
.right {
  flex: 1.7;
  text-align: center;
  display: flex;
  align-items: center;
}
.topActive {
  color: #da231b;
}
.title {
  width: 5.193076rem;
  font-size: .373333rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.detail {
  width: 100%;
  display: flex;
  align-items: center;
}
.creater {
  padding-right: 8px;
  border-right: 1px solid #d8d8d8;
  font-size: 12px;
  color: #696969;
  line-height: 17px;
  position: relative;
  display: inline-block;
  display: inline;
  zoom: 1;
}
.detail img {
  width: 17px;
  height: 17px;
  border-radius: 50%;
  float: left;
  margin-right: 4px;
}
.redu img {
  width: 12px;
  position: relative;
  top: 1.5px;
}
.redu {
  font-size: 12px;
  color: #6d6d6d;
  margin-left: 8px;
}
.rightImg .iconfont{
  font-size: .453333rem;
  color: #696969;
}
.showHot .icon-redu {
  font-size: .32rem;
  margin-right: .133333rem;
}
.showHot {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .32rem;
  color: #696969;
}
</style>