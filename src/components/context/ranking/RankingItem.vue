<template>
  <div class="RankingItem">
    <div class="hotProgram">
      <div class="topText">
        {{topText}}
        <img src="~assets/img/radioStation/Ranking/tishi.svg" alt="" />
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
            <div class="tag">
              <img
                v-if="item.lastRank === -1"
                class="new"
                src="~assets/img/radioStation/Ranking/new.svg"
                alt=""
              />
              <div class="upbox" v-else-if="item.lastRank - item.rank > 0">
                <img
                  class="up"
                  src="~assets/img/radioStation/Ranking/shang.svg"
                  alt=""
                />{{ item.lastRank - item.rank }}
              </div>
              <div class="no" v-else-if="item.lastRank - item.rank === 0">
                - {{ " " + item.lastRank - item.rank }}
              </div>
              <div class="upbox" v-else-if="item.lastRank - item.rank < 0">
                <img
                  class="down"
                  src="~assets/img/radioStation/Ranking/xia.svg"
                  alt=""
                />{{ item.rank - item.lastRank }}
              </div>
            </div>
          </div>
          <div class="userImg" :class="{isRadius: isRadius}">
            <div v-if="item.userType !== 0" class="mlogo">
              <img src="~assets/img/radioStation/Ranking/yinle.svg" alt="">
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
                  <img src="~assets/img/radioStation/Ranking/redu.svg" alt="" />
                  {{ item.score }}
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="rightImg" v-if="showImg">
              <img src="~assets/img/radioStation/Ranking/bofang.svg" alt="" />
            </div>
            <div class="showHot" v-else-if="showHot"><img src="~assets/img/radioStation/Ranking/redu.svg" alt="" />{{item.score}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toStringNum } from "common/common";
export default {
  props: ["topText", "proList", "showDetail", "showImg", "showHot", 'isRadius'],
  name: "RankingItem",
};
</script>
<style scoped>
.topText{
    font-size: 17px;
}
.topText img{
    position: relative;
    top: 2px;
}
.RankingItem {
  width: 100%;
}
.hotProgram {
  padding: 17px 12px;
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
  margin-right: 5px;
  font-size: 18px;
  font-weight: 550;
  /* line-height: ; */
  text-align: center;
  color: #6d6d6d;
}
.left span {
  line-height: 1.011984rem;
}
.userImg {
  flex: 1.4;
  /* overflow: hidden; */
  border-radius: 5px;
  position: relative;
}
.mlogo{
  width: .479361rem;
  height: .479361rem;
  position: absolute;
  z-index: 5;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  background-color: #da231b;
  text-align: center;
}
.mlogo img{
  width: .346205rem;
  position: relative;
  top: -2.5px;
}
.isRadius{
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
  margin-left: 10px;
}
.right {
  flex: 1.7;
  text-align: center;
  display: flex;
  align-items: center;
}
.right img {
  width: 30px;
}
.rightImg {
  margin: auto;
}
.topActive {
  color: #da231b;
}
.title {
  width: 5.193076rem;
  font-size: 14px;
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
.tag {
  height: 17px;
  position: relative;
  top: -0.399467rem;
  font-size: 12px;
  color: #696969;
}
.tag .new {
  height: 20px;
}
.upbox {
  width: 0.719041rem;
  text-align: center;
}
.tag .up {
  height: 13px;
  float: left;
  position: relative;
  top: 0.093209rem;
}
.down {
  height: 13px;
  float: left;
  position: relative;
  top: 0.114514rem;
}
.showHot img{
    width: 13px;
    position: relative;
    top: 2px;
}
.showHot{
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #696969;
}
</style>