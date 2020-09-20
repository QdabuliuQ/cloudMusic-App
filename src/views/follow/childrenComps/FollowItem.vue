<template>
  <div class="followList">
      <div class="item" v-for="(item,index) in followList" :key="index">
          <div class="itembox">
              <div class="img">
                  <img :src="item.avatarUrl" alt="">
              </div>
              <div class="text">
                  <span class="name">{{item.nickname}}</span>
                  <!-- <img class="imgvip" src="" alt=""> -->
                  <img v-if="item.vipType !== 0" class="imgvip" src="~assets/img/common/vip1.svg" alt="">
                  <!-- <span class="qm">{{item.signature}}</span> -->
                  <div class="btn" 
                  @click="isFollow(item.userId,index)"
                  :class="{isFollows : item.followBtn}">
                      <img :src="item.followBtn ? noFollowImg : isFollowImg" alt="">
                      {{item.btntext}}
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {getIsFollow} from 'network/follow'

export default {
    name: 'FollowItem',
    data () {
        return {
            isIndex: 1,
            followIndex: 0,
            isFollowImg: require('assets/img/follow/gou.svg'),
            noFollowImg: require('assets/img/follow/hao.svg')
        }
    },
    props: ['followList'],
    methods: {
        // userid 用户id
        // index 索引
        isFollow(userId, index){
            // followBtn 为 false 表示已关注
            // true 为 未关注
            if (this.followList[index].followBtn) {
                this.followList[index].btntext = '已关注'
                this.followList[index].followBtn = false
            } else {
                this.followList[index].btntext = '关注'
                this.followList[index].followBtn = true       
            }           
        }
    }
}

</script>
<style scoped>
    .item{
        width: 100%;
        height: 60px;
        /* background-color: red; */
        margin-top: 2.5px;
        margin-bottom: 3px;
        border-bottom: 1px solid #e2e2e2;
    }
    .itembox{
        /* padding: 3px 3px; */
        display: flex;
        width: 100%;
        height: 45px;
        position: relative;
        top: 7.5px;
    }
    .img{
        width: 45px;
        height: 100%;
        margin-left: 7.5px;
        border-radius: 50%;
        overflow: hidden;
    }
    .img img{
        width: 100%;
        height: 100%;
    }
    .text{
        flex: 5;
        margin-left: 15px;
        line-height: 45px;
    }
    .name{
        font-size: 15px;
    }
    .qm{
        line-height: 40px;
        overflow: hidden; /*溢出隐藏*/
        text-overflow: ellipsis; /*以省略号...显示*/
        white-space: nowrap; /*强制不换行*/
    }
    .imgvip{
        /* width: 15px; */
        width: 60px;
        height: 26px;
        margin-left: -14px;
        position: relative;
        top: 7px;
    }
    .isFollows{
        background-color: #da231b !important;
        color: #Fff !important;
    }
    .btn{
        text-align: center;
        line-height: 30px;
        font-size: 13px;
        width: 80px;
        height: 30px;
        border-radius: 30px;
        margin-top: 6px;
        color: #000;
        background-color: rgb(231, 231, 231);
        border: 1px solid #cdccdc;
        float: right;
    }
    .btn img{
        position: relative;
        top: 3px;
    }
</style>