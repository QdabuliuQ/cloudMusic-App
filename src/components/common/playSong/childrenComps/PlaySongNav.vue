<template>
  <div class="PlaySongNav">
      <div class="navitem">
          <img src="~assets/img/playSong/xinaixin.svg" alt="">
      </div>
      <div class="navitem">
          <img src="~assets/img/playSong/xiazai.svg" alt="">
      </div>
      <div class="navitem">
          <img src="~assets/img/playSong/changge.svg" alt="">
      </div>
      <div class="navitem">
          <img src="~assets/img/playSong/pinglun.svg" alt="">
      </div>
      <div class="navitem">
          <img src="~assets/img/playSong/gengduo.svg" alt="">
      </div>
  </div>
</template>

<script>
export default {
    name: 'PlaySongNav',
    methods: {
    }
}

</script>
<style scoped>
    .PlaySongNav{
        width: 100%;
        height: 30px;
        display: flex;
    }
    .navitem{
        flex: 1;
        text-align: center;
    }
    .navitem img{
        margin-top: 6px;
        width: 20px;
        height: 20px;
    }
</style>