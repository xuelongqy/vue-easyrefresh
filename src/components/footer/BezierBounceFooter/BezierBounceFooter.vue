<template>
    <div class="er-bezier-bounce-footer" :style="'height: ' + footerHeight + 'px;'">
        <div ref="er-bbf-canvas" class="er-bbf-canvas"></div>
        <div v-if="!noMore" class="er-bbf-background" :style="'background: ' + bgColor + ';'"></div>
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
import { Component, Watch, Prop, Vue } from 'vue-property-decorator'
import { Footer, FooterStatus } from '../footer'
import BallPulse from '../../icon/BallPulse.vue'

@Component({
    components: {
        BallPulse,
    },
})
export default class BezierBounceFooter extends Vue implements Footer {
    // 完成延时
    @Prop({default: 1000})
    private finishDuration!: number
    // 颜色
    @Prop({default: '#ffffff'})
    private color!: string
    // 背景颜色
    @Prop({default: '#2196f3'})
    private bgColor!: string

    // Footer的高度
    private defaultHeight: number = 80
    private footerHeight: number = this.defaultHeight
    // Footer状态
    private footerStatus: FooterStatus = FooterStatus.NO_LOAD

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
    // 没有更多
    private noMore: boolean = false

    // 初始化
    public mounted() {
        this.canvasBox = this.$refs['er-bbf-canvas'] as HTMLElement
        this.drawCanvas()
    }
    // 销毁之前
    public beforeDestory() {
        this.startRebound()
    }

    public footerFinishDuration(): number {
        return this.finishDuration;
    }

    public isFooterFloat(): boolean {
        return false;
    }

    public loadHeight(): number {
        return this.defaultHeight;
    }

    public onLoadClose(): void {
        this.footerStatus = FooterStatus.NO_LOAD
        this.drawCanvas()
        this.showBallPulse = false
        this.noMore = false
    }

    public onLoadEnd(): void {
        this.footerStatus = FooterStatus.LOAD_END
    }

    public onLoadReady(): void {
        this.footerStatus = FooterStatus.LOAD_READY
    }

    public onLoadRestore(): void {
        this.footerStatus = FooterStatus.LOAD_START
    }

    public onLoadStart(): void {
        this.footerStatus = FooterStatus.LOAD_START
        this.noMore = false
    }

    public onLoaded(): void {
        this.footerStatus = FooterStatus.LOADED
    }

    public onLoading(): void {
        this.footerStatus = FooterStatus.LOADING
        // 开始回弹
        this.startRebound()
        this.ballMargin = 10
        this.showBallPulse = true
    }

    public onNoMore(): void {
        this.footerStatus = FooterStatus.LOADED
        this.noMore = true
    }

    public updateFooterHeight(height: number): void {
        if (height < 1 && this.noMore) {
            this.createCanvas()
            this.showBallPulse = false
        }
        if (height > this.defaultHeight) {
            this.footerHeight = height
        } else {
            this.footerHeight = this.defaultHeight
        }
    }

    // 上拉Canvas绘制
    @Watch('footerHeight')
    private drawCanvas() {
        if (this.noMore) { return }
        this.createCanvas()
        this.drawBackground()
        if ((this.footerStatus === FooterStatus.NO_LOAD ||
            this.footerStatus === FooterStatus.LOAD_READY)
            && this.footerHeight >= this.defaultHeight) {
            this.drawBackground()
            this.drawPullRadian()
            this.ballMargin = 10 + (this.footerHeight - this.defaultHeight) / 10
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
        this.canvas.fillRect(0, this.canvasDom.height - this.defaultHeight, this.canvasDom.width, this.canvasDom.height)
    }
    // 绘制上拉弧度
    private drawPullRadian() {
        this.canvas.fillStyle = this.bgColor
        this.canvas.beginPath()
        this.canvas.moveTo(0, this.canvasDom.height - this.defaultHeight)
        this.canvas.quadraticCurveTo(this.canvasDom.width / 2,
            (this.defaultHeight - this.canvasDom.height) * 0.95,
            this.canvasDom.width, this.canvasDom.height - this.defaultHeight)
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
        this.canvas.moveTo(0, 0)
        this.canvas.quadraticCurveTo(this.canvasDom.width / 2,
            curveHeight / 1.5,
            this.canvasDom.width, 0)
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
    .er-bezier-bounce-footer {
        width: 100%;
        height: 0;
        background: transparent;
        .er-bbf-canvas {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: -1;
        }
        .er-bbf-background {
            position: absolute;
            width: 100%;
            height: 20px;
            bottom: 0;
        }
        .ball-box {
            position: absolute;
            width: 100%;
            height: 80px;
            bottom: 0;
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
            bottom: 0;
            display: flex;
            justify-content:center;
            align-items:Center;
        }
    }
</style>
