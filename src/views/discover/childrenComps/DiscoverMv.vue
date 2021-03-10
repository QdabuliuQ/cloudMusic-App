<template>
  <div class="DiscoverMv">
    <div class="topTitle">
      <div class="left">最新MV</div>
      <div class="right"></div>
    </div>
    <div class="mui-content" style="">
      <div id="slider" class="mui-slider">
        <div
          id="sliderSegmentedControl"
          class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
        >
          <div class="mui-scroll">
            <div
              @click="toMv(item.id)"
              v-for="(item, index) in mvList"
              :key="index"
              class="mui-control-item"
              href="#item1mobile"
            >
                <div class="itemBox">
                    <div class="topBox">
                        <img :src="item.cover" alt="">
                        <div class="count">▷ {{item.playCount}}</div>
                    </div>
                    <div class="bottomBox">
                        <div class="name"><span>{{item.name}}</span></div>
                        <div class="artistName"><span>{{item.artistName}}</span></div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewMv } from "network/discover";
import { toStringNum } from "common/common"

export default {
  name: "DiscoverMv",
  data () {
      return {
        mvList: [],  // mv数组      
      }
  },
  methods: {
    toMv(id){
      this.$router.push('/mvplay/' + id+'&'+true)
    }  
  },
  created() {
    getNewMv("", 9).then((res) => {
      for (const item of res.data.data) {
          this.mvList.push({
              id: item.id,
              name: item.name,  // mv名称
              cover: item.cover,  // mv封面
              artistName: item.artistName,  // 创作者
              playCount: toStringNum(item.playCount),  // 播放量
          })
      }
    });
  },
};
</script>
<style scoped>
.mui-control-item {
  padding: 0.213049rem 0.186418rem 0.399467rem !important;
  color: #000 !important;
}
#slider {
  height: 4.101198rem;
}
#sliderSegmentedControl {
  height: 100%;
}
.mui-content{
  background-color: var(--bgc);
}
.DiscoverMv {
  margin-top: .319574rem;
}
.topTitle {
  display: flex;
  padding: 0 0.319574rem;
}
.left {
  flex: 1;
  font-size: 0.426099rem;
  font-weight: 550;
}
.right {
  flex: 1;
}
.itemBox{
  width: 4.260985rem;
  height: 3.462051rem;
  border-radius: .213049rem;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.185);
}
.count{
    height: .532623rem;
    line-height: .532623rem;
    position: absolute;
    right: .266312rem;
    top: .133156rem;
    font-size: .319574rem;
    color: #fff;
}
.topBox{
    width: 100%;
    height: 68%;
}
.topBox img{
    width: 100%;
    height: 100%;
}
.bottomBox{
    width: 92%;
    height: 32%;
    margin: auto;
}
.name{
    margin-top: .079893rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 3.861518rem;
    height: 50%;
    line-height: .532623rem;
}
.name span{
    display: inline-block;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 3.861518rem;
    font-size: .372836rem;
}
.artistName span{
    float: left;
}
.artistName{
    width: 3.861518rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 40%;
    line-height: .426099rem;
    font-size: .319574rem;
    color: rgb(151, 151, 151);
}
</style>