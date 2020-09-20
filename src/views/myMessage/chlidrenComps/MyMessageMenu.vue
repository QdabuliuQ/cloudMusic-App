<template>
  <div class="MyMessageMenu">
      <div class="menu">
          <div class="top">
            <div class="box1">
                <div class="icon iconbox1"><img class="img1" src="~assets/img/myMessage/menu/xiazai.png" alt=""></div>
                <span>本地音乐</span>
            </div>
            <div class="box1">
                <div class="icon iconbox2"><img src="~assets/img/myMessage/menu/yunpan.png" alt=""></div>
                <span class="text">云盘</span>
            </div>
            <div class="box1">
                <div class="icon iconbox1"><img class="img1" src="~assets/img/myMessage/menu/chenggong.png" alt=""></div>
                <span>已购</span>
            </div>
            <div class="box1" @click="myPlayed">
                <div class="icon iconbox1"><img class="img1" src="~assets/img/myMessage/menu/bofang.png" alt=""></div>
                <span>最近播放</span>
            </div>
        </div>
        <div class="bottom">
            <div class="box2" @click="myFollow">
                <div class="icon"><img class="img2" src="~assets/img/myMessage/menu/guanzhu.png" alt=""></div>
                <span class="text2">我的关注</span>
            </div>
            <div class="box2">
                <div class="icon iconbox3"><img class="img3" src="~assets/img/myMessage/menu/shoucang.png" alt=""></div>
                <span class="text3">收藏和赞</span>
            </div>
            <div class="box2" @click="myRadioStation">
                <div class="icon iconbox4"><img class="img1" src="~assets/img/myMessage/menu/diantai.png" alt=""></div>
                <span>我的电台</span>
            </div>
            <div class="box2">
                <div class="icon iconbox3"><img class="img3" src="~assets/img/myMessage/menu/tianjia.png" alt=""></div>
                <span class="text4">音乐应用</span>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'MyMessageMenu',
    methods: {
        myRadioStation(){
            this.$router.push('/myMessage/radioStation')
        },

        myFollow(){
            this.$router.push('/myMessage/follow')
        },

        myPlayed(){
            this.$router.push('/myMessage/played')
        }
    }
}

</script>
<style scoped>
    .MyMessageMenu{
        /* width: 100%; */
        height: 145px;
        border-radius: 8px;
        margin-top: 10px;
        overflow: hidden;
        font-size: 13px;
        text-align: center;
        background-color: #fff;
        padding: 5px;
    }
    .top{
        width: 100%;
        height: 50%;
        display: flex;
    }
    .bottom{
        width: 100%;
        height: 50%;
        display: flex;
        margin-top: 5px;
    }
    .box1{
        flex: 1;
        position: relative;
        padding: 2px 0;
    }
    .box2{
        flex: 1;
        position: relative;
        padding: 2px 0;
    }
    .icon{
        line-height: 20px;
    }
    .iconbox1{
        margin-top: 5px;
    }
    .iconbox2{
        margin-top: 2px;
    }
    .iconbox3{
        margin-top: 3px;
    }
    .iconbox4{
        margin-top: 6px;
    }
    .text{
        position: relative;
        top: -3px;
    }
    .text2{
        position: relative;
        top: -2px;
    }
    .text3{
        position: relative;
        top: -2px;
    }
    .text4{
        position: relative;
        top: -1px;
    }
    .img1{
        width: 26px;
        height: 26px;
    }
    .img2{
        width: 33px;
        height: 33px;
    }
    .img3{
        width: 30px;
        height: 30px;
    }
</style>