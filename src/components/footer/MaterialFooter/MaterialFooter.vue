<template>
    <div class="er-material-footer" :style="'height: ' + footerHeight + 'px;'">
        <div class="er-material-footer-circle-card" :style="'transform: rotate(' + rotateValue + 'deg);' + 'background: ' + bgColor + ';'">
            <CircularProgress :color="color" :value="progressValue"></CircularProgress>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Footer, FooterStatus } from '../footer'
import CircularProgress from '../../icon/CircularProgress.vue'

@Component({
    components: {
        CircularProgress,
    },
})
export default class MaterialFooter extends Vue implements Footer {
    // 完成延时
    @Prop({default: 1000})
    private finishDuration!: number
    // 颜色
    @Prop({default: '#2196f3'})
    private color!: string
    // 背景颜色
    @Prop({default: '#ffffff'})
    private bgColor!: string

    // Header的高度
    private defaultHeight: number = 100
    private footerHeight: number = this.defaultHeight
    // 进度值
    private progressValue: number | null = 0
    // 旋转度
    private rotateValue: number = 0
    // Footer状态
    private footerStatus: FooterStatus = FooterStatus.NO_LOAD

    public footerFinishDuration(): number {
        return this.finishDuration;
    }

    public isFooterFloat(): boolean {
        return true;
    }

    public loadHeight(): number {
        return this.defaultHeight;
    }

    public onLoadClose(): void {
        this.footerStatus = FooterStatus.NO_LOAD
    }

    public onLoadEnd(): void {
        this.footerStatus = FooterStatus.LOAD_END
        this.progressValue = 1
    }

    public onLoadReady(): void {
        this.footerStatus = FooterStatus.LOAD_READY
    }

    public onLoadRestore(): void {
        this.footerStatus = FooterStatus.LOAD_START
    }

    public onLoadStart(): void {
        this.footerStatus = FooterStatus.LOAD_START
    }

    public onLoaded(): void {
        this.footerStatus = FooterStatus.LOADED
        this.progressValue = 1
    }

    public onLoading(): void {
        this.footerStatus = FooterStatus.LOADING
        this.progressValue = null
        this.rotateValue = 0
    }

    public onNoMore(): void {
        this.footerStatus = FooterStatus.LOADED
        this.progressValue = 1
    }

    public updateFooterHeight(height: number): void {
        if (height > this.defaultHeight) {
            this.footerHeight = height
            if (this.footerStatus === FooterStatus.LOAD_START ||
                this.footerStatus === FooterStatus.NO_LOAD ||
                this.footerStatus === FooterStatus.LOAD_READY) {
                this.progressValue = 0.75
                this.rotateValue = 90
            }
        } else {
            this.footerHeight = this.defaultHeight
            if (this.footerStatus === FooterStatus.LOAD_START ||
                this.footerStatus === FooterStatus.NO_LOAD ||
                this.footerStatus === FooterStatus.LOAD_READY) {
                this.progressValue = height / this.defaultHeight * 0.75
                this.rotateValue = 90 * height / this.defaultHeight
            }
        }
    }

}
</script>

<style scoped lang="scss">
    .er-material-footer {
        width: 100%;
        height: 0;
        background: transparent;
        .er-material-footer-circle-card {
            position: absolute;
            display: flex;
            justify-content:center;
            align-items:Center;
            top: 5px;
            left: 0;
            right: 0;
            margin: 0 auto;
            height: 40px;
            width: 40px;
            border-radius: 50%;
            box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
            transform: rotate(-135deg);
        }
    }
</style>
