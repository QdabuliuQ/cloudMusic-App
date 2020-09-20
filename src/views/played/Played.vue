<template>
  <div class="Played">
      <menu-nav class="navbar" :navTitle="navTitle"></menu-nav>
      <mui-scroll
        style="top: 44px"
        :scrollY="true">
      <div class="box">
        <div class="topbox">
            <img src="~assets/img/played/bofang.svg" alt="">
            <div class="text">播放全部<span class="count">(共{{songList.length}}首)</span></div>
        </div>         
        <song-item :songList="songList"></song-item>          
      </div>
    </mui-scroll>
  </div>
</template>

<script>
import menuNav from 'components/context/menuNav/MenuNav'
import songItem from 'components/context/songItem/SongItem'  // 歌曲列表
import muiScroll from 'components/common/muiScroll/MuiScroll'  // 滚动组件

import {getPlayList} from 'network/played';  // 网络请求

export default {
    name: 'Played',
    data () {
        return {
            navTitle: '最近播放',
            songList: []   // 歌曲列表
        }
    },
    components: {
        menuNav,
        songItem,
        muiScroll
    },

    created () {
        // 获取数据
        getPlayList(this.$store.state.profile.userId,0).then(res => {
            console.log(res.data.allData);
            for (const item of res.data.allData) {
                // 选择性保存数据
                this.songList.push({
                mv: item.song.mv,
                songName: item.song.name,
                id: item.song.id,
                singer: item.song.ar[0].name,
                zhuanji: item.song.al.name})
            }
        })
    }
}

</script>
<style scoped>
    .box{
        padding: 8px 16px;
        /* height: 300px; */
        background-color: #fff;
    }
    .navbar{
        position: relative;
        z-index: 20;
        background-color: #fff;
    }
    .topbox{
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 15px;
    }
    .topbox img{
        width: 27px;
        height: 27px;
        margin-top:5.5px;
        float: left;
    }
    .text{
        margin-left: 35px;
    }
    .count{
        font-size: 13px;
        color: #999999;
    }
</style>