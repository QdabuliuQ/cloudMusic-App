<template>
  <div class="MyMessageList">
      <div class="box" ref="mySheet">
          <div class="top">
              <div class="left">创建歌单({{this.$store.state.profile.userId !== "" ? sheetLength : 0}})个</div>
              <div class="center">
                  <img src="~assets/img/myMessage/addApp.png" alt="">
              </div>
              <div class="right">
                  <img src="~assets/img/myMessage/sandian.png" alt="">
              </div>
          </div>
          <song-sheet :sheetList="sheetList"></song-sheet>
          <div class="bottom">
              <div class="bottomBox">
                  <div class="img">
                      <img src="~assets/img/myMessage/daoru.png" alt="">
                  </div>
                  <div class="text">
                      <span>导入外部歌单</span>
                  </div>
              </div>
          </div>
      </div>
      <div class="box2" ref="collection">
          <div class="top">
              <div class="left">收藏歌单({{sheetCollectionLength}})个</div>
              <div class="center">
                  <img src="~assets/img/myMessage/addApp.png" alt="">
              </div>
              <div class="right">
                  <img src="~assets/img/myMessage/sandian.png" alt="">
              </div>
          </div>
          <song-sheet></song-sheet>
      </div>
  </div>
</template>

<script>
import songSheet from 'components/context/songSheet/SongSheet'  // 歌曲列表

export default {
    name: 'MyMessageList',
    data () {
        return {
            sheetList: 'my'  // 显示对应的歌单列表
        }
    },
    components: {
        songSheet
    },
    computed: {
        // 计算创建的歌单数量
        sheetLength(){
            return this.$store.state.playList
            .filter( item => item.creator === this.$store.state.profile.nickName ).length - 1
        },

        sheetCollectionLength(){
            return this.$store.state.playList
            .filter( item => item.creator !== this.$store.state.profile.nickName ).length
        }
    },
    mounted () {
        this.$nextTick(() => {
            // 保存滚动信息
            this.$store.state.mySheetToTop = this.$refs.mySheet.offsetTop
            this.$store.state.collectionToTop = this.$refs.collection.offsetTop
        })
    },
}

</script>
<style scoped>
    .MyMessageList{
        width: 100%;
        /* height: 100px; */
        
        margin-top: 5px;
        
    }
    .box{
        padding: 8px 13px;
        border-radius: 8px;
        background-color: #fff;
    }
    .box2{
        padding: 8px 13px 16px;
        border-radius: 8px;
        background-color: #fff;
        margin-top: 15px;
    }
    .top{
        width: 100%;
        display: flex;
        height: 25px;
        font-size: 13px;
        line-height: 25px;
        color: #9b9b9b;
    }
    .left{
        flex: 3;
    }
    .center{
        flex: 7;
    }
    .center img{
        float: right;
        margin-top: 4px;
    }
    .right{
        flex: 1;
    }
    .right img{
        height: 15px;
        float: right;
        margin-top: 4px;
    }
    .bottom{
        width: 100%;
        height: 55px;
        margin-top: 9px;
    }
    .bottomBox{
        height: 45px;
        display: flex;
        position: relative;
        top: 5px;
        
    }
    .img{
        flex: 1.5;
        background-color: #dbdbdb;
        border-radius: 8px;
    }
    .img img{
        width: 25px;
        height: 25px;
        margin-top: 10px;
        margin-left: 12px;
    }
    .text{
        flex: 8;
        line-height: 45px;
        margin-left: 10px;
    }
</style>