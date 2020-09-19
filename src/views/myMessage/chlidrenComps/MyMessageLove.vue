<template>
  <div class="MyMessageLove">
      <div class="box" v-if="$store.state.playList.length !== 0">
          <div class="left">
              <img :src="$store.state.playList[0].coverImgUrl" alt="">
          </div>
          <div class="center">
              <div class="listName">{{$store.state.playList[0].name}}</div>
              <div class="count">{{$store.state.playList[0].trackCount}}首</div>
          </div>
          <div class="right">
              <div class="loveMode">
                  <img src="~assets/img/myMessage/xindong.png" alt="">
                  <div class="title">心动模式</div>
              </div>
          </div>
      </div>
      <div v-else class="box">
          <div class="left1">
              <img class="aixin" src="~assets/img/myMessage/aixin.png" alt="">
          </div>
          <div class="center">
              <div class="listName">我喜欢的歌</div>
              <div class="count">0首</div>
          </div>
          <div class="right">
              <div class="loveMode">
                  <img src="~assets/img/myMessage/xindong.png" alt="">
                  <div class="title">心动模式</div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'MyMessageLove'
}

</script>
<style scoped>
    .MyMessageLove{
        width: 100%;
        height: 70px;
        background-color: #fff;
        margin-top: 15px;
        border-radius: 8px;
    }
    .box{
        width: 95%;
        height: 50px;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        display: flex;
    }
    .left{
        flex: 1.5;
        border-radius: 8px;
        overflow: hidden;
    }
    .left1{
        flex: 1.5;
        border-radius: 8px;
        overflow: hidden;
        background-color: rgba(0,0,0,026);
    }
    .left img{
        width: 100%;
        height: 100%;
    }
    .listName{
        margin-top: 8px;
        margin-left: 10px;
        font-size: 16px;
    }
    .count{
       margin-left: 10px;
       font-size: 12px; 
       color: #aaaaaa;
    }
    .center{
        flex: 5;
    }
    .right{
        flex: 3;
    }
    .loveMode{
        width: 80%;
        height: 25px;
        border-radius: 25px;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border: 1px solid #cdcdcd;
    }
    .loveMode img{
        margin-top: 5px;
        margin-left: 7px;
        float: left;
    }
    .title{
        font-size: 12px;
        position: relative;
        left: 2px;
        top: 1.5px;
    }
    .aixin{
        width: 28px;
        height: 26px;
        margin-top: 12px;
        margin-left: 12px;
    }
</style>