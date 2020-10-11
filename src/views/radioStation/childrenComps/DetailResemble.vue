<template>
  <div class="DetailResemble">
      <div class="item" @click="toAudio(item.id)" v-for="(item,index) in audioList" :key="index">
          <div class="left">
              <img :src="item.picUrl" alt="">
          </div>
          <div class="center">
              <div class="box">
                <div class="title">{{item.name}}</div>
                <div class="text">{{item.rcmdtext}}</div>
                <div class="count">{{item.programCount == 0 ? '最新上架，' : '节目：' +  item.programCount + '，'}} {{'订阅：' + item.subCount}}</div>
              </div>
          </div>
          <div class="right">
              <div class="btn">
                  <img src="~assets/img/radioStation/Detail/xing.svg" alt="">
                  订阅
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {getDjHot} from 'network/radioStation'

export default {
    name: 'DetailResemble',
    data () {
        return {
            hotOffset: 0,  // 热门分类分页参数
            audioList: [],  // 热门电台
        }
    },
    methods: {
        getDj(){
            getDjHot(15, this.hotOffset * 15).then(res => {
                for (const item of res.data.djRadios) {
                    this.audioList.push({
                        id: item.id,
                        name: item.name,
                        rcmdtext: item.rcmdtext,
                        picUrl: item.picUrl,
                        subCount: item.subCount, 
                        nickname: item.dj.nickname,
                        programCount: item.programCount,
                    })
                }
                this.hotOffset ++;
            })
        },

        // 路由跳转
        toAudio(id){
            this.$router.replace('/stationDetail/' + id)
            this.audioList = []
            this.getDj();
        }
    },
    beforeRouteUpdate(to, from, next) {
        if (to.fullPath != from.fullPath) {
        this.audioList = []; // 清空mv数据
        next();
        this.getDj();
        }
    },
    created () {
        this.getDj();
    }
}

</script>
<style scoped>
    .DetailResemble{
        width: 100%;
    }
    .item{
        width: 100%;
        height: 80px;
        display: flex;
        margin-bottom: 8px;
    }
    .left{
        flex: 1.9;
    }
    .center{
        flex: 5;
        display: flex;
        align-items: center;
    }
    .right{
        flex: 1.5;
        display: flex;
        align-items: center;
    }
    .left img{
        width: 100%;
        height: 100%;
        border-radius: 5px;
        overflow: hidden;
    }
    .title{
        width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 15px;
        margin-left: 8px;
    }
    .text{
        width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        color: #838282;
        margin-left: 8px;
    }
    .count{
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        color: #838282;
        margin-left: 8px;
    }
    .btn{
        width: 100%;
        height: 25px;
        line-height: 24px;
        text-align: center;
        color: #da231b;
        font-size: 12px;
        border-radius: 25px;
        border: 1.5px solid #da231b;
    }
    .btn img{
        margin-top: 3px;
        position: relative;
        left: 9px;
        float: left;
    }
</style>