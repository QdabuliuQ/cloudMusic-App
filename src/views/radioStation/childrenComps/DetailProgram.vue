<template>
  <div class="DetailProgram">
    <div class="top">
      <span class="left">共{{ programCount }}期</span>
      <span class="right" @click="sortList">
        <i class="iconfont icon-shengjiangxu"></i>
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
              <i class="iconfont icon-shichang"></i>
              {{ item.duration }}
            </span>
          </div>
        </div>
        <div class="box3">
          <i class="iconfont icon-sandian"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mscroll from "components/common/muiScroll/MuiScroll"; // 滚动组件
import { toStringNum, durationTime } from "common/common";
import { getDjProgram,getProgramDetail } from "network/radioStation";
import "assets/icon/RadioStation.css"  // 字体图标
export default {
  props: ["loadIndex"],
  name: "DetailProgram",
  data() {
    return {
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
        this.bool = false;
        this.acs = true;  // true设置排序
        this.offset = 0;  // 重置偏移量
        this.programList = [];  // 清空数据数组
        this.getProgram();
      } else {
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
  height: .666667rem;
  line-height: .666667rem;
  font-size: .346667rem;
  margin: .133333rem 0;
}
.right {
  float: right;
}
.right .icon-shengjiangxu {
  font-size: .32rem;
}
.item {
  display: flex;
  width: 100%;
  height: 1.066667rem;
  margin-bottom: .266667rem;
}
.box1 {
  flex: 1;
  color: #a8a8a8;
  font-size: .346667rem;
  display: flex;
  align-items: center;
  text-indent: .106667rem;
}
.box2 {
  flex: 8;
}
.box3 {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box3 .icon-sandian {
  font-size: .4rem;
}
.title {
  width: 7.456724rem;
  height: .533333rem;
  font-size: .373333rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: 1px;
}
.detail {
  width: 100%;
  height: .533333rem;
  font-size: .32rem;
  color: #a8a8a8;
}
.playCount {
  margin-left: .32rem;
}
.duration {
  margin-left: .32rem;
}
.duration .icon-shichang {
  font-size: .32rem;
}
</style>