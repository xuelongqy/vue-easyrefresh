<template>
    <div class="er-empty-header" :style="'height: ' + headerHeight + 'px;'"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Header, HeaderStatus } from '../header'

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
    // Header状态
    private headerStatus: HeaderStatus = HeaderStatus.NO_REFRESH

    // 初始化
    public mounted() {
        // 初始化高度
        this.headerHeight = this.height
    }

    public headerFinishDuration(): number {
        return this.finishDuration;
    }

    public isHeaderFloat(): boolean {
        return this.isFloat;
    }

    public onRefreshClose(): void {
        this.headerStatus = HeaderStatus.NO_REFRESH
    }

    public onRefreshEnd(): void {
        this.headerStatus = HeaderStatus.REFRESH_END
    }

    public onRefreshReady(): void {
        this.headerStatus = HeaderStatus.REFRESH_READY
    }

    public onRefreshRestore(): void {
        this.headerStatus = HeaderStatus.REFRESH_START
    }

    public onRefreshStart(): void {
        this.headerStatus = HeaderStatus.REFRESH_START
    }

    public onRefreshed(): void {
        this.headerStatus = HeaderStatus.REFRESHED
    }

    public onRefreshing(): void {
        this.headerStatus = HeaderStatus.REFRESHING
    }

    public refreshHeight(): number {
        return this.height;
    }

    public updateHeaderHeight(height: number): void {
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
