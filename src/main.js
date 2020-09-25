import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入 mui 基本css样式
import 'assets/mui/css/mui.css'

// 轮播图组件
import { Swipe, SwipeItem } from 'vant';
import { Field } from 'vant';
import { CellGroup } from 'vant'
import { Button } from 'vant'
import { Loading } from 'vant';
import { Slider } from 'vant';


// 引入css样式
import 'vant/lib/index.css';
Vue.use(Swipe)  // 安装组件
Vue.use(SwipeItem)  
Vue.use(Field);  // 输入框
Vue.use(CellGroup)  
Vue.use(Button)  // 按钮
Vue.use(Loading);  // 加载动画
Vue.use(Slider);  // 滑块


// 引入 toast 组件
import toast from 'components/common/toast'
Vue.use(toast)  // 安装 toast 组件

import loading from 'components/common/Loading'
Vue.use(loading)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
