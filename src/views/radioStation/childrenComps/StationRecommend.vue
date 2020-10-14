<template>
  <div class="StationRecommend">
    <div class="head" @click="toClassifyView">
        <h2>{{classifyName}}</h2>
        <img src="~assets/img/radioStation/HomeP/you.svg" alt="">
    </div>
    <perfered-item
    :recommendAudio="stationItem"
    :showTag="false"
    :showCreator="true"
    ></perfered-item>
  </div>
</template>

<script>
import perferedItem from "./StationItem"; // 电台推荐组件
import {getRecommend} from "network/radioStation"; // 网络请求

export default {
    name: 'StationRecommend',
    props: ['classifyName','classifyId'],
    data () {
        return {
            stationItem: [],  // 分类模块数据
        }
    },
    components: {
        perferedItem
    },
    methods: {
        toClassifyView(){
            this.$router.push('/classifyInfo/'+this.classifyId)
        }
    },
    created () {
        // 获取分类电台部分数据
        getRecommend(this.classifyId).then(res => {
            for (let i = 0; i < 3; i++) {
                this.stationItem.push({
                    picUrl: res.data.djRadios[i].picUrl,
                    name: res.data.djRadios[i].name,
                    desc: res.data.djRadios[i].desc,
                    rcmdtext: res.data.djRadios[i].rcmdtext,
                    id: res.data.djRadios[i].id
                })
            }
        })
    }
}

</script>
<style scoped>
.StationRecommend {
  margin-bottom: 15px;
}
.head h2 {
  font-size: 16px;
  float: left;
}
.head .more {
  width: 70px;
  text-align: center;
  border-radius: 20px;
  line-height: 18px;
  height: 20px;
  font-size: 12px;
  border: 1px solid #cdccdd;
  position: absolute;
  right: 0;
  top: -2px;
}
.head {
  width: 100%;
  height: 26px;
  position: relative;
  margin-bottom: 5px;
}
.head img{
    width: 13px;
    margin-top: 6.5px;
    margin-left: 5px;
}
</style>