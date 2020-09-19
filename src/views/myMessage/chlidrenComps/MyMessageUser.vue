<template>
    <router-link class="box" to="/myMessage" tag="div">
        <div class="MyMessageLogin">
            <div class="userImg">
                <img class="login" :src='$store.state.profile.avatarUrl' alt="">
            </div>
            <div class="text">{{ $store.state.profile.nickName }}</div>
            <div class="level"><em>Lv.{{ $store.state.profile.level }}</em></div>
            <img class="more" src="~assets/img/myMessage/gengduo.png" alt="">
        </div>
    </router-link>
</template>

<script>
import {getUserSubcount} from 'network/user'
import {refreshLogin} from 'network/login'

export default {
    name:'MyMessageLogin',
    data () {
        return {
        }
    },
    methods: {
    },

    created () {
        // refreshLogin().then(res => {
        //     console.log(res);
        // })
        // getUserSubcount().then(res => {
        //     console.log(res);
        // })
    }
}

</script>
<style scoped>
    .box{
        padding: 8px;
        border-radius: 12px;
    }
    .MyMessageLogin{
        width: 100%;
        height: 45px;
        position: relative;
    }
    .userImg{
        width: 45px;
        height: 45px;
        border-radius: 50%;
        float: left;
        margin-left: 10px;
    }
    .MyMessageLogin .login{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        float: left;
    }
    .text{
        font-size: 16px;
        margin-left: 10px;
        float: left;
        margin-top: 2px;
    }
    .level{
        background-color: #fff;
        border-radius: 15px;
        height: 15px;
        line-height: 15px;
        text-align: center;
        padding: 0 6px;
        float: left;
        margin-top: 25px;
        margin-left: -62px;
        font-size: 11px;
    }
    .more{
        float: right;
        width: 17px;
        height: 17px;
        margin-top: 16px;
    }
</style>