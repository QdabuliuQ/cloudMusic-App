<template>
  <div class="SheetNav">
      <img src="~assets/img/played/bofang.svg" alt="">
      <span>播放全部<span class="a">(共{{trackCount}}首)</span></span>
  </div>
</template>

<script>
export default {
    name: 'SheetNav',
    props: ['trackCount']
}

</script>
<style scoped>
    .SheetNav{
        position: sticky;
        top: 42.5px;
        width: 100%;
        height: 45px;
        background-color: #fff;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        line-height: 45px;
        font-size: 15px;
    }
    .SheetNav img{
        margin-top: 6.5px;
        margin-left: 12px;
        margin-right: 7px;
        float: left;
    }
    .SheetNav .a{
        color: rgb(143, 143, 143);
        font-size: 13px;
    }
</style>