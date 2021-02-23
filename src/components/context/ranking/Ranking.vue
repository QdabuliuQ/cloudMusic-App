<template>
  <div class="Ranking">
    <div class="hourList">
      <div class="title">
        {{ title }}
        <i class="iconfont icon-gengduo"></i>
      </div>
      <div class="itembox">
        <div class="hourItem" @click="routePush(item.id)" v-for="(item, index) in list" :key="index">
          <div class="item">
            <div class="topImg">
              <img
                class="ranking"
                :src="index === 0 ? one : index === 1 ? two : three"
                alt=""
              />
              <img
                :class="{ radius: isRadius }"
                class="url"
                :src="item.avatarUrl"
                alt=""
              />
            </div>
            <div class="name" v-if="showHot">{{ item.nickName }}</div>
            <div class="hot" v-if="showHot">
              <i class="iconfont icon-redu"></i>
              {{ item.score }}
            </div>
            <div class="text" v-else-if="!showHot">
              {{item.name}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "assets/icon/RadioStation.css"; // 字体图标
export default {
  props: ["title", "list", "isRadius", "type", "showHot"],
  data() {
    return {
      one: require("assets/img/radioStation/anchor/diyi.svg"), // 第一图标
      two: require("assets/img/radioStation/anchor/dier.svg"), // 第二图标
      three: require("assets/img/radioStation/anchor/disan.svg"), // 第三图标
    };
  },
  methods: {
    // type  1 是主播榜
    // type  2 是节目榜
    // type  3 是电台榜
    routePush(id){
      if (this.type === 1) {
        console.log('主播');
      } else if (this.type === 2) {
        console.log('节目');
      } else if (this.type === 3) {
        this.$router.push("/stationDetail/" + id);
      }
    }
  },
  name: "Ranking",
};
</script>
<style scoped>
.size{
  width: 90%;
}
.radius {
  border-radius: 50% !important;
}
.Ranking {
  width: 100%;
}
.hourList {
  padding: 0.45273rem 0.319574rem;
  border-bottom: .213333rem solid #f0efef;
}
.title {
  font-size: .453333rem;
  height: .533333rem;
  display: flex;
  align-items: center;
}
.title .icon-gengduo {
  font-size: .346667rem;
  margin-left: .133333rem;
}
.itembox {
  display: flex;
  margin-top: .32rem;
}
.hourItem {
  margin: 0 auto;
  flex: 1;
  height: 3.994674rem;
}
.item {
  margin: 0 auto;
  width: 90%;
  height: 3.994674rem;
}
.topImg {
  width: 95%;
  height: 66%;
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  text-align: center;
  border-radius: .133333rem;
}
.ranking {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
.topImg .url {
  width: 100%;
  height: 100%;
}
.name {
  width: 2.636485rem;
  height: 0.665779rem;
  font-size: .373333rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 0.665779rem;
  margin-top: 5%;
}
.hot {
  width: 100%;
  height: 0.399467rem;
  font-size: .36rem;
  color: #969696;
  text-align: center;
  line-height: 0.399467rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hot .iconfont {
  font-size: .32rem;
  margin-right: .133333rem;
}
.text{
  width: 100%;
  margin-top: .159787rem;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: .346667rem;
  line-height: 0.45273rem;
}
</style>