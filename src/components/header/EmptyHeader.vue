<template>
    <div class="er-empty-header" :style="'height: ' + headerHeight + 'px;'"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Header } from './header'

@Component
export default class EmptyHeader extends Vue implements Header {
    // 高度
    @Prop({default: 70})
    private height!: number
    // 完成延时
    @Prop({default: 1000})
    private finishDuration!: number
    // 是否浮动
    @Prop({default: false})
    private isFloat!: boolean

    // Header的高度
    private headerHeight: number = 70.0

    // 初始化
    public mounted() {
        // 初始化高度
        this.headerHeight = this.height
    }

    headerFinishDuration(): number {
        return this.finishDuration;
    }

    isHeaderFloat(): boolean {
        return this.isFloat;
    }

    onRefreshClose(): void {
        // todo nothing
    }

    onRefreshEnd(): void {
        // todo nothing
    }

    onRefreshReady(): void {
        // todo nothing
    }

    onRefreshRestore(): void {
        // todo nothing
    }

    onRefreshStart(): void {
        // todo nothing
    }

    onRefreshed(): void {
        // todo nothing
    }

    onRefreshing(): void {
        // todo nothing
    }

    refreshHeight(): number {
        return this.height;
    }

    updateHeaderHeight(height: number): void {
        if (height > this.height) {
            this.headerHeight = height
        } else {
            this.headerHeight = this.height
        }
    }

}
</script>

<style scoped>
    .er-empty-header {
        width: 100%;
        height: 0;
        background: transparent;
    }
</style>
