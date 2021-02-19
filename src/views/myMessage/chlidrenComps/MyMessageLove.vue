<template>
  <div class="MyMessageLove">
    <div class="bbox">
      <div class="box" v-if="$store.state.playList.length !== 0">
        <div class="left">
            <div class="imgBox1">
                <img :src="$store.state.playList[0].coverImgUrl" alt="" />
            </div>
        </div>
        <div class="center">
          <div>
            <div class="listName">{{ $store.state.playList[0].name }}</div>
            <div class="count">{{ $store.state.playList[0].trackCount }}首</div>
          </div>
        </div>
        <div class="right">
          <div class="loveMode">
            <div class="rightBox">
              <i class="iconfont icon-xindong"></i>
              <div class="title">心动模式</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="box">
        <div class="left1">
          <i class="iconfont icon-xihuan"></i>
        </div>
        <div class="center">
          <div>
            <div class="listName">我喜欢的歌</div>
            <div class="count">0首</div>
          </div>
        </div>
        <div class="right">
          <div class="loveMode">
            <div class="rightBox">
              <i class="iconfont icon-xindong"></i>
              <div class="title">心动模式</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyMessageLove",
};
</script>
<style scoped>
.MyMessageLove {
  width: 100%;
  height: 1.864181rem;
  background-color: #fff;
  margin-top: .399467rem;
  border-radius: .213049rem;
  display: flex;
  align-items: center;
  box-shadow: var(--boxshaow);
}
.bbox {
  margin: 0 auto;
  width: 95%;
  height: 1.331558rem;
}
.box {
  display: flex;
}
.left {
  flex: 1.5;
  height: 1.331558rem;
  border-radius: .213049rem;
  overflow: hidden;
  text-align: center;
  display: flex;
  align-items: center;
}
.left1 {
  flex: 1.45;
  height: 1.331558rem;
  border-radius: .213049rem;
  overflow: hidden;
  background-color: #ebcece;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.left img {
  width: 100%;
  height: 100%;
}
.listName {
  /* margin-top: 8px;*/
  margin-left: 0.266312rem;
  font-size: .372836rem;
  height: .666667rem;
  line-height: .666667rem;
}
.count {
  margin-left: 0.266312rem;
  font-size: .319574rem;
  height: .4rem;
  line-height: .4rem;
  color: #aaaaaa;
}
.center {
  flex: 5;
  display: flex;
  align-items: center;
}
.right {
  flex: 3;
  display: flex;
  align-items: center;
}
.loveMode {
  width: 2.52996rem;
  height: .665779rem;
  border-radius: .665779rem;
  margin: 0 auto;
  border: 1px solid #cdcdcd;
  display: flex;
  align-items: center;
}
.loveMode .icon-xindong {
  font-size: .4rem;
  color: var(--red);
  float: left;
}
.title {
  font-size: .32rem;
  color: #8f8f8f;
  position: relative;
  left: .053333rem;
}
.icon-xihuan{
  font-size: .64rem;
  color: var(--red);
}
.imgBox1{
  margin: 0 auto;
}
.rightBox {
  width: 70%;
  margin: 0 auto;
  text-align: center;
}
</style>