<template>
  <div class="StationClassify">
      <menu-nav :navTitle='navTitle'></menu-nav>
      <mscroll
      style="top: 44px; bottom: 45px"
      :scrollY='true'>
          <div class="hotClassify">
          <div class="title"><h2>热门分类</h2></div>
          <div class="itemList">
              <classify-item 
              v-for="(item,index) in cateListHot" 
              :key="index"
              :itemImg='item.picUrl'
              :itemName='item.name'
              :itemId='item.id'
              :itemIndex='index'></classify-item>
          </div>
      </div>
      <div class="moreClassify">
          <div class="title"><h2>更多分类</h2></div>
          <div class="itemList">
              <classify-item 
              v-for="(item,index) in cateListMore" 
              :key="index"
              :itemImg='item.picUrl'
              :itemName='item.name'
              :itemId='item.id'
              :itemIndex='index'></classify-item>
          </div>
      </div>
      </mscroll>
      
  </div>
</template>

<script>
import MenuNav from "components/context/menuNav/MenuNav"; // 导航栏组件
import ClassifyItem from './ClassifyItem'  // 分类组件
import mscroll from "components/common/muiScroll/MuiScroll"; // 滚动组件

import {getCateList, getCategory} from 'network/radioStation'

export default {
    name: 'StationClassify',
    data () {
        return {
            cateListHot: [],  // 热门分类信息
            cateListMore: [],  // 更多分类信息
            navTitle: '电台分类',
        }
    },
    created () {
        getCateList().then(res => {
            for (let i = 0; i < 6; i++) {
                this.cateListHot.push({
                    id: res.data.categories[i].id,
                    name: res.data.categories[i].name,
                    picUrl: res.data.categories[i].pic56x56Url
                })  
            }

            for (let i = 6; i < res.data.categories.length; i++) {
                this.cateListMore.push({
                    id: res.data.categories[i].id,
                    name: res.data.categories[i].name,
                    picUrl: res.data.categories[i].pic56x56Url
                })
            }
        })
    },
    components: {
        MenuNav,
        ClassifyItem,
        mscroll
    }
}

</script>
<style scoped>
    .StationClassify{
        position: relative;
        width: 100%;
        height: 100vh;
        background-color: #fff;
    }
    .hotClassify{
        width: 100%;
        
        margin-top: 25px;
    }
    .title h2{
        font-size: 17px;
    }
    .title{
        width: 100%;
        text-align: center;
    }
    .itemList{
        width: 100%;
        margin-top: 10px;
        box-sizing: border-box;
        border-top: 1px solid #dfdfdf;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .moreClassify{
        margin-top: 30px;
        margin-bottom: 30px;
    }
</style>