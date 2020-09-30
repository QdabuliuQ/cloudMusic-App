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
                    // // 从第六行开始滚动  
                    // if (this.index >= 6) {
                    //     // // 通过 yscroll 保存滚动距离
                    //     this.yscroll += document.getElementsByClassName('item')[this.index - 5].clientHeight + 17
                        
                    //     this.$refs.list.style.transform = 'translateY(' + (-this.yscroll) + 'px)'
                    //     this.zindex ++ ;
                    //     this.$refs.list.style.transition = '0.3s linear'
                    // }
                    var huiche = /^\n/;
                    
                        // 从第六行开始滚动  
                    if (this.index >= 6) {
                        if (huiche.test(this.lyricText[this.index])) {
                            console.log('空格');
                            // // 通过 yscroll 保存滚动距离
                            
                        } else {
                            // console.log(this.index);
                            this.yscroll += document.getElementsByClassName('item')[this.index - 5].clientHeight + 17
                            
                            this.$refs.list.style.transform = 'translateY(' + (-this.yscroll) + 'px)'
                            this.zindex ++ ;
                            this.$refs.list.style.transition = '0.3s linear'
                        }
                    }
                    
                    this.index++
                    this.activeIndex++
                } 
            }
        },

        indexLyric(){
            // for 循环遍历歌词数组  songLyric歌词时间数组
            for (let i = 0; i < this.songLyric.length; i++) {
                // 判断滚动到哪个歌词区间
                if (this.songLyric[i] >= this.cTime && this.cTime < this.songLyric[i+1]) {
                    console.log(i);
                    // 从歌词第六行开始滚动
                    if (i >= 6) {
                        // this.itemSumH = (document.getElementsByClassName('item')[i].clientHeight + 17)
                        this.itemSumH = 38
                        this.$refs.list.style.transform = 'translateY(' + (-this.itemSumH) * (i) + 'px)'
                    }
                    // for (let j = 0; j < document.getElementsByClassName('item').length; j++) {
                    //     if (j <= i) {
                    //         this.itemSumH += document.getElementsByClassName('item')[j].clientHeight + 17
                    //     }
                    //     if (j == i) {
                    //         this.zindex = j - 6;
                    //         this.$refs.list.style.transform = 'translateY(' + (-this.itemSumH) + 'px)'
                    //         console.log(this.itemSumH);
                    //         break;     
                    //     }                
                    // }
                    // this.$refs.list.style.transform = 'translateY(' + (-this.yscroll) * this.zindex + 'px)'
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