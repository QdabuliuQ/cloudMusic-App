<template>
  <div class="Login">
    <div class="close" @click="close">
      <img src="~assets/img/myMessage/guanbi.png" alt="" />
    </div>
    <div class="logo">
      <img src="~assets/img/myMessage/wangyiyun.png" alt="" />
    </div>
    <div @click="phoneLogin" class="phoneLogin">
      <span>手机号登录</span>
    </div>
    <div class="tiyan" @click="close">
      <span>立即体验</span>
    </div>
    <div class="list">
        <div class="item">
            <div class="box">
                <img src="~assets/img/login/weixin.svg" alt="">
            </div>
        </div>
        <div class="item">
            <div class="box">
                <img src="~assets/img/login/qq.svg" alt="">
            </div>
        </div>
        <div class="item">
            <div class="box">
                <img src="~assets/img/login/weibo.svg" alt="">
            </div>
        </div>
        <div class="item">
            <div class="box">
                <img src="~assets/img/login/yx.svg" alt="">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {};
  },
  methods: {
    close() {
      this.$router.go(-1);
    },

    // 手机登录组件
    phoneLogin() {
      this.$router.push("/myMessage/login/phoneLogin");
    },
  },
  components: {},
};
</script>
<style scoped>
.Login {
  background-color: #bd3126;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 51;
}
.close img {
  width: 0.532623rem;
  height: 0.532623rem;
  margin-top: 0.399467rem;
  margin-left: 0.399467rem;
}
.logo {
  width: 1.704394rem;
  height: 1.704394rem;
  background-color: #fff;
  margin: 3.595206rem auto 4.793609rem;
  border-radius: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.144);
}
.logo img {
  width: 100%;
  height: 100%;
}
.phoneLogin {
  width: 6.994407rem;
  height: 1.065246rem;
  background-color: #fff;
  margin:0 auto 0.532623rem;
  border-radius: 1.065246rem;
  text-align: center;
  line-height: 1.065246rem;
  font-size: 16px;
  color: #da231b;
}
.emailLogin {
  width: 70%;
  height: 40px;
  background-color: #fff;
  margin: 0.532623rem auto;
  border-radius: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  color: #da231b;
}
.tiyan {
  width: 70%;
  height: 40px;
  margin: 0.532623rem auto;
  border-radius: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  color: #fff;
  box-sizing: border-box;
  border: 1px solid rgb(221, 221, 221, 0.8);
}
.list{
    width: 75%;
    height: 1.331558rem;
    margin: 0 auto;
    display: flex;
}
.item{
    flex: 1;
    text-align: center;
    display: flex;
    align-items: center;
}
.item .box{
    width: 1.065246rem;
    height: 1.065246rem;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.644);
    text-align: center;
    margin: auto;
}
.box img{
    width: .69241rem;
    margin-top: .146471rem;
}
.v-enter {
  opacity: 0;
  /* 进来的时候从右 */
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  /* 离开的时候向左 */
  transform: translateX(-100%);
  position: absolute;
}

/* 动画执行期间 */
.v-enter-active,
.v-leave-active {
  /* 添加动画效果 */
  transition: all 0.2s linear;
}
</style>