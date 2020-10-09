//  动画特效
//obj  移动的元素      
//attr   修改元素的样式    
//target  移动的目标位置
//speed  移动速度
//callback  回调函数   执行完后最后才执行
export function Move(obj,attr,target,speed,callback){
    //获取div的left的值
    var currut = parseInt(getStyle(obj,attr));
    //如果left值大于目标位置   说明是向左移动
    if(currut > target){
        //速度改为负数
        speed = -speed;
    }
    //清除定时器
    clearInterval(obj.timer); 
        //每次调用都给每个对象指定一个定时器             
        obj.timer = setInterval(function(){
        //oldValue获取 div 的 left值
        //parseInt方法可以提取字符串中的有效数字
        var oldValue = parseInt(getStyle(obj,attr));
        //newValue获取  新值
        var newValue = oldValue+speed;
        //进行判断  newValue小于target说明div移动到了最左边   就改变newValue的值
        //  如果nawValue的值大于target说明div移动到了最右边   改变newValue的值
        if((newValue < target && speed < 0) || (newValue > target && speed > 0)){
            //让它等于800
            newValue = target;
        }
        //将newValue值赋给left不断修改
        //attr是变量用方括号括起来
        obj.style[attr] = newValue+"px";
        //判断 到达目标像素位置的时候
        if(newValue == target){
            // 清除定时器
            clearInterval(obj.timer);
            //调用最后的回调函数
            callback && callback();
        }
    },30);
}

//获取元素属性的方法
export function getStyle(obj,element){
    // return window.getComputedStyle?getComputedStyle(obj,null)[element]:obj.currentStyle[element];
    if(window.getComputedStyle){
        return getComputedStyle(obj,null)[element];
    }else{
        return obj.currentStyle[element];
    }
}

//添加类
export function addClass(obj,cn){
    //如果调用检查类的方法中没有包含类   就进入判断添加一个类
    if(!hasClass(obj,cn)){
        //添加类         给个空格分隔
        obj.className += " "+cn;
    }           
}

//判断类名是否存在的方法
//  obj  添加的对象
//  cn   添加的类名
export function hasClass(obj,cn){
    //用构造函数的形式来判断    \b单词边界  cn必须是一个独立的类名
    var reg = new RegExp("\\b"+cn+"\\b");
    //返回布尔值  判断是否包含类名
    return reg.test(obj.className);
}


//删除类的方法
//  obj  添加的对象
//  cn   添加的类名
export function removeClass(obj,cn){
    //用正则检查对应的类名
    var reg = new RegExp("\\b"+cn+"\\b");
    //删除class                   replace替换成" " 空串
    obj.className = obj.className.replace(reg," ");
}

//绑定事件方法
export function bind(obj,event,backFun){
    //如果浏览器兼容addEventListener   进入判断
    if(obj.addEventListener){
        //调用addEventListener方法   并传形参
        obj.addEventListener(event,backFun,false)
    //否则表示不兼容  IE8
    }else{
        //调用attachEvent 方法  事件名称需要添加on
        obj.attachEvent("on"+event,function(){   //写入匿名函数
            //执行匿名函数的时候  会调用backFun方法  修改this为obj
            backFun.call(obj);
        });
    }
}

//  缓动动画
//  obj 移动的对象
//  target 目标地点
//  speed 速度
export function slowActionAnimate(obj,target,speed){
    // 清除上一个定时器  防止多个定时器同时开启
    clearInterval(obj.animate);
    // 用obj.animate 给定时器命名
    // 防止多个定时器同名
    obj.animate = setInterval(function(){
        // 如果offsetLeft 等于 target 说明到达了目标位置
        if(obj.offsetLeft == target){
            // 清除定时器
            clearInterval(obj.animate);
        }else {
            // 目标位置 - box距离左边的距离
            // 得出的sp值不断减小  缓动效果
            var sp = (target - obj.offsetLeft) / speed ;
            //          Math.ceil向上取整 Math.floor向下取整
            var sp = sp > 0 ? Math.ceil(sp) : Math.floor(sp);
            box.style.left = box.offsetLeft + sp + "px";
        }    
    },30);   
}


// 随机验证码
// Obj 表示验证码写入的DOM对象
export function getRandomNum(Obj){
    code = '';
    // 创建数组
    var arrays = new Array(
       '1','2','3','4','5','6','7','8','9','0', 
       'a','b','c','d','e','f','g','h','i','j', 
       'k','l','m','n','o','p','q','r','s','t', 
       'u','v','w','x','y','z', 
       'A','B','C','D','E','F','G','H','I','J', 
       'K','L','M','N','O','P','Q','R','S','T', 
       'U','V','W','X','Y','Z'
    );
    // for循环组成数组
    for(var i = 0; i < 4; i++){
        // 每循环一次 重新获取随机数
        // 调用random方法 * 最大数
        // 0 - 最大数直接随机抽取
        // 保存到index中
        var index = Math.ceil(Math.random()*arrays.length-1);
        // 对code进行拼串
        code += arrays[index];
    }
    // 添加到对应的元素上去
    Obj.innerHTML = code;
}


/*       AJAX函数         */
// 定义函数obj2  传入参数obj
export function objElement(data){
    // 给obj新增加属性 获取实时时间  保证每次url地址不一样
    data.timer = new Date().getTime();
    // 声明数组
    var res = [];
    // for in 遍历 obj对象
    for(var Shux in data){
        // push 方法添加到数组中去
        // encodeURIComponent 对url地址中 的中文部分进行转码
        res.push(encodeURIComponent(Shux)+'='+encodeURIComponent(data[Shux]));
    }
    // join方法 将数组转为字符串
    // 元素之间用 & 号隔开    usename=zhangsan&usepwd=123456
    // 作为结果返回给函数
    return res.join('&');
}
// 封转AJAXpost函数
/*      option是一个对象 形参都是option的属性       */
// type 输入GET 获取 POST 请求
// url 请求的文件路径
// data 用户信息 (usename/usepwd)
// timeout 请求时间长短
// success 成功后的回调函数
// error 失败后的回调函数
export function ajax(option){
    /*
        AJAX请求
        -  1.创建异步对象
        -  2.设置请求方式和请求地址
        -  3.发送请求
        -  4.监听状态的变化
        -  5.处理返回的结果
    */
    // 创建变量接收obj2转换结果
    var str = objElement(option.data);
    // 创建异步对象
    // 创建变量控制定时器
    var xml,timer;
    if (window.XMLHttpRequest){
        xml=new XMLHttpRequest();
    }
    else{// 兼容ie6 和 ie5
        xml=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    // 判断GET或者POST请求
    // 统一将type 转为大写
    if(option.type.toUpperCase() === 'GET'){
        // 设置请求方式       
        xml.open(option.type , option.url + '?' + str,true);
        // 发送请求
        xml.send();
    }else{
        // 设置请求方式        
        xml.open(option.type , option.url ,true);
        // setRequestHeader 必须写在open下面  send上面
        // setRequestHeader  POST请求必须写入以下代码才能传递参数
        xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        // 发送请求
        xml.send(str);
    }
    
    // 绑定监听事件
    xml.onreadystatechange = function(){
        // 判断请求码
        if(xml.readyState === 4){
            // 成功接收请求后 清除定时器
            clearTimeout(timer);
            // 判断HTTP请求码
            if(xml.status >= 200 && xml.status < 300 || xml.status === 304){
                // 请求成功后的回调函数
                option.success(xml);
            }else{
                // 请求失败后的回调函数
                option.error(xml);
            }
        }
    }

    // 判断是否传入超时时间
    if(option.timeout){
        // 创建定时器(延时调用) 控制请求时间
        timer = setTimeout(function(){
            console.log('请求时间过长，请求中断');
            // 异步对象 .abort() 方法 表示终止请求
            xml.abort();
            // 清除定时器
            clearTimeout(timer);
        // 时间由用户自己设置
        },option.timeout);
    }
}