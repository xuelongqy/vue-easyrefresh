<template>
    <div class="er-ball-pulse-footer" :style="'height: ' + footerHeight + 'px;'">
        <BallPulse v-if="showBallPulse" :color="color"></BallPulse>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Footer } from '../footer'
import BallPulse from '../../icon/BallPulse.vue'

@Component({
    components: {
        BallPulse,
    },
})
export default class BallPulseFooter extends Vue implements Footer {
    // 高度
    @Prop({default: 70})
    private height!: number
    // 完成延时
    @Prop({default: 1000})
    private finishDuration!: number
    // 颜色
    @Prop({default: '#2196f3'})
    private color!: string

    // Footer的高度
    private footerHeight: number = 70
    // 没有更多
    private noMore: boolean = false
    // 显示球脉冲
    private showBallPulse: boolean = true

    // 初始化
    public mounted() {
        // 初始化高度
        this.footerHeight = this.height
    }

    public footerFinishDuration(): number {
        return this.finishDuration;
    }

    public isFooterFloat(): boolean {
        return false;
    }

    public loadHeight(): number {
        return this.height;
    }

    public onLoadClose(): void {
        this.noMore = false
    }

    public onLoadEnd(): void {
        // todo nothing
    }

    public onLoadReady(): void {
        // todo nothing
    }

    public onLoadRestore(): void {
        // todo nothing
    }

    public onLoadStart(): void {
        this.noMore = false
        this.showBallPulse = true
    }

    public onLoaded(): void {
        // todo nothing
    }

    public onLoading(): void {
        // todo nothing
    }

    public onNoMore(): void {
        this.noMore = true
    }

    public updateFooterHeight(height: number): void {
        if (height < 1 && this.noMore) {
            this.showBallPulse = false
        }
        if (height > this.height) {
            this.footerHeight = height
        } else {
            this.footerHeight = this.height
        }
    }
}
</script>

<style scoped>
    .er-ball-pulse-footer {
        width: 100%;
        height: 0;
        background: transparent;
        display: flex;
        justify-content:center;
        align-items:Center;
    }
</style>
