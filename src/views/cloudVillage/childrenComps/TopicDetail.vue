<template>
  <div id="TopicDetail">
    <menu-nav class="navbar" :navTitle="'话题'"></menu-nav>
    <div class="activeBox">
      <!-- 图片详情 -->
      <div class="topicBgc">
        <img :src="topicDetail.topicImg" alt="" />
        <div class="mask">
          <div class="topdetail">
            <div class="title">{{ topicDetail.title }}</div>
            <div class="count">{{ topicDetail.count }}</div>
          </div>
        </div>
      </div>
      <!-- 说明文字 -->
      <div class="textbox" v-if="topicDetail.text.length != 0">
        <li style="color: #ff4b41">
          <span style="color: #616161">{{ topicDetail.text[0] }}</span>
        </li>
      </div>
      <div class="activesContainer">
        <div class="containerTitle">热门动态</div>
        <active-item
          v-for="(item, index) in events"
          :key="index"
          :itemDetail="item"
        ></active-item>
      </div>
    </div>
  </div>
</template>

<script>
import { getTopicDetail, getActiveDetail } from "network/cloudVillage";
import menuNav from "components/context/menuNav/MenuNav";
import ActiveItem from "./ActiveItem";
export default {
  name: "TopicDetail",
  data() {
    return {
      id: this.$route.params.id, // 话题id
      topicDetail: {
        // 话题数据
        topicImg: "",
        title: "",
        count: "",
        text: "",
      },
      events: [], // 热门话题动态
    };
  },
  created() {
    // 获取话题详情
    getTopicDetail(this.id).then((res) => {
      this.topicDetail.topicImg = res.data.act.coverMobileUrl;
      this.topicDetail.title = res.data.act.title;
      this.topicDetail.count = res.data.act.participateCount + "人参与";
      this.topicDetail.text = res.data.act.text;
    });

    getActiveDetail(this.id).then((res) => {
      console.log(res);
      this.events = res.data.events;
    });
  },
  components: {
    menuNav,
    ActiveItem,
  },
};
</script>
<style scoped>
#TopicDetail {
  width: 100%;
  overflow:hidden
}
.navbar{
  position: fixed;
  left: 0;
  right: 0;
}
.activeBox{
  margin-top: 45px;
  margin-bottom: 45px;
}
.topicBgc {
  width: 100%;
  height: 5.6rem;
  position: relative;
}
.topicBgc img {
  width: 100%;
  height: 100%;
}
.mask {
  position: absolute;
  z-index: 5;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.topdetail {
  color: #fff;
  text-align: center;
  padding: 0.4rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.863);
  border-bottom: 1px solid rgba(255, 255, 255, 0.863);
}
.title {
  font-size: 0.426667rem;
  height: 0.426667rem;
}
.count {
  font-size: 0.32rem;
  height: 0.32rem;
  color: rgb(226, 226, 226);
  margin-top: 0.266667rem;
}
.textbox {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.32rem;
  color: var(--fontColor);
  box-shadow: 0 1px rgba(0, 0, 0, 0.1);
}
.textbox li{
  text-align: center;
  margin-top: .266667rem;
  margin-bottom: .266667rem;
  padding: 0 .266667rem;
}
.activesContainer {
  padding: 0.32rem 0.4rem;
}
.containerTitle {
  font-size: 0.346667rem;
  margin-bottom: 0.213333rem;
}
</style>