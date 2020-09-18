<template>
  <div class="Login">
      <div class="close" @click="close">
          <img src="~assets/img/myMessage/guanbi.png" alt="">
      </div>
      <div class="logo">
          <img src="~assets/img/myMessage/wangyiyun.png" alt="">
      </div>
      <div @click="phoneLogin" class="phoneLogin">
          <span>手机号登录</span>
      </div>
      <div @click="emailLogin" class="emailLogin">
          <span>邮箱登录</span>
      </div>
      <div class="tiyan">
          <span>立即体验</span>
      </div>
  </div>
</template>

<script>

export default {
    name: 'Login',
    data () {
        return {    
        }
    },
    methods: {
        close(){
            this.$router.go(-1)
        },

        // 手机登录组件
        phoneLogin(){
            this.$router.push('/myMessage/login/phoneLogin')
        },

        // 邮箱登录组件
        emailLogin(){
            this.$router.push('/myMessage/login/emailLogin')
        }
    },
    components: {
    }
}

</script>
<style scoped>
    .Login{
        background-color: #bd3126;
        /* position: absolute; */
        /* overflow-y: hidden; */
        /* width: 100%;
        height: 100%; */
        position: absolute;
        overflow:hidden;
        top: 0;
        left: 0;
        right: 0;
        bottom:0;
        z-index: 20;
    }
    .close img{
        width: 20px;
        height: 20px;
        margin-top: 15px;
        margin-left: 15px;
    }
    .logo{
        width: 64px;
        height: 64px;
        background-color: #fff;
        margin: 135px auto;
        border-radius: 20px;
    }
    .phoneLogin{
        width: 70%;
        height: 40px;
        background-color: #fff;
        margin: 100px auto 20px;
        border-radius: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 17px;
        color: #da231b;
    }
    .emailLogin{
        width: 70%;
        height: 40px;
        background-color: #fff;
        margin: 20px auto;
        border-radius: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 17px; 
        color: #da231b;
    }
    .tiyan{
        width: 70%;
        height: 40px;
        margin: 20px auto;
        border-radius: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 17px;
        color: #fff;
        box-sizing: border-box;
        border: 1px solid #fff;
    }
    .v-enter{
        opacity: 0;
        /* 进来的时候从右 */
        transform: translateX(100%);
    }
    .v-leave-to{
        opacity: 0;
        /* 离开的时候向左 */
        transform: translateX(-100%);
        position: absolute;
    }

    /* 动画执行期间 */
    .v-enter-active,.v-leave-active{
        /* 添加动画效果 */
        transition: all 0.2s linear;
    }
</style>