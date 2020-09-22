<template>
  <div>
    Video


    <!-- <loading></loading> -->
    <!-- <button @click="btn">1111</button>

    <button @click="btn2">2222</button> -->
  </div>
  
</template>

<script>
// import loading from 'components/common/loading/Loading'

export default {
    name: 'Video',
    components: {
      // loading
    },
    methods: {
      btn(){
        this.$loading.loadingShow()
      },

      btn2(){
        this.$loading.loadingNo()
      }
    }
}

</script>
<style scoped>
</style>