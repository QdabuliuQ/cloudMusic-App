<template>
  <div class="StationDetail" v-if="detail">
     <div class="top">
         <div class="content">
             <menu-nav class="nav" :navTitle="navTitle" :showWriteImg='true'></menu-nav>
             <div class="peopleText">
                 <div class="left">
                    <div class="peopleName">{{detail.name}}</div>
                    <div class="peopleCount">{{detail.subCount}}人已订阅</div>
                 </div>
                 <div class="right">
                     <div class="btn">订阅</div>
                 </div>
             </div>
         </div>
         <img v-show="detail.picUrl" :src="detail.picUrl" alt="">
     </div>
  </div>
</template>

<script>
import menuNav from "components/context/menuNav/MenuNav"; // 导航栏组件
import {getAudioDetail} from 'network/radioStation'

export default {
    name: 'StationDetail',
    data () {
        return {
            navTitle: '电台',
            detail: {},  // 用户信息     
        }
    },
    methods: {
        // 获取电台详情
        getDetail(){
            getAudioDetail(this.$route.params.rid).then(res => {
                console.log(res);
                let path = res.data.djRadio
                this.detail.name = path.name;  // 用户名称
                this.detail.picUrl = path.picUrl;  // 用户头像
                this.detail.subCount = path.subCount;  // 用户粉丝
                this.detail.programCount = path.programCount;  // 节目数量
                this.detail.desc = path.desc;  // 用户简介
                this.detail.category = path.category;  // 电台分类
                this.detail.avatarUrl = path.dj.avatarUrl;  // 创作者头像
                this.detail.nickname = path.dj.nickname;  // 创作者昵称
                this.detail.signature = path.dj.signature;  // 用户宣言
                this.detail.rewardCount = path.dj.rewardCount;  // 用户赞赏次数
                // 使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上
                this.$set(this.detail, this.detail.picUrl, path.picUrl)
            })
            console.log(this.detail);
        }
    },
    components: {
        menuNav,  
    },
    created () {
        this.getDetail();  
    }
}

</script>
<style scoped>
    .StationDetail{
        width: 100%;
        height: 100vh;
        position: relative;
        background-color: #fff;
    }
    .top{
        width: 100%;
        height: 50%;
        
        position: relative;
    }
    .top img{
        position: absolute;
        top: -20px;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .content{
        position: relative;
        height: 100%;
        z-index: 30;
        background-color: rgba(0, 0, 0, 0.329);
    }
    .peopleText{
        width: 95%;
        height: 36px;
        position: absolute;
        bottom: 40px;
        margin-left: 2.5%;
        display: flex;
    }
    .left{
        flex: 7;
    }
    .right{
        flex: 3;
    }
    .peopleName{
        width: 100%;
        height: 18px;
        line-height: 18px;
        color: #Fff;
        font-size: 15px;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .peopleCount{
        width: 100%;
        height: 18px;
        line-height: 18px;
        color: rgb(228, 228, 228);
        font-size: 13px;
        margin: 0;
    }
    .btn{
        width: 80%;
        height: 28px;
        border-radius: 28px;
        margin-top: 4px;
        text-align: center;
        line-height: 28px;
        float: right;
        background-color: #da231b;
        color: #fff;
        font-size: 13px;
    }
    .nav{
        color: #Fff;
        background-color: transparent !important;
        border: 0 !important;
    }
</style>