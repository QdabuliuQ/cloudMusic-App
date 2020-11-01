<template>
  <div class="mvBox">
    <div
      class="MvItem"
      @click="toPlay(item.id)"
      v-for="(item, index) in vedioList"
      :key="index"
    >
      <div class="vedioImg">
        <div class="zhez"></div>
        <div class="img"><img v-lazy="item.imgurl16v9" alt="" /></div>
        <div class="play">
          <img src="~assets/img/information/events/bofang.svg" alt="" />
        </div>
        <div class="mvDetail">
          <div class="left">
            <div class="a1">▷ {{ item.playCount }}</div>
          </div>
          <div class="right">
            <div class="a2">{{ item.duration }}</div>
          </div>
        </div>
      </div>
      <div class="bottom" v-if="isMv">
        <div class="name">
          <div class="tag" v-if="isShowTag">MV</div>
          {{ item.name }}
        </div>
        <div class="time">
          <div class="pushTime">发布时间：{{ item.publishTime }}</div>
        </div>
      </div>
      <div class="bottom2" v-else>
        {{ item.name }}
      </div>
      <div class="detail" v-if="isShowDetail">
        <div class="bbox">
          <div class="bleft">
            <img :src="item.avatarUrl" alt="" />
            <div class="bname">{{ item.nickname }}</div>
          </div>
          <div class="bcenter">
            <div class="detailbox">
              <img src="~assets/img/video/dianzan.svg" alt="" />
              <span>{{ item.praisedCount }}</span>
            </div>
          </div>
          <div class="bright">
            <div class="detailbox">
              <img src="~assets/img/video/pinglun.svg" alt="" />
              <span>{{ item.commentCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    vedioList: {
      type: Array,
      default: () => [],
    },
    isShowDetail: {
      type: Boolean,
      default: false,
    },
    isShowTag: {
      type: Boolean,
      default: true,
    },
    isMv: {
      type: Boolean,
      default: true,
    },
    showDetail: {
      type: Object,
      default: () => {},
    },
  },
  name: "MvItem",
  methods: {
    toPlay(id) {
      this.$router.push("/mvplay/" + id+'&' + this.isMv);
    },
  },
};
</script>
<style scoped>
.tag {
  float: left;
  font-size: 0.319574rem;
  border-radius: 0.133156rem;
  padding: 0 0.159787rem;
  border: 1px solid red;
  color: red;
  transform: scale(0.7);
  position: relative;
  top: -2px;
}
.MvItem {
  width: 100%;
  padding: 15px 15px 0;
  border-bottom: 0.213049rem solid #e7e7e7;
}
.vedioImg {
  width: 100%;
  height: 4.793609rem;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
}
.zhez {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 10;
}
.img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}
.play {
  position: absolute;
  left: 50%;
  z-index: 11;
  transform: translate(-50%);
}
.play img {
  width: 0.798935rem;
}
.img img {
  width: 100%;
  height: 100%;
}
.mvDetail {
  position: absolute;
  z-index: 11;
  width: 100%;
  bottom: 0;
  height: 0.639148rem;
  line-height: 0.639148rem;
  display: flex;
  color: #fff;
  font-size: 0.346205rem;
}
.left {
  flex: 1;
}
.a1 {
  margin-left: 0.266312rem;
}
.right {
  flex: 1;
  float: right;
  position: relative;
}
.a2 {
  position: absolute;
  right: 0.266312rem;
}
.bottom {
  width: 100%;
  margin: 0.213049rem 0;
  display: flex;
}
.name {
  width: 5.326232rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 6;
  font-size: 0.399467rem;
}
.time {
  flex: 4;
  font-size: 0.319574rem;
  color: #9b9b9b;
  position: relative;
}
.pushTime {
  position: absolute;
  right: 0.133156rem;
}
.bottom2 {
  width: 100%;
  padding: 0.266312rem 0;
  font-size: 0.399467rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 3; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
  border-bottom: 1px solid #e9e8e8;
}
.detail {
  width: 100%;
  height: 1.198402rem;
  display: flex;
  align-items: center;
}
.bbox {
  width: 100%;
  height: 0.798935rem;
  display: flex;
}
.bleft {
  flex: 5.8;
  line-height: 0.798935rem;
  font-size: 0.372836rem;
  width: 4.953395rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bleft img {
  width: 0.798935rem;
  height: 0.798935rem;
  border-radius: 50%;
  float: left;
  margin-right: 0.133156rem;
}
.bcenter {
  width: 1.917443rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 0.798935rem;
  font-size: 0.346205rem;
  flex: 2.1;
}
.bcenter img {
  margin-top: 0.146471rem;
  float: left;
  margin-right: 0.079893rem;
}
.bright {
  width: 1.917443rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 0.798935rem;
  font-size: 0.346205rem;
  flex: 2.1;
}
.bright img {
  margin-top: 0.159787rem;
  float: left;
  margin-right: 0.079893rem;
}
</style>