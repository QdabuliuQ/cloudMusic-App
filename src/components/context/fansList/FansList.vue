<template>
  <div class="FansList">
      <menunav :navTitle='navTitle'></menunav>
  </div>
</template>

<script>
import {menunav} from 'components/context/menuNav/MenuNav'
import {getUserFans} from 'network/user'

export default {
    name: 'FansList',
    components: {
        menunav
    },
    data () {
        return {
            navTitle: '粉丝'
        }
    }
}

</script>
<style scoped>
    .FansList{
        
    }
</style>