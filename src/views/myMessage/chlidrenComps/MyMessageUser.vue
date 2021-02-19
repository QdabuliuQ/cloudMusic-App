<template>
  <router-link class="box" to="/myMessage" tag="div">
    <div class="MyMessageLogin">
      <div class="userImg">
        <img class="login" :src="$store.state.profile.avatarUrl" alt="" />
      </div>
      <div class="userDetail">
        <div class="text">{{ $store.state.profile.nickName }}</div>
        <div class="level">
            <em>Lv.{{ $store.state.profile.level }}</em>
        </div>
      </div>
      <i class="iconfont icon-gengduo"></i>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "MyMessageLogin",
  data() {
    return {};
  },
  methods: {},

  created() {},
};
</script>
<style scoped>
.box {
  padding: 8px;
  border-radius: 12px;
}
.MyMessageLogin {
  width: 100%;
  height: 1.2rem;
  position: relative;
  display: flex;
  align-items: center;
}
.userImg {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  float: left;
  margin-left: 10px;
}
.MyMessageLogin .login {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  float: left;
}
.userDetail{
  margin-left: .266667rem;
}
.text {
  font-size: .373333rem;
}
.level {
  background-color: #fff;
  border-radius: .4rem;
  height: .4rem;
  line-height: .4rem;
  text-align: center;
  padding: 0 .16rem;
  float: left;
  font-size: .293333rem;
  box-shadow: var(--boxshaow);
  
}
.icon-gengduo {
  position: absolute;
  right: .133333rem;
  font-size: .4rem;
  color: var(--fontColor);
}
</style>