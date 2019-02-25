<template>
    <div class="er-empty-footer" :style="'height: ' + footerHeight + 'px;'"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Footer } from './footer'

@Component
export default class EmptyFooter extends Vue implements Footer {
    // 高度
    @Prop({default: 70})
    private height!: number
    // 完成延时
    @Prop({default: 1000})
    private finishDuration!: number
    // 是否浮动
    @Prop({default: false})
    private isFloat!: boolean

    // Footer的高度
    private footerHeight: number = 70

    // 初始化
    public mounted() {
        // 初始化高度
        this.footerHeight = this.height
    }

    footerFinishDuration(): number {
        return this.finishDuration;
    }

    isFooterFloat(): boolean {
        return this.isFloat;
    }

    loadHeight(): number {
        return this.height;
    }

    onLoadClose(): void {
        // todo nothing
    }

    onLoadEnd(): void {
        // todo nothing
    }

    onLoadReady(): void {
        // todo nothing
    }

    onLoadRestore(): void {
        // todo nothing
    }

    onLoadStart(): void {
        // todo nothing
    }

    onLoaded(): void {
        // todo nothing
    }

    onLoading(): void {
        // todo nothing
    }

    onNoMore(): void {
        // todo nothing
    }

    updateFooterHeight(height: number): void {
        if (height > this.height) {
            this.footerHeight = height
        } else {
            this.footerHeight = this.height
        }
    }

}
</script>

<style scoped>
    .er-empty-footer {
        width: 100%;
        height: 0;
        background: transparent;
    }
</style>
