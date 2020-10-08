<template>
  <div class="ClassifyItem" @click="toClassifyView" >
      <div class="img"><img :src="itemImg" alt=""></div>
      <div class="name">
          <div class="itemName" v-bind:style='{borderRight: itemIndex % 2 == 0 ? "1px solid #dfdfdf" : 0}'>{{itemName}}</div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'ClassifyItem',
    // itemImg 分类图标  // itemName 分类名称  // itemIndex 分类索引  // itemId 分类id
    props: ['itemImg','itemName','itemIndex','itemId'],
    data () {
        return {
            isClick: false      
        }
    },
    methods: {
        toClassifyView(){
            this.$router.push('/classifyInfo/'+this.itemId)
        }
    }
}

</script>
<style scoped>
    .ClassifyItem{
        width: 50%;
        height: 50px;
        box-sizing: border-box;
        display: flex;
        border-bottom: 1px solid #dfdfdf;
    }
    .img{
        flex: 4;
    }
    .name{
        flex: 5;
        font-size: 14.5px;
    }
    .img img{
        width: 28px;
        height: 28px;
        float: right;
        margin-right: 9px;
        margin-top: 10.5px;
    }
    .itemName{
        line-height: 25px;
        width: 100%;
        height: 25px;
        position: relative;
        top: 12.5px;
    }
</style>