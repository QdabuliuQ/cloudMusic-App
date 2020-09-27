<template>
  <div class="bottomPlay">
      <!-- <audio 
      v-if="isAudio"
      ref="navAudio"
      id="navMusic"
      :src="musicUrl"
      ></audio> -->
      <audio 
      ref="navAudio"
      id="navMusic"
      :src="musicUrl"
      ></audio>
      <div class="cd">
          <img :src="$store.state.playContent.songImg || img" alt="">
      </div>
      <div class="text">
          <div class="item top">
              {{ $store.state.playContent.songName === '' ? '' : $store.state.playContent.songName }}
          </div>
          <div class="item bottom">
              {{ $store.state.playContent.singer === '' ? '' : $store.state.playContent.singer }}
          </div>
      </div>
      <div class="play" @click="isPlaySong">
          <img :src="isPlay" alt="">
      </div>
      <div class="list">
          <img src="~assets/img/common/liebiao.svg" alt="">
      </div>
  </div>
</template>

<script>
export default {
    name: 'BottomPlay',
    data () {
        return {
            img: require('assets/img/common/cd2.png'),
            isPlay: require('assets/img/common/shipin.svg'),
            // musicUrl: this.$store.state.playContent.songurl,
            musicUrl: require('assets/audio/ceshi.mp3'),
            navMusic: null,  // audio DOM元素
            isAudio: false,
            navPlay: false  // 控制外部播放器 播放/暂停
        }
    },
    computed: {
        isPlayM(){
            return this.$store.state.playContent.isPlayM  // 监听内部音乐是否播放
        },

        isPlayComp(){
            return this.$store.state.playSongComp
        },

        // 监听是否播放结束
        isPlayEnd(){
            return this.$store.state.isend
        }
    },
    methods: {
        // 切换图标
        isPlaySong(){
            if (this.navPlay) {
                this.isPlay = require('assets/img/common/zanting.svg')
                this.navMusic.play();
            } else {
                this.isPlay = require('assets/img/common/shipin.svg')
                this.navMusic.pause();
                this.navPlay = true
            }
        }  
    },
    watch: {
        isPlayM(){
            this.isAudio = true  
            if (this.isPlayM > 0) {
                this.navMusic = document.getElementById('navMusic')
                this.$store.state.navMusicDom = document.getElementById('navMusic')                   
                this.navMusic.src = this.$store.state.playContent.songurl                     
                this.navMusic.currentTime = this.$store.state.playContent.endTime
                this.navMusic.play()
                    
                this.isPlay = require('assets/img/common/zanting.svg')              
            }  
        },

        isPlayEnd(){
            if (this.$store.state.isend) {
                this.isPlay = require('assets/img/common/shipin.svg')
            }
        }
    },
}

</script>
<style scoped>
    .custom-button {
        width: 13px;
        height: 13px;
        color: #fff;
        background-color: #ee0a24 !important;
        border-radius: 100px;
    }
    .bottomPlay{
        width: 100%;
        height: 45px;
        background-color: #fff;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
        position: fixed;
        z-index: 50;
        bottom: 0;
        display: flex;
    }
    .cd{
        flex: 1;
    }
    .cd img{
        position: relative;
        top: 7px;
        margin-left: 7px;
        width: 32px;
        height: 32px;
        overflow: hidden;
        border-radius: 50%;
    }
    .text{
        flex: 5;
        font-size: 14px;
    }
    .top{
        margin-top: 5px;
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .bottom{
        font-size: 13px;
        color: #a0a0a0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .item{     
        height: 17px;
    }
    .play{
        flex: 1;
    }
    .play img{
        width: 31px;
        height: 31px;
        margin-top: 8px;
        margin-left: 8px;
    }
    .list{
        flex: 1;
    }
    .list img{
        width: 28px;
        margin-left: 9px;
        height: 28px;
        margin-top: 9px;
    }
</style>