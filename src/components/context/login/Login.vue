<template>
  <div class="Login">
    <div class="close" @click="close">
      <i class="iconfont icon-close"></i>
    </div>
    <div class="logo">
      <img src="https://img.coolcr.cn/2021/02/18/ba588162b1fb7.png" alt="" />
    </div>
    <div class="loginType">
      <div @click="phoneLogin" class="phoneLogin">
        <span>手机号登录</span>
      </div>
      <div class="tiyan" @click="close">
        <span>立即体验</span>
      </div>
      <div class="list">
        <div class="item">
          <div class="box">
            <i class="iconfont icon-weixin"></i>
          </div>
        </div>
        <div class="item">
          <div class="box">
            <i class="iconfont icon-QQ"></i>
          </div>
        </div>
        <div class="item">
          <div class="box">
            <i class="iconfont icon-weibo"></i>
          </div>
        </div>
        <div class="item">
          <div class="box">
            <i class="iconfont icon-youxiang"></i>
          </div>
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
      // this.$router.go(-1);
      this.$router.push('/discover')
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
.close {
  margin-top: 0.399467rem;
}
.close .icon-close {
  font-size: 0.533333rem;
  color: #fff;
  margin-left: 0.399467rem;
}
.logo {
  width: 1.704394rem;
  height: 1.704394rem;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.144);
}
.logo img {
  width: 100%;
  height: 100%;
}
.loginType{
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.phoneLogin {
  width: 6.994407rem;
  height: 1.065246rem;
  background-color: #fff;
  margin: 0 auto 0.532623rem;
  border-radius: 1.065246rem;
  text-align: center;
  line-height: 1.065246rem;
  font-size: 0.4rem;
  color: #da231b;
}
.emailLogin {
  width: 70%;
  height: 1.066667rem;
  background-color: #fff;
  margin: 0.532623rem auto;
  border-radius: 1.066667rem;
  text-align: center;
  line-height: 1.066667rem;
  font-size: 0.4rem;
  color: #da231b;
}
.tiyan {
  width: 100%;
  height: 1.066667rem;
  margin: 0.532623rem auto;
  border-radius: 1.066667rem;
  text-align: center;
  line-height: 1.066667rem;
  font-size: 0.373333rem;
  color: #fff;
  box-sizing: border-box;
  border: 1px solid rgb(221, 221, 221, 0.8);
}
.list {
  width: 100%;
  height: 1.331558rem;
  margin: 0 auto;
  display: flex;
}
.item {
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
}
.item .box {
  width: 1.065246rem;
  height: 1.065246rem;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.644);
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box .iconfont {
  color: rgba(255, 255, 255, 0.856);
  font-size: .426667rem;
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