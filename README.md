# 网易云音乐 #
## <u>基于 Vue.js 开发的高仿项目。</u> ##
* 项目 API 来自 [Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) 提供，点击查看[API 中文文档](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e9%aa%8c%e8%af%81%e9%aa%8c%e8%af%81%e7%a0%81)

### 安装运行（安装运行前请确定已安装node环境）
* 环境安装：npm install
* 启动服务：npm run dev
* 发布代码：npm run build

### 目前以实现的功能：
* 用户登录
* 用户关注列表/最近播放歌曲
* 用户基本信息/歌单/歌曲/昵称/头像...
* 获取用户的歌单基本信息/歌曲
* 播放歌曲/歌曲封面旋转/歌曲歌词实时滚动
* 拖动进度条跳转歌曲播放时间
* 歌曲评论/上拉加载更多评论
* 歌曲分享面板
* 首页轮播图
* 歌曲MV播放
* 进度条实时更新
* 时间实时更新
* MV评论加载
* 更多MV推荐
* 我的电台
* 我的电台首页
* 电台分类
* 电台分类列表
* 电台详情
* 电台播放
* 电台评论
* 电台封面简介动画切换
* 电台播放时间实时更新/跳转
* 电台排行
* 个人信息界面/个人基本信息/歌单/动态/关注粉丝列表
* 歌手信息界面/歌曲/简介/专辑/MV/动态/关注粉丝列表
* 首页
* 歌单广场
* 更多音乐
* 更多专辑
* 搜索（已有功能：搜索建议，热搜列表，搜索结果分类，搜索建议跳转）
* 视频/视频分类/分类切换/视频播放/视频全屏播放(全屏模式下暂时无法拖动进度条跳转)
* 发表评论（歌曲、mv、歌单、专辑、电台、视频、动态）以上都支持
* 热评墙
* 热门话题
* 左侧菜单

### 项目要点：
* 1、歌曲播放界面进度条的实时更新，需要获取到歌曲的时间，计算进度条在每一秒中需要移动多少PX。
* 2、歌曲歌词界面，歌词的实时滚动，通过API请求获取歌词数据，再通过正则表达式分别筛选出歌词和每一行歌词的时间，当歌词播放到一个时间点会进行判断，并进行歌词滚动。
```js
this.$store.state.navMusicDom.addEventListener("timeupdate", () => {
  // 判断有没有歌词
  if (this.lyricText.length !== 0) {
    // 判断歌曲时间在歌词区间
    if (
      this.$store.state.navMusicDom.currentTime >=
        this.songLyric[this.index] &&
      this.$store.state.navMusicDom.currentTime <=
        this.songLyric[this.index + 1]
    ) {
      var huiche = /^\n/; // 正则匹配回车符
      if (huiche.test(this.lyricText[this.index])) {
      } else {
        if (document.getElementsByClassName("active")[0] !== undefined) {
          if (
            document.getElementsByClassName("itemSpan")[this.zindex]
              .offsetTop >
            document.getElementsByClassName("LyricListContent")[0]
              .clientHeight /
              2
          ) {
            this.yscroll =
              document.getElementsByClassName("itemSpan")[this.zindex]
                .offsetTop -
              document.getElementsByClassName("LyricListContent")[0]
                .clientHeight /
                2 +
              document.getElementsByClassName("itemSpan")[this.zindex]
                .clientHeight /
                2;
            this.$refs.list.style.transform =
              "translateY(" + -this.yscroll + "px)";
            this.$refs.list.style.transition = "0.3s linear";
          }
        }
        this.zindex++;
      }
      this.index++; // 索引++
      this.activeIndex++; // 歌词索引++
    }
  }
});
```
在拖动进度条的时候，歌曲也需同步滚动，通过给 video 标签绑定 onseeked 事件，来进行滚动。
```js
// seeked 事件 在进度发生改变的时候触发
this.$store.state.navMusicDom.addEventListener("seeked", () => {
  if (this.$store.state.navMusicDom.currentTime < 1) {
    this.index = 0; // 清空索引
    this.zindex = 0;
    this.activeIndex = 0;
    this.yscroll = 0; // 清空滚动距离
    this.$refs.list.style.transform = "translateY(0px)"; // 滚动回顶部
  } else {
    // for 循环遍历歌词数组  songLyric歌词时间数组
    for (let i = 0; i < this.songLyric.length; i++) {
      // 判断滚动到哪个歌词区间
      if (
        // 获取当前video播放到的currentTime
        // 遍历歌词时间列表  找出所对应的时间段
        this.$store.state.navMusicDom.currentTime >= this.songLyric[i] &&
        this.$store.state.navMusicDom.currentTime < this.songLyric[i + 1] &&
        // 判断歌词是否滚动到了中间  滚动到了中间才会进行歌词跳转
        document.getElementsByClassName("itemSpan")[i].offsetTop > document.getElementsByClassName("LyricListContent")[0].clientHeight / 2
      ) {
        // 获取目标歌词距离顶部的距离  -  LyricListContent 元素的中间线
        let scroll = document.getElementsByClassName("itemSpan")[i - 2].offsetTop - document.getElementsByClassName("LyricListContent")[0].clientHeight / 2
        // 移动到中间线的位置后加上  目标歌词元素的高度 / 2 使其居中
        this.yscroll = scroll + document.getElementsByClassName("itemSpan")[i - 2].clientHeight / 2
        // 赋值给滚动元素
        this.$refs.list.style.transform =
          "translateY(" + -this.yscroll + "px)";
        this.activeIndex = i;  // 高亮索引
        this.index = i;
        this.zindex = i;  // 自动滚动索引
        break;
      }
    }
  }
});
```
* 3、MV播放界面的推荐内容，当点击推荐内容的时候需要进行跳转，可以通过 beforeRouteUpdate 来监听路由变化
```js
beforeRouteUpdate(to, from, next) {
  if (to.fullPath != from.fullPath) {
    this.mvDetail = {}; // 清空mv数据
    this.simiMv = []; // 清空相关视频
    this.commentList = []; // 清空评论内容
    this.CommentLength = 0; // 重置评论数量
    this.showDetail = false;
    next();
    this.MvDetail(); // 获取mv信息
    this.getMvUrl(); // 获取mvurl
    this.getCommentList(); // 获取mv评论
  }
},
```
* 4、搜索模块在搜索的时候需要使用到防抖函数，具体防抖函数可以学习[coderwhy老师视频教程](https://www.bilibili.com/video/BV15741177Eh?p=174)
```js
export function debounce(func, delay){
  let timer = null;
  // ...args 表示可以接受多个实参  并保存到数组中
  // return 返回一个函数
  return function(...args){
    // 清除上一次的延时调用
    if(timer) clearTimeout(timer)
    // 开启延时调用
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
```
* 5、点击搜索建议的时候，也需要重新刷新 SearchDetail 组件内容，可以通过给 SearchDetail 组件绑定 key属性，当点击搜索建议列表的某一项的时候，更新 key 属性的值刷新组件。
```html
<div class="SearchDetail" :key="i"></div>
```
* 6、在完成该项目也遇到一些从没有遇到的错误，例如：Invalid default value for prop “xxxxx“，在进行父子组件传值的时候报了这样的一个错。原因很简单，设置默认值的时候需要以函数的形式作为返回值 return 
```js
// 正确写法
List: {
type: Array,
default: ()=>[]
}
// 错误写法
List: {
type: Array,
default:[]
```
* 6、在开发歌曲播放页面功能的时候，必须要 APP.js 中exclude属性添加进去该组件，保证每次切换歌曲的时候不会一直显示第一次点击的页面，但在退出歌曲播放页面组件的时候该页面会自动销毁，不会继续播放。所以在 APP.js 根组件中引入了 Audio 标签，在根组件中进行播放，并通过 VUEX 进行保存相关数据，不会被销毁。
* 7、视频全屏模式本质上是创建一个新的组件，并通过 CSS3 transform:translate 旋转整个DIV达到横屏播效果，在引入滑动组件的时候由于整个DIV元素旋转导致拖拽进度条的时候会出错。全屏模式下暂不支持拖拽进度条。
* 8、父组件向子组件传值用 prop（属性传递），子组件向父组件传值用 $emit（事件传递），在兄弟组件传值的时候可以使用事件总线。
```js
// 创建事件总结总线
Vue.prototype.$EventBus = new Vue()  // 在全局中创建

// 兄弟组件一：
this.$EventBus.$emit("decresed", () => {})  // $emit 发送事件总线，监听 decresed 频道，也可以在回调函数中传递参数

// 兄弟组件二：

this.$EventBus.$on("decresed", () => {})  // $on 接收事件总线，监听 decresed 频道。
```