<template>
    <div class="er-bezier-circle-header" :style="'height: ' + headerHeight + 'px;'">
        <div ref="er-bch-canvas" class="er-bch-canvas"></div>
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

    // Canvas
    private canvasBox!: HTMLElement
    private canvasDom!: HTMLCanvasElement
    private canvas!: CanvasRenderingContext2D

    // 初始化
    public mounted() {
        this.canvasBox = this.$refs['er-bch-canvas'] as HTMLElement
        this.drawCanvas()
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
    @Watch('headerHeight')
    private drawCanvas() {
        this.createCanvas()
        if (this.headerStatus === HeaderStatus.NO_REFRESH
            || this.headerStatus === HeaderStatus.REFRESH_START
            && this.headerHeight <= this.defaultHeight) {
            this.drawBackground()
        } else if (this.headerStatus === HeaderStatus.REFRESH_READY
            && this.headerHeight >= this.defaultHeight) {
            this.drawBackground()
        }
        this.canvasBox.appendChild(this.canvasDom)
    }

    // 创建Canvas
    private createCanvas() {
        // 删除之前的Canvas
        if (this.canvasDom) {
            this.canvasBox.removeChild(this.canvasDom)
        }
        this.canvasDom = document.createElement('canvas')
        this.canvasDom.width = this.canvasBox.clientWidth
        this.canvasDom.height = this.canvasBox.clientHeight
        this.canvas = this.canvasDom.getContext('2d') as CanvasRenderingContext2D
    }
    // 绘制背景
    private drawBackground() {
        this.canvas.fillStyle = this.bgColor
        this.canvas.fillRect(0, 0, this.canvasDom.width, this.defaultHeight)
    }
    // 绘制下拉弧度
    private drawPullRadian() {
        // drawPullRadian
    }
}
</script>

<style scoped lang="scss">
    .er-bezier-circle-header {
        width: 100%;
        height: 0;
        background: transparent;
        .er-bch-canvas {
            width: 100%;
            height: 100%;
        }
    }
</style>
