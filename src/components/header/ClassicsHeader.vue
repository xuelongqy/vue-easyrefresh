<template>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Header } from './header'

@Component
export default class ClassicsHeader extends Vue implements Header {
    // 获取实例
    @Prop()
    public instance!: (obj: Header) => void
    // 刷新高度
    public refreshHeight(): number {
        return 70;
    }
    // 完成延时
    public finishDuration(): number {
        return 1000;
    }

    // 初始化
    public mounted() {
        // 返回实例
        if (this.instance) {
            this.instance(this)
        }
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
        // console.log(height)
    }
}
</script>

<style scoped>

</style>
