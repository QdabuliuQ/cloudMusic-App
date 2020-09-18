<template>
    <div class="Toast" v-show="isShow">
        <div>{{message}}</div>
    </div>
</template>

<script>
export default {
    name: 'Toast',
    data () {
        return {
            isShow: false,
            message: ''
        }
    },
    methods: {
        // 设置默认参数 message timer
        // 调用这个方法没有传参 默认使用这个
        show(message = "默认文本", timer = 0){
            this.isShow = true;
            this.message = message
            
            setTimeout(() =>{
                this.isShow = false
                this.message = ''            
            },timer)
        }
    }
}

</script>
<style scoped>
    /* @import '~assets/css/animate.css'; */
    /* @import '~assets/css/animate.min.css'; */
    .Toast{
        position: fixed;
        /* 通过 translate 偏移自身高度和宽度的一半 */
        /* 居中 */
        transform: translate(-50%, -50%);
        padding: 10px 15px;
        color: #fff;
        top: 50%;
        left: 50%;
        z-index: 201;
        background-color: rgba(0,0,0,0.6);
        animation: toastA 2s linear;
    }
    @keyframes toastA{
        0%{
            opacity: 0;
        }
        30%{
            opacity: 1;
        }
        70%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
</style>    