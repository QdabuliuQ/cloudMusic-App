<template>
  <!-- 注册页面组件 -->
  <div class="Register">
      <navbar class="navbar">
          <div @click="back" class="left" slot="left"><img src="~assets/img/myMessage/fanhui.png" alt=""></div>
          <div slot="center">用户注册</div>
      </navbar>
      <div class="field">
            <van-field v-model="usename" placeholder="请输入用户名" type="text" label="用户名" />
            <van-field v-model="password" placeholder="请输入密码" type="password" label="密码" />
            <van-button 
            class="btn" 
            color="#da231b" 
            type="primary" 
            block
            @click="login">点击注册</van-button>
      </div>
  </div>
</template>

<script>
import navbar from 'components/common/navbar/navbar'

import {register} from 'network/register'  // 注册请求

export default {
    name: 'Register',
    props: ['useTel','useSms'],
    data () {
        return {
            tel: '',  // 手机号
            sms: '',  // 验证码
            usename: '',  // 用户名
            password: '',  // 密码
            isDisable: true,
            buttonText: '发送验证码',  // 按钮文字
            buttonTime: 5,  // 倒计时
        }
    },
    methods: {

        login(){
            register(this.useTel,this.password,this.useSms,this.usename).then(res => {
                console.log('success');
            })
        },

        back(){
            this.$emit('closeRegister')
        }
    },
    components: {
        navbar
    }
}

</script>
<style scoped>
    .Register{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 30;
        background-color: #fff;
    }
    .navbar{
        box-shadow: 0 -2px 5px rgba(0,0,0,0.5);
    }
    .left img{
        width: 20px;
        height: 20px;
        margin-top: 12px;
    }
    .field{
        padding: 8px 9px;
    }
    .btn{
        margin-top: 10px;
        border-radius: 44px;
    }
</style>