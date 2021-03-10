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
                <i class="iconfont icon-redu"></i>
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
import "assets/icon/RadioStation.css"; // 字体图标
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
  padding: .453333rem .32rem;
}
.hotList {
  margin-top: .32rem;
}
.hotListItem {
  width: 100%;
  height: 2.130493rem;
  display: flex;
  margin-bottom: .266667rem;
}
.left {
  flex: 0.7;
  margin-right: .133333rem;
  font-size: .426667rem;
  font-weight: 550;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6d6d6d;
  position: relative;
}
.userImg {
  flex: 1.8;
  overflow: hidden;
  border-radius: .133333rem;
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
  margin-left: .266667rem;
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
  height: .533333rem;
  display: flex;
  align-items: center;
  margin-bottom: .106667rem;
  font-size: .4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.creater {
  width: 5.193076rem;
  height: .4rem;
  display: flex;
  align-items: center;
  font-size: .32rem;
  margin-bottom: .106667rem;
  color: #696969;
  line-height: .453333rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.redu .iconfont {
  font-size: .32rem;
  margin-right: .133333rem;
}
.redu {
  font-size: .32rem;
  color: #6d6d6d;
  display: flex;
  align-items: center;
}
.tag {
  width: 1.118509rem;
  height: 0.45273rem;
  position: absolute;
  top: 1.065246rem;
  left: -1px;
  font-size: .32rem;
  color: #696969;
}
.tag .new {
  height: .533333rem;
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
  height: .346667rem;
  float: left;
  position: relative;
  top: 0.093209rem;
}
.down {
  height: .346667rem;
  float: left;
  position: relative;
  top: 0.114514rem;
}
.showHot img {
  width: .346667rem;
  position: relative;
  top: .053333rem
}
.showHot {
  width: 100%;
  text-align: center;
  font-size: .32rem;
  color: #696969;
}
</style>