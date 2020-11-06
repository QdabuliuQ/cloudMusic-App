<template>
  <div class="MusicCalendar">
      MusicCalendar
  </div>
</template>

<script>
import {getCalendar} from "network/cloudVillage"
export default {
    name: 'MusicCalendar',
    data () {
      return {
        startTime: '',
        endTime: ''
      }
    },
    created () {
      let data = new Date();
      let year = data.getFullYear();  // 年份
      let mouth = data.getMonth() + 1;  // 月份
      let day = data.getDate();  // 日期
      this.startTime = new Date(year+'-09-01').getTime()
      this.endTime = new Date(year+'-'+mouth+'-'+day).getTime()
      
    },
    mounted () {
      getCalendar(this.$store.state.cookie, this.startTime, this.endTime).then(res => {
        console.log(res);
      })
    }
}

</script>
<style scoped>
</style>