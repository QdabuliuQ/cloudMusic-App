<template>
  <div class="songbox" :style="{ background: 'url(' + bgimg + ') no-repeat ', backgroundSize: size  }">
      <div class="PlaySong">
        <sheet-topnav :navTitle="navTitle" :rightImg="rightImg"></sheet-topnav>
        <div v-show="showLogo" @click="isShowLogo" class="logo">
            <div ref="guanp" class="guanp">
                <img class="img" src="~assets/img/playSong/gp3.png" alt="">
                <div class="songImg">
                    <!-- 歌曲封面 -->
                    <img :src="bgimg" alt="">
                </div>
            </div>
        </div>
        <!-- 歌词列表 -->
        <lyric-list
        @click.native="isShowLyric"
        v-show="showLyric" 
        :lyricText='lyricText' 
        :songLyric="songLyric" 
        :value="value"
        :songTime="songTime"
        :cTime="cTime"
        :indexLyric="indexLyric"
        class="lyric"></lyric-list>
        <div class="nav">
            <snav></snav>
        </div>
        <!-- 进度条 -->
        <div class="playbox">
            <div class="start">{{minT > 9 ? minT : '0' + minT}}:{{secondT > 9 ? secondT : '0' + secondT}}</div>
            <div class="PlaySongTime">    
                <van-slider 
                class="box" 
                v-model="value" 
                active-color="#ee0a24"
                bar-height="3px"
                inactive-color="#cdcdcd"
                @change="onChange">
                    <template #button>
                        <div class="custom-button"></div>
                    </template>
                </van-slider>
            </div>
            <div class="end">{{songLength}}</div>
        </div>
        <!-- 按钮组 -->
        <bnav ref="bnav" @playBtn="playBtn"></bnav>
        <!-- canplay 监听 audio 是否加载完成事件 -->
        <audio
        ref="audioTime"
        @canplay='songLoad' 
        muted="muted" 
        id="music1" 
        :src="songUrl"
        @timeupdate="timeupdate "></audio>
      </div>
  </div>
</template>

<script>
import sheetTopnav from 'components/context/sheetNav/SheetTopNav'  // 导航栏
import Bnav from './childrenComps/PlaySongBnav'  // 底部导航栏
import Snav from './childrenComps/PlaySongNav'
import PlaysongTime from './childrenComps/PlaySongTime'  // 进度条
import LyricList from 'components/common/lyricList/LyricList'  // 歌词列表

import {getSongDetial} from 'network/played'  // 获取歌曲基本信息
import {playSong,getlyric} from 'network/playSong'  // 获取音乐url 歌词

export default {
    name: 'PlaySong',
    data () {
        return {
            navTitle: '',
            rightImg: require('assets/img/playSong/fenxiang.svg'),
            id: '',  // 音乐id
            bgimg: '',  // 封面图
            songUrl: '',  // 音乐url
            isPlay: 1,
            songLength: 0,  // 音乐长度
            audioDom: '',  // audio标签
            value: 0,
            timeS: null,  // 定时器
            songTime: 0,  // 音乐总秒数
            secondT: 0,  // 左侧进度条秒数
            minT: 0,  // 左侧进度条分钟数
            size: '200% 300%',  // 背景图大小
            rotateLogo: null,  // 控制封面旋转
            rotateDeg: 0,  // 封面旋转定时器
            showLogo: true,  // 显示/隐藏logo
            lyricText: [],  // 保存歌词
            cTime: 0,  // 歌曲实时秒数
            songLyric: [],  // 歌曲时间戳
            showLyric: false,  // 歌曲列表显示/隐藏
            indexLyric: 0
        }
    },
    components: {
        sheetTopnav,
        Snav,
        Bnav,
        PlaysongTime,
        LyricList
    },
    methods: {
        timeupdate(currentTime){
            this.cTime = this.audioDom.currentTime
        },

        isShowLogo(){
            this.showLogo = false
            this.showLyric = true
        },

        isShowLyric(){
            this.showLogo = true
            this.showLyric = false
        },

        // 播放/暂停音乐
        playBtn(){
            // 操作dom 播放音乐
            if (this.isPlay === 0) {
                this.audioDom.pause()  // 暂停
                this.$refs.bnav.endImg()  // 切换图标
                this.isPlay = 1
                clearInterval(this.rotateLogo)  // 封面旋转
                clearInterval(this.timeS)
                if (this.value >= 100) {
                    this.$refs.guanp.style.transform =  'rotate(0deg)';
                    this.audioDom.currentTime = 0  // 重置播放时间
                    this.$refs.bnav.playingImg()  // 更换图标
                    this.isPlay = 0;  // 更改索引
                    this.value = 0;  // 清空进度条
                    this.minT = 0;  // 清空时间
                    this.secondT = 0;  // 清空时间
                    
                    clearInterval(this.time)  // 防止多个定时器  清除定时器 
                    this.timeS = setInterval(this.setInPlay, 1000)  // 计算时间
                    this.audioDom.play()  // 重新播放音乐
                }
            // 目前处于播放状态
            } else {
                if (this.audioDom !== '') {
                    this.audioDom.play();  // 播放音乐
                    this.$refs.bnav.playingImg()  // 更换图片
                    clearInterval(this.rotateLogo)
                    this.rotateLogo = setInterval(this.rotate, 30)  // 封面旋转
                    this.isPlay = 0;
                    clearInterval(this.time)  // 防止多个定时器  清除定时器
                    this.timeS = setInterval(this.setInPlay, 1000)
                } else {
                    console.log(this.audioDom);
                    this.$toast.show('歌曲资源丢失', 1900)
                }
            }   
        },

        // 封装封面旋转方法
        rotate(){
            this.rotateDeg += 1
            // 修改 style 的 transform 属性
            if (this.$refs.guanp) {
                this.$refs.guanp.style.transform =  'rotate(' + this.rotateDeg +'deg)';
            }
        },

        // 封装方法
        setInPlay(){
            // 进度条时间更新
            this.secondT++;
            if (this.secondT > 59) {
                this.minT ++;
                this.secondT = 0          
            }

            // 控制 value 增加进度条会移动
            // 100 / 获取歌曲总秒数 = 每秒增加的 value
            // 当 value 到 100 的时候 音乐也会播放完成
            this.value += 100 / this.songTime
            // console.log(this.value);
            if (this.value >= 100) {
                this.value = 100
                this.$refs.bnav.endImg();
                clearInterval(this.rotateLogo)
                this.$refs.guanp.style.transform =  'rotate(0deg)';
                clearInterval(this.timeS)  // value等于100表示播放结束
            }
        },
        
        // 监听audio加载事件
        songLoad(){
            this.audioDom = document.getElementById('music1');  // 获取dom
            if (this.audioDom !== '') {
                this.songTime = this.audioDom.duration.toFixed(2)  // 保存歌曲时间
                let time = this.audioDom.duration;
                let min = Math.floor(this.songTime / 60).toFixed(0) > 10 ? Math.floor(this.songTime / 60).toFixed(0) : '0' + Math.floor(this.songTime / 60).toFixed(0) ;  // 分钟
                let second = this.songTime % 60 > 9 ? this.songTime % 60 : '0' + (this.songTime % 60);  // 秒数
                let length = (min+ ":" +second).slice(5)
                this.songLength = (min+ ":" +second).replace(length, ' ')
            }
        },

        // 歌曲进度跳转
        onChange(value){
            this.$refs.bnav.playingImg()  // 切换图标
            this.isPlay = 0  // 修改索引
            this.audioDom.pause();  // 暂停
            clearInterval(this.rotateLogo)  // 清除重复定时器
            this.rotateLogo = setInterval(this.rotate, 30)  // 开启定时器
            let timeAll = 100 / this.audioDom.duration  // 计算一秒增加多少 value
            this.audioDom.currentTime = value / timeAll;  // 计算出拖动按钮后  歌曲对应播放的时间点
            this.minT = Math.floor(this.audioDom.currentTime / 60)  // 计算出分钟数
            this.secondT = (this.audioDom.currentTime % 60).toFixed(0)  // 计算秒数
            this.cTime = this.audioDom.currentTime;  // 将拖到后的秒数保存传递给 歌单滚动 组件
            this.indexLyric += 1
            this.audioDom.play()
            clearInterval(this.timeS)
            this.timeS = setInterval(this.setInPlay, 1000)
            if (this.value >= 100) {
                this.value = 100
                this.$refs.bnav.endImg();     
                clearInterval(this.timeS)  // value等于100表示播放结束
            }
        }
    },
    created () {
        // 获取歌曲基本信息
        getSongDetial(this.$route.params.sid).then(res => {
            let result = res.data.songs[0]
            this.navTitle = result.name;  // 歌曲名称
            this.id = result.id;  // 歌曲id
            this.bgimg = result.al.picUrl;  // 歌曲封面
            playSong(this.id).then(res => {
                
                if (res.data.data[0].url !== null) {
                    this.songUrl = res.data.data[0].url  // 歌曲url
                }
            })
        }),

        // 获取歌词
        getlyric(this.$route.params.sid).then(res => {
            if (res.data.lrc !== undefined) {
                let text = res.data.lrc.lyric;
                let reg = /[\[|[0-9\:\.]|]]/ig  // 正则匹配去除 []
            
                let lyric = text.replace(reg, '')
                this.lyricText = lyric.split(']')  // 将字符串转为数组        
                console.log(this.lyricText);

                var reg2 = /\[(.+?)\]/g;  // 正则匹配出时间
                let time = text.match(reg2)  // match 选中匹配成功的内容
                
                for (let i = 0; i < time.length; i++) {
                    time[i] = time[i].slice(1, 9)  // slice 截取
                    time[i] = parseFloat(time[i].slice(0, 2),2) * 60 + parseFloat(time[i].slice(3, 8),2) // 截取分秒计算秒数
                }
                
                this.songLyric = time
                console.log(this.songLyric);
            }      
        })
    }
}
</script>
<style scoped>
    .songbox{
        position: relative;
        z-index: 12;
        overflow: hidden;
    }
    .play{
        position: relative;
        z-index: 500;
    }
    .PlaySong{
        color: #fff;
        position: relative;
        z-index: 50;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.90);
        
    }
    .logo{
        width: 100%;
        height: 70%;
        /* background-color: red; */
    }
    .guanp{
        width: 340px;
        height: 340px;
        margin:auto;
        position: relative;
        top: 55px;
    }
    .logo .img{
        width: 340px;
        height: 340px;
    }
    .songImg{
        width: 155px;
        height: 155px;
        position: absolute;
        top: 88px;
        left: 96px;
        border-radius: 50%;
        overflow: hidden;
        background-color: red;
    }
    .songImg img{
        width: 102%;
        height: 102%;
    }
    .playbox{
        display: flex;
        margin-top: 6px;
    }
    .start{
        font-size: 10px;
        line-height: 40px;
        text-align: center;
        flex: 1;
    }
    .end{
        font-size: 10px;
        line-height: 40px;
        text-align: center;
        flex: 1;
    }
    .time{
        float: right;
    }
    .PlaySongTime{
        height: 40px;
        flex:6;
    }
    .box{
        position: relative;
        top: 18px;
        float: left;
    }
    .custom-button {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        color: #fff;
        background-color: #ee0a24;
    }
    .lyric{
        height: 70%;
    }
</style>