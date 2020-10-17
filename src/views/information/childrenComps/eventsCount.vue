<template>
  <div class="eventsCount">
      <div class="content">
          <div class="left">
              <img src="~assets/img/information/events/fx.svg" alt="">
              {{shareCount == 0 ? '转发' : shareCount}}
          </div>
          <div class="center">
              <img src="~assets/img/information/events/pl.svg" alt="">
              {{commentLength == 0 ? '评论' : commentLength}}
          </div>
          <div class="right">
              <img src="~assets/img/information/events/dz.svg" alt="">
              {{likedCount == 0 ? '赞' : likedCount}}
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props: ['commentLength','likedCount','shareCount'],
    name: 'eventsCount'
}

</script>
<style scoped>
    .eventsCount{
        width: 100%;
        height: .665779rem;
        display: flex;
        align-items: center;
        margin-top: .399467rem;
    }
    .content{
        display: flex;
        width: 100%;
        height: 85%;
        font-size: .346205rem;
    }
    .content img{
        float: left;
        position: relative;
        top: 2px;
        margin-right: .266312rem;
    }
    .left{
        flex: 1;
        line-height: .559254rem;
    }
    .center{
        flex: 1;
        line-height: .559254rem;
    }
    .right{
        flex: 1;
        line-height: .559254rem;
    }
</style>