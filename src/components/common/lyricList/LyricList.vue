<template>
  <div class="LyricList">
      <div class="content">
          <ul ref="list" v-if="lyricText.length !== 0">
              <li class="item" 
              v-for="(item,index) in lyricText"
              :key="index"
              :class="{active : index === activeIndex}">
                  <span>{{item}}</span>
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
            zindex: 1
        }
    },
    methods: {
        time(){
            this.activeIndex++
        }
    },
    watch: {
        cTime(){
            if (this.lyricText.length !== 0) {
                if(this.cTime >= this.songLyric[this.index] && this.cTime <= this.songLyric[this.index + 1] ){
                    
                    if (this.index > 6) {
                        // this.yscroll += document.getElementsByClassName('active')[0].clientHeight + 17
                        // this.$refs.list.style.transform = 'translateY(' + (-this.yscroll) + 'px)'
                        this.yscroll = document.getElementsByClassName('active')[0].clientHeight + 17
                        this.$refs.list.style.transform = 'translateY(' + (-this.yscroll) * this.zindex + 'px)'
                        console.log(this.zindex);
                        this.zindex ++ ;
                        this.$refs.list.style.transition = '0.3s linear'
                    }
                    this.index++
                    this.activeIndex++
                } 
            }
        },

        indexLyric(){
            for (let i = 0; i < this.songLyric.length; i++) {
                if (this.songLyric[i] >= this.cTime && this.cTime < this.songLyric[i+1]) {
                    console.log(this.cTime);
                    console.log(i);
                    this.activeIndex = i;
                    this.index = i;
                    this.zindex = 0;
                    this.zindex = i - 5;
                    this.$refs.list.style.transform = 'translateY(' + (-this.yscroll) * this.zindex + 'px)'
                    break;
                }
            }
        }
    },
    created () {
        if (this.lyricText.length !== 0) {
            this.songLyric[3] += 0.6
            this.valueTime = (100 / this.songTime).toFixed(2)
        }
    }
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