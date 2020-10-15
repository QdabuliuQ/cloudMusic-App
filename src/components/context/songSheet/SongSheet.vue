<template>
    <div class="songList">
        <div class="songSheet1"
        @click="sheetInfo(item.id)"
        v-for="(item,index) in $store.state.playList" 
        :key="index">
            <div class="songSheet" 
            v-if="sheetList === 'my' ? item.creator === $store.state.profile.nickName && index !== 0 : item.creator !== $store.state.profile.nickName">
                <div class="left">
                    <img :src="item.coverImgUrl" alt="">
                </div>
                <div class="center">
                    <div class="listName">{{item.name}}</div>
                    <div class="count">{{item.trackCount}}首 {{item.creator !== $store.state.profile.nickName ? ' by ' + item.creator : ''}}</div>
                </div>
                <div class="right">
                    <img src="~assets/img/myMessage/sandian.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SongSheet',
    props: ['sheetList'],  // 变量觉得显示的是收藏歌单还是创建歌单
    methods: {
        sheetInfo(id){
            this.$router.push('/playDetail/' + id)  // 跳转到歌单页面
        }
    }
}

</script>
<style scoped>
    .left{
        flex: 1.5;
        border-radius: 8px;
        overflow: hidden;
    }
    .left img{
        width: 100%;
        height: 100%;
    }
    .listName{
        width: 5.326232rem;
        margin-top: .093209rem;
        margin-left: .266312rem;
        font-size: .426099rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .count{
       margin-left: 10px;
       font-size: 12px; 
       color: #aaaaaa;
    }
    .center{
        flex: 7.5;
    }
    .right{
        flex: 1;
    }
    .right img{
        margin-top: 16px;
        float: right;
    }
    .songSheet{
        width: 100%;
        height: 1.198402rem;
        display: flex;
        position: relative;
        top: 5px;
        margin-top: 9px;
    }
</style>