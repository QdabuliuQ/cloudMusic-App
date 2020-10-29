<template>
  <div class="DiscoverHotSinger">
    <div class="topTitle">
      <div class="left">热门歌手</div>
      <div class="right">
        <div class="btn" @click="more">查看更多</div>
      </div>
    </div>
    <div class="content">
      <div
        class="item"
        @click="toSinger(item.accountId)"
        v-for="(item, index) in singerList"
        :key="index"
      >
        <div class="img">
          <img class="userimg" :src="item.picUrl" alt="" />
          <div class="tag">
            <img src="~assets/img/information/wyy.svg" alt="" />
          </div>
        </div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotSinger } from "network/discover";

export default {
  name: "DiscoverHotSinger",
  data() {
    return {
      offset: 0,
      singerList: [], // 歌手数组
    };
  },
  methods: {
    toSinger(id) {
      if (id == undefined) {
        this.$toast.show('暂时获取不到歌手信息',1900)
      } else {
        this.$router.push("/Information/" + id);
      }
    },

    more() {
      this.$router.push("/discover/moreSinger/");
    },
  },
  created() {
    getHotSinger(9, this.offset * 9).then((res) => {
      for (const item of res.data.artists) {
        this.singerList.push({
          accountId: item.accountId,
          // id: item.id,
          name: item.name,
          picUrl: item.img1v1Url,
        });
      }
    });
  },
};
</script>
<style scoped>
.DiscoverHotSinger {
  margin-top: 0.532623rem;
}
.topTitle {
  width: 100%;
  display: flex;
  padding: 0 0.319574rem;
}
.left {
  flex: 1;
  font-size: 0.426099rem;
  font-weight: 550;
  line-height: 0.665779rem;
}
.right {
  flex: 1;
}
.btn {
  float: right;
  width: 1.864181rem;
  height: 0.585885rem;
  font-size: 0.319574rem;
  border-radius: 0.585885rem;
  text-align: center;
  line-height: 0.585885rem;
  border: 1px solid #919090;
}
.content {
  width: 100%;
  padding: 0.213049rem 0.399467rem 0.266312rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.item {
  width: 31%;
  height: 3.195739rem;
  background-color: #fff;
  margin-bottom: 0.186418rem;
  border-radius: 0.266312rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.089);
}
.img {
  width: 2.130493rem;
  height: 2.130493rem;
  margin: 0.266312rem auto 0.133156rem;
  position: relative;
}
.tag {
  position: absolute;
  width: 0.45273rem;
  height: 0.45273rem;
  background-color: red;
  border-radius: 50%;
  right: 0.079893rem;
  bottom: 0.079893rem;
}
.tag img {
  width: 0.346205rem;
  position: relative;
  top: -0.079893rem;
  left: 0.045273rem;
}
.img .userimg {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}
.name {
  width: 2.849534rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  font-size: 0.372836rem;
}
</style>