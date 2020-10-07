<template>
  <div class="SheetNav">
      <img src="~assets/img/played/bofang.svg" alt="">
      <span>播放全部<span class="a">(共{{trackCount}}首)</span></span>
      <div 
      class="collection" 
      v-if="showBtn" 
      @click="isCollection"
      :class="{collectionTrue : collClass}"><img :src="isFollowImg" alt="">{{textBtn}}</div>
  </div>
</template>

<script>
import {collectionSheet} from 'network/sheetInfo'

export default {
    name: 'SheetNav',
    data () {
        return {
            textBtn: '已收藏',
            isFollowImg: require('assets/img/follow/gou.svg'),
            // require('assets/img/follow/hao.svg') ,
            showBtn: false,  // 显示/隐藏收藏按钮
            collClass: false,
            collIndex: 1,
        }
    },
    methods: {
        isCollection(){
            if (this.collIndex === 1) {
                this.isFollowImg = require('assets/img/follow/hao.svg')
                this.textBtn = '收藏'
                this.collClass = true 
                this.collIndex = 2
            } else {
                this.isFollowImg = require('assets/img/follow/gou.svg')
                this.textBtn = '已收藏'
                this.collClass = false
                this.collIndex = 1
            }
        }  
    },
    computed: {
        createId(){
            return this.$store.state.createId
        }  
    },
    watch: {
        createId(){
            if (this.createId != this.$store.state.profile.userId) {
                this.showBtn = true
            } else {
                
                this.showBtn = false
            }
        }
    },
    props: ['trackCount']
}

</script>
<style scoped>
    .SheetNav{
        position: sticky;
        top: 42.5px;
        width: 100%;
        height: 45px;
        background-color: #fff;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        line-height: 45px;
        font-size: 15px;
    }
    .SheetNav img{
        margin-top: 6.5px;
        margin-left: 12px;
        margin-right: 7px;
        float: left;
    }
    .SheetNav .a{
        color: rgb(143, 143, 143);
        font-size: 13px;
    }
    .collectionTrue{
        background-color: #da231b  !important;
        color: #fff  !important;
    }
    .collection{
        width: 100px;
        height: 32px;
        margin-top: 6.5px;
        margin-right: 10px;
        line-height: 32px;
        border-radius: 32px;
        float: right;
        font-size: 14px;
        color: #000;
        text-align: center;
        background-color: rgb(214, 214, 214);
    }
    .collection img{
        width: 18px;
        margin: 0;
        position: relative;
        top: 7px;
        left: 17px;
    }
</style>