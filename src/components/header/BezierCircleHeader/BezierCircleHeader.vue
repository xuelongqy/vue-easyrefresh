<template>
    <div class="er-bezier-circle-header" :style="'height: ' + headerHeight + 'px;'">
        <div ref="er-bch-canvas" class="er-bch-canvas"></div>
        <div class="er-bch-progress">
            <CircularProgress v-if="showProgress" :color="color" :value="progressValue" size="middle"></CircularProgress>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { Header, HeaderStatus } from '../header'
import CircularProgress from '../../icon/CircularProgress.vue'

@Component({
    components: {
        CircularProgress,
    },
})
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

    // Header的高度
    private defaultHeight: number = 80
    private headerHeight: number = this.defaultHeight
    // Header状态
    private headerStatus: HeaderStatus = HeaderStatus.NO_REFRESH

    // Canvas
    private canvasBox!: HTMLElement
    private canvasDom!: HTMLCanvasElement
    private canvas!: CanvasRenderingContext2D
    // 进度值
    private progressValue: number | null = 0
    private showProgress: boolean = false
    // 回弹值
    private reboundValue: number = 0
    private reboundInterval!: number | undefined
    // 弹出圆圈值
    private reboundCircleValue: number = 0
    // 弹出水滴值
    private reboundWaterValue: number = 0
    // 圆圈的半径
    private circleR: number = 13
    // 下落值
    private dropValue: number = 0
    private dropInterval!: number | undefined

    // 初始化
    public mounted() {
        this.canvasBox = this.$refs['er-bch-canvas'] as HTMLElement
        this.drawCanvas()
    }
    // 销毁之前
    public beforeDestory() {
        this.startRebound()
        this.stopDrop()
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
        this.progressValue = 0
        this.showProgress = false
        this.drawCanvas()
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
        this.progressValue = 1
        this.showProgress = true
        // 开始下落
        setTimeout(() => {
            this.startDrop()
            this.reboundCircleValue = 0
            this.reboundWaterValue = 0
            this.progressValue = 0
            this.showProgress = false
        }, 200)
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
        if (this.reboundWaterValue !== 0) {
            this.drawWater()
        }
        if (this.dropValue !== 0) {
            this.drawDrop()
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
        // 计算弹出水滴值
        this.reboundWaterValue = this.defaultHeight - this.reboundCircleValue
    }
    // 绘制弹出的圆圈
    private drawCircle() {
        this.canvas.fillStyle = this.color
        const circleX = this.canvasDom.width / 2
        const circleY = this.reboundCircleValue
        this.canvas.beginPath();
        this.canvas.arc(circleX, circleY, this.circleR, 0 , 2 * Math.PI)
        this.canvas.fill()
    }
    // 绘制弹出de水滴
    private drawWater() {
        this.canvas.fillStyle = this.color
        if (this.reboundWaterValue < this.circleR) {
            // 计算宽度和高度
            const width = this.circleR * 4 - (this.defaultHeight - this.reboundWaterValue) * 3
            const height = this.reboundWaterValue + this.circleR
            // 计算x和y
            const curveX = (this.canvasDom.width - width) / 2
            const curveY = this.canvasDom.height - height * 2
            this.canvas.beginPath()
            this.canvas.moveTo(curveX, this.defaultHeight)
            this.canvas.quadraticCurveTo(this.canvasDom.width / 2,
                curveY,
                curveX + width, this.defaultHeight)
            this.canvas.fill()
        } else if (this.reboundWaterValue < this.circleR * 2) {
            // 计算高度和宽度
            const width = this.circleR * 2 - this.reboundWaterValue
            const height = this.reboundWaterValue
            // 计算x和y
            const curveX = (this.canvasDom.width - width) / 2
            const curveY = this.canvasDom.height - height / 2
            this.canvas.beginPath()
            this.canvas.moveTo(this.canvasDom.width / 2 - this.circleR, this.defaultHeight - this.reboundWaterValue)
            this.canvas.quadraticCurveTo(curveX + this.circleR - width / 2,
                curveY,
                this.canvasDom.width / 2 - this.circleR, this.defaultHeight)
            this.canvas.lineTo(this.canvasDom.width / 2 + this.circleR, this.defaultHeight)
            this.canvas.quadraticCurveTo(curveX + width - (this.circleR - width / 2),
                curveY,
                this.canvasDom.width / 2 + this.circleR, this.defaultHeight - this.reboundWaterValue)
            this.canvas.fill()
        } else if (this.reboundWaterValue < this.circleR * 3) {
            // 计算高度和宽度
            const width = this.circleR + this.reboundWaterValue - this.circleR * 2
            const height = this.reboundWaterValue - this.circleR * 2
            // 计算x和y
            const curveX = (this.canvasDom.width - width) / 2
            const curveY = this.canvasDom.height - height
            this.canvas.beginPath()
            this.canvas.moveTo(curveX, this.defaultHeight)
            this.canvas.quadraticCurveTo(this.canvasDom.width / 2,
                curveY,
                curveX + width, this.defaultHeight)
            this.canvas.fill()
        }
    }
    // 绘制下落
    private drawDrop() {
        this.canvas.fillStyle = this.color
        const circleX = this.canvasDom.width / 2
        const circleY = this.canvasDom.height / 2 + this.dropValue
        this.canvas.beginPath();
        this.canvas.arc(circleX, circleY, this.circleR, 0 , 2 * Math.PI)
        this.canvas.fill()
    }

    // 开始回弹
    private startRebound() {
        this.reboundInterval = setInterval(() => {
            if (this.reboundValue >= this.defaultHeight * 3) {
                this.stopRebound()
                this.reboundValue = 0
                this.progressValue = null
                this.showProgress = true
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
    // 开始下落
    private startDrop() {
        this.dropInterval = setInterval(() => {
            if (this.dropValue >= this.defaultHeight / 2 + this.circleR) {
                this.stopDrop()
                this.dropValue = 0
                this.reboundWaterValue = 0
            } else {
                this.dropValue += 5
                // this.reboundWaterValue = this.defaultHeight / 2 + this.circleR - this.dropValue
                // if (this.reboundWaterValue < 0) {
                //     this.reboundWaterValue = 0
                // }
            }
            this.drawCanvas()
        }, 20)
    }
    // 结束下落
    private stopDrop() {
        clearInterval(this.dropInterval)
        this.dropInterval = undefined
    }
}
</script>

<style scoped lang="scss">
    .er-bezier-circle-header {
        position: relative;
        width: 100%;
        height: 0;
        background: transparent;
        .er-bch-canvas {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: -1;
        }
        .er-bch-progress {
            position: absolute;
            width: 100%;
            height: 80px;
            display: flex;
            justify-content:center;
            align-items:Center;
        }
    }
</style>
