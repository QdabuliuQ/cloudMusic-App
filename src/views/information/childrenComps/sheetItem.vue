<template>
  <div class="sheetItem">
      <div class="left">
          <div v-if="showDiv" :style="{backgroundColor: showDivColor}" class="noSheet">
              <img class="img" :src="showImg" alt="">
          </div>
          <img class="sheetImg" v-else :src="sheetImg" alt="">
      </div>
      <div class="center">
          <div class="centerbox">
              <div class="title">{{title}}</div>
              <div class="count">{{songCount}}{{playCount}}</div>
          </div>
      </div>
      <div class="right" v-if="isRight"></div>
  </div>
</template>

<script>
export default {
    props: {
        'isRight': {  // 是否显示右侧div
            type: Boolean,
            default: false
        },
        'img': {  
            type: String,
            default: ''
        },
        'title': {  // 标题
            type: String,
            default: ''
        },
        'songCount': {  // 歌曲数量
            type: String,
            default: ''
        },
        'playCount': {  // 播放数
            type: String,
            default: ''
        },
        'showDiv': {   // 不显示歌曲封面的div
            type: Boolean,
            default: false
        },
        'showDivColor': {   // 不显示歌曲封面的div
            type: String,
            default: 'red'
        },
        'showImg': {   // 不显示歌曲封面时的图片
            type: String,
            default: ''
        },
        'sheetImg': {  // 歌曲封面
            type: String,
            default: ''
        }
    },
    name: 'sheetItem',
    
}

</script>
<style scoped>
    .sheetItem{
        width: 100%;
        height: 1.198402rem;
        display: flex;
        margin-bottom: .213049rem;
    }
    .left{
        flex: 1.3;
    }
    .left .sheetImg{
        height: 1.198402rem;
        width: 1.198402rem;
        border-radius: 8px;
    }
    .center{
        flex: 7;
        display: flex;
        align-items: center;
    }
    .right{
        flex: 1.5;
    }
    .title{
        font-size: .372836rem;
        width: 7.190413rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .count{
        font-size: .319574rem;
        color: #919191;
        width: 7.190413rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .noSheet{
        border-radius: 8px;
        height: 1.198402rem;
        width: 1.198402rem;
        text-align: center;
    }
    .img{
        width: .665779rem;
        margin-top: .319574rem
    }
</style>