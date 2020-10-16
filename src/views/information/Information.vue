<template>
  <div class="Information">
      <menunav ref="informationTonav" :showBlackImg='false' :showWriteImg='true' :rightImg='true' class="nav" :navTitle='navTitle'></menunav>
      <div class="topbox" v-if="profile != null">
          <div class="userBURL">
              <img :src="profile.backgroundUrl" alt="">
          </div>
          <div class="zhez"></div>
          <div class="userDetail">
              <div class="userImg">
                  <img :src="profile.avatarUrl" alt="">
                  <div class="logo" v-if="profile.artistId">
                      <img src="~assets/img/information/wyy.svg" alt="">
                  </div>
              </div>
              <div class="userName">
                  {{profile.nickname}}&nbsp;&nbsp;&nbsp;
                  <img v-if="profile.vipType !== 0" src="~assets/img/common/vip1.svg" alt="">
              </div>
              <div class="detail">
                  <div class="follows">关注 {{profile.follows}} </div> 
                  <div class="followeds">粉丝  {{profile.followeds}} </div>
              </div>
              <div class="createtime">
                  从 {{profile.createTime | getTime}} 开始来到网易云
              </div>
          </div>
      </div>
      <div ref="informationNav" class="navbox">
          <tabnav @tabToggle='tabToggle' :firstIndex='0' class="tabnav" :itemList='itemList'></tabnav>
      </div>
      <homepage v-if="showHome" class="homepage" :count='profile.listenSongs'></homepage>
      <dynamic 
      v-if="showDynamic" 
      :userImg='profile.avatarUrl'
      :nickName='profile.nickname'
      ></dynamic>
  </div>
</template>

<script>
import menunav from 'components/context/menuNav/MenuNav'
import tabnav from 'components/context/tabNav/TabNav'
import homepage from './childrenComps/homepage'  // 主页
import dynamic from './childrenComps/dynamic'  // 动态

import { toStringNum } from "common/common";
import { getUserDetail } from 'network/user'

export default {
    name: 'Information',
    data () {
        return {
            navTitle: '',
            profile: {},  // 用户信息
            itemList: ['主页','动态'],
            pageY: 0,
            showHome: true,  // 显示/隐藏主页
            showDynamic: false,
        }
    },
    methods: {
        tabToggle(index){
            switch (index) {
                case 0:
                    this.showHome = true
                    this.showDynamic = false
                    break;
                case 1:
                    this.showDynamic = true
                    this.showHome = false
                default:
                    break;
            }
        }  
    },
    created () {
        getUserDetail(this.$route.params.uid).then(res => {
            this.profile.level = res.data.level;  // 用户等级
            this.profile.listenSongs = res.data.listenSongs;  // 用户累计播放歌曲
            this.profile.avatarUrl = res.data.profile.avatarUrl;  // 用户头像
            this.profile.nickname = res.data.profile.nickname;  // 用户昵称
            this.profile.follows = res.data.profile.follows;  // 用户关注
            this.profile.followeds = toStringNum(res.data.profile.followeds);  // 用户粉丝
            this.profile.gender = res.data.profile.gender;  // 性别
            this.profile.backgroundUrl = res.data.profile.backgroundUrl;  // 背景图片
            this.profile.createTime = res.data.profile.createTime;  // 创建时间
            this.profile.artistId = res.data.profile.artistId || null;  // 歌手id
            this.profile.vipType = res.data.profile.vipType;  // 是否会员
            this.$set(this.profile, this.profile.backgroundUrl, res.data.profile.backgroundUrl);
        })      
    },
    components: {
        menunav,
        tabnav,
        homepage,
        dynamic,
    },
    mounted () {
        this.$nextTick(() => {
            let navToTop = this.$refs.informationNav.offsetTop - 44
            let nav = this.$refs.informationNav
            let topnav = this.$refs.informationTonav.$el;
            document.addEventListener('scroll', () => {   
                if (pageYOffset >= navToTop) {
                    nav.style = 'position: fixed; left: 0; right: 0; top: 64px; z-index: 20'
                    topnav.style = 'background-color: rgba(0,0,0,' + 1 + ')'
                    if (this.showHome) {
                        document.querySelector('.homepage').style = 'padding-top: 1.171771rem'
                    }
                    
                    this.navTitle = this.profile.nickname;
                } else if (pageYOffset < navToTop){
                    nav.style = 'position: static'
                    topnav.style = 'background-color: rgba(0,0,0,' + 0 + ')'
                    if (this.showHome) {
                       document.querySelector('.homepage').style = 'padding-top: .266312rem'
                    }
                    
                    this.navTitle = ''
                }
            })
        })
    }
}

</script>
<style scoped>
    .Information{
        width: 100%;
        position: relative;
        z-index: 20;
        background-color: #fff;
    }
    .nav{
        background-color: transparent;
        position: fixed;
        z-index: 21;
        border: 0;
        transition: all 0.4s linear;
        color: #fff;
    }
    .topbox{
        width: 100%;
        height: 7.989348rem;
        position: relative;
        z-index: 20;
    }
    .userBURL{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
    }
    .userBURL img{
        width: 100%;
        height: 100%;
    }
    .zhez{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 2;
        background-color: rgba(0,0,0,0.5);
    }
    .userDetail{
        padding: 15px 15px 0;
        position: relative;
        top: 28%;
        z-index: 3;
    }
    .userImg{
        width: 1.997337rem;
        height: 1.997337rem; 
        position: relative;
    }
    .userImg img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .logo{
        position: absolute;
        bottom: .053262rem;
        right: .133156rem;
        width: .479361rem;
        height: .479361rem;
        text-align: center;
        border-radius: 50%;
        background-color: #da231b;
    }
    .logo img{
        width: .319574rem;
    }
    .userName{
        font-size: .426099rem;
        margin-top: .399467rem;
        color: #fff;
        position: relative;
        /* height: .665779rem;
        line-height: .665779rem; */
    }
    .userName img{
        height: 25px;
        position: absolute;
        top: -.053262rem;
    }
    .detail{
        font-size: .346205rem;
        color: #adadad;
        height: 10px;
        margin-top: .266312rem;
    }
    .follows{
        float: left;
        height: 10px;
        line-height: 10px;
        padding-right: 10px;
        border-right: 1px solid #adadad;
    }
    .followeds{
        float: left;
        height: 10px;
        line-height: 10px;
        margin-left: 10px;
    }
    .createtime{
        height: .532623rem;
        font-size: 13px;
        line-height: .532623rem;
        color: #adadad;
        margin-top: .266312rem;
    }
    .tabnav{
        position: relative;
        height: 1.171771rem;
        z-index: 21;
        /* top: -.399467rem; */
        border-top-left-radius: .399467rem;
        border-top-right-radius: .399467rem;
        background-color: #fff;
    }
    .homepage{
        padding-top: .266312rem;
    }
    .navbox{
        background-color: #000;
        width: 100%;
        margin-top: -20px;
    }
</style>