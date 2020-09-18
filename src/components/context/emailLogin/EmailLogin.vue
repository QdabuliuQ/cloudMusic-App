<template>
  <div class="PhoneLogin">
      <navbar class="navbar">
          <div @click="close" class="left" slot="left">
              <img src="~assets/img/myMessage/fanhui.png" alt="">
          </div>
          <div slot="center">
              邮箱登录
          </div>
      </navbar>
      <div class="box">
          <div class="tip"><span>没有注册过的邮箱账号会自动注册</span></div>
          <van-cell-group class="cell">
            <van-field v-model="tel" type="tel" label="邮箱账号" clearable placeholder="请输入邮箱账号"/>
            <van-field v-model="tel" type="password" label="密码" clearable placeholder="请输入密码"/>
          </van-cell-group>
          <van-button 
          class="btn" 
          color="#da231b" 
          type="primary" 
          block>点击登陆</van-button>
      </div>
      <!-- 用户注册 -->
      <transition>
          <register 
          @closeRegister="closeRegister"
          :useTel='tel'
          :useSms='sms'
          v-if="RegisterShow" 
          class="register"></register>
      </transition>
  </div>
</template>

<script>
import navbar from 'components/common/navbar/navbar'
import Register from 'components/context/register/Register'
import {getCode,getCaptcha,checkPhone,refreshLogin} from 'network/login'  // 网络请求

export default {
    name: 'PhoneLogin',
    data () {
        return {
             tel: '',  // 手机号
             sms: '',  // 验证码
             buttonText: '发送验证码',  // 按钮文字
             buttonTime: 60,  // 倒计时
             isDisable: false,  // 是否禁用按钮
             timer: null,   // 定时器
             RegisterShow: false
        }
    },
    methods: {
        close(){
            this.$router.go(-1)
        },
        // 发送验证码
        sendSms(){
            // 使用正则匹配手机号
            var reg = /\w{3,}@[A-z0-9](\.[A-z])*/
        },

        // 关闭手机登录页面
        closePhone(){
            this.$emit('closePhoneLogin')
        },

        // 关闭注册页面
        closeRegister(){
            this.RegisterShow = false
        }
    },
    components: {
        navbar,
        Register
    },
}

</script>
<style scoped>
    .PhoneLogin{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
    }
    .box{
        padding: 5px 10px;
    }
    .navbar{
        box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.5);
    }
    .left img{
        width: 20px;
        height: 20px;
        margin-top: 12px;
    }
    .btn{
        margin-top: 10px;
        border-radius: 44px;
    }
    .tip{
        font-size: 13px;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 10px;
        color: #888888;
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