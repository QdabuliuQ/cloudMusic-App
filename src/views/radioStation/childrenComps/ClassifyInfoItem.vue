<template>
  <div class="list">
      <div class="ClassifyInfoItem" @click="audioDetail(item.id)" v-for="(item,index) in audioList" :key="index">
          <div class="picUrl">
              <div class="tag" v-if="item.price != 0"><span>付费精品</span></div>
              <img v-lazy="item.picUrl" alt="">
          </div>
          <div class="text">
              <div class="content">
                  <p class="name" style="margin-bottom: 2px">{{item.name}}</p>
                  <p class="rcmdtext" style="margin-bottom: 2px">{{item.rcmdtext}}</p>
                  <p class="programCount" style="margin-bottom: 2px">节目：{{item.programCount}}，{{item.subCount < 500 ? '最新上架' : '订阅：' + item.subCount}}</p>
                  <p class="price" v-if="item.price !== 0" style="margin-bottom: 0">￥ {{item.price / 100}}</p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'ClassifyInfoItem',
    props: ['audioList'],
    methods: {
        audioDetail(rid){
            this.$router.push('/stationDetail/'+rid)
        }
    }
}

</script>
<style scoped>
    .list{
        width: 100%;
    }
    .ClassifyInfoItem{
        width: 100%;
        height: 100px;
        display: flex;
        margin-bottom: 9px;
    }
    .picUrl{
        flex: 2.1;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
    }
    .picUrl img{
        width: 100%;
        height: 100%;
    }
    .picUrl .tag{
        position: absolute;
        height: 18px;
        text-align: center;
        border-bottom-right-radius: 5px;
        line-height: 18px;
        top: 0;
        left: 0;
        font-size: 11px;
        padding: 0 2px;
        color: #fff;
        background-color: #da231b;
    }
    .tag span{
        display: inline-block;
        transform: scale(0.80);
    }
    .text{
        flex: 5;
        display: flex;
        align-items: center;
    }
    .content{
        width: 95%;
        margin-left: 5%;
        
    }
    .name{
        font-size: 14px;
        font-weight: 550;
    }
    .rcmdtext{
        font-size: 12px;
        color: #a0a0a0;
    }
    .programCount{
        font-size: 12px;
        color: #a0a0a0;
    }
    .price{
        color: #da231b;
    }
</style>