<template>
  <div class="RadioStation">
    <menu-nav :navTitle="navTitle"></menu-nav>
  </div>
</template>

<script>
import MenuNav from 'components/context/menuNav/MenuNav'  // 导航栏组件

import {getUserDJ} from 'network/radioStation'

export default {
    name: 'RadioStation',
    data () {
      return {
        navTitle: '我的电台',
      }
    },
    components: {
      MenuNav
    },
    created () {
      console.log(this.$store.state.profile.userId);
      getUserDJ(this.$store.state.profile.userId).then(res => {
        console.log(res);
      })
    }
}

</script>
<style scoped>
  .RadioStation{
    position: relative;
    z-index: 20;
    background-color: #fff;
    height: 100vh;
  }
</style>