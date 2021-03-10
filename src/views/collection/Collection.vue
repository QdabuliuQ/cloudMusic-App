<template>
  <div class="Collection" :key="i">
    <menu-nav ref="menuNav" :backPath='backPath' class="nav" :navTitle="navTitle"></menu-nav>
    <tab-control ref="tabControl" @tabGoods='tabGoods' class="tab" :title="title"></tab-control>
    <div :style="{'margin-top': boxToTop}" class="box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import menuNav from "components/context/menuNav/MenuNav";
import tabControl from "components/common/tabControl/TabControl";

import { getSublist, getVideo } from "network/collection";

export default {
  name: "Collection",
  data() {
    return {
      navTitle: "我的收藏",
      title: ["专辑", "歌手", "视频"],
      i: 0,
      backPath: "/myMessage",
      boxToTop: 0
    };
  },
  methods: {
    tabGoods(index){
      switch (index) {
        case 0:
          this.$router.replace('/album')
          break;
        case 1:
          this.$router.replace('/singer')
          break;
        case 2:
          this.$router.replace('/mv')
          break;
        default:
          break;
      }
    }
  },
  components: {
    menuNav,
    tabControl,
  },

  mounted () {
    console.log(this.$refs.tabControl);
    this.boxToTop = (this.$refs.tabControl.$el.clientHeight + this.$refs.menuNav.$el.clientHeight) + 'px'
    console.log(this.boxToTop);
  },

  created() {
    this.$router.push('/album')
  },
};
</script>
<style scoped>
.nav {
  background-color: #fff;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
}
.tab {
  background-color: #fff;
  box-shadow:0 -0.053333rem .133333rem rgba(0, 0, 0, .3);
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 10;
}
.box {
  margin-bottom: 45px;
  padding: .319574rem .399467rem;
  background-color: #fff;
  /* height: 400px; */
}
</style>