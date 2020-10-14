<template>
  <div class="anchorList">
    <ranking :showHot='true' :title='anchorTitle' :type='1' :list='hourlist' :isRadius='true'></ranking>
    <ranking :showHot='true' :title='newtitle' :type='1' :list='newlist' :isRadius='true'></ranking>
    <ranking-item
    :topText='topText' 
    :proList='popularList' 
    :showDetail='false' 
    :showImg='false' 
    :showHot='true'
    :isRadius='true'></ranking-item>
  </div>
</template>

<script>
import { getHours, getNewcomer, getPopular } from "network/radioStation";
import { toStringNum } from "common/common";
import ranking from "components/context/ranking/Ranking"
import RankingItem from "components/context/ranking/RankingItem"

export default {
  name: "anchorList",
  data() {
    return {
      topText: '最热主播',
      anchorTitle: '24小时榜',
      newtitle: '新人榜',
      hourlist: [], // 24小时榜
      newlist: [],  // 新人榜
      popularList: [],  // 最热主播
    };
  },
  components: {
      ranking,
      RankingItem,
  },
  created() {
    getHours(3).then((res) => {
      for (const item of res.data.data.list) {
        this.hourlist.push({
          id: item.id,
          avatarUrl: item.avatarUrl,
          nickName: item.nickName,
          score: toStringNum(item.score),
        });
      }
    });

    getNewcomer(3).then((res) => {
      for (const item of res.data.data.list) {
        this.newlist.push({
          id: item.id,
          avatarUrl: item.avatarUrl,
          nickName: item.nickName,
          score: toStringNum(item.score),
        });
      }
    });

    getPopular(100).then(res => {
        console.log(res);
        for (const item of res.data.data.list) {
            this.popularList.push({
                coverUrl: item.avatarUrl,  // 头像
                id: item.id,  // id
                lastRank: item.lastRank,  // 上次排名
                rank: item.rank,  // 排名
                score: toStringNum(item.score),  // 热度
                name: item.nickName,  // 昵称
                userType: item.userType,  // 用户身份
            })
        }
    })
  },
};
</script>
<style scoped>
.anchorList {
  width: 100%;
}
</style>