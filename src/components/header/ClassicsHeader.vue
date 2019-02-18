<template>
    <div ref="header" class="v-easy-refresh-classics-header" align="center">
        <!--图标-->
        <span></span>
        <!--文字-->
        <span>下拉刷新</span>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Header } from './header'

@Component
export default class ClassicsHeader extends Vue implements Header {
    // 刷新高度
    public refreshHeight(): number {
        return 70;
    }
    // 完成延时
    public finishDuration(): number {
        return 1000;
    }

    public onRefreshClose(): void {
        console.log('onRefreshClose')
    }
    public onRefreshEnd(): void {
        console.log('onRefreshEnd')
    }
    public onRefreshReady(): void {
        console.log('onRefreshReady')
    }
    public onRefreshRestore(): void {
        console.log('onRefreshRestore')
    }
    public onRefreshStart(): void {
        console.log('onRefreshStart')
    }
    public onRefreshed(): void {
        console.log('onRefreshed')
    }
    public onRefreshing(): void {
        console.log('onRefreshing')
    }
    public updateHeaderHeight(height: number): void {
        // height
    }
}
</script>

<style>
    .v-easy-refresh-classics-header {
        height: 70px;
        width: 100%;
        margin-top: -70px;
    }
</style>
