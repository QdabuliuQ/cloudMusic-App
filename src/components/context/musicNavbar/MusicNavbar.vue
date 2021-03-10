<template>
  <navbar id="navbar">
    <div id="leftbox" @click="leftPopup" slot="left">
      <i class="iconfont icon-hanbao"></i>
    </div>
    <div class="centerBox" slot="center">
      <span
        class="navbarTitle"
        v-for="(item, index) in titleList"
        :key="index"
        @click="itemClick(index)"
        :class="{ activeTitle: index === currentIndex }"
      >
        {{ item }}
      </span>
    </div>
    <div id="rightbox" slot="right" @click="toSearch">
      <i class="iconfont icon-sousuo"></i>
    </div>
  </navbar>
</template>

<script>
import navbar from "components/common/navbar/navbar"; // 导航栏组件
export default {
  name: "MusicNavbar",
  data() {
    return {
      titleList: ["我的", "发现", "云村", "视频"],
      currentIndex: 1,
    };
  },
  methods: {
    leftPopup() {
      this.$EventBus.$emit("openPopup", () => {})  // 事件总线
    },

    // 搜索组件
    toSearch() {
      this.$router.push("/discover/search");
    },

    // 组件切换
    itemClick(index) {
      this.currentIndex = index;
      switch (index) {
        case 0:
          this.$router.push("/myMessage");
          break;
        case 1:
          this.$router.push("/discover");
          break;
        case 2:
          this.$router.push("/cloudVillage");
          break;
        case 3:
          // 判断用户是否有登录
          if (!this.$store.state.cookie) {
            this.$toast.show("您需要先登录哦~", 1900);
            setTimeout(() => {
              this.$router.push("/myMessage/login");
            }, 1000);
          } else {
            this.$router.push("/video");
          }
          break;
        default:
          break;
      }
    },
  },
  watch: {
    $route: {
      // 监听路由变化
      handler: function(val, oldVal){
        if (val.fullPath == '/myMessage') {
          this.itemClick(0)
        } else if (val.fullPath == '/discover') {
          this.itemClick(1)
        } else if (val.fullPath == '/hotcomment') {
          this.itemClick(2)
        } else if (val.fullPath == '/video') {
          this.itemClick(4)
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  components: {
    navbar,
  },
};
</script>
<style scoped>
#leftbox{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#leftbox .iconfont {
  font-size: .426667rem;
}
#rightbox{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#rightbox .iconfont {
  font-size: .426667rem;
}
#navbar {
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.4) !important;
}
.navbarTitle {
  font-size: 15px;
  height: 28px;
  line-height: 30px;
  display: flex;
  padding: 0 7px;
  color: rgb(116, 116, 116);
}
.activeTitle {
  font-size: 18px;
  color: #000;
  line-height: 28px;
}
.centerBox{
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>