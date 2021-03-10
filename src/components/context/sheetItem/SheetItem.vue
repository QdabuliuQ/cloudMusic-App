<template>
  <div class="SheetItem">
    <div class="topImg">
      <img class="fmian" v-lazy="sheetItem.picUrl" alt="" />
      <div class="count" v-if="showCount">▷ {{ sheetItem.playCount }}</div>
      <div class="toPlay" v-if="showImg">
        <div class="pImg">
          <i class="iconfont icon-shouyebofang" ></i>
        </div>
      </div>
    </div>
    <div class="sheetName" v-if="isSheet">
      {{ sheetItem.rcmdtext }}
    </div>
    <div class="programbox" v-else>
      <div class="proName">{{sheetItem.name}}</div>
      <div class="desc">
        <!-- <span>{{sheetItem.desc}}</span> -->
        <p>{{sheetItem.desc}}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    sheetItem: {
      type: Object,
      default: {},
    },
    showCount: {
      type: Boolean,
      default: true
    },
    showImg: {
      type: Boolean,
      default: false
    },
    isSheet: {
      type: Boolean,
      default: true
    }
  },
  name: "SheetItem",
};
</script>
<style scoped>
.programbox{
  min-height: .798935rem;
}
.proName{
  width: 100%;
  font-size: .372836rem;
  height: .399467rem;
  line-height: .399467rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: .133156rem;
  color: #000 !important;
}
.desc{
  width: 100%;
}
.desc p{
  word-break: break-all;
  line-height: .399467rem !important;
  font-size: .319574rem;
  color: rgb(121, 119, 119);
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
 /* autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  overflow: hidden;
}
.SheetItem {
  width: 2.663116rem;
}
.mui-control-item {
  line-height: 0 !important;
}
.sheetName{
  width: 100%;
  margin-top: 2px;
  font-size: .332889rem;
  line-height: .533333rem !important;
  text-overflow: -o-ellipsis-lastline !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 3 !important;
  -webkit-box-orient: vertical !important;
}
.topImg {
  width: 100%;
  height: 2.663116rem;
  border-radius: 7px;
  overflow: hidden;
  position: relative;
}
.toPlay{
  position: absolute;
  right: .133156rem;
  bottom: .133156rem;
  width: .665779rem;
  height: .665779rem;
  background-color: rgba(255, 255, 255, 0.664);
  border-radius: 50%;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.335);
}
.pImg{
  width: .45273rem;
  height: .45273rem;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pImg .iconfont{
  font-size: .32rem;
  color: var(--red);
  position: relative;
  left: .026667rem;
}
.topImg .fmian {
  width: 100%;
  height: 100%;
}
.count {
  position: absolute;
  height: 0.532623rem;
  line-height: 0.532623rem;
  right: 0.133156rem;
  top: 0;
  color: #fff;
  font-size: 0.319574rem;
}
</style>