<template>
  <div class="CloudVillage">
    <div class="topbox">
      <scrollnav 
      ref="villageNav"
      class="nav" 
      @tabToggle='tabToggle'
      :itemList='itemList' 
      :firstIndex='0'></scrollnav>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import scrollnav from "components/context/scrollNav/ScrollNav";
export default {
  name: "CloudVillage",
  data () {
    return {
      itemList: ['热评墙','热门话题']
    }
  },
  methods: {
    tabToggle(index){
      switch (index) {
        case 0:
          this.$router.replace('/hotcomment')
          break;
        case 1:
          this.$router.replace('/musicTopic')
          break;
        default:
          break;
      }
    }
  },
  mounted () {
    this.$refs.villageNav.tabItem(0)
  },
  components: {
    scrollnav,
  }
};
</script>
<style scoped>
.CloudVillage {
  width: 100%;
  margin-top: 1.171771rem;
  background-color: #fff;
}
.topbox {
  /* width: 60%; */
  padding: 0 20%;
  height: 1.065246rem;
  margin: 0 auto;
  background-color: #fff;
  position: fixed;
  top: 1.14514rem;
  left: 0;
  right: 0;
  z-index: 20;
}
.nav{
  width: 90%;
  height: 100%;
  margin: 0 auto;
}
.content{
  margin: 2.237017rem 0 1.198402rem;
  padding: .266312rem .399467rem;
}
</style>