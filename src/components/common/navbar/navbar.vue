<template>
    <div class="nav-bar">
        <!-- 具名插槽 -->
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
export default {
    name:'navbar'
}
</script>

<style scoped>
    .nav-bar{
        display: flex;
        height: 44px;
        line-height: 44px;
        text-align: center;
        /* box-shadow: 0 1px 5px rgba(0,0,0,0.2); */
    }

    .left,.right {
        width: 60px;
    }

    .center{
        /* flex为1的时候 会自动调整宽度 */
        flex: 1;
    }
    
</style>