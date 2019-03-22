<template>
    <div class="er-bezier-bounce-header" :style="'height: ' + headerHeight + 'px;'">
        <div ref="er-bbh-canvas" class="er-bbh-canvas"></div>
        <div class="ball-box">
            <div class="ball" :style="`background: ${color};margin-left: ${ballMargin}px;margin-right: ${ballMargin}px;opacity: ${ballOpacity * 0.5};`"></div>
            <div class="ball" :style="`background: ${color};margin-left: ${ballMargin}px;margin-right: ${ballMargin}px;opacity: ${ballOpacity * 0.75};`"></div>
            <div class="ball" :style="`background: ${color};margin-left: ${ballMargin}px;margin-right: ${ballMargin}px;opacity: ${ballOpacity};`"></div>
            <div class="ball" :style="`background: ${color};margin-left: ${ballMargin}px;margin-right: ${ballMargin}px;opacity: ${ballOpacity * 0.75};`"></div>
            <div class="ball" :style="`background: ${color};margin-left: ${ballMargin}px;margin-right: ${ballMargin}px;opacity: ${ballOpacity * 0.5};`"></div>
        </div>
        <div class="ball-pulse">
            <BallPulse v-if="showBallPulse" :color="color" :size="15"></BallPulse>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { Header, HeaderStatus } from '../header'
import CircularProgress from '../../icon/CircularProgress.vue'
import BallPulse from '../../icon/BallPulse.vue'

@Component({
    components: {
        CircularProgress,
        BallPulse,
    },
})
export default class BezierBounceHeader extends Vue implements Header {
    // 完成延时
    @Prop({default: 1000})
    private finishDuration!: number
    // 颜色
    @Prop({default: '#ffffff'})
    private color!: string
    // 背景颜色
    @Prop({default: '#2196f3'})
    private bgColor!: string

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
    private reboundInterval!: number | undefined
    // 小球边距
    private ballMargin: number = 10
    // 小球透明度
    private ballOpacity: number = 0
    // 显示小球脉冲
    private showBallPulse: boolean = false

    // 初始化
    public mounted() {
        this.canvasBox = this.$refs['er-bbh-canvas'] as HTMLElement
        this.drawCanvas()
    }
    // 销毁之前
    public beforeDestory() {
        this.startRebound()
    }

    public headerFinishDuration(): number {
        return this.finishDuration;
    }

    public isHeaderFloat(): boolean {
        return false;
    }

    public onRefreshClose(): void {
        this.headerStatus = HeaderStatus.NO_REFRESH
        this.drawCanvas()
        this.showBallPulse = false
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
        // 开始回弹
        this.startRebound()
        this.ballMargin = 10
        this.showBallPulse = true
    }

    public refreshHeight(): number {
        return this.defaultHeight;
    }

    public updateHeaderHeight(height: number): void {
        if (height > this.defaultHeight) {
            this.headerHeight = height
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
            this.ballMargin = 10 + (this.headerHeight - this.defaultHeight) / 10
            this.ballMargin = this.ballMargin < 20 ? this.ballMargin : 20
            this.ballOpacity = (this.ballMargin - 10 ) / 10
        }
        if (this.reboundValue !== 0) {
            this.drawRebound()
        }
        this.canvasBox.appendChild(this.canvasDom)
    }

    // 创建Canvas
    private createCanvas() {
        // 删除之前的Canvas
        if (this.canvasDom && this.canvasBox.children.length > 0) {
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
            (this.canvasDom.height * 2 - this.defaultHeight) * 0.95,
            this.canvasDom.width, this.defaultHeight)
        this.canvas.fill()
    }
    // 绘制回弹弧度
    private drawRebound() {
        // 曲线高度值
        let curveHeight = 0
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
            this.canvasDom.height - curveHeight / 1.5,
            this.canvasDom.width, this.defaultHeight)
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
        this.reboundInterval = undefined
    }
}
</script>

<style scoped lang="scss">
    .er-bezier-bounce-header {
        position: relative;
        width: 100%;
        height: 0;
        background: transparent;
        .er-bbh-canvas {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: -1;
        }
        .ball-box {
            position: absolute;
            width: 100%;
            height: 80px;
            top: 0;
            display: flex;
            justify-content:center;
            align-items:Center;
            .ball {
                height: 15px;
                width: 15px;
                display: inline-block;
                border-radius: 50%;
            }
        }
        .ball-pulse {
            position: absolute;
            width: 100%;
            height: 80px;
            top: 0;
            display: flex;
            justify-content:center;
            align-items:Center;
        }
    }
</style>
