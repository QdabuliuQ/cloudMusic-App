<template>
  <div class="mvBox">
    <div class="MvItem" @click="toPlay(item.id)" v-for="(item,index) in vedioList" :key="index">
        <div class="vedioImg">
            <div class="zhez"></div>
            <div class="img"><img v-lazy="item.imgurl16v9" alt=""></div>
            <div class="play">
                <img src="~assets/img/information/events/bofang.svg" alt="" />
            </div>
            <div class="mvDetail">
                <div class="left"><div class="a1">▷ {{ item.playCount }}</div></div>
                <div class="right"><div class="a2">{{item.duration}}</div></div>
            </div>
        </div>
        <div class="bottom">
            <div class="name"><div class="tag">MV</div>{{item.name}}</div>
            <div class="time"><div class="pushTime">发布时间：{{item.publishTime}}</div></div>
        </div>
    </div>
  </div>
</template>

<script>


export default {
  props: ["vedioList",],
  name: "MvItem",
  methods: {
      toPlay(id){
          this.$router.push("/mvplay/" + id);
      }
  }
};
</script>
<style scoped>
.tag{
    float: left;
    font-size: .319574rem;
    border-radius: .133156rem;
    padding: 0 .159787rem;
    border: 1px solid red;
    color: red;
    transform: scale(0.7);
    position: relative;
    top: -2px;
}
.MvItem {
  width: 100%;
  padding: 15px 15px .133156rem;
  border-bottom: .213049rem solid #e7e7e7;
}
.vedioImg{
    width: 100%;
    height: 4.793609rem;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
}
.zhez{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    position: relative;
    z-index: 10;
}
.img{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
}
.play{
    position: absolute;
    left: 50%;
    z-index: 11;
    transform: translate(-50%);
}
.play img{
    width: .798935rem;
}
.img img {
    width: 100%;
    height: 100%;
}
.mvDetail{
    position: absolute;
    z-index: 11;
    width: 100%;
    bottom: 0;
    height: .639148rem;
    line-height: .639148rem;
    display: flex;
    color: #fff;
    font-size: .346205rem;
}
.left{
    flex: 1;
}
.a1{
    margin-left: .266312rem;
}
.right{
    flex: 1;
    float: right;
    position: relative;
}
.a2{
    position: absolute;
    right: .266312rem;
}
.bottom{
    width: 100%;
    margin: .213049rem 0;
    display: flex;
}
.name{
    width: 5.326232rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 6;
    font-size: .399467rem;
}
.time{
    flex: 4;
    font-size: .319574rem;
    color: #9b9b9b;
    position: relative;
}
.pushTime{
    position: absolute;
    right: .133156rem;
}
</style>