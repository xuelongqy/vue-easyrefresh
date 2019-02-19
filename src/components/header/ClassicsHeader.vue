<template>
    <div ref="header" class="er-classics-header" :style="'height: ' + headerHeight + 'px;'">
        <!--图标-->
        <span class="er-classics-header-flex er-classics-header-icon">
            <Arrow class="er-classics-header-arrow-icon"></Arrow>
        </span>
        <!--文字-->
        <span class="er-classics-header-flex er-classics-header-content">上拉刷新</span>
        <span class="er-classics-header-flex"></span>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Header } from './header'
import Arrow from '../icon/Arrow.vue'

@Component({
    components: {
        Arrow,
    },
})
export default class ClassicsHeader extends Vue implements Header {
    // Header的高度
    private headerHeight: number = 70.0

    // 刷新高度
    public refreshHeight(): number {
        return 70;
    }
    // 完成延时
    public finishDuration(): number {
        return 1000;
    }

    public onRefreshClose(): void {
        console.log('onRefreshClose')
    }
    public onRefreshEnd(): void {
        console.log('onRefreshEnd')
    }
    public onRefreshReady(): void {
        console.log('onRefreshReady')
    }
    public onRefreshRestore(): void {
        console.log('onRefreshRestore')
    }
    public onRefreshStart(): void {
        console.log('onRefreshStart')
    }
    public onRefreshed(): void {
        console.log('onRefreshed')
    }
    public onRefreshing(): void {
        console.log('onRefreshing')
    }
    public updateHeaderHeight(height: number): void {
        // if (height > this.refreshHeight()) {
        //     this.headerHeight = height
        // }else {
        //     this.headerHeight = this.refreshHeight()
        // }
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
            .er-classics-header-arrow-icon {
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
        }
    }
</style>
