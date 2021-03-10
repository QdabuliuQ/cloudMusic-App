<template>
  <div class="Hotcomment">
    <div v-for="(item, index) in contentList" :key="index" class="privateItem">
      <div class="topImg">
        <img :src="item.picUrl" alt="" />
      </div>
      <div class="itemTitle">
        {{ item.name }}
      </div>
      <div class="pushTime">发布时间：{{ item.time | getTime }}</div>
    </div>
  </div>
</template>

<script>
import { getPrivateContentList } from "network/cloudVillage";
export default {
  name: "PrivateContent",
  data() {
    return {
      contentList: [],
      offset: 1,
      limit: 20,
    };
  },
  created() {
    this.privateContent(this.limit, this.offset);
  },
  methods: {
    // 获取独家放送数据
    privateContent(limit, offset) {
      getPrivateContentList(limit, offset).then((res) => {
        for (const item of res.data.result) {
          this.contentList.push(item);
        }
        // this.contentList = [...this.contentList, ...res.data.result]; // 解构赋值
      });
    },

    // 监听滚到
    listenScroll() {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      let windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件
      if (scrollTop + windowHeight >= scrollHeight - 1) {
        if (this.contentList.length <= 100) {
          let offset = ++this.offset;
          console.log("页数：" + offset);
          this.privateContent(this.limit, offset);
        } else {
          this.$toast.show("没有更多节目了:(", 1900);
        }
      }
    },
  },
  activated () {
    this.$nextTick(() => {
      window.addEventListener("scroll", this.listenScroll);
    });
  },
  components: {},
  deactivated() {
    window.removeEventListener("scroll", this.listenScroll);
  },
};
</script>
<style scoped>
.privateItem {
  width: 100%;
  margin-bottom: 0.533333rem;
}
.topImg {
  width: 100%;
  border-radius: 0.213333rem;
  overflow: hidden;
}
.topImg img {
  width: 100%;
}
.itemTitle {
  font-size: 0.373333rem;
  margin-top: 0.133333rem;
  margin-bottom: 0.133333rem;
  line-height: 0.48rem;
}
.pushTime {
  font-size: 0.32rem;
  color: rgb(156, 156, 156);
  text-align: end;
}
</style>