<template>
  <div class="SAItem" :class="[index != 2 ? 'mbottom' : '']" @click="toPlay">
    <div class="left">
      <img :src="itemDetail.picUrl" alt="" />
      <div v-if="isAlbum" class="bgcImg">
        <img src="https://img.coolcr.cn/2021/02/19/3d8358d7798e7.png" alt="" />
      </div>
    </div>
    <div class="center">
      <div class="box">
        <div class="name">
          {{ itemDetail.name }}
        </div>
        <div class="desc">
          <span v-for="(item, index) in itemDetail.artists" :key="index">
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="btn">
        <i class="iconfont icon-shouyebofang"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemDetail: {
      type: Object,
      default: {},
    },
    isAlbum: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: 0
    }
  },
  name: "SAItem",
  methods: {
    toPlay() {
      if (!this.isAlbum) {
        this.$router.push("/playSong/" + this.itemDetail.id);
      } else {
        this.$router.push("/playDetail/" + this.itemDetail.id + "&" + true);
      }
    },
  },
};
</script>
<style scoped>
.SAItem {
  width: 100%;
  height: 1.198402rem;
  display: flex;
}
.mbottom {
  margin-bottom: .266667rem;
}
.left {
  flex: 2;
  position: relative;
}
.bgcImg {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0.213049rem;
}
.bgcImg img{
  position: relative;
  left: .08rem;
}
.left img {
  width: 1.198402rem;
  height: 1.198402rem;
  border-radius: 0.133156rem;
}
.center {
  flex: 7;
  display: flex;
  align-items: center;
}
.name {
  width: 5.326232rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 0.45273rem;
  line-height: 0.45273rem;
  font-size: 0.372836rem;
}
.desc {
  height: 0.399467rem;
  line-height: 0.399467rem;
  width: 5.326232rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.346205rem;
  color: #8b8b8b;
}
.right {
  flex: 1;
  display: flex;
  align-items: center;
}
.btn {
  width: 0.665779rem;
  height: 0.665779rem;
  border-radius: 0.665779rem;
  margin: 0 auto;
  border: 1px solid #c0c0c0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn .iconfont {
  font-size: 0.293333rem;
  color: var(--red);
}
</style>