<template>
    <div class="er-ball-pulse-header" :style="'height: ' + headerHeight + 'px;'">
        <BallPulse :color="color"></BallPulse>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Header } from '../header'
import BallPulse from '../../icon/BallPulse.vue'

@Component({
    components: {
        BallPulse,
    },
})
export default class BallPulseHeader extends Vue implements Header {
    // 高度
    @Prop({default: 70})
    private height!: number
    // 完成延时
    @Prop({default: 1000})
    private finishDuration!: number
    // 颜色
    @Prop({default: '#2196f3'})
    private color!: string

    // Header的高度
    private headerHeight: number = 70.0

    // 初始化
    public mounted() {
        // 初始化高度
        this.headerHeight = this.height
    }

    public headerFinishDuration(): number {
        return this.finishDuration;
    }

    public isHeaderFloat(): boolean {
        return false;
    }

    public onRefreshClose(): void {
        // todo nothing
    }

    public onRefreshEnd(): void {
        // todo nothing
    }

    public onRefreshReady(): void {
        // todo nothing
    }

    public onRefreshRestore(): void {
        // todo nothing
    }

    public onRefreshStart(): void {
        // todo nothing
    }

    public onRefreshed(): void {
        // todo nothing
    }

    public onRefreshing(): void {
        // todo nothing
    }

    public refreshHeight(): number {
        return this.height;
    }

    public updateHeaderHeight(height: number): void {
        if (height > this.height) {
            this.headerHeight = height
        } else {
            this.headerHeight = this.height
        }
    }
}
</script>

<style scoped>
    .er-ball-pulse-header {
        width: 100%;
        height: 0;
        background: transparent;
        display: flex;
        justify-content:center;
        align-items:Center;
    }
</style>
