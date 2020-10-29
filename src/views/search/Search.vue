<template>
  <div class="Search">
    <div class="nav">
      <div class="left" @click="back">
        <img src="~assets/img/radioStation/fanhui.png" alt="" />
      </div>
      <div class="right">
        <div class="sous">
          <input @keyup.enter="toSearch" v-model="searchContent" :placeholder="searchContent" type="text" />
        </div>
      </div>
    </div>
    <div class="bContent">
        <search-hotdetail></search-hotdetail>
    </div>
  </div>
</template>

<script>
import SearchHotdetail from "./childrenComps/SearchHotdetail"

import { getDefault, getSearchHot } from "network/search";
export default {
  name: "Search",
  data() {
    return {
      searchContent: ''
    };
  },
  components: {
    SearchHotdetail,  
  },
  created() {
    getDefault().then((res) => {
      this.searchContent = res.data.data.realkeyword ;
    });
  },
  methods: {
    back(){
      this.$router.go(-1)
    },

    toSearch(){
      this.$router.push('/discover/search/searchDetail/' + this.searchContent)
    }
  }
};
</script>
<style scoped>
.bContent{
    padding: .133156rem .372836rem .319574rem;
}
.Search {
  width: 100%;
  background-color: #fff;
  position: relative;
  z-index: 20;
}
.nav {
  width: 100%;
  height: 1.171771rem;
  background-color: #fff;
  display: flex;
}
.left {
  flex: 1;
  text-align: center;
}
.left img {
  width: 25px;
  height: 22px;
  margin-top: 10.5px;
}
.right {
  flex: 9;
  display: flex;
  align-items: center;
}
.sous {
  width: 90%;
  height: 80%;
  border-bottom: 1px solid rgb(190, 190, 190);
  margin-left: 0.266312rem;
}
.sous input {
  width: 100%;
  height: 100%;
  border: 0;
  padding: 0;
  font-size: .426099rem;
  color: rgb(133, 133, 133);
}
</style>