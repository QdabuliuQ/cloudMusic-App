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
        position: absolute;
        overflow:hidden;
        top: 0;
        left: 0;
        right: 0;
        bottom:0;
        z-index: 51;
    }
    .close img{
        width: .532623rem;
        height: .532623rem;
        margin-top: .399467rem;
        margin-left: .399467rem;
    }
    .logo{
        width: 1.704394rem;
        height: 1.704394rem;
        background-color: #fff;
        margin: 3.595206rem auto;
        border-radius: 20px;
    }
    .logo img{
        width: 100%;
        height: 100%;
    }
    .phoneLogin{
        width: 6.994407rem;
        height: 1.065246rem;
        background-color: #fff;
        margin: 2.663116rem auto .532623rem;
        border-radius: 1.065246rem;
        text-align: center;
        line-height: 1.065246rem;
        font-size: 16px;
        color: #da231b;
    }
    .emailLogin{
        width: 70%;
        height: 40px;
        background-color: #fff;
        margin: .532623rem auto;
        border-radius: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 16px; 
        color: #da231b;
    }
    .tiyan{
        width: 70%;
        height: 40px;
        margin: .532623rem auto;
        border-radius: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
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