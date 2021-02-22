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
    margin-top: .533333rem;
  }
  .creater span{
    font-size: .4rem;
    font-weight: 550;
  }
  .audioText .text{
    font-size: .4rem;
    font-weight: 550;
  }
  .creatorName{
    width: 100%;
    height: 1.066667rem;
    margin-top: .266667rem;
    display: flex;
  }
  .left{
    flex: 1;
  }
  .left img{
    width: 1.066667rem;
    height: 1.066667rem;
    border-radius: 50%;
  }
  .box{
    width: 6.125166rem;
    margin-left: .266667rem;
  }
  .name{
    width: 5.805593rem;
    margin-right: 0;
    font-size: .373333rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .signature{
    width: 5.805593rem;
    margin-right: 0;
    font-size: 12px;
    color: #9e9e9e;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .center{
    flex: 8;
    display: flex;
    align-items: center;
  }
  .box2{
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .box2 span{
    font-size: .32rem;
    color: #cdcdcd;
    margin-top: -0.106667rem;
    /* position: relative;
    top: -4px; */
  }
  .btn{
    width: 100%;
    height: .666667rem;
    text-align: center;
    line-height: .666667rem;
    font-size: .32rem;
    color: #da231b;
    border-radius: .746667rem;
    border:1px solid #da231b;
    margin-top: -0.053333rem;
  }
  .category{
    font-size: .32rem;
    margin-top: .186667rem;
    height: .533333rem;
  }
  .title{
    float: left;
    font-size: .32rem;
    position: relative;
    top: .053333rem;
  }
  .category .tag{
    padding: 0 .133333rem;
    height: .48rem;
    text-align: center;
    line-height: .48rem;
    float: left;
    border: 1px solid var(--red);
    color: var(--red);
    font-size: .32rem;
    transform: scale(0.85);
  }
  .desc{
    clear: both;
    margin-top: .186667rem;
    font-size: .346667rem;
  }
  .comment{
    margin-top: .8rem;
  }
  .comment span{
    font-size: .4rem;
    font-weight: 550;
  }
  .item{
    display: flex;
    margin-top: .266667rem;
  }
  .img{
    flex: 1;
    margin-right: .133333rem;
  }
  .img img{
    width: .8rem;
    height: .8rem;
    border-radius: 50%;
    overflow: hidden;
    margin-left: .133333rem;
  }
  .commentText{
    flex: 6;
    padding-bottom: .266667rem;
    border-bottom: 1px solid #e0e0e0;
  }
  .userName{
    width: 100%;
    font-size: .346667rem;
    margin-top: .16rem;
    color: #9e9e9e;
  }
  .contentText{
    width: 8.255659rem;
    margin-top: .266667rem;
    font-size: .346667rem;
    line-height: .453333rem;
  }
  .programName{
    /* width: 100%; */
    width: 8.255659rem;
    font-size: .32rem;
    color:#9e9e9e;
    margin-top: .266667rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>