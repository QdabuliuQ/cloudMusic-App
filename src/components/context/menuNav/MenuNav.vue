<template>
  <div class="RadioStationNav">
      <div class="left" @click="back">
          <img v-if="showWriteImg ? !showWriteImg : showWriteImg" src="~assets/img/radioStation/fanhui.png" alt="">
          <img v-if="showWriteImg" src="~assets/img/radioStation/fanhui2.png" alt="">   
      </div>
      <div class="center">{{navTitle}}</div>
      <div class="right"></div>
  </div>
</template>

<script>
export default {
    name: 'RadioStationNav',
    props: ['navTitle','isWhite','showWriteImg'],
    methods: {
        back(){
            this.$router.go(-1)
        }
    }
}

</script>
<style scoped>
    .RadioStationNav{
        width: 100%;
        height: 44px;
        display: flex;
        /* box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.6) !important; */
        border-bottom: 1.5px solid rgba(0, 0, 0, 0.1);
    }
    .left{
        flex: 1;
        text-align: center;
    }
    .left img{
        width: 25px;
        height: 22px;
        margin-top: 10.5px;
    }
    .center{
        flex: 7;
        line-height: 44px;
        font-size: 18px;
        text-indent: 15px;
    }
    .right{
        flex: 1;
    }
</style>