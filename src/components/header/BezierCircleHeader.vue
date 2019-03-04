<template>
    <div class="er-bezier-circle-header" :style="'height: ' + headerHeight + 'px;'">
        <div class="er-bch-bg" :style="'background: ' + bgColor + ';'">
            <canvas :id="canvasDropId" :style="'height: ' + canvasDropHeight + 'px;width: ' + canvasDropWidth + 'px;'"></canvas>
        </div>
        <canvas :id="canvasPullId" class="er-bch-canvas-pull"></canvas>
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
    private canvasPullId: string = 'er-bch-canvas-pull-' + Math.random().toString(36).substring(3, 8)
    private canvasPullDom!: HTMLCanvasElement
    private canvasPull!: CanvasRenderingContext2D
    private canvasPullHeight: number = 0
    private canvasDropId: string = 'er-bch-canvas-drop-' + Math.random().toString(36).substring(3, 8)
    private canvasDropDom!: HTMLCanvasElement
    private canvasDrop!: CanvasRenderingContext2D
    private canvasDropWidth: number = 0
    private canvasDropHeight: number = 0
    // Header的高度
    private defaultHeight: number = 80
    private headerHeight: number = this.defaultHeight
    // Header状态
    private headerStatus: HeaderStatus = HeaderStatus.NO_REFRESH

    // 初始化
    public mounted() {
        // 获取Canvas
        this.canvasPullDom = document.getElementById(this.canvasPullId) as HTMLCanvasElement
        this.canvasPull = this.canvasPullDom.getContext('2d') as CanvasRenderingContext2D
        this.canvasDropDom = document.getElementById(this.canvasDropId) as HTMLCanvasElement
        this.canvasDrop = this.canvasDropDom.getContext('2d') as CanvasRenderingContext2D
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
            this.canvasPullHeight = height - this.defaultHeight
        } else {
            this.headerHeight = this.defaultHeight
        }
    }

    // 下拉Canvas绘制
    @Watch('canvasPullHeight')
    private drawCanvasPull() {
        //this.canvasPull.fillStyle = this.bgColor;
        //this.canvasPull.fillRect(0, 0, this.canvasPullDom.width, this.canvasPullDom.height)
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
        .er-bch-canvas-pull {
            width: 100%;
            height: 100px;
        }
    }
</style>
