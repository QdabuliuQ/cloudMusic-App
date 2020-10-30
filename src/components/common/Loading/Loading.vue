<template>
  <transition>
    <div v-show="isShow" class="Loading">
        <img class="loadimg" src="~assets/img/common/jiazaizhong.svg" alt="">
    </div>
  </transition>
</template>

<script>
export default {
    name: 'Loading',
    data () {
        return {
            isShow: false
        }
    },
    methods: {
        loadingShow(){
            this.isShow = true
        },

        loadingNo(){
            this.isShow = false
        }
    }
}

</script>
<style scoped>
    .Loading{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
        background-color: #fff;
        position: absolute;
        top: 20%;
        left: 47%;
        position: fixed;
        /* margin: auto; */
        /* margin: 60px auto; */
        animation: xuanz 0.5s infinite;
        z-index: 2001;
    }
    @keyframes xuanz{
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
    .loadimg{
        width: 20px;
        height: 20px;
        margin-top: 5px;
        margin-left: 5px;
    }
    .v-enter,.v-leave-to{
        opacity: 0;
        transform: translateY(150px);
    }

    .v-enter-active,.v-leave-active{
        /* 添加动画效果 */
        transition: all 0.4s linear;
    }
</style>