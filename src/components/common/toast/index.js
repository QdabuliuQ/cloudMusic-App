// 引入 toast 组件
import Toast from './Toast'

// 创建一个 obj 对象
const obj = {}

// 通过 Vue.use() 安装了该 js 文件后就会第一时间执行 install 函数中内容
// install 函数默认有一个参数是 Vue ，整个 Vue 对象
obj.install = function(Vue){
    // 1. 创建组件构造器 extend 将模板对象 toast 传入
    // 保存到变量 toastContrustor
    const toastContrustor = Vue.extend(Toast);

    // 2. 根据创建组件构造器，创建一个组件对象
    // 此时 toast 变量中保存的是 toast 模板对象
    // 通过 toast 调用模板中对应的方法
    const toast = new toastContrustor();

    // 3. 创建组件模板对象挂载到一个元素上
    // 通过 $mount 来挂载
    // 创建一个 div 并挂载上去
    toast.$mount(document.createElement('div'))
    // 此时 toast.$el 就是上面创建的 div

    // 4. 将 toast.$el 挂载到 body 上才能够显示
    document.body.appendChild(toast.$el)

    // 5. 在 Vue 的 prototype 中添加新的指令
    // 这样在其他组件中通过指令来调用 toast 组件模板中的方法
    Vue.prototype.$toast = toast;  // $toast 指令 对应的是 toast 组件对象
}

// 导出 obj 对象
export default obj;