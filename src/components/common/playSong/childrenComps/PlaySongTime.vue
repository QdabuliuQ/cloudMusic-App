<template>
  <div class="playbox">
    <div class="start">00:00</div>
    <div class="PlaySongTime">    
        <van-slider 
        class="box" 
        v-model="value" 
        active-color="#ee0a24"
        bar-height="3px"
        inactive-color="#cdcdcd"
        >
            <template #button>
                <div class="custom-button"></div>
            </template>
        </van-slider>
    </div>
    <div class="end">{{songLength}}</div>
  </div>
</template>

<script>
export default {
    name: 'PlaySongTime',
    props: ['songLength'],
    data () {
        return {
            value: 0,
        }
    },
    methods: {
        
    },
    mounted() {
        setInterval(() => {
            this.value ++
            if (this.value >= 100) {
                this.value = 100
            }
        },1000)
    }
}

</script>
<style scoped>
    .playbox{
        display: flex;
    }
    .start{
        font-size: 10px;
        line-height: 40px;
        text-align: center;
        flex: 1;
    }
    .end{
        font-size: 10px;
        line-height: 40px;
        text-align: center;
        flex: 1;
    }
    .time{
        float: right;
    }
    .PlaySongTime{
        /* padding: 0 12px; */
        /* width: 80%; */
        height: 40px;
        flex:6;
        /* margin-left: 10%; */
    }
    .box{
        position: relative;
        top: 18px;
        float: left;
    }
    .custom-button {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        color: #fff;
        background-color: #ee0a24;
    }
</style>