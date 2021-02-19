<template>
  <div class="LeftPopup">
    <van-popup
      ref="popup"
      class="popupBox"
      position="left"
      :style="{ width: '85%', height: '100%' }"
      v-model="show"
    >
      <div class="content">
        <div class="box1">
          <div class="boxContent">
            <div class="left">
              <div class="icon">
                <i class="iconfont topIcon icon-yunbei"></i>
              </div>
              <div class="text">
                <div class="title">云贝中心</div>
                <div class="tag">签到</div>
              </div>
            </div>
            <div class="right">
              <div class="icon">
                <i class="iconfont topIcon icon-xiaoxi"></i>
              </div>
              <div class="text">
                <div class="title">消息中心</div>
                <div class="desc">{{ message }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="box2">
          <div class="box2Content">
            <div class="icon">
              <i class="iconfont icon-chuanzuo"></i>
            </div>
            <div class="title">创作者中心</div>
          </div>
        </div>
        <popup-item :title="'音乐服务'" :itemList="itemList1"></popup-item>
        <popup-item :title="'其他'" :itemList="itemList2"></popup-item>
        <popup-item :showTitle="false" :itemList="itemList3"></popup-item>
      </div>
    </van-popup>
  </div>
</template>

<script>
import popupItem from "./childrenComps/popupItem";
import "assets/icon/LeftPopup.css"  // 左侧抽屉字体图标
export default {
  name: "LeftPopup",
  data() {
    return {
      show: false,
      message: "点击查看新消息",
      itemList1: [
        { icon: 'icon-tingge', text: "听歌识曲" },
        { icon: 'icon-piao', text: "云村有票" },
        { icon: 'icon-shangcheng', text: "商城" },
        { icon: 'icon-youxi', text: "游戏专区" },
        { icon: 'icon-lingsheng', text: "口袋彩铃" },
      ],
      itemList2: [
        { icon: 'icon-zhuanban', text: "个性装扮" },
        { icon: 'icon-dingshi', text: "定时关闭" },
        { icon: 'icon-saoyisao', text: "扫一扫" },
        { icon: 'icon-xiazai', text: "边听边存" },
        { icon: 'icon-liuliang',text: "在线听歌免流量", },
        { icon: 'icon-heimingdan', text: "音乐黑名单" },
        { icon: 'icon-dunpai1', text: "青少年模式" },
        { icon: 'icon-naozhong', text: "音乐闹钟" },
      ],
      itemList3: [
        { icon: 'icon-dingdan', text: "我的订单" },
        { icon: 'icon-youhuiquan', text: "优惠券" },
        { icon: 'icon-bangzhu', text: "帮助与反馈" },
        { icon: 'icon-guanyu', text: "关于" },
      ],
    };
  },
  mounted() {
    this.$EventBus.$on("openPopup", () => {
      this.show = true;
    });
  },
  components: {
    popupItem,
  },
};
</script>
<style scoped>
.popupBox {
  background-color: rgb(235, 235, 235);
}
.content {
  width: 100%;
  padding: 0.479361rem 0.399467rem;
}
.box1 {
  margin-top: 0.266312rem;
  width: 100%;
  height: 1.997337rem;
  background-color: #fff;
  border-radius: 0.266312rem;
  display: flex;
  align-items: center;
}
.box2 {
  width: 100%;
  height: 1.59787rem;
  border-radius: 0.266312rem;
  display: flex;
  margin-top: 0.399467rem;
  align-items: center;
  background-color: #fff;
}
.boxContent {
  width: 90%;
  height: 80%;
  margin: 0 auto;
  display: flex;
}
.box2Content {
  width: 90%;
  height: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
}
.iconfont{
  color: #fff;
}
.topIcon{
  font-size: .346667rem;
}
.box2Content .title {
  margin-left: 0.213049rem;
  font-weight: 400;
  font-size: .373333rem;
}
.left {
  box-sizing: border-box;
  border-right: 1px solid #e6e6e6;
  flex: 1;
  display: flex;
  align-items: center;
}
.icon {
  width: 0.798935rem;
  height: 0.798935rem;
  background-color: #c5c5c5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.right {
  flex: 1;
  display: flex;
  align-items: center;
  margin-left: 0.213049rem;
}
.icon {
  width: 0.798935rem;
  height: 0.798935rem;
  background-color: #e95048;
  text-align: center;
  border-radius: 50%;
}
.message {
  width: 0.505992rem;
  position: relative;
  top: 0.133156rem !important;
}
.text {
  margin-left: 0.213049rem;
}
.title {
  font-weight: 400;
  font-size: .373333rem;
}
.tag {
  height: 0.479361rem;
  line-height: 0.426099rem;
  margin-top: 0.053262rem;
  padding: 0 0.213049rem;
  float: left;
  color: red;
  border: 1px solid red;
  border-radius: 0.532623rem;
  font-size: .266667rem;
  transform: scale(0.9);
}
.desc {
  font-size: 0.319574rem;
  color: #c5c5c5;
}
</style>