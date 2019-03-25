<template>
    <div id="app">
        <div :class="screenType">
            <transition mode="out-in" :name="routerTransition">
                <router-view v-if="isRouterAlive" class="app-router"/>
            </transition>
        </div>
        <div v-if="!isMobile" class="screen-btn">
            <v-btn
                color="orange"
                dark
                fab
                @click="onScreenChange">
                <v-icon>{{screenType === 'screen-mobile' ? 'smartphone' : 'desktop_windows'}}</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Watch, Vue} from 'vue-property-decorator'

    @Component
    export default class App extends Vue {
        // 路由动画
        private routerTransition: string = 'slide-right'
        // 屏幕类型
        private screenType: string = 'screen-pc'
        // 是否为手机
        private isMobile: boolean = false
        // 显示路由视图(用户局部刷新)
        private isRouterAlive: boolean = true

        // 初始化
        public mounted() {
            if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                this.screenType = 'screen-mobile'
                this.isMobile = true
            } else {
                this.screenType = 'screen-pc'
                this.isMobile = false
            }
        }

        // 路由监听
        @Watch('$route')
        private onRouteChanged() {
            // @ts-ignore
            this.routerTransition = this.$router.isBack ? 'slide-right' : 'slide-left'
            // @ts-ignore
            this.$router.isBack = false
        }

        // 屏幕切换
        private onScreenChange() {
            if (this.screenType === 'screen-mobile') {
                this.screenType = 'screen-pc'
            } else {
                this.screenType = 'screen-mobile'
            }
            this.reload()
        }

        // 重新加载
        private reload() {
            this.isRouterAlive = false
            this.$nextTick(() => {
                this.isRouterAlive = true
            })
        }
    }
</script>

<style lang="scss">
    $material-design-icons-font-path: '~material-design-icons-iconfont/dist/fonts/';
    @import '~material-design-icons-iconfont/src/material-design-icons';
    @import '~vuetify/dist/vuetify.min.css';

    body {
        margin: 0;
    }

    #app {
        position: fixed;
        margin: 0;
        width: 100%;
        height: 100%;
        .app-router {
            position: absolute;
            width:100%;
            transition: all .2s cubic-bezier(.55,0,.1,1);
        }
        .screen-pc {
            position: fixed;
            left: 0;
            right: 0;
            width: 411px;
            height: 731px;
            margin-top: 25px;
            margin-left:auto;
            margin-right:auto;
            border-style: solid;
            border-width: 1px;
            border-color: #E0E0E0;
            overflow: hidden;
        }
        .screen-mobile {
            width: 100%;
            height: 100%;
        }
        .screen-btn {
            position: absolute;
            right: 0;
            bottom: 0;
            margin-right: 20px;
            margin-bottom: 76px;
        }
    }
    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(50px, 0);
        transform: translate(50px, 0);
    }
    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-50px, 0);
        transform: translate(-50px, 0);
    }
    .v-divider {
        margin-left: 5px;
        margin-right: 5px;
    }
</style>
