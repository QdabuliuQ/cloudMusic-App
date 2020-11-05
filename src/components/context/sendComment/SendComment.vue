<template>
  <div class="SendComment">
    <div class="content">
      <div class="left">
        <input
          v-model="content"
          placeholder="写评论..."
          class="textContent"
          type="text"
        />
      </div>
      <div class="right">
        <div class="btn" @click="send">
          <img src="~assets/img/common/send.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getComment, getDComment } from "network/comment";

export default {
  name: "SendComment",
  props: {
    t: {
      type: Number,
      default: 1,
    },
    type: {
      type: Number,
      default: 1,
    },
    id: {
      type: String,
      default: "",
    },
    isDynamic: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      content: "",
      commentDetail: {},
    };
  },
  methods: {
    send() {
      if (!this.$store.state.cookie) {
        this.$router.push("/myMessage/login");
      } else {
        if (this.isDynamic) {
          if (this.content !== "") {
            getDComment(
              this.t,
              this.type,
              this.id,
              this.content,
              this.$store.state.cookie
            ).then((res) => {
              // 保存数据
              this.commentDetail.id = res.data.comment.user.userId;
              this.commentDetail.content = res.data.comment.content;
              this.commentDetail.time = res.data.comment.time;
              this.commentDetail.avatarUrl = res.data.comment.user.avatarUrl;
              this.commentDetail.nickname = res.data.comment.user.nickname;
              this.$toast.show("发布成功", 1900);
              this.content = ""; // 清空内容
              this.$emit("successComment", this.commentDetail);
            });
          }
        } else {
          if (this.content !== "") {
            getComment(
              this.t,
              this.type,
              this.id,
              this.content,
              this.$store.state.cookie
            ).then((res) => {
              // 保存数据
              this.commentDetail.id = res.data.comment.user.userId;
              this.commentDetail.content = res.data.comment.content;
              this.commentDetail.time = res.data.comment.time;
              this.commentDetail.avatarUrl = res.data.comment.user.avatarUrl;
              this.commentDetail.nickname = res.data.comment.user.nickname;
              this.$toast.show("发布成功", 1900);
              this.content = ""; // 清空内容
              this.$emit("successComment", this.commentDetail);
            });
          }
        }
      }
    },
  },
};
</script>
<style scoped>
::-webkit-input-placeholder {
  font-size: 0.399467rem;
  color: rgb(119, 119, 119);
}
.SendComment {
  width: 100%;
  height: 1.065246rem;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px -1px 1px 1px rgba(87, 87, 87, 0.1);
}
.content {
  width: 92%;
  height: 0.932091rem;
  line-height: 0.905459rem;
  margin: 0 auto;
  display: flex;
}
.left {
  flex: 9;
}
.right {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
}
.textContent {
  width: 100%;
  height: 100%;
  position: relative;
  top: -0.053262rem;
  padding: 0;
  border: 0;
  font-size: 0.426099rem;
  line-height: 0.932091rem;
}
.btn {
  width: 0.798935rem;
  height: 0.798935rem;
  position: absolute;
  right: 0;
}
.btn img {
  width: 100%;
  height: 100%;
}
</style>