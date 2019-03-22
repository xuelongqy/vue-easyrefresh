<template>
    <div class="er-material-header" :style="'height: ' + headerHeight + 'px;'">
        <div class="er-material-header-circle-card" :style="'transform: rotate(' + rotateValue + 'deg);' + 'background: ' + bgColor + ';'">
            <CircularProgress :color="color" :value="progressValue"></CircularProgress>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Header, HeaderStatus } from '../header'
import CircularProgress from '../../icon/CircularProgress.vue'

@Component({
    components: {
        CircularProgress,
    },
})
export default class MaterialHeader extends Vue implements Header {
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
    private headerHeight: number = this.defaultHeight
    // 进度值
    private progressValue: number | null = 0
    // 旋转度
    private rotateValue: number = 0
    // Header状态
    private headerStatus: HeaderStatus = HeaderStatus.NO_REFRESH

    public headerFinishDuration(): number {
        return this.finishDuration;
    }

    public isHeaderFloat(): boolean {
        return true;
    }

    public onRefreshClose(): void {
        this.headerStatus = HeaderStatus.NO_REFRESH
    }

    public onRefreshEnd(): void {
        this.headerStatus = HeaderStatus.REFRESH_END
        this.progressValue = 1
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
    }

    public onRefreshing(): void {
        this.headerStatus = HeaderStatus.REFRESHING
        this.progressValue = null
        this.rotateValue = 0
    }

    public refreshHeight(): number {
        return this.defaultHeight;
    }

    public updateHeaderHeight(height: number): void {
        if (height > this.defaultHeight) {
            this.headerHeight = height
            if (this.headerStatus === HeaderStatus.REFRESH_START ||
                this.headerStatus === HeaderStatus.NO_REFRESH ||
                this.headerStatus === HeaderStatus.REFRESH_READY) {
                this.progressValue = 0.75
                this.rotateValue = 90
            }
        } else {
            this.headerHeight = this.defaultHeight
            if (this.headerStatus === HeaderStatus.REFRESH_START ||
                this.headerStatus === HeaderStatus.NO_REFRESH ||
                this.headerStatus === HeaderStatus.REFRESH_READY) {
                this.progressValue = height / this.defaultHeight * 0.75
                this.rotateValue = 90 * height / this.defaultHeight
            }
        }
    }

}
</script>

<style lang="scss">
    .er-material-header {
        width: 100%;
        height: 0;
        background: transparent;
        .er-material-header-circle-card {
            position: absolute;
            display: flex;
            justify-content:center;
            align-items:Center;
            bottom: 5px;
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
