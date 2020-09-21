<template>
  <div class="Collection">
      <menu-nav class="nav" :navTitle="navTitle"></menu-nav>
      <tab-control class="tab" :title="title"></tab-control>
      <div class="box">
          
      </div>
  </div>
</template>

<script>
import menuNav from 'components/context/menuNav/MenuNav'
import tabControl from 'components/common/tabControl/TabControl'

import {getSublist,getVideo} from 'network/collection'

export default {
    name: 'Collection',
    data () {
        return {
            navTitle: '我的收藏',
            title: ['专辑','歌手','MV']    
        }
    },
    components: {
        menuNav,
        tabControl
    },

    created () {
        // getSublist(this.$store.state.profile.userId).then(res => {
        //     console.log(res);
        // }),

        // getVideo(this.$store.state.profile.userId).then(res => {
        //     console.log(res);
        // })
    }
}

</script>
<style scoped>
    .nav{
        background-color: #fff;
        position: relative;
        z-index: 20;
    }
    .tab{
        background-color: #fff;
    }
    .box{
        padding: 8px 15px;
        height: 400px;
    }
</style>