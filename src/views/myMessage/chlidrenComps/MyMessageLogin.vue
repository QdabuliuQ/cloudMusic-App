<template>
  <router-link class="box" to="/myMessage/login" tag="div">
    <div class="MyMessageLogin">
        <div class="userImg">
            <img class="login" src='~assets/img/myMessage/nologin.png' alt="">
        </div>
        <span class="text">{{ userName }}</span>
        <img class="more" src="~assets/img/myMessage/gengduo.png" alt="">
    </div>
  </router-link>
</template>

<script>
export default {
    name:'MyMessageLogin',
    data () {
        return {
            userImg: require('assets/img/myMessage/nologin.png'),
            userName: '未登录' 
        }
    },
    methods: {
    }
}

</script>
<style scoped>
    .box{
        padding: 8px;
        /* background-color: #fff; */
        border-radius: 12px;
    }
    .MyMessageLogin{
        width: 100%;
        height: 45px;
        line-height: 45px;
    }
    .userImg{
        width: 45px;
        height: 45px;
        border-radius: 50%;
        float: left;
        margin-left: 10px;
        line-height: 45px;
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
        line-height: 45px;
    }
    .more{
        float: right;
        width: 17px;
        height: 17px;
        margin-top: 16px;
        margin-right: 8px;
    }
</style>