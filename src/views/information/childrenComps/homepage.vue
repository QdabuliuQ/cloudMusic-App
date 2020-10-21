<template>
  <div class="homepage">
    <sheet-item
      :title="'听歌排行'"
      :showDiv="true"
      :showImg="phImg"
      :showDivColor="'#ee5757'"
      :songCount="'累计听歌' + count + '首'"
      @click.native="playedList"
    ></sheet-item>

    <sheet-item
      :title="likeSheet.name"
      :showDiv="true"
      :showImg="likeImg"
      :showDivColor="'#ebcece'"
      :songCount="likeSheet.trackCount + '首，'"
      :playCount="'播放' + likeSheet.playCount + '次'"
      @click.native="userLike"
    ></sheet-item>

    <div class="createSheet" v-if="createSheet.length !== 0">
      <div class="title">
        <span class="sp1">创建的歌单</span
        ><span class="sp2"
          >({{ createSheet.length }}个，被收藏{{ subscribedCount }}次)</span
        >
      </div>
      <sheet-item
        v-for="(item, index) in createSheet"
        :key="index"
        :title="item.name"
        :sheetImg="item.coverImgUrl"
        :songCount="item.trackCount + '首，'"
        :playCount="'播放' + item.playCount + '次'"
        @click.native="userSheet(item.id)"
      ></sheet-item>
    </div>

    <div class="subSheet" v-if="subSheet.length !== 0">
      <div class="title">
        <span class="sp1">收藏的歌单</span>
        <span class="sp2">({{ subSheet.length }})</span>
      </div>
      <sheet-item
        v-for="(item, index) in subSheet"
        :key="index"
        :title="item.name"
        :sheetImg="item.coverImgUrl"
        :songCount="item.trackCount + '首，by ' + item.nickname"
        :playCount="'，播放' + item.playCount + '次'"
        @click.native="sheet(item.id)"
      ></sheet-item>
    </div>

    <div class="attestation" v-if="identify">
      <span class="sp1">认证信息</span>
      <div class="indentifyBox">
        <img :src="identify.imageUrl" alt="" />
        <div>{{ identify.imageDesc }}</div>
      </div>
    </div>

    <div class="singerDetail" v-if="singer !== null">
      <div v-if="singerdetail.desc != '' || singerdetail.introduction.length !== 0">
        <span class="sp1">歌手信息</span>
        <div class="singerDesc" v-if="singerdetail.desc">
          简介： {{ singerdetail.desc }}
        </div>
        <div
          class="singerPrize"
          v-for="(item, index) in singerdetail.introduction"
          :key="index"
        >
          <div class="prizeTitle">{{ item.ti }}：</div>
          <div class="prizeContent">{{ item.txt }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sheetItem from "./sheetItem";
import { getUserPlayList, getUserDetail } from "network/user";
import { toStringNum } from "common/common";
import { getPlayList } from "network/played";
import { getSingerDetail } from "network/singer";

export default {
  props: ["count", "artistId", "identify"],
  name: "homepage",
  data() {
    return {
      uid: "", // 用户id
      phImg: require("assets/img/information/paihang.svg"),
      likeImg: require("assets/img/information/aixin.svg"),
      likeSheet: {}, // 喜欢的音乐
      createSheet: [], // 创建的歌单
      subSheet: [], // 收藏的歌单
      subscribedCount: 0, // 歌单收藏总次数
      singer: "", // 歌手id
      singerdetail: {},
    };
  },
  components: {
    sheetItem,
  },
  methods: {
    // 用户最近播放
    playedList() {
      this.$router.push("/played/" + this.$route.params.uid);
    },

    // 用户喜欢的音乐
    userLike() {
      this.$router.push("/playDetail/" + this.likeSheet.id);
    },

    // 用户创建的歌单
    userSheet(id) {
      this.$router.push("/playDetail/" + id);
    },

    // 用户收藏的歌单
    sheet(id) {
      this.$router.push("/playDetail/" + id);
    },
  },
  created() {
    this.uid = this.$route.params.uid;
    // 获取歌单
    getUserPlayList(this.$route.params.uid).then((res) => {
      this.likeSheet.id = res.data.playlist[0].id; // 歌单id
      this.likeSheet.name = res.data.playlist[0].name; // 歌单名称
      this.likeSheet.playCount = res.data.playlist[0].playCount; // 歌单播放次数
      this.likeSheet.trackCount = res.data.playlist[0].trackCount; // 歌单歌曲数量
      this.$set(this.likeSheet, this.likeSheet.name, res.data.playlist[0].name);

      for (let i = 1; i < res.data.playlist.length; i++) {
        if (res.data.playlist[i].creator.userId == this.uid) {
          this.createSheet.push({
            id: res.data.playlist[i].id, // 歌单id
            name: res.data.playlist[i].name, // 歌单名称
            coverImgUrl: res.data.playlist[i].coverImgUrl, // 歌单封面
            trackCount: res.data.playlist[i].trackCount, // 歌单歌曲数量
            playCount: toStringNum(res.data.playlist[i].playCount), // 歌单播放量
          });
          this.subscribedCount += res.data.playlist[i].subscribedCount; // 歌单被收藏数量
        } else {
          this.subSheet.push({
            id: res.data.playlist[i].id, // 歌单id
            name: res.data.playlist[i].name, // 歌单名称
            coverImgUrl: res.data.playlist[i].coverImgUrl, // 歌单封面
            trackCount: res.data.playlist[i].trackCount, // 歌单歌曲数量
            playCount: toStringNum(res.data.playlist[i].playCount), // 歌单播放量
            nickname: res.data.playlist[i].creator.nickname, // 创作者
          });
        }
      }
    });
  },
  mounted() {
    this.$loading.loadingShow();
    setTimeout(() => {
      this.singer = this.artistId;
      getSingerDetail(this.singer).then((res) => {
        this.singerdetail.desc = res.data.briefDesc; // 歌手介绍
        this.singerdetail.introduction = res.data.introduction; // 歌手荣誉
        this.$set(
          this.singerdetail,
          this.singerdetail.desc,
          res.data.briefDesc
        );
        this.$loading.loadingNo();
      });
    }, 500);
  },
};
</script>
<style scoped>
.indentifyBox {
  font-size: 0.372836rem;
  display: flex;
  align-items: center;
  margin-top: 0.133156rem;
}
.indentifyBox img {
  width: 0.665779rem;
  height: 0.665779rem;
  float: left;
  margin-right: 0.133156rem;
}
.attestation {
  margin-top: 0.532623rem;
}
.singerPrize {
  margin-top: 0.532623rem;
}
.prizeTitle {
  font-size: 0.426099rem;
  font-weight: 550;
  margin-bottom: 0.133156rem;
}
.prizeContent {
  font-size: 0.372836rem;
  color: #000;
}
.singerDetail {
  margin-top: 0.532623rem;
}
.singerDesc {
  font-size: 0.346205rem;
  margin-top: 0.266312rem;
}
.homepage {
  padding: 0 15px 15px;
  margin-bottom: 45px;
  background-color: #fff;
  min-height: 7.856192rem;
  position: relative;
  /* z-index: 1; */
}
.createSheet {
  width: 100%;
  margin-top: 0.798935rem;
}
.subSheet {
  width: 100%;
  margin-top: 0.798935rem;
}
.title {
  margin-bottom: 10px;
}
.sp1 {
  font-size: 0.466045rem;
  font-weight: 550;
}
.sp2 {
  font-size: 0.346205rem;
  color: #929292;
  position: relative;
  left: 0.266312rem;
}
</style>