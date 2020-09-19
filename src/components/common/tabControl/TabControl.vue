<template>
  <div class="tab-control">
      <div class="tab-control-item"
       v-for="(item,index) in title" :key='index'
       :class="{ activeColor : index === isShow }"
       @click="tabClick(index)">
       <!-- 绑定 class 属性默认是第一个选项卡为高亮 -->
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name:'TabControl',
    data () {
        return {
            isShow:0
        }
    },
    methods: {
        // 修改 isShow 为对应的index
        tabClick(index) {
            this.isShow = index;
            // 子组件传参通过 $emit 调用父组件的方法并传递参数
            this.$emit('tabGoods',index)
        }
    },
    // 保存父组件传递过来的参数
    props:['title']
}

</script>
<style scoped>
    .tab-control{
        display: flex;
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 15px;
    }
    .tab-control-item{
        flex: 1;
    }
    .tab-control-item span{
        padding: 5px;
    }
    .activeColor{
        color: red;
    }
    .activeColor span{
        border-bottom: 2px solid red;
    }
</style>