<template>
  <div class="CollectionSingers">
    <div
      class="singer"
      @click="toSinger(item.id, item.name)"
      v-for="(item, index) in singerList"
      :key="index"
    >
      <div class="left">
        <img v-lazy="item.picUrl" alt="" />
      </div>
      <div class="center">
        <div class="box">
          <div class="name" :class="[item.info !== '' ? 'mbottom' : '']">{{ item.name }}</div>
          <div class="info" v-if="item.info !== ''">{{ item.info }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSinger } from "network/collection";
import { searchSuggest } from "network/search";
export default {
  name: "CollectionSingers",
  data() {
    return {
      singerList: [],
      singerId: "",
      name: "",
    };
  },
  methods: {
    toSinger(id, name) {
      if (this.name !== name) {
        searchSuggest(name, 100).then((res) => {
          if (res.data.result.artists !== undefined) {
            if (res.data.result.artists[0].accountId !== undefined) {
              this.$router.push("/Information/" + res.data.result.artists[0].accountId);
            } else {
              this.$router.push("/Information/" + res.data.result.artists[0].id);
            }
          }else {
            this.$router.push("/Information/" + id);
          }
        });
      }
      this.name = name;
    },
  },
  created() {
    getSinger(this.$store.state.cookie).then((res) => {
      console.log(res);
      for (const item of res.data.data) {
        this.singerList.push({
          id: item.id,
          name: item.name,
          picUrl: item.img1v1Url,
          info: item.info,
        });
      }
    });
  },
};
</script>
<style scoped>
.CollectionSingers {
  width: 100%;
  background-color: #fff;
}
.singer {
  width: 100%;
  height: 1.331558rem;
  display: flex;
  margin-bottom: 0.319574rem;
}
.left {
  flex: 1.5;
}
.left img {
  height: 1.331558rem;
  width: 1.331558rem;
  border-radius: 50%;
}
.center {
  flex: 8.5;

  text-indent: 0.266312rem;
  display: flex;
  align-items: center;
}
.center img {
  position: relative;
  top: 0.066578rem;
  left: 5px;
}
.name {
  font-size: 0.399467rem;
}
.info {
  font-size: 0.319574rem;
  height: 0.399467rem;
  line-height: 0.399467rem;
  color: rgb(172, 171, 171);
}
.mbottom{
  margin-bottom: .106667rem;
}
</style>