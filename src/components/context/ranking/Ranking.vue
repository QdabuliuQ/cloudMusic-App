<template>
  <div class="Ranking">
    <div class="hourList">
      <div class="title">
        {{ title }}<img src="~assets/img/radioStation/Ranking/you.svg" alt="" />
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
              <img src="~assets/img/radioStation/Ranking/redu.svg" alt="" />
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
  border-bottom: 8px solid #f0efef;
}
.title {
  font-size: 17px;
  height: 20px;
  line-height: 20px;
}
.title img {
  width: 14px;
  position: relative;
  top: 1.5px;
  margin-left: 5px;
}
.itembox {
  display: flex;
  margin-top: 12px;
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
  border-radius: 5px;
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
  font-size: 14px;
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
  font-size: 13.5px;
  color: #969696;
  text-align: center;
  line-height: 0.399467rem;
}
.hot img {
  width: 13px;
  float: left;
  position: relative;
  top: -1px;
  left: 0.585885rem;
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
  font-size: 13px;
  line-height: 0.45273rem;
}
</style>