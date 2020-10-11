<template>
  <div class="DetailMessage" v-if="detail">
      <div class="creater">
        <span>主播</span>
        <div class="creatorName">
          <div class="left">
            <img :src="detail.avatarUrl" alt="">
          </div>
          <div class="center">
            <div class="box">
              <div class="name">{{detail.name}}</div>
              <div class="signature">{{detail.signature ? detail.signature : '音乐创作者'}}</div>
            </div>
          </div>
          <div class="right">
            <div class="box2">
              <div class="btn">
                赞赏
              </div>
              <span v-if="detail.rewardCount !== 0">{{detail.rewardCount}}次赞赏</span>
            </div>
          </div>
        </div>
      </div>
      <div class="audioText">
        <span class="text">电台内容简介</span>
        <div class="category"><span class="title">分类：</span><span class="tag">{{detail.category}}</span></div>
        <div class="desc" v-if="detail.desc">
          {{detail.desc}}
        </div>
      </div>
      <div class="comment" v-if="detail.commentDatas == undefined || detail.commentDatas.length !== 0">
        <span>精彩评论</span>
        <div class="item" v-for="(item,index) in detail.commentDatas" :key="index">
          <div class="img">
            <img :src="item.userProfile.avatarUrl" alt="">
          </div>
          <div class="commentText">
            <div class="userName">{{item.userProfile.nickname}}</div>
            <div class="contentText">{{item.content}}</div>
            <div class="programName">{{'———— '+item.programName}}</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['detail'],
  name: 'DetailMessage',
}

</script>
<style scoped>
  .creater{
    width: 100%;
  }
  .audioText{
    width: 100%;
    margin-top: 20px;
  }
  .creater span{
    font-size: 15px;
    font-weight: 550;
  }
  .audioText .text{
    font-size: 15px;
    font-weight: 550;
  }
  .creatorName{
    width: 100%;
    height: 40px;
    margin-top: 10px;
    display: flex;
  }
  .left{
    flex: 1;
  }
  .left img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .right{
    flex: 2;
    display: flex;
    align-items: center;
  }
  .box{
    width: 230px;
    margin-left: 10px;
  }
  .name{
    width: 95%;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .signature{
    width: 95%;
    font-size: 12px;
    color: #9e9e9e;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .center{
    flex: 5;
  }
  .box2{
    width: 100%;
    height: auto;
    text-align: center;
  }
  .box2 span{
    font-size: 12px;
    color: #cdcdcd;
    margin-top: -4px;
    /* position: relative;
    top: -4px; */
  }
  .btn{
    width: 100%;
    height: 25px;
    text-align: center;
    line-height: 25px;
    font-size: 12px;
    color: #da231b;
    border-radius: 28px;
    border:1px solid #da231b;
    margin-top: -2px;
  }
  .category{
    font-size: 12px;
    margin-top: 7px;
    height: 20px;
  }
  .title{
    float: left;
    font-size: 12px;
  }
  .category .tag{
    padding: 0 5px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    float: left;
    border: 1px solid #da231b;
    color: #da231b;
    font-size: 12px;
    transform: scale(0.85);
  }
  .desc{
    clear: both;
    margin-top: 7px;
    font-size: 13px;
  }
  .comment{
    margin-top: 30px;
  }
  .comment span{
    font-size: 15px;
    font-weight: 550;
  }
  .item{
    display: flex;
    margin-top: 10px;
  }
  .img{
    flex: 1;
  }
  .img img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: 5px;
  }
  .commentText{
    flex: 6;
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
  }
  .userName{
    font-size: 13px;
    margin-top: 6px;
    color: #9e9e9e;
  }
  .contentText{
    margin-top: 10px;
    font-size: 14px;
  }
  .programName{
    width: 100%;
    font-size: 12px;
    color:#9e9e9e;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>