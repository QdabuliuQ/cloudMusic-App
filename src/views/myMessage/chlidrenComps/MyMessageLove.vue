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
              <img src="~assets/img/myMessage/xindong.png" alt="" />
              <div class="title">心动模式</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="box">
        <div class="left1">
          <div class="imgBox">
            <img class="aixin" src="~assets/img/information/aixin.svg" alt="" />
          </div>
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
              <img src="~assets/img/myMessage/xindong.png" alt="" />
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
}
.left img {
  width: 100%;
  height: 100%;
}
.listName {
  /* margin-top: 8px;*/
  margin-left: 0.266312rem;
  font-size: .372836rem;
  height: .45273rem;
  line-height: .45273rem;
}
.count {
  margin-left: 0.266312rem;
  font-size: .319574rem;
  height: .45273rem;
  line-height: .45273rem;
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
}
.loveMode img {
  margin-top: 0.106525rem;
  position: relative;
  left: 0.106525rem;
  float: left;
}
.title {
  font-size: 12px;
  position: relative;
  /* left: 2px; */
  top: .039947rem;
}
.aixin {
  width: 0.745672rem;
  height: 0.69241rem;
}
.imgBox {
  width: .745672rem;
  height: .69241rem;
  margin: 0 auto;
}
.imgBox1{
  margin: 0 auto;
}
.rightBox {
  width: 2.07723rem;
  margin: 0 auto;
  text-align: center;
}
</style>