<template>
  <div class="PhoneLogin">
    <navbar class="navbar">
      <div @click="back" class="left" slot="left">
        <img src="~assets/img/myMessage/fanhui.png" alt="" />
      </div>
      <div class="title" slot="center">手机号登陆</div>
    </navbar>
    <div class="box">
      <div class="tip"><span>没有注册过的手机号会自动注册</span></div>
      <div class="content">
        <div class="tel">
          <div class="text">
            <span>手机号：</span>
          </div>
          <div class="input">
            <input v-model="tel" type="text" placeholder="请输入手机号码" />
          </div>
        </div>
        <div class="pwd">
          <div class="text">
            <span>密码：</span>
          </div>
          <div class="input">
            <input
              v-model="password"
              type="password"
              placeholder="请输入密码"
            />
          </div>
        </div>
      </div>
      <van-button
        class="btn"
        color="#da231b"
        type="primary"
        block
        @click="login"
        >点击登陆</van-button
      >
    </div>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar";
import Register from "components/context/register/Register";
import { phoneLogin, loginState } from "network/login"; // 网络请求

import { getUserDetail, getUserPlayList } from "network/user"; // 用户信息

export default {
  name: "PhoneLogin",
  data() {
    return {
      tel: "13726508433", // 手机号
      password: "ZJH741.742", // 密码
    };
  },
  methods: {
    close() {
      this.$router.go(-1);
    },
    // 登陆
    login() {
      var reg = /^1[3-8][0-9]{9}$/;
      if (reg.test(this.tel)) {
        this.$loading.loadingShow();
        phoneLogin(this.tel, this.password).then(
          (res) => {
            this.$store.state.cookie = res.data.cookie;
            if (res.data.code === 200) {
              this.$toast.show("登录成功！", 1900);
              this.$router.go(-2);
              this.$store.state.profile.nickName = res.data.profile.nickname; // 用户名
              this.$store.state.profile.avatarUrl = res.data.profile.avatarUrl; // 头像
              this.$store.state.profile.userId = res.data.profile.userId; // id
              this.$store.state.profile.backgroundUrl =
                res.data.profile.backgroundUrl; // 背景图

              this.tel = "";
              this.password = "";
              getUserDetail(this.$store.state.profile.userId).then((res) => {
                this.$store.state.profile.level = res.data.level;
                this.$store.state.profile.listenSongs = res.data.listenSongs;
              });

              // 获取用户歌单
              getUserPlayList(this.$store.state.profile.userId).then((res) => {
                for (const item of res.data.playlist) {
                  this.$store.state.playList.push({
                    coverImgUrl: item.coverImgUrl,
                    name: item.name,
                    id: item.id,
                    playCount: item.playCount,
                    trackCount: item.trackCount,
                    creator: item.creator.nickname,
                  });
                }
              });
              this.$loading.loadingNo();
            } else {
              this.$toast.show("密码错误！", 1900);
            }
          },
          (err) => {
            this.$toast.show("网络出错！", 1900);
          }
        );
      } else {
        this.$toast.show("手机号不规范", 1900);
      }
    },

    // 关闭手机登录页面
    back() {
      this.$router.go(-1);
    },

    // 关闭注册页面
    closeRegister() {
      this.RegisterShow = false;
    },
  },
  components: {
    navbar,
    Register,
  },
};
</script>
<style scoped>
.content {
  padding: 0 10px;
  height: 90px;
  font-size: 15px;
}
.title {
  font-size: 0.426099rem;
}
.tel {
  width: 100%;
  height: 40px;
  display: flex;
  border-bottom: 1px solid #cdcdcd;
  margin-top: 5px;
  z-index: 10;
}
.pwd {
  width: 100%;
  height: 40px;
  display: flex;
  border-bottom: 1px solid #cdcdcd;
  margin-top: 5px;
  z-index: 10;
}
.text {
  flex: 2;
  line-height: 45px;
}
.text span {
  float: right;
}
.input {
  flex: 7;
  /* line-height: 45px; */
  margin-top: 4.1px;
}
.input input {
  height: 35px;
  border: 0;
}
.PhoneLogin {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 52;
}
.box {
  padding: 5px 10px;
}
.navbar {
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.5);
}
.left img {
  width: 20px;
  height: 20px;
  margin-top: 12px;
}
.btn {
  margin-top: 10px;
  border-radius: 44px;
  font-size: 0.426099rem;
}
.tip {
  font-size: 13px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #888888;
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