<template>
  <div class="MyMessageNavbar" ref="navbar">
      <tabControl :title="title" @tabGoods="tabGoods">
      </tabControl>
  </div>
</template>

<script>
import tabControl from 'components/common/tabControl/TabControl'

export default {
    name: 'MyMessageNavbar',
    data () {
        return {
            title: ['创建歌单','收藏歌单','歌单助手']      
        }
    },
    methods: {
        tabGoods(index){
        }  
    },
    mounted () {
        this.$nextTick(() => {
            this.$store.state.navbarToTop = this.$refs.navbar.offsetTop
            console.log(this.$store.state.navbarToTop);
        })  
    },
    
    components: {
        tabControl
    }
}

</script>
<style scoped>
    .MyMessageNavbar{
        margin-top: 10px;
    }
</style>