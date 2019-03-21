<template>
    <div id="app">
        <transition mode="out-in" :name="routerTransition">
            <router-view class="app-router"/>
        </transition>
    </div>
</template>

<script lang="ts">
    import {Component, Watch, Vue} from 'vue-property-decorator'

    @Component
    export default class App extends Vue {
        // 路由动画
        private routerTransition: string = 'slide-right'

        // 路由监听
        @Watch('$route')
        private onRouteChanged() {
            // @ts-ignore
            this.routerTransition = this.$router.isBack ? 'slide-right' : 'slide-left'
            // @ts-ignore
            this.$router.isBack = false
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
