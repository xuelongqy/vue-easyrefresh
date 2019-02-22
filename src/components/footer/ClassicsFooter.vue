<template>
    <div ref="footer" class="er-classics-footer" :style="'height: ' + footerHeight + 'px;' + 'background-color: ' + bgColor + ';'">
        <!--图标-->
        <span class="er-classics-footer-flex er-classics-footer-icon">
            <CircularProgress v-if="footerStatus === 4" :color="textColor"></CircularProgress>
            <Done v-else-if="footerStatus === 5 || footerStatus === 6" :color="textColor" class="er-classics-footer-done-icon"></Done>
            <Arrow v-else direction="up" :color="textColor" :rotate="rotateArrow" class="er-classics-footer-arrow-icon"></Arrow>
        </span>
        <!--文字-->
        <span :style="'color: ' + textColor + ';'" class="er-classics-footer-flex er-classics-footer-content">{{showText}}</span>
        <span class="er-classics-footer-flex"></span>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import {Footer, FooterStatus} from './footer'
import Arrow from '../icon/Arrow.vue'
import Done from '../icon/Done.vue'
import CircularProgress from '../icon/CircularProgress.vue'

@Component({
    components: {
        Arrow,
        Done,
        CircularProgress,
    },
})
export default class ClassicsFooter extends Vue implements Footer {
    // 提示加载文字
    @Prop({default: 'Push to load'})
    private loadText!: string
    // 准备加载文字
    @Prop({default: 'Release to load'})
    private loadReadyText!: string
    // 正在加载文字
    @Prop({default: 'Loading...'})
    private loadingText!: string
    // 没有更多文字
    @Prop({default: 'No more'})
    private noMoreText!: string
    // 加载完成文字
    @Prop({default: 'Load finished'})
    private loadedText!: string
    // 背景颜色
    @Prop({default: 'transparent'})
    private bgColor!: string
    // 字体颜色
    @Prop({default: '#616161'})
    private textColor!: string

    // 显示文字
    private showText = this.loadText

    // Footer的高度
    private defaultFooterHeight: number = 70
    private footerHeight: number = this.defaultFooterHeight
    // 旋转箭头
    private rotateArrow: boolean = false
    // Header状态
    private footerStatus: FooterStatus = FooterStatus.NO_LOAD

    // 初始化
    public mounted() {
        // 初始化显示文字
        this.showText = this.loadText
    }

    // 加载高度
    public loadHeight(): number {
        return this.defaultFooterHeight
    }
    // 加载完成延时
    public finishDuration(): number {
        return 1000
    }

    public onLoadClose(): void {
        this.showText = this.loadText
        this.footerStatus = FooterStatus.NO_LOAD
    }
    public onLoadEnd(): void {
        this.showText = this.loadedText
        this.footerStatus = FooterStatus.LOADEND
    }
    public onLoadReady(): void {
        this.rotateArrow = true
        this.showText = this.loadReadyText
        this.footerStatus = FooterStatus.LOAD_READY
    }
    public onLoadRestore(): void {
        this.rotateArrow = false
        this.showText = this.loadText
        this.footerStatus = FooterStatus.NO_LOAD
    }
    public onLoadStart(): void {
        this.rotateArrow = false
        this.showText = this.loadText
        this.footerStatus = FooterStatus.LOAD_START
    }
    public onLoaded(): void {
        this.rotateArrow = false
        this.showText = this.loadedText
        this.footerStatus = FooterStatus.LOADED
    }
    public onLoading(): void {
        this.showText = this.loadingText
        this.footerStatus = FooterStatus.LOADING
    }
    public onNoMore(): void {
        this.showText = this.noMoreText
        this.footerStatus = FooterStatus.LOADED
    }
    public updateFooterHeight(height: number): void {
        if (height > this.defaultFooterHeight) {
            this.footerHeight = height
        } else {
            this.footerHeight = this.defaultFooterHeight
        }
    }
}
</script>

<style lang="scss">
    .er-classics-footer {
        width: 100%;
        display: flex;
        justify-content:center;
        align-items:Center;
        .er-classics-footer-flex {
            flex: 1;
        }
        .er-classics-footer-icon {
            display: flex;
            justify-content:flex-end;
            align-items:Center;
            .er-classics-footer-arrow-icon, .er-classics-footer-done-icon {
                height: 24px;
                width: 24px;
                margin-right: 10px;
                font-size: 24px;
                align-self:flex-end;
            }
        }
        .er-classics-footer-content {
            display: flex;
            justify-content:center;
            align-items:Center;
        }
    }
</style>
