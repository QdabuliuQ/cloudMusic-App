<template>
  <div class="Follow">
      <menu-nav class="navbar" :navTitle="navTitle"></menu-nav>
      <mui-scroll 
      style="top: 44px;
      background-color: #fff"
      :scrollY="true">
        <div class="box">
            <follow-item :followList="followList"></follow-item>
        </div>
      </mui-scroll>  
  </div>
</template>

<script>
import menuNav from 'components/context/menuNav/MenuNav'
import FollowItem from './childrenComps/FollowItem'  // 关注列表组件
import muiScroll from 'components/common/muiScroll/MuiScroll'  // 滚动组件

import {getUserFollow} from 'network/follow'  // 网络请求

export default {
    name: 'Follow',
    data () {
        return {
            navTitle: '我的关注',
            followList: []   // 关注数据
        }
    },
    created () {
        // 获取关注列表
        getUserFollow(this.$store.state.profile.userId).then(res => {
            for (const item of res.data.follow) {
                this.followList.push({
                nickname: item.nickname, 
                avatarUrl: item.avatarUrl,
                userId: item.userId,
                signature: item.signature,
                vipType: item.vipType,
                followBtn: false,
                btntext: '已关注'})
            }
        })
    },
    components: {
        menuNav,
        FollowItem,
        muiScroll
    }
}

</script>
<style scoped>
    .navbar{
        position: relative;
        z-index: 20;
        background-color: #fff;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    }
    .Follow{
        /* height: 100vh; */
        background-color: #fff;
        
    }
    .box{
        padding:8px 12px;
    }
</style>