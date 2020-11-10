<template>
  <div class="MyMessageMenu">
    <div class="menu">
      <div class="top">
        <div class="box1">
          <div class="icon iconbox">
            <img
              class="img1"
              src="~assets/img/myMessage/menu/xiazai.svg"
              alt=""
            />
          </div>
          <div class="text">本地音乐</div>
        </div>
        <div class="box1" @click="myDisk">
          <div class="icon iconbox">
            <img src="~assets/img/myMessage/menu/yunpan.svg" alt="" />
          </div>
          <div class="text">云盘</div>
        </div>
        <div class="box1">
          <div class="icon iconbox">
            <img
              class="img1"
              src="~assets/img/myMessage/menu/chenggong.svg"
              alt=""
            />
          </div>
          <div class="text">已购</div>
        </div>
        <div class="box1" @click="myPlayed">
          <div class="icon iconbox">
            <img
              class="img1"
              src="~assets/img/myMessage/menu/bofang.svg"
              alt=""
            />
          </div>
          <div class="text">最近播放</div>
        </div>
      </div>
      <div class="bottom">
        <div class="box2" @click="myFollow">
          <div class="icon iconbox">
            <img
              class="img2"
              src="~assets/img/myMessage/menu/guanzhu.svg"
              alt=""
            />
          </div>
          <div class="text">我的关注</div>
        </div>
        <div class="box2" @click="myCollection">
          <div class="icon iconbox">
            <img
              class="img3"
              src="~assets/img/myMessage/menu/shoucang.svg"
              alt=""
            />
          </div>
          <div class="text">收藏和赞</div>
        </div>
        <div class="box2" @click="myRadioStation">
          <div class="icon iconbox">
            <img
              class="img1"
              src="~assets/img/myMessage/menu/diantai.svg"
              alt=""
            />
          </div>
          <div class="text">我的电台</div>
        </div>
        <div class="box2">
          <div class="icon iconbox">
            <img
              class="img3"
              src="~assets/img/myMessage/menu/tianjia.svg"
              alt=""
            />
          </div>
          <div class="text">音乐应用</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyMessageMenu",
  methods: {
    myRadioStation() {
      if (!this.$store.state.cookie) {
        this.$toast.show("您需要先登录哦", 1900);
        this.$router.push("/myMessage/login");
      } else {
        this.$router.push("/myMessage/radioStation");
      }
    },

    myFollow() {
      if (!this.$store.state.cookie) {
        this.$toast.show("您需要先登录哦", 1900);
        this.$router.push("/myMessage/login");
      } else {
        this.$router.push("/follow/" + this.$store.state.profile.userId);
      }
    },

    myPlayed() {
      if (!this.$store.state.cookie) {
        this.$toast.show("您需要先登录哦", 1900);
        this.$router.push("/myMessage/login");
      } else {
        this.$router.push("/played/" + this.$store.state.profile.userId);
      }
    },

    myDisk() {
      if (!this.$store.state.cookie) {
        this.$toast.show("您需要先登录哦", 1900);
        this.$router.push("/myMessage/login");
      } else {
        this.$router.push("/myMessage/cloudDisk");
      }
    },

    myCollection() {
      if (!this.$store.state.cookie) {
        this.$toast.show("您需要先登录哦", 1900);
        this.$router.push("/myMessage/login");
      } else {
        this.$router.push("/myMessage/collection");
      }
    },
  },
};
</script>
<style scoped>
.MyMessageMenu {
  /* width: 100%; */
  height: 3.994674rem;
  border-radius: 0.213049rem;
  margin-top: 0.266312rem;
  overflow: hidden;
  font-size: 0.346205rem;
  text-align: center;
  background-color: #fff;
  padding: 0.133156rem;
}
.top {
  width: 100%;
  height: 50%;
  display: flex;
  margin-top: 0.186418rem;
}
.bottom {
  width: 100%;
  height: 50%;
  display: flex;
  margin-top: 0.399467rem;
}
.bottom img {
  width: 0.745672rem;
}
.box1 {
  flex: 1;
  position: relative;
  height: 1.517976rem;
}
.box2 {
  flex: 1;
  position: relative;
  height: 1.438083rem;
}
.icon {
  width: 100%;
  height: 0.798935rem;
  line-height: 20px;
}
.text {
  width: 100%;
  height: 0.45273rem;
  line-height: 0.45273rem;
  text-align: center;
  position: absolute;
  bottom: 0;
}
</style>