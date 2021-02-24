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
    width: 100%;
    height: 1.306667rem;
    /* position: absolute;
    left: .4rem;
    right: .4rem;
    bottom: 1.466667rem; */
    /* background-color: rgb(231, 230, 230); */
    /* box-shadow: 0 -2px 5px rgba(0,0,0,0.2); */
  }
</style>