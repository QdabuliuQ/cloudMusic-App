<template>
  <div class="dynamic" v-if="eventList.length !== 0">
      <div class="eventBox" v-for="(item,index) in eventList" :key="index">
          <!-- 歌曲分享组件 -->
          <music-dynamic
          v-if="item.type === 18"
          :commentLength='item.commentLength'
          :likedCount='item.likedCount'
          :shareCount='item.shareCount'
          :events='item.events'
          :time='item.eventTime'
          :userImg='userImg'
          :nickName='nickName'></music-dynamic>
          
          <!-- 评论分享组件 -->
          <comment-dynamic
          v-if="item.type === 31"
          :commentLength='item.commentLength'
          :likedCount='item.likedCount'
          :shareCount='item.shareCount'
          :events='item.events'
          :time='item.eventTime'
          :userImg='userImg'
          :nickName='nickName'></comment-dynamic>
          
          <!-- 歌单分享组件 -->
          <sheet-dynamic
          v-if="item.type === 13"
          :commentLength='item.commentLength'
          :likedCount='item.likedCount'
          :shareCount='item.shareCount'
          :events='item.events'
          :time='item.eventTime'
          :userImg='userImg'
          :nickName='nickName'></sheet-dynamic>

          <!-- 节目分享组件 -->
          <program-dynamic
          v-if="item.type === 17 || item.type === 28"
          :commentLength='item.commentLength'
          :likedCount='item.likedCount'
          :shareCount='item.shareCount'
          :events='item.events'
          :time='item.eventTime'
          :userImg='userImg'
          :nickName='nickName'></program-dynamic>

          <!-- 视频分享组件 -->
          <video-dynamic
          v-if="item.type === 41"
          :commentLength='item.commentLength'
          :likedCount='item.likedCount'
          :shareCount='item.shareCount'
          :events='item.events'
          :time='item.eventTime'
          :userImg='userImg'
          :nickName='nickName'></video-dynamic>

          <!-- 发布视频 -->
          <relvideo-dynamic
          v-if="item.type === 39"
          :commentLength='item.commentLength'
          :likedCount='item.likedCount'
          :shareCount='item.shareCount'
          :events='item.events'
          :time='item.eventTime'
          :userImg='userImg'
          :nickName='nickName'></relvideo-dynamic>

          <!-- 专栏文章 -->
          <article-dynamic
          v-if="item.type === 24"
          :commentLength='item.commentLength'
          :likedCount='item.likedCount'
          :shareCount='item.shareCount'
          :events='item.events'
          :time='item.eventTime'
          :userImg='userImg'
          :nickName='nickName'></article-dynamic>

          <!-- 分享动态 -->
          <life-dynamic
          v-if="item.type === 35"
          :commentLength='item.commentLength'
          :likedCount='item.likedCount'
          :shareCount='item.shareCount'
          :events='item.events'
          :time='item.eventTime'
          :userImg='userImg'
          :nickName='nickName'
          :pics='item.pics'></life-dynamic>

          <!-- mv分享 -->
          <mv-dynamic
          v-if="item.type === 21"
          :commentLength='item.commentLength'
          :likedCount='item.likedCount'
          :shareCount='item.shareCount'
          :events='item.events'
          :time='item.eventTime'
          :userImg='userImg'
          :nickName='nickName'
          :pics='item.pics'></mv-dynamic>

          <!-- 转发 -->
          <forward-dynamic
          v-if="item.type === 22"
          :commentLength='item.commentLength'
          :likedCount='item.likedCount'
          :shareCount='item.shareCount'
          :events='item.events'
          :time='item.eventTime'
          :userImg='userImg'
          :nickName='nickName'
          :pics='item.pics'></forward-dynamic>
      </div>
  </div>
  <div v-else class="noEvent">
      暂时还没有动态哦
  </div>
</template>

<script>
import {getUserEvent} from 'network/user'

// 分享组件
import musicDynamic from './musicDynamic';  // 音乐
import commentDynamic from './commentDynamic';  // 评论
import sheetDynamic from './sheetDynamic';  // 歌单
import programDynamic from './programDynamic';  // 节目
import videoDynamic from './videoDynamic';  // 视频
import relvideoDynamic from './relvideoDynamic';  // 发布视频
import articleDynamic from './articleDynamic';  // 专栏文章
import lifeDynamic from './lifeDynamic';  // 动态
import mvDynamic from './mvDynamic';  // mv
import forwardDynamic from './forwardDynamic';  // 转发

export default {
    props: ['userImg','nickName'],
    name: 'dynamic',
    data () {
        return {
            eventList: [],  // 动态数组
        }
    },
    components: {
        musicDynamic,  
        commentDynamic,
        sheetDynamic,
        programDynamic,
        videoDynamic,
        relvideoDynamic,
        articleDynamic,
        lifeDynamic,
        mvDynamic,
        forwardDynamic,
    },
    methods: {
        UserEvent(){
            getUserEvent(this.$route.params.uid, 30).then(res => {
                console.log(res.data);
                for (const item of res.data.events) {
                    // 18 分享单曲
                    // 19 分享专辑
                    // 17、28 分享电台节目
                    // 22 转发
                    // 39 发布视频
                    // 13 分享歌单
                    // 35 动态
                    // 24 分享专栏文章
                    // 41、21 分享视频 / mv
                    // 31 分享评论
                    this.eventList.push({
                        events: JSON.parse(item.json),
                        type: item.type,  // 分享类型
                        eventTime: item.eventTime,  // 发表时间
                        commentLength: item.info.commentCount,  // 评论数量
                        likedCount: item.info.likedCount,  // 点赞数量
                        shareCount: item.info.shareCount,  // 分享数量
                        pics: item.pics,  // 图片数组
                    })
                }
                console.log(this.eventList);
            })
        }  
    },
    created () {
        this.$loading.loadingShow();
        this.UserEvent();
    },
    mounted () {
        this.$nextTick(() => {
            this.$loading.loadingNo();
        })
    }
}

</script>
<style scoped>
    .dynamic{
        width: 100%;
        padding:0 15px 15px;
        margin-bottom: 1.198402rem;
    }
    .eventBox{
        padding-bottom: .266312rem;
    }
    .noEvent{
        width: 100%;
        height: 7.989348rem;
        text-align: center;
        line-height: 7.989348rem;
        color: #8b8b8b;
        font-size: .399467rem;
    }
</style>