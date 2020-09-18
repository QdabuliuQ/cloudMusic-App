<template>
<!-- 导航栏的内容组件 -->
    <div class="tab-bar-item" @click='isShow'>
        <!-- 在每一个小组件中定义两个插槽 -->
        <!-- 通过name属性 将指定内容放入指定的插槽当中 -->
        <!-- 通过v-if v-else 指令来决定 显示哪张图标 -->
        <slot v-if='!isActive' name='item-icon'></slot>
        <!-- 这个插槽用于放入获取状态的图标 -->
        <slot v-else name='item-icon-active'></slot>
        <div :style="styleColor"><slot name='item-text'></slot></div>
        <!-- <img src="../../assets/img/index.png" alt="">
        <div>首页</div> -->
    </div>
</template>

<script>
export default {
    name:'tabbaritem',
    props: {
        // 指定 path 属性的值是 字符串类型
        path: String,
        activeColor: {
            // 指定默认类型为 字符串
            type: String,
            // 如果不传递参数默认 red
            default: 'red'
        }
    },
    data () {
        return {
            // isActive:true
        }
    },
    // 计算属性
    computed: {
        isActive(){
            // 只有当前活跃状态下的 组件 才有 $route 属性
            // 检查活跃组件的 path 是否 indexOf(包含) this.path
            // !== -1 表示包含
            return this.$route.path.indexOf(this.path) !== -1
        },
        // 根据传入的参数觉得字体颜色
        styleColor(){
            // this.isActive 当前处于活跃状态下
            // 三元运算符进行判断
            return this.isActive ? {color: this.activeColor} : {}
        }
    },
    methods: {
        isShow(){
            // console.log(this.$router);
            // replace替换   push增加
            // 添加 .catch(()=>{})  解决重复点击报错的问题
            this.$router.replace(this.path).catch(()=>{})
        }
    }
}
</script>

<style scoped>
    .tab-bar-item{
        /* flex 为 1 的时候会自动分配宽度 */
        flex: 1;
        text-align: center;
        /* 移动端tabbar默认高度是49 */
        height: 49px;
        font-size: 13px;
    }
    .tab-bar-item img{
        width: 25px;
        height: 25px;
        margin-top: 3px;
        /* 去除图片下面默认的 3 px */
        vertical-align: middle;
    }
    .activeSize{
        color: red;
    }
</style>