<template>
  <div class="popupItem">
    <div v-if="showTitle" class="topbox">
      <div class="title">
        {{ title }}
      </div>
    </div>
    <div class="content">
      <div class="item" v-for="(item, index) in itemList" :key="index">
        <div class="img">
          <!-- <img :src="item.icon" alt="" /> -->
          <i class='iconfont' :class="item.icon"></i>
        </div>
        <div class="text">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },

    itemList: {
      type: Array,
      default: () => [],
    },

    showTitle: {
      type: Boolean,
      default: true,
    },
  },
  name: "popupItem",
};
</script>
<style scoped>
.popupItem {
  width: 100%;
  background-color: #fff;
  margin-top: 0.399467rem;
  border-radius: 0.266312rem;
}
.topbox {
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #e7e7e7;
}
.title {
  width: 100%;
  height: 0.798935rem;
  line-height: 0.798935rem;
  font-size: 0.319574rem;
  color: #c5c5c5;
  margin-left: 0.399467rem;
}
.content {
  padding: 0 0.399467rem 0;
}
.item {
  width: 100%;
  height: 1.065246rem;
  display: flex;
  align-items: center;
  font-size: 0.346205rem;
}
.img {
  width: 0.798935rem;
  height: 0.532623rem;
}
.img img {
  width: 0.532623rem;
}
</style>