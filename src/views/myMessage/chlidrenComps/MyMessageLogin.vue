<template>
  <router-link class="box" to="/myMessage/login" tag="div">
    <div class="MyMessageLogin">
      <i class="iconfont icon-yonghu"></i>
      <span class="text">{{ userName }}</span>
      <i class="iconfont icon-gengduo"></i>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "MyMessageLogin",
  data() {
    return {
      userName: "未登录",
    };
  },
  methods: {},
};
</script>
<style scoped>
.box {
  padding: .213333rem;
  /* background-color: #fff; */
  border-radius: .32rem;
}
.MyMessageLogin {
  width: 100%;
  height: 1.2rem;
  display: flex;
  align-items: center;
  position: relative;
}
.userImg {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  float: left;
  margin-left: 10px;
  line-height: 45px;
}
.MyMessageLogin .login {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  float: left;
}
.text {
  font-size: .4rem;
  margin-left: 10px;
  line-height: 1.2rem;
  color: var(--fontColor);
}
.icon-gengduo {
  position: absolute;
  right: .133333rem;
  font-size: .4rem;
  color: var(--fontColor);
}
.icon-yonghu{
  margin-left: .133333rem;
  position: relative;
  top: .026667rem;
  color: var(--red);
  font-size: 1.2rem;
}
</style>