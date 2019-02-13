<template>
    
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Footer } from './footer'

@Component
export default class ClassicsFooter extends Vue implements Footer {
    // 加载高度
    public loadHeight(): number {
        return 70;
    }
    // 加载完成延时
    public finishDuration(): number {
        return 1000;
    }

    public onLoadClose(): void {
        console.log('onLoadClose')
    }
    public onLoadEnd(): void {
        console.log('onLoadEnd')
    }
    public onLoadReady(): void {
        console.log('onLoadReady')
    }
    public onLoadRestore(): void {
        console.log('onLoadRestore')
    }
    public onLoadStart(): void {
        console.log('onLoadStart')
    }
    public onLoaded(): void {
        console.log('onLoaded')
    }
    public onLoading(): void {
        console.log('onLoading')
    }
    public onNoMore(): void {
        console.log('onNoMore')
    }
    public updateFooterHeight(height: number): void {
        // console.log(height)
    }
}
</script>

<style scoped>

</style>
