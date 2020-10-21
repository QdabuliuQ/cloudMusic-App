<template>
  <div class="Discover">
      <discover-swiper style="margin-top: 54px"></discover-swiper>
  </div>
</template>

<script>
import DiscoverSwiper from './childrenComps/DiscoverSwiper'  // 轮播图组件
import {getHomepage} from 'network/discover'

export default {
    name: 'Discover',
    components: {
        DiscoverSwiper
    },
    created () {
        getHomepage().then(res => {
            // console.log(res);
        })
    }
}

</script>
<style scoped>
</style>