<template>
<!-- tabbar组件只完成底部导航条 -->
<!-- 导航条的内容作为另外一个组件 -->
    <div id="tabbar">
      <!-- 在 tabbar 中放入一个插槽 让其他组件放入 -->
      <slot></slot>
    </div>
</template>

<script>
export default {
    name:'tabbar'
}
</script>

<style>
  #tabbar{
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    /* background-color: rgb(231, 230, 230); */
    box-shadow: 0 -2px 5px rgba(0,0,0,0.2);
  }
</style>