<template>
  <div class="album">
      <div class="albumItem" @click="showAlbum(item.id)" v-for="(item,index) in albumList" :key="index">
          <div class="left">
              <img @load='imgLoad(index)' :src="item.picUrl" alt="">
              <div class="bgcImg" v-show="item.showImg"><img src="~assets/img/information/yuan.svg" alt=""></div>
          </div>
          <div class="right">
              <div class="content">
                  <div class="title">
                      {{item.name}}
                      <span class="sp" v-if="item.alias.length !== 0">({{item.alias[0]}})</span>
                </div>
                  <div class="detail">
                      {{item.publishTime | getTime('YYYY.MM.DD')}}
                      歌曲{{item.size}}
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { getSingerAlbum } from "network/singer";

export default {
  props: ["artistId"],
  name: "album",
  data() {
    return {
      offset: 0,
      more: true,
      albumList: [],
    };
  },
  methods: {
    // 监听图片加载
    imgLoad(index){
      this.albumList[index].showImg = true
    },

    showAlbum(id){
      this.$router.push('/playDetail/' + id +'&'+ true)
    },

    singerAlbum() {
      if (this.more) {
        getSingerAlbum(this.artistId, 50, this.offset).then((res) => {
          for (const item of res.data.hotAlbums) {
              this.albumList.push({
                  name: item.name,  // 专辑名称
                  id: item.id,  // id
                  picUrl: item.picUrl,  // 封面
                  publishTime: item.publishTime,  // 发布时间
                  size: item.size,  // 专辑歌曲数量
                  alias: item.alias,  // 专辑介绍
                  showImg: false,  // 图片显示
              })
          }
        });
      }
    },
  },
  created() {
      this.singerAlbum()
  },
};
</script>
<style scoped>
.album {
  padding: 0 15px 15px;
  margin-bottom: 45px;
  background-color: #fff;
  min-height: 7.856192rem;
  position: relative;
  z-index: -1;
}
.albumItem{
    width: 100%;
    height: 1.331558rem;
    display: flex;
    margin-bottom: .213049rem;
    position: relative;
}
.left{
    flex: 1.8;
}
.left img{
    width: 1.331558rem;
    height: 1.331558rem;
    border-radius: .133156rem;
}
.right{
    flex: 8.2;
    display: flex;
    align-items: center;
}
.bgcImg{
    width: 1.331558rem;
    height: 1.331558rem;
    position: absolute;
    z-index: -1;
    top: 0;
    left: .266312rem;
}
.content{
    margin-left: .266312rem;
}
.title{
    width: 6.65779rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: .479361rem;
    line-height: .479361rem;
    font-size: .399467rem;
}
.sp{
    color: #979797;
}
.detail{
    height: .479361rem;
    line-height: .479361rem;
    font-size: .319574rem;
    color: #979797;
}
</style>