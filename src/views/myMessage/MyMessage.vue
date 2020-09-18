<template>
  <div class="MyMessage">
      <my-message-user class="user" v-if="$store.state.profile.userId !== ''"></my-message-user>
      <my-message-login class="login" v-else @toLogin="toLogin"></my-message-login>   
  </div>
</template>

<script>
import MyMessageLogin from './chlidrenComps/MyMessageLogin'  // 用户未登录组件
import MyMessageUser from './chlidrenComps/MyMessageUser'  // 用户已登录组件

import Login from 'components/context/login/Login'  // 用于登录界面

export default {
    name: 'MyMessage',
    data () {
        return {
            isShow: false,
        }
    },
    methods: {
        // 登录组件
        toLogin(){
            this.isShow = true
        },

        // 关闭登录
        closeLogin(){
            this.isShow = false;
        }
    },
    components: {
        MyMessageLogin,
        MyMessageUser,
        Login
    }
}

</script>
<style scoped>
    .MyMessage{
        padding: 20px 15px;
    }
    .v-enter{
        opacity: 0;
        /* 进来的时候从右 */
        transform: translateX(100%);
    }
    .v-leave-to{
        opacity: 0;
        /* 离开的时候向左 */
        transform: translateX(-100%);
        position: absolute;
    }

    /* 动画执行期间 */
    .v-enter-active,.v-leave-active{
        /* 添加动画效果 */
        transition: all 0.2s linear;
    }
</style>