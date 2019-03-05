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
    // 回弹值
    private reboundValue: number = 0
    private reboundInterval!: number
    // 弹出圆圈值
    private reboundCircleValue: number = 0

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
        this.reboundCircleValue = 0
        this.drawCanvas()
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
        // 开始回弹
        this.startRebound()
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
        this.drawBackground()
        if ((this.headerStatus === HeaderStatus.NO_REFRESH ||
            this.headerStatus === HeaderStatus.REFRESH_READY)
            && this.headerHeight >= this.defaultHeight) {
            this.drawBackground()
            this.drawPullRadian()
        }
        if (this.reboundValue !== 0) {
            this.drawRebound()
        }
        if (this.reboundCircleValue !== 0) {
            this.drawCircle()
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
        this.canvas.fillStyle = this.bgColor
        this.canvas.beginPath()
        this.canvas.moveTo(0, this.defaultHeight)
        this.canvas.quadraticCurveTo(this.canvasDom.width / 2,
            (this.canvasDom.height * 2 - 80) * 0.95,
            this.canvasDom.width, this.defaultHeight)
        this.canvas.fill()
    }
    // 绘制回弹弧度
    private drawRebound() {
        // 曲线高度值
        let curveHeight
        if (this.reboundValue <= this.defaultHeight) {
            curveHeight = this.reboundValue
        } else if (this.reboundValue <= this.defaultHeight * 2) {
            curveHeight = this.defaultHeight * 2 - this.reboundValue
        } else if (this.reboundValue <= this.defaultHeight * 2.5) {
            curveHeight = this.reboundValue - this.defaultHeight * 2
        } else if (this.reboundValue <= this.defaultHeight * 3) {
            curveHeight = this.defaultHeight * 3 - this.reboundValue
        }
        this.canvas.fillStyle = this.color
        this.canvas.beginPath()
        this.canvas.moveTo(0, this.defaultHeight)
        this.canvas.quadraticCurveTo(this.canvasDom.width / 2,
            this.canvasDom.height - curveHeight,
            this.canvasDom.width, this.defaultHeight)
        this.canvas.fill()
        // 判断是否弹出圆圈
        if (this.reboundValue >= this.defaultHeight) {
            this.drawCircleRebound()
        }
    }
    // 绘制圆圈弹出
    private drawCircleRebound() {
        // 计算圆圈的值
        this.reboundCircleValue = this.reboundValue <= this.defaultHeight * 2 ?
            this.defaultHeight - (this.reboundValue - this.defaultHeight) / 2
            : this.defaultHeight / 2
    }
    // 绘制圆圈
    private drawCircle() {
        this.canvas.fillStyle = this.color
        const circleX = this.canvasDom.width / 2
        const circleY = this.reboundCircleValue
        this.canvas.beginPath();
        this.canvas.arc(circleX, circleY, 15, 0 , 2*Math.PI)
        this.canvas.fill()
    }

    // 开始回弹
    private startRebound() {
        this.reboundInterval = setInterval(() => {
            if (this.reboundValue >= this.defaultHeight * 3) {
                this.stopRebound()
                this.reboundValue = 0
            } else {
                this.reboundValue += 10
            }
            this.drawCanvas()
        }, 20)
    }
    // 结束回弹
    private stopRebound() {
        clearInterval(this.reboundInterval)
        this.reboundInterval = null
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
