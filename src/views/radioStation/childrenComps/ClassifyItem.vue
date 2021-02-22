<template>
  <div class="ClassifyItem" @click="toClassifyView">
    <div class="img"><img :src="itemImg" alt="" /></div>
    <div class="name">
      <div
        class="itemName"
        v-bind:style="{
          borderRight: itemIndex % 2 == 0 ? '1px solid #dfdfdf' : 0,
        }"
      >
        {{ itemName }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClassifyItem",
  // itemImg 分类图标  // itemName 分类名称  // itemIndex 分类索引  // itemId 分类id
  props: ["itemImg", "itemName", "itemIndex", "itemId"],
  data() {
    return {
      isClick: false,
    };
  },
  methods: {
    toClassifyView() {
      this.$router.push("/classifyInfo/" + this.itemId);
    },
  },
};
</script>
<style scoped>
.ClassifyItem {
  width: 50%;
  height: 1.333333rem;
  box-sizing: border-box;
  display: flex;
  border-bottom: 1px solid #dfdfdf;
}
.img {
  flex: 4;
  display: flex;
  align-items: center;
  position: relative;
}
.name {
  flex: 5;
  font-size: .386667rem;
}
.img img {
  width: .746667rem;
  height: .746667rem;
  position: absolute;
  right: .133333rem;
}
.itemName {
  line-height: .666667rem;
  width: 100%;
  height: .666667rem;
  position: relative;
  top: .32rem;
  font-weight: 440;
}
</style>