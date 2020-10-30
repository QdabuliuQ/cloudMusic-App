# 网易云音乐 #
## <u>基于 Vue.js 开发的高仿项目。</u> ##

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
* 歌曲MV播放界面UI完成/进度条实时更新/时间实时更新
* MV评论加载/更多MV推荐
* 我的电台UI布局/我的电台首页布局/电台分类UI布局
* 电台分类列表/电台详情布局/电台播放/电台评论/电台封面简介动画切换
* 电台播放时间实时更新/跳转/电台排行
* 个人信息界面/个人基本信息/歌单/动态/关注粉丝列表
* 歌手信息界面/歌曲/简介/专辑/MV/动态/关注粉丝列表
* 首页基本布局/首页内容跳转
* 歌单广场/更多音乐/更多专辑
* 搜索（已有功能：搜索建议，热搜列表，搜索结果分类，搜索建议跳转）

### 项目难点：
* 1.歌曲播放界面进度条的实时更新，需要获取到歌曲的时间，计算进度条在每一秒中需要移动多少PX。
* 2.歌曲歌词界面，歌词的实时滚动，通过API请求获取歌词数据，再通过正则表达式分别筛选出歌词和每一行歌词的时间，当歌词播放到一个时间点会进行判断，并进行歌词滚动。（目前该功能还有bug，有待解决）
* 3.MV播放界面的推荐内容，当点击推荐内容的时候需要进行跳转，可以通过 beforeRouteUpdate 来监听路由变化
```
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
* 4.搜索模块在搜索的时候需要使用到防抖函数，具体防抖函数可以学习[coderwhy老师视频教程](https://www.bilibili.com/video/BV15741177Eh?p=174)
```
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
* 5.点击搜索建议的时候，也需要重新刷新 SearchDetail 组件内容，可以通过给 SearchDetail 组件绑定 key属性，当点击搜索建议列表的某一项的时候，更新 key 属性的值刷新组件。
```
<div class="SearchDetail" :key="i"></div>
```
### 还有很多功能没有实现... 努力中......