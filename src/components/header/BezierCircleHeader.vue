<template>
    <div class="er-bezier-circle-header" :style="'height: ' + headerHeight + 'px;'">
        <div class="er-bch-bg" :style="'background: ' + bgColor + ';'">
            <div :style="'height: ' + dropHeight + 'px;width: ' + dropWidth + 'px;'"></div>
        </div>
        <div class="er-bch-pull" :style="'background: ' + bgColor + ';height: ' + pullHeight + 'px;'"></div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { Header, HeaderStatus } from './header'

@Component
export default class BezierCircleHeader extends Vue implements Header {
    // 完成延时
    @Prop({default: 1000})
    private finishDuration!: number
    // 颜色
    @Prop({default: '#ffffff'})
    private color!: string
    // 背景颜色
    @Prop({default: '#2196f3'})
    private bgColor!: string

    // Canvas
    private pullHeight: number = 0
    private dropWidth: number = 0
    private dropHeight: number = 0
    // Header的高度
    private defaultHeight: number = 80
    private headerHeight: number = this.defaultHeight
    // Header状态
    private headerStatus: HeaderStatus = HeaderStatus.NO_REFRESH

    // 初始化
    public mounted() {
    }

    public headerFinishDuration(): number {
        return this.finishDuration;
    }

    public isHeaderFloat(): boolean {
        return false;
    }

    public onRefreshClose(): void {
        this.headerStatus = HeaderStatus.NO_REFRESH
    }

    public onRefreshEnd(): void {
        this.headerStatus = HeaderStatus.REFRESHEND
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
        return this.defaultHeight;
    }

    public updateHeaderHeight(height: number): void {
        if (height > this.defaultHeight) {
            this.headerHeight = height
            this.pullHeight = height - this.defaultHeight
        } else {
            this.headerHeight = this.defaultHeight
        }
    }

    // 下拉Canvas绘制
    @Watch('pullHeight')
    private drawCanvasPull() {
    }
}
</script>

<style scoped lang="scss">
    .er-bezier-circle-header {
        width: 100%;
        height: 0;
        background: transparent;
        .er-bch-bg {
            width: 100%;
            height: 80px;
        }
        .er-bch-pull-pull {
            width: 100%;
            height: 0;
        }
    }
</style>
