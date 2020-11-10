<template>
  <div class="MusicTopic">
    <div class="item" v-for="(item,index) in topicList" :key="index">
      <div class="left">
        <img :src="item.sharePicUrl" alt="">
      </div>
      <div class="right">
        <div class="box">
          <div class="title"># {{item.title}} #</div>
          <div class="text">
            {{item.participateCount}} 人参与
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getCalendar, getHotTopic} from "network/cloudVillage"
export default {
    name: 'MusicTopic',
    data () {
      return {
        offset: 0,
        topicList: [],  // 话题
      }
    },
    created () {
      getHotTopic(30, this.offset * 30, this.$store.state.cookie).then(res => {
        for (const item of res.data.hot) {
          this.topicList.push({
            id: item.actId,
            participateCount: item.participateCount,  // 参数人数
            sharePicUrl: item.sharePicUrl,  // 封面
            text: item.text,  // 文本
            title: item.title,  // 标题
          })
        }
      })
    },
    mounted () {
    }
}

</script>
<style scoped>
.MusicTopic{
  width: 100%;
  background-color: #fff;
}
.item{
  width: 100%;
  height: 1.331558rem;
  border-radius: .266312rem;
  display: flex;
  background-color: #fff;
  border-radius: .133156rem;
  overflow: hidden;
  margin-bottom: .372836rem;
  box-sizing: border-box;
}
.left{
  flex: 1.7;
}
.left img{
  width: 1.331558rem;
  height: 1.331558rem;
  border-radius: .133156rem;
}
.right{
  flex: 8.3;
  display: flex;
  align-items: center;
}
.box{
  width: 100%;
}
.title{
  width: 7.456724rem;
  height: .45273rem;
  line-height: .45273rem;
  font-size: .399467rem;
}
.text{
  width: 7.456724rem;
  height: .372836rem;
  line-height: .372836rem;
  font-size: .319574rem;
  color: rgb(139, 139, 139);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>