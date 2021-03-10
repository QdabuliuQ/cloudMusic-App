<template>
  <div class="SheetNav">
    <i class="iconfont icon-gequbofang"></i>
    <span
      >播放全部<span class="a">(共{{ trackCount }}首)</span></span
    >
  </div>
</template>

<script>
import { collectionSheet } from "network/sheetInfo";

export default {
  name: "SheetNav",
  data() {
    return {
      textBtn: "已收藏",
      // require('assets/img/follow/hao.svg') ,
      showBtn: false, // 显示/隐藏收藏按钮
      collClass: false,
      collIndex: 1,
    };
  },
  methods: {
    isCollection() {
      if (this.collIndex === 1) {
        this.textBtn = "收藏";
        this.collClass = true;
        this.collIndex = 2;
      } else {
        this.textBtn = "已收藏";
        this.collClass = false;
        this.collIndex = 1;
      }
    },
  },
  computed: {
    createId() {
      return this.$store.state.createId;
    },
  },
  watch: {
    createId() {
      if (this.createId != this.$store.state.profile.userId) {
        this.showBtn = true;
      } else {
        this.showBtn = false;
      }
    },
  },
  props: ["trackCount"],
};
</script>
<style scoped>
.SheetNav {
  /* position: sticky;
  top: 42.5px; */
  width: 100%;
  height: 1.198402rem;
  background-color: #fff;
  border-top-left-radius: .4rem;
  border-top-right-radius: .4rem;
  line-height: 1.198402rem;
  font-size: .373333rem;
  display: flex;
  align-items: center;
}
.SheetNav .iconfont {
  font-size: .533333rem;
  color: var(--red);
  margin-left: .266667rem;
  margin-right: .133333rem;
}
.SheetNav span {
  font-size: 0.45273rem;
}
.SheetNav .a {
  color: rgb(143, 143, 143);
  font-size: 0.346205rem;
}
.collectionTrue {
  background-color: #da231b !important;
  color: #fff !important;
}
.collection {
  width: 100px;
  height: 0.852197rem;
  margin-top: 0.173103rem;
  margin-right: 0.266312rem;
  line-height: 0.852197rem;
  border-radius: 0.852197rem;
  float: right;
  font-size: 0.372836rem;
  color: #000;
  text-align: center;
  background-color: rgb(214, 214, 214);
}
.collection img {
  width: 0.479361rem;
  margin: 0;
  position: relative;
  top: 0px;
  left: 0.45273rem;
}
</style>