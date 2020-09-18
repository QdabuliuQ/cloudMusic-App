<template>
  <router-link to="/myMessage/login" tag="div">
    <div class="MyMessageLogin">
        <div class="userImg">
            <img class="login" src="~assets/img/myMessage/nologin.png" alt="">
        </div>
        <span class="text">未登录</span>
        <img class="more" src="~assets/img/myMessage/gengduo.png" alt="">
    </div>
  </router-link>
</template>

<script>
export default {
    name:'MyMessageLogin',
    methods: {
    }
}

</script>
<style scoped>
    .MyMessageLogin{
        width: 100%;
        height: 50px;
        line-height: 50px;
    }
    .userImg{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        float: left;
        margin-left: 10px;
    }
    .MyMessageLogin .login{
        width: 50px;
        height: 50px;
        float: left;
    }
    .text{
        font-size: 18px;
        margin-left: 10px;
    }
    .more{
        float: right;
        width: 17px;
        height: 17px;
        margin-top: 16px;
    }
</style>