<template>
  <div class="bottomPlay">
      <div class="cd">
          <img :src="img" alt="">
      </div>
      <div class="text">
          <div class="item top"></div>
          <div class="item"></div>
      </div>
      <div class="play">
          <img :src="isPlay" alt="">
      </div>
      <div class="list">
          <img src="~assets/img/common/liebiao.svg" alt="">
      </div>
  </div>
</template>

<script>
export default {
    name: 'BottomPlay',
    data () {
        return {
            img: require('assets/img/common/cd2.png'),
            isPlay: require('assets/img/common/shipin.svg')
        }
    }
}

</script>
<style scoped>
    .bottomPlay{
        width: 100%;
        height: 45px;
        background-color: #fff;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
        position: fixed;
        z-index: 200;
        bottom: 0;
        display: flex;
    }
    .cd{
        flex: 1;
    }
    .cd img{
        position: relative;
        top: 7px;
        margin-left: 7px;
        width: 32px;
        height: 32px;
        overflow: hidden;
        border-radius: 50%;
    }
    .text{
        flex: 5;
        /* line-height: 45px; */
        font-size: 14px;
    }
    .top{
        margin-top: 2.5px;
    }
    .item{
        
        height: 20px;
    }
    .play{
        flex: 1;
    }
    .play img{
        margin-top: 7px;
        margin-left: 7px;
    }
    .list{
        flex: 1;
    }
    .list img{
        width: 28px;
        margin-left: 9px;
        height: 28px;
        margin-top: 9px;
    }
</style>