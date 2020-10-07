<template>
  <div class="StationItemBtn">
      <div class="item">
          <div class="itemImg"><img class="img2" src="~assets/img/radioStation/HomeP/fl.svg" alt=""></div>
          <div>电台分类</div>
      </div>
      <div class="item">
          <div class="itemImg"><img class="img1" src="~assets/img/radioStation/HomeP/ph.svg" alt=""></div>
          <div>电台排行</div>
      </div>
      <div class="item">
          <div class="itemImg"><img class="img1" src="~assets/img/radioStation/HomeP/jp.svg" alt=""></div>
          <div>付费精品</div>
      </div>
      <div class="item">
          <div class="itemImg"><img class="img1" src="~assets/img/radioStation/HomeP/jc.svg" alt=""></div>
          <div>声之剧场</div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'StationItemBtn'
}

</script>
<style scoped>
    .StationItemBtn{
        width: 100%;
        height: 85px;
        background-color: #fff;
        display: flex;
    }
    .item{
        flex: 1;
        text-align: center;
        font-size: 12px;
    }
    .itemImg{
        margin: 5px auto;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: red;
    }
    .itemImg .img1{
        width: 25px;
        position: relative;
        top: 7.5px;
        left: -0.5px;
    }
    .img2{
        width: 33px;
        position: relative;
        top: 3px;
        left: 0.5px;
    }
</style>