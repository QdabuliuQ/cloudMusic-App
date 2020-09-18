<template>
  <div class="DiscoverSwiper">
      <!-- 使用 vant 组件库 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item class="swiperItem" v-for="(item,index) in swiperList" :key="index">
            <a :href="item.url">
                <div class="img">
                    <img :src="item.pic" alt="">
                    <div class="title" v-bind:style='{background:item.titleColor === "blue" ? "#326ef8" : item.titleColor}'>{{item.typeTitle}}</div>
                </div>
            </a>
        </van-swipe-item>
      </van-swipe>
  </div>
</template>

<script>
import {getBanner} from 'network/discover'

export default {
    name: 'DiscoverSwiper',
    data () {
        return {
            swiperList: null
        }
    },
    created () {
        getBanner(1).then(res => {
            this.swiperList = res.data.banners
        })

    }
}

</script>
<style scoped>
    .my-swipe{
        width: 94%;
        height: 140px;
        border-radius: 8px;
        overflow: hidden;
        margin: 10px auto;
    }
    .swiperItem{
        width: 100%;
        height: 100%;
    }
    .swiperItem img{
        width: 100%;
        height: 100%;
    }
    .img{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .title{
        position: absolute;
        padding: 3px 7px 4px;
        border-top-left-radius: 8px;
        font-size: 13px;
        text-align: center;
        right: 0;
        bottom: 0;
        color: #fff;
    }
</style>