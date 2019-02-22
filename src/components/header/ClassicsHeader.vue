<template>
    <div ref="header" class="er-classics-header" :style="'height: ' + headerHeight + 'px;' + 'background-color: ' + bgColor + ';'">
        <!--图标-->
        <span class="er-classics-header-flex er-classics-header-icon">
            <CircularProgress v-if="headerStatus === 4" :color="textColor"></CircularProgress>
            <Done v-else-if="headerStatus === 5 || headerStatus === 6" :color="textColor" class="er-classics-header-done-icon"></Done>
            <Arrow v-else :color="textColor" :rotate="rotateArrow" class="er-classics-header-arrow-icon"></Arrow>
        </span>
        <!--文字-->
        <span :style="'color: ' + textColor + ';'" class="er-classics-header-flex er-classics-header-content">{{showText}}</span>
        <span class="er-classics-header-flex"></span>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Header, HeaderStatus } from './header'
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
export default class ClassicsHeader extends Vue implements Header {
    // 提示刷新文字
    @Prop({default: 'Pull to refresh'})
    private refreshText!: string
    // 准备刷新文字
    @Prop({default: 'Release to refresh'})
    private refreshReadyText!: string
    // 正在刷新文字
    @Prop({default: 'Refreshing...'})
    private refreshingText!: string
    // 刷新完成文字
    @Prop({default: 'Refresh finished'})
    private refreshedText!: string
    // 背景颜色
    @Prop({default: 'transparent'})
    private bgColor!: string
    // 字体颜色
    @Prop({default: '#616161'})
    private textColor!: string

    // 显示文字
    private showText = this.refreshText
    // Header的高度
    private defaultHeaderHeight: number = 70
    private headerHeight: number = this.defaultHeaderHeight
    // 旋转箭头
    private rotateArrow: boolean = false
    // Header状态
    private headerStatus: HeaderStatus = HeaderStatus.NO_REFRESH

    // 初始化
    public mounted() {
        // 初始化显示文字
        this.showText = this.refreshText
    }

    // 刷新高度
    public refreshHeight(): number {
        return 70
    }
    // 完成延时
    public finishDuration(): number {
        return 1000
    }

    public onRefreshClose(): void {
        this.showText = this.refreshText
        this.headerStatus = HeaderStatus.NO_REFRESH
    }
    public onRefreshEnd(): void {
        this.showText = this.refreshedText
        this.headerStatus = HeaderStatus.REFRESHEND
    }
    public onRefreshReady(): void {
        this.rotateArrow = true
        this.showText = this.refreshReadyText
        this.headerStatus = HeaderStatus.REFRESH_READY
    }
    public onRefreshRestore(): void {
        this.rotateArrow = false
        this.showText = this.refreshText
        this.headerStatus = HeaderStatus.NO_REFRESH
    }
    public onRefreshStart(): void {
        this.rotateArrow = false
        this.showText = this.refreshText
        this.headerStatus = HeaderStatus.REFRESH_START
    }
    public onRefreshed(): void {
        this.rotateArrow = false
        this.showText = this.refreshedText
        this.headerStatus = HeaderStatus.REFRESHED
    }
    public onRefreshing(): void {
        this.showText = this.refreshingText
        this.headerStatus = HeaderStatus.REFRESHING
    }
    public updateHeaderHeight(height: number): void {
        if (height > this.defaultHeaderHeight) {
            this.headerHeight = height
        } else {
            this.headerHeight = this.defaultHeaderHeight
        }
    }
}
</script>

<style lang="scss">
    .er-classics-header {
        width: 100%;
        display: flex;
        justify-content:center;
        align-items:Center;
        .er-classics-header-flex {
            flex: 1;
        }
        .er-classics-header-icon {
            display: flex;
            justify-content:flex-end;
            align-items:Center;
            .er-classics-header-arrow-icon, .er-classics-header-done-icon {
                height: 24px;
                width: 24px;
                margin-right: 10px;
                font-size: 24px;
                align-self:flex-end;
            }
        }
        .er-classics-header-content {
            display: flex;
            justify-content:center;
            align-items:Center;
            font-size: 14px;
        }
    }
</style>
