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
    props: ['itemList','firstIndex'],
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
            bottomBor.style.width = span.offsetWidth + 'px';
            Move(bottomBor, 'left', span.offsetLeft, 35)
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.tabIndex = this.firstIndex;
            let span = document.getElementsByClassName('spItem')[this.firstIndex];
            let bottomBor = document.getElementsByClassName('bottomBor')[0];
            Move(bottomBor, 'left', span.offsetLeft, 35)
        })
    }
}

</script>
<style scoped>
    .TabNav{
        width: 100%;
        height: 1.171771rem;
        background-color: #fff;
        box-sizing: border-box;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        position: relative;
        box-sizing: border-box;
    }
    .item{
        flex: 1;
        line-height: 1.171771rem;
        text-align: center;
        font-size: .372836rem;
    }
    .item span{
        padding: 5px 10px 10px;
    }
    .active{
        color: #e93d34;
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