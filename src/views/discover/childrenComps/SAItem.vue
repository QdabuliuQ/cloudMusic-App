<template>
  <div class="SAItem" @click="toPlay">
    <div class="left">
      <img :src="itemDetail.picUrl" alt="" />
      <div v-if="isAlbum" class="bgcImg"><img src="~assets/img/information/yuan.svg" alt=""></div>
    </div>
    <div class="center">
      <div class="box">
        <div class="name">
          {{ itemDetail.name }}
        </div>
        <div class="desc">
           <span v-for="(item,index) in itemDetail.artists" :key="index">
               {{item.name }}
           </span>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="btn">
        <div class="img"><img src="~assets/img/discover/SAItem/play.svg" alt="" /></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemDetail: {
      type: Object,
      default: {},
    },
    isAlbum: {
      type: Boolean,
      default: false,
    }
  },
  name: "SAItem",
  methods: {
    toPlay(){
      if (!this.isAlbum) {
        this.$router.push('/playSong/' + this.itemDetail.id)
      } else {
        this.$router.push('/playDetail/' + this.itemDetail.id + '&' + true)
      }
    }
  }
};
</script>
<style scoped>
.SAItem {
  width: 100%;
  height: 1.198402rem;
  display: flex;
  margin-bottom: 10px;
}
.left {
  flex: 2;
  position: relative;
}
.bgcImg{
  position: absolute;
  z-index: -1;
  top: 0;
  left: .213049rem
}
.left img {
  width: 1.198402rem;
  height: 1.198402rem;
  border-radius: 0.133156rem;
}
.center {
  flex: 7;
  display: flex;
  align-items: center;
}
.name{
    width: 5.326232rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: .45273rem;
    line-height: .45273rem;
    font-size: .372836rem;
}
.desc{
    height: .399467rem;
    line-height: .399467rem;
    width: 5.326232rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: .346205rem;
    color: #8b8b8b;
}
.right {
  flex: 1;
  display: flex;
  align-items: center;
}
.btn {
  width: 0.665779rem;
  height: 0.665779rem;
  border-radius: 0.665779rem;
  margin: 0 auto;
  border: 1px solid #c0c0c0;
  text-align: center;
  display: flex;
  align-items: center;
}
.img{
  margin: auto;
}
</style>