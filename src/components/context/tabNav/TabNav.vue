<template>
  <div class="TabNav">
      <div 
      @click="tabItem(index)" 
      class="item" 
      v-for="(item,index) in itemList" 
      :key="index"
      >
          <span class="spItem" :class="{ active : index === tabIndex }">{{item}}</span>
      </div>
      <span class="bottomBor"></span>
  </div>
</template>

<script>
import {Move} from 'common/tool'

export default {
    props: ['itemList'],
    name: 'TabNav',
    data () {
        return {
            tabIndex: 1,
            timer: null   
        }
    },
    methods: {
        tabItem(index){
            this.$emit('tabToggle',index)
            this.tabIndex = index
            let span = document.getElementsByClassName('spItem')[index];
            let bottomBor = document.getElementsByClassName('bottomBor')[0];
            Move(bottomBor, 'left', span.offsetLeft, 35)
        }
    }
}

</script>
<style scoped>
    .TabNav{
        width: 100%;
        height: 40px;
        background-color: #fff;
        box-sizing: border-box;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        position: relative;
        box-sizing: border-box;
    }
    .item{
        flex: 1;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        
    }
    .item span{
        padding: 5px 10px 10px;
    }
    .active{
        color: #da231b;
    }
    .bottomBor{
        width: 48px;
        height: 2px;
        background-color: #da231b;
        position: absolute;
        bottom: 0;
        left: 163px;
    }
</style>