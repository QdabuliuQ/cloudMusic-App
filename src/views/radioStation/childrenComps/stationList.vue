<template>
  <div class="stationList">
    <ranking
      :showHot="false"
      :title="title1"
      :isRadius="false"
      :list="newAudio"
      :type="3"
    ></ranking>
    <div class="hotProgram">
      <div class="topText">
        {{ topText }}
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
          <div class="userImg">
            <img v-lazy="item.picUrl" alt="" />
          </div>
          <div class="center">
            <div class="centerbox">
              <div class="title">{{ item.name }}</div>
              <div class="creater">
                {{ item.creatorName }}
              </div>
              <div class="redu">
                <img src="~assets/img/radioStation/Ranking/redu.svg" alt="" />
                {{ item.score }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ranking from "components/context/ranking/Ranking";
import { getTopPorList } from "network/radioStation";

export default {
  name: "stationList",
  data() {
    return {
      title1: "新晋电台榜",
      newAudio: [], // 电台新晋榜
      topText: "最热电台",
      proList: [],
    };
  },
  methods: {
    toPlay(id) {
      this.$router.push("/stationDetail/" + id);
    },

    // 发送请求
    TopList(type, limit, offset) {
      getTopPorList(type, limit, offset).then((res) => {
        if (type === "new") {
          for (const item of res.data.toplist) {
            this.newAudio.push({
              name: item.name,
              avatarUrl: item.picUrl,
              id: item.id,
            });
          }
        } else if (type === "hot") {
          for (const item of res.data.toplist) {
            this.proList.push({
              rank: item.rank,
              lastRank: item.lastRank,
              name: item.name,
              picUrl: item.picUrl,
              creatorName: item.creatorName,
              score: item.score,
              id: item.id,
            });
          }
        }
      });
    },
  },
  created() {
    this.TopList("new", 3, 0);
    this.TopList("hot", 100, 0);
  },
  components: {
    ranking,
  },
};
</script>
<style scoped>
.stationList {
  width: 100%;
}
.topText {
  font-size: 17px;
}
.topText img {
  position: relative;
  top: 2px;
}
.hotProgram {
  padding: 17px 12px;
}
.hotList {
  margin-top: 12px;
}
.hotListItem {
  width: 100%;
  height: 2.130493rem;
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
  position: relative;
}
.left span {
  line-height: 1.810919rem;
}
.userImg {
  flex: 1.8;
  overflow: hidden;
  border-radius: 5px;
}
.userImg img {
  width: 100%;
  height: 100%;
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
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.creater {
  width: 5.193076rem;
  font-size: 12px;
  color: #696969;
  line-height: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.redu img {
  width: 12px;
  position: relative;
  top: 1.5px;
}
.redu {
  font-size: 12px;
  color: #6d6d6d;
}
.tag {
  width: 1.118509rem;
  height: 0.45273rem;
  position: absolute;
  top: 1.065246rem;
  left: -1px;
  font-size: 12px;
  color: #696969;
}
.tag .new {
  height: 20px;
}
.no {
  margin: 0 auto;
}
.upbox {
  width: 0.719041rem;
  margin: 0 auto;
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
.showHot img {
  width: 13px;
  position: relative;
  top: 2px;
}
.showHot {
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: #696969;
}
</style>