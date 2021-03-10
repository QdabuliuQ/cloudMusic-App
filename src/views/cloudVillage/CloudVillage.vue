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
      itemList: ['独家放送','热门话题']
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
  created () {
  },
  mounted () {
  },
  components: {
    scrollnav,
  },
  activated () {
    this.$nextTick(() => {
      this.$refs.villageNav.tabItem(0)
    })
  }
};
</script>
<style scoped>
.CloudVillage {
  width: 100%;
  margin-top: 1.171771rem;
  background-color: #fafafa;
}
.topbox {
  padding: 0 20%;
  height: 1.065246rem;
  margin: 0 auto;
  background-color: #fff;
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 20;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.nav{
  width: 90%;
  height: 100%;
  margin: 0 auto;
}
.content{
  margin: calc(1.065246rem + 45px) 0 45px;
  padding: .266312rem .399467rem;
}
</style>