<template>
  <div class="DetailProgram">
    <div class="top">
      <span class="left">共{{ programCount }}期</span>
      <span class="right" @click="sortList">
        <img :src="topImg" alt="" />
        排序
      </span>
    </div>
    <div class="content" key="refresh">
      <div class="item" @click="playAudio(item.id)" v-for="(item, index) in programList" :key="index">
        <div class="box1">{{ item.programNum }}</div>
        <div class="box2">
          <div class="title">{{ item.name }}</div>
          <div class="detail">
            <span class="time">{{ item.createTime | getTime }}</span>
            <span class="playCount">▷ {{ item.listenerCount }}</span>
            <span class="duration">
              <img src="~assets/img/radioStation/Detail/sz.svg" alt="" />
              {{ item.duration }}
            </span>
          </div>
        </div>
        <div class="box3">
          <img src="~assets/img/common/sandian.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mscroll from "components/common/muiScroll/MuiScroll"; // 滚动组件
import { toStringNum, durationTime } from "common/common";
import { getDjProgram,getProgramDetail } from "network/radioStation";

export default {
  props: ["loadIndex"],
  name: "DetailProgram",
  data() {
    return {
      topImg: require("assets/img/radioStation/Detail/shang.svg"),
      offset: 0, // 页数
      programList: [], // 节目数据
      programCount: 0,
      programLength: 1, // 默认数组长度  用来判断是否发送请求
      bool: true,
      acs: false, // 判断是否按时间排序
      refresh: 0,
    };
  },
  methods: {
    // 路由跳转
    playAudio(id){
      this.$router.push('/audioPlay/' + id);
    },

    // 排序
    sortList() {
      if (this.bool) {
        this.topImg = require("assets/img/radioStation/Detail/xia.svg");
        this.bool = false;
        this.acs = true;  // true设置排序
        this.offset = 0;  // 重置偏移量
        this.programList = [];  // 清空数据数组
        this.getProgram();
      } else {
        this.topImg = require("assets/img/radioStation/Detail/shang.svg");
        this.acs = false;  // true设置排序
        this.offset = 0;  // 重置偏移量
        this.programList = [];  // 清空数据数组
        this.getProgram();
        this.bool = true;
      }
    },

    // 获取节目列表
    getProgram() {
      if (this.programLength > 0) {
        this.$loading.loadingShow();
        getDjProgram(this.$route.params.rid, 80, this.offset * 80,this.acs).then((res) => {
          this.programCount = res.data.count;
          this.programLength = res.data.programs.length;
          for (const item of res.data.programs) {
            this.programList.push({
              programNum: item.serialNum, // 节目期数
              name: item.name, // 节目名称
              createTime: item.createTime, // 发布时间
              listenerCount: toStringNum(item.listenerCount), // 播放数量
              duration: durationTime(item.duration), // 节目时长
              id: item.id, // 节目id
            });
          }
          this.offset++;
          this.$loading.loadingNo();
        });
      }
    },
  },
  computed: {
    index() {
      return this.loadIndex;
    },
  },
  watch: {
    index() {
      // 下拉加载
      this.getProgram();
    },
  },
  beforeRouteUpdate(to, from, next) {
    if (to.fullPath != from.fullPath) {
      this.programList = []; // 清空mv数据
      this.offset = 0
      next();
      this.getProgram();
    }
  },
  created() {
    this.getProgram();
    // getProgramDetail(this.$route.params.rid).then(res => {
    //   console.log(res);
    // })
  },
  components: {
    mscroll,
  },
};
</script>
<style scoped>
.DetailProgram {
  width: 100%;
}
.top {
  width: 100%;
  height: 25px;
  line-height: 25px;
  font-size: 13px;
}
.right {
  float: right;
}
.right img {
  position: relative;
  top: 3px;
}
.item {
  display: flex;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
}
.box1 {
  flex: 1;
  line-height: 40px;
  color: #a8a8a8;
  font-size: 14px;
}
.box2 {
  flex: 8;
}
.box3 {
  flex: 1;
  text-align: center;
}
.box3 img {
  width: 25px;
  height: 20px;
  margin-top: 10px;
}
.title {
  width: 7.456724rem;
  height: 20px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: 1px;
}
.detail {
  width: 100%;
  height: 20px;
  font-size: 12px;
  color: #a8a8a8;
}
.playCount {
  margin-left: 12px;
}
.duration {
  margin-left: 12px;
}
.duration img {
  width: 13.6px;
  position: relative;
  top: 2px;
}
</style>