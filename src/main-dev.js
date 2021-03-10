import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.prototype.$EventBus = new Vue()  // 创建事件总线  全局的事件总线

import 'amfe-flexible/index.js'  // 自适应布局

// 引入 elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入 mui 基本css样式
import 'assets/mui/css/mui.css'
import mui from "assets/mui/js/mui.min.js"; // 引入 mui js 文件

// 全局注册
import { Swipe, SwipeItem } from 'vant'; // 轮播图组件
import { Field } from 'vant';
import { CellGroup } from 'vant'
import { Button } from 'vant'
import { Loading } from 'vant';
import { Slider } from 'vant';
import { ActionSheet } from 'vant';
import { ShareSheet } from 'vant';
import { ImagePreview } from 'vant';
import { Popup } from 'vant';

// 引入css样式
import 'vant/lib/index.css';
Vue.use(Swipe)  // 安装组件
Vue.use(SwipeItem)  
Vue.use(Field);  // 输入框
Vue.use(CellGroup)  
Vue.use(Button)  // 按钮
Vue.use(Loading);  // 加载动画
Vue.use(Slider);  // 滑块
Vue.use(ActionSheet);  // 动作面板
Vue.use(ShareSheet);  // 分享面板
Vue.use(ImagePreview);
Vue.use(Popup);

// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
// 安装 VueLazyLoad
Vue.use(VueLazyLoad)
Vue.use(VueLazyLoad, {
  // preLoad: 1.3,   //预加载的宽高比
  // error: 'dist/error.png',//图片加载失败时使用的图片源
  loading: './assets/default.png',//图片加载的路径
  // loading:require('./assets/mo.png'),
  // attempt: 1,
  listenEvents:['scroll','wheel','mousewheel','resize','animationend','transitionend','touchmove'], //你想让vue监听的事件
})

import moment from 'moment' 
// 过滤器  pattern 时间格式
Vue.filter('getTime',function(date,pattern="YYYY年MM月DD日"){
  // 调用 moment 方法传入时间 获取指定的时间
  // 调用 format 格式化时间
  return moment(date).format(pattern)
})
// 时间转换
Vue.filter('mvTime',function(time){
  return (time / 1000 / 60 <= 9 ? '0' + Math.floor(time / 1000 / 60) :  Math.floor(time / 1000 / 60)) + ':' + (time / 1000 % 60 <= 9 ? '0' + time / 1000 % 60 : time / 1000 % 60)
})

Vue.filter('videoTime', function(time){
  let min = (Math.floor(time / 60) + '').padStart(2, '0');  // 分钟
  let second = (time - (60 * min) + '').padStart(2, '0');  // 秒数
  return min+':'+second
})


// 引入 toast 组件
import toast from 'components/common/toast'
Vue.use(toast)  // 安装 toast 组件

import loading from 'components/common/Loading'
import { Math } from 'core-js';
Vue.use(loading)

import "assets/css/base.css"  // 全局css样式
import "./assets/icon/Common.css"  // 公共字体图标
import "./assets/icon/Login.css"  // 登录页面字体图标


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
