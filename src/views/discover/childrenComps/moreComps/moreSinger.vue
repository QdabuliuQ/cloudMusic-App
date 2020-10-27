<template>
  <div class="moreSinger">
    <menunav class="nav" :navTitle="'歌手分类'"></menunav>
    <!-- <scrollnav @tabToggle='tabToggle' class="snav" :itemList="itemList" :firstIndex="0"></scrollnav>
    <div class="content">
      <div
        class="item"
        @click="toSinger(item.accountId)"
        v-for="(item, index) in singerList"
        :key="index"
      >
        <div class="img">
          <img class="userimg" :src="item.picUrl" alt="" />
          <div class="tag">
            <img src="~assets/img/information/wyy.svg" alt="" />
          </div>
        </div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div> -->
    <div class="topItem">
      <div class="box">
        <!-- <div class="box1">
                <div class="sitem"
                @click="itemClick(index)"
                :class="{active: aIndex === index}"
                v-for="(item,index) in itemList" 
                :key="index">{{item}}</div>
            </div>
            <div class="box2">
                <div class="type"
                @click="typeClick(index)"
                :class="{active: tIndex === index}" 
                v-for="(item,index) in typeList" 
                :key="index">{{item}}</div>
            </div> -->
        <table class="toTable">
          <tr>
            <td
              @click="itemClick(index)"
              :class="{ active: aIndex === index }"
              v-for="(item, index) in itemList"
              :key="index"
            >
              {{ item }}
            </td>
          </tr>
          <tr>
            <td
              @click="typeClick(index)"
              :class="{ active: tIndex === index }"
              v-for="(item, index) in typeList"
              :key="index"
            >
              {{ item }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="title">热门歌手</div>
    <div class="content">
      <div
        class="singer"
        @click="toSinger(item.accountId)"
        v-for="(item, index) in singerList"
        :key="index"
      >
        <div class="left">
          <img v-lazy="item.picUrl" alt="" />
        </div>
        <div class="center">
          {{ item.name }}
          <img v-if="item.accountId !== 0" src="~assets/img/discover/moreSingers/tx.svg" alt="" />
        </div>
        <div class="right">
          <div class="btn">关注</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menunav from "components/context/menuNav/MenuNav";
import scrollnav from "components/context/scrollNav/ScrollNav";
import { getSinger } from "network/discover";

export default {
  name: "moreSinger",
  data() {
    return {
      itemList: ["华语", "欧美", "韩国", "日本", "其他"],
      typeList: ["男", "女", "乐队/组合"],
      offset: 0,
      singerList: [],
      aIndex: 0,
      tIndex: 0,
      firstNavIndex: 7,
      secondNavIndex: 1,
    };
  },
  components: {
    menunav,
    scrollnav,
  },
  methods: {
    // 导航栏一切换
    itemClick(index) {
      if (this.aIndex !== index) {
        switch (index) {
          case 0: // 华语
            this.firstNavIndex = 7; // 导航栏一索引
            this.offset = 0; // 清空分页参数
            this.singerList = []; // 清空数组
            this.toggleDetail(this.secondNavIndex, this.firstNavIndex); // 调用函数
            break;
          case 1: // 欧美
            this.firstNavIndex = 96; // 导航栏一索引
            this.offset = 0; // 清空分页参数
            this.singerList = []; // 清空数组
            this.toggleDetail(this.secondNavIndex, this.firstNavIndex); // 调用函数
            break;
          case 2: // 韩国
            this.firstNavIndex = 16; // 导航栏一索引
            this.offset = 0; // 清空分页参数
            this.singerList = []; // 清空数组
            this.toggleDetail(this.secondNavIndex, this.firstNavIndex); // 调用函数
            break;
          case 3: // 日本
            this.firstNavIndex = 8; // 导航栏一索引
            this.offset = 0; // 清空分页参数
            this.singerList = []; // 清空数组
            this.toggleDetail(this.secondNavIndex, this.firstNavIndex); // 调用函数
            break;
          case 4: // 其他
            this.firstNavIndex = 0; // 导航栏一索引
            this.offset = 0; // 清空分页参数
            this.singerList = []; // 清空数组
            this.toggleDetail(this.secondNavIndex, this.firstNavIndex); // 调用函数
            break;
          default:
            break;
        }
        this.aIndex = index;
      }
    },
    // 导航栏二切换
    typeClick(index) {
      if (this.tIndex !== index) {
        switch (index) {
          case 0: // 男歌手
            this.offset = 0;
            this.secondNavIndex = 1;
            this.singerList = []; // 清空数组
            this.toggleDetail(this.secondNavIndex, this.firstNavIndex); // 调用函数
            break;
          case 1: // 女歌手
            this.offset = 0;
            this.secondNavIndex = 2;
            this.singerList = []; // 清空数组
            this.toggleDetail(this.secondNavIndex, this.firstNavIndex); // 调用函数
            break;
          case 2: // 乐队
            this.offset = 0;
            this.secondNavIndex = 3;
            this.singerList = []; // 清空数组
            this.toggleDetail(this.secondNavIndex, this.firstNavIndex); // 调用函数
            break;
          default:
            break;
        }
        this.tIndex = index;
      }
    },
    // 歌手页面跳转
    toSinger(id) {
      if (id !== 0) {
        this.$router.push("/Information/" + id);
      } else {
        this.$toast.show('暂时获取不到歌手信息',1900)
      }
    },

    /*
      7华语   1:男歌手
      96欧美  2:女歌手
      8:日本  3:乐队
      16韩国
      0:其他     
     */
    // 发送请求
    toggleDetail(type, area) {
      this.$loading.loadingShow();
      getSinger(30, this.offset * 30, type, area).then((res) => {
        for (const item of res.data.artists) {
          this.singerList.push({
            accountId: item.accountId,
            picUrl: item.picUrl,
            name: item.name,
          });
        }
        setTimeout(() => {
          this.$loading.loadingNo();
        }, 500);
      });
    },

    // 下拉加载
    scrollLoading(type, area) {
      this.offset++;
      this.$loading.loadingShow();
      getSinger(30, this.offset * 30, type, area).then((res) => {
        for (const item of res.data.artists) {
          this.singerList.push({
            accountId: item.accountId,
            picUrl: item.picUrl,
            name: item.name,
          });
        }
        setTimeout(() => {
          this.$loading.loadingNo(); // 下拉加载
        }, 500);
      });
    },

    // 监听滚动事件
    linearScroll() {
      // 滚动条距离顶部的距离
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 可视区的高度
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      // 滚动条可滚动的高度
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        this.$loading.loadingShow();
        setTimeout(() => {
          this.scrollLoading(this.secondNavIndex, this.firstNavIndex);
          this.$loading.loadingNo();
        }, 1000);
      }
    },
  },
  created() {
    // 默认显示华语男歌手
    getSinger(30, this.offset * 30, 1, 7).then((res) => {
      console.log(res);
      for (const item of res.data.artists) {
        this.singerList.push({
          accountId: item.accountId || 0,
          picUrl: item.picUrl,
          name: item.name,
        });
      }
    });
  },
  mounted() {
    this.$nextTick(() => {
      document.addEventListener("scroll", this.linearScroll);
    });
  },
  activated() {
    document.removeEventListener("scroll", this.linearScroll);
  },
};
</script>
<style scoped>
.toptd {
  margin-bottom: 0.266312rem;
}
.toTable {
  margin-left: 0.133156rem;
  font-size: 0.372836rem;
}
.toTable tr {
  height: 0.798935rem;
}
.toTable td {
  width: 1.864181rem;
  line-height: 0.798935rem;
  text-align: center;
}
.active {
  color: red;
}
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.snav {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 10;
}
.moreSinger {
  width: 100%;
}
.topItem {
  margin-top: 44px;
  width: 100%;
  height: 2.396804rem;
  background-color: #fff;
  display: flex;
  align-items: center;
}
.box {
  width: 100%;
}
.box1 {
  width: 100%;
  height: 0.798935rem;
  line-height: 0.798935rem;
  padding: 0 0.399467rem;
}
.box2 {
  width: 100%;
  height: 0.665779rem;
  line-height: 0.665779rem;
  padding: 0 0.399467rem;
}
.sitem {
  float: left;
  font-size: 0.372836rem;
  padding: 0 0.426099rem;
}
.type {
  float: left;
  font-size: 0.372836rem;
  padding: 0 0.559254rem;
}
.title {
  width: 100%;
  height: 0.665779rem;
  font-size: 0.332889rem;
  text-indent: 0.266312rem;
  line-height: 0.665779rem;
  color: rgb(143, 143, 143);
}
.content {
  min-height: 13.315579rem;
  padding: 0.319574rem 0.266312rem;
  background-color: #fff;
  width: 100%;
  margin-bottom: 1.198402rem;
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
  flex: 6;
  line-height: 1.331558rem;
  font-size: 0.399467rem;
  text-indent: 0.266312rem;
}
.center img {
  position: relative;
  top: 0.066578rem;
  left: 5px;
}
.right {
  flex: 2.5;
  display: flex;
  align-items: center;
}
.btn {
  width: 80%;
  height: 0.798935rem;
  border-radius: 0.798935rem;
  line-height: 0.798935rem;
  text-align: center;
  color: #fff;
  background-color: #da231b;
  font-size: 0.346205rem;
  margin: auto;
}
</style>