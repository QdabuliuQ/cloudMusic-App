<template>
  <div class="MyMessage">
        <tab-control 
        style="margin-top: 44px; background: #fff;position: relative; z-index: 15; padding:0 15px;" 
        ref="tab2" 
        :title="title"
        @tabGoods='tabGoods'
        v-show="isFixed"></tab-control>
        <mui-scroll
        style="top: 44px;"
        :scrollY="true"
        ref="mscroll">
            <div class="MyMessage2">
                <my-message-user class="user" v-if="$store.state.profile.userId !== ''"></my-message-user>
                <my-message-login class="login" v-else @toLogin="toLogin"></my-message-login>
                <my-message-menu></my-message-menu>
                <my-message-love @click.native="toLove"></my-message-love>
                <tab-control @tabGoods="tabGoods" ref="tab1" :title="title"></tab-control>
                <my-message-list></my-message-list>
            </div>
        </mui-scroll>
   
   </div>
</template>

<script>
import MyMessageLogin from './chlidrenComps/MyMessageLogin'  // 用户未登录组件
import MyMessageUser from './chlidrenComps/MyMessageUser'  // 用户已登录组件
import MyMessageMenu from './chlidrenComps/MyMessageMenu'  // 菜单栏
import MyMessageLove from './chlidrenComps/MyMessageLove'  // 喜欢的音乐
import MyMessageList from './chlidrenComps/MyMessageList'  // 歌单列表
import tabControl from 'components/common/tabControl/TabControl'

import mui from 'assets/mui/js/mui'

import muiScroll from 'components/common/muiScroll/MuiScroll'  // 滚动组件

import {getUserPlayList} from 'network/user'  // 获取用户歌单

import Login from 'components/context/login/Login'  // 用于登录界面

export default {
    name: 'MyMessage',
    data () {
        return {
            // isShow: false,
            isFixed: false,
            title: ['创建歌单','收藏歌单','歌单助手']
        }
    },
    methods: {
        // 登录组件
        toLogin(){
            // this.isShow = true
        },

        // 关闭登录
        closeLogin(){
            // this.isShow = false;
        },

        // 导航栏切换
        tabGoods(index){
            switch (index) {
                case 0:
                    this.$refs.tab1.isShow = this.$refs.tab2.isShow = 0;
                    this.$refs.mscroll.muiscroll.scrollTo(0,-(this.$store.state.mySheetToTop-35),500)
                    break;
                case 1:
                    this.$refs.tab1.isShow = this.$refs.tab2.isShow = 1;
                    this.$refs.mscroll.muiscroll.scrollTo(0,-(this.$store.state.collectionToTop-35),500)
                    break;
                case 2:
                    this.$refs.tab1.isShow = this.$refs.tab2.isShow = 2;
                    break;
                default:
                    break;
            }  
        },

        toLove(){
            this.$router.push('/playDetail/' + this.$store.state.playList[0].id)
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.offsetTopTab = this.$refs.tab1.$el.offsetTop
        })

        
    },
    components: {
        MyMessageLogin,
        MyMessageUser,
        MyMessageMenu,
        MyMessageLove,
        // MyMessageNavbar,
        MyMessageList,
        tabControl,
        muiScroll,
        Login
    }
}

</script>
<style scoped>
    .MyMessage{
        overflow: hidden;
        /* padding: 20px 15px; */
    }
    .MyMessage2{
        
        padding: 20px 15px;
    }
    .jnavbar{
        margin-top: 44px;
        background-color: #fff;
        position: relative;
        padding: 0 15px;
        z-index: 15;
    }
    .v-enter{
        opacity: 0;
        /* 进来的时候从右 */
        transform: translateX(100%);
    }
    .v-leave-to{
        opacity: 0;
        /* 离开的时候向左 */
        transform: translateX(-100%);
        position: absolute;
    }

    /* 动画执行期间 */
    .v-enter-active,.v-leave-active{
        /* 添加动画效果 */
        transition: all 0.2s linear;
    }
</style>