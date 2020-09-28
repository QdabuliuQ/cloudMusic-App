<template>
  <div class="SongItem">
      <div class="item" v-for="(item,index) in songList" :key="index">
          <div class="itemBox"  @click="play(item.id)">
              <div class="index">
                  {{index + 1 }}
              </div>
              <div class="left">
                  <div class="name">
                      {{item.songName}}
                      <span v-if="item.yuanc.length !== 0" class="yuanc">({{item.yuanc[0]}})</span>
                  </div>
                  <div class="singer">{{item.singer}} - {{' ' + item.zhuanji}}</div>
              </div>
              <div class="mv">
                  <img v-if="item.mv !== 0" src="~assets/img/common/mv.svg" alt="">
              </div>
              <div class="more" @click.stop="moreMenu">
                  <img src="~assets/img/common/sandian.svg" alt="">
              </div>
          </div>
      </div>
  </div>
</template>

<script>


export default {
    name: 'SongItem',
    props: ['songList'],
    methods: {
        play(sid){
            this.$router.push('/playSong/' + sid)
        },

        moreMenu(){
            console.log(22);
        }
    }
}

</script>
<style scoped>
    .item{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #e2e2e2ea;
    }
    .yuanc{
        color: #868686;
        font-size: 15px !important;
    }
    .itemBox{
        width: 100%;
        height: 40px;
        position: relative;
        top: 5.5px;
        display: flex;
    }
    .name{
        width: 220px;
        margin-top: 2px;
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .singer{
        width: 220px;
        color: #868686;
        margin-top: -3px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .index{
        flex: 0.52;
        text-align: center;
        margin-right: 10px;
        line-height: 40px;
    }
    .left{
        flex: 5;
    }
    .mv{
        flex: 0.7;
    }
    .mv img{
        width: 24px;
        height: 20px;
        margin-top: 10px;
        float: right;
    }
    .more{
        flex: 0.7;
    }
    .more img{
        width: 21px;
        height: 21px;
        float: right;
        margin-top: 9px;
    }
</style>