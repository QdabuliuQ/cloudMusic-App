<template>
  <div class="LyricList">
      <div class="content">
          <ul ref="list" v-if="lyricText.length !== 0">
              <li class="item" 
              v-for="(item,index) in lyricText"
              :key="index"
              :class="{active : index === activeIndex}">
                  <span class="itemSpan">{{item}}</span>
              </li>
          </ul>
          <div class="nolyric" v-else>暂时还没有歌词</div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'LyricList',
    props: ['lyricText','songLyric','value','songTime','cTime','indexLyric'],
    data () {
        return {
            activeIndex : 0,
            valueTime: 0,
            index: 0,
            yscroll: 0,
            zindex: 1,
            itemSumH: 0,
            songText: []
        }
    },
    mounted () {       
        // setTimeout(() => {
        //     console.log(this.songLyric);
        //     console.log(isNaN(this.songLyric[0]));
        // },2000)
    },
    methods: {
        time(){
            this.activeIndex++
        }
    },
    watch: {
        cTime(){
            // 判断有没有歌词         
            if (this.lyricText.length !== 0) {              
                // 判断歌曲时间在歌词区间
                if(this.cTime >= this.songLyric[this.index] && this.cTime <= this.songLyric[this.index + 1] ){
                    var huiche = /^\n/;  // 正则匹配回车符
                        // 从第六行开始滚动  
                    if (this.index >= 6) {
                        if (huiche.test(this.lyricText[this.index])) {
                        } else {
                            this.yscroll += document.getElementsByClassName('item')[this.index].clientHeight + 17
                            this.$refs.list.style.transform = 'translateY(' + (-this.yscroll) + 'px)'
                            this.zindex ++ ;
                            this.$refs.list.style.transition = '0.3s linear'
                        }
                    }                   
                    this.index++  // 索引++
                    this.activeIndex++  // 歌词索引++
                } 
            }
        },

        // 监听歌词进度条是否被拖动
        indexLyric(){
            // for 循环遍历歌词数组  songLyric歌词时间数组
            for (let i = 0; i < this.songLyric.length; i++) {
                // 判断滚动到哪个歌词区间
                if (this.songLyric[i] >= this.cTime && this.cTime <= this.songLyric[i+1]) {
                    // 从歌词第六行开始滚动
                    if (i >= 6) {
                        // console.log(i - this.index + '+++');
                        this.itemSumH = (document.getElementsByClassName('item')[i].clientHeight + 17)
                        this.yscroll += this.itemSumH * (i - this.index)
                        this.$refs.list.style.transform = 'translateY(' + (-this.yscroll) + 'px)'
                    }
                    this.activeIndex = i;
                    this.index = i;
                    
                    break;
                }
            }
        }
    },
    // created () {
    //     if (this.lyricText.length !== 0) {
    //         this.songLyric[3] += 0.6
    //         this.valueTime = (100 / this.songTime).toFixed(2)
    //     }
    // }
}

</script>
<style scoped>
    .playbox{
        width: 100%;
    }
    .content{
        width: 80%;
        position: relative;
        top: 2%;
        margin: 0 auto;
        height: 90%;
        text-align: center;
        overflow: hidden;
        font-size: 15px;
        letter-spacing: 2px;
        color: #757575;
        /* transform: translateY(); */
        /* transition: ; */
    }
    .active{
        color: #fff;
    }
    .item{
        margin-top: 17px;
    }
    .nolyric{
        position: relative;
        font-size: 20px;
        color: #fff;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
</style>