# 自定义Header
## 代码示例
示例使用了TypeScript，所以继承Header，使用JavaScript只需包含Header中的方法即可
~~~JavaScript
<template>
    <div class="er-empty-header" :style="'height: ' + headerHeight + 'px;'"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Header, HeaderStatus } from '../header'

@Component
export default class EmptyHeader extends Vue implements Header {
    @Prop({default: 70})
    private height!: number
    @Prop({default: 1000})
    private finishDuration!: number
    @Prop({default: false})
    private isFloat!: boolean

    private headerHeight: number = 70.0
    private headerStatus: HeaderStatus = HeaderStatus.NO_REFRESH
    public mounted() {
        this.headerHeight = this.height
    }
    public headerFinishDuration(): number {
        return this.finishDuration;
    }
    public isHeaderFloat(): boolean {
        return this.isFloat;
    }
    public onRefreshClose(): void {
        this.headerStatus = HeaderStatus.NO_REFRESH
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
    .er-empty-header {
        width: 100%;
        height: 0;
        background: transparent;
    }
</style>
~~~

## 属性表格
### Header
| 属性名称     |     属性描述     | 参数类型 | 要求 |
|---------|--------------------------|:-----:|:-----:|
| refreshHeight | 触发刷新高度     | () => number  | 必须 |
| headerFinishDuration      | 刷新完成延时     | () => number   |  必须 |
| isHeaderFloat | 是否浮动     | (height: number) => bool  | 必须 |
| updateHeaderHeight | 高度更新回调     | () => void | 必须 |
| onRefreshStart | 开始刷新回调     | () => void | 必须 |
| onRefreshReady | 准备刷新回调     | () => void | 必须 |
| onRefreshRestore | 刷新恢复回调     | () => void | 必须 |
| onRefreshing | 正在刷新回调     | () => void | 必须 |
| onRefreshed | 刷新完成回调     | () => void | 必须 |
| onRefreshEnd | 刷新结束回调     | () => void | 必须 |
| onRefreshClose | 刷新关闭回调     | () => void | 必须 |

# 自定义Footer
## 代码示例
示例使用了TypeScript，所以继承Footer，使用JavaScript只需包含Footer中的方法即可
~~~JavaScript
<template>
    <div class="er-empty-footer" :style="'height: ' + footerHeight + 'px;'"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Footer, FooterStatus } from '../footer'

@Component
export default class EmptyFooter extends Vue implements Footer {
    @Prop({default: 70})
    private height!: number
    @Prop({default: 1000})
    private finishDuration!: number
    @Prop({default: false})
    private isFloat!: boolean

    private footerHeight: number = 70
    private footerStatus: FooterStatus = FooterStatus.NO_LOAD

    public mounted() {
        this.footerHeight = this.height
    }
    public footerFinishDuration(): number {
        return this.finishDuration;
    }
    public isFooterFloat(): boolean {
        return this.isFloat;
    }
    public loadHeight(): number {
        return this.height;
    }
    public onLoadClose(): void {
        this.footerStatus = FooterStatus.NO_LOAD
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
    }
    public onLoaded(): void {
        this.footerStatus = FooterStatus.LOADED
    }
    public onLoading(): void {
        this.footerStatus = FooterStatus.LOADING
    }
    public onNoMore(): void {
        this.footerStatus = FooterStatus.LOADED
    }
    public updateFooterHeight(height: number): void {
        if (height > this.height) {
            this.footerHeight = height
        } else {
            this.footerHeight = this.height
        }
    }
}
</script>
<style scoped>
    .er-empty-footer {
        width: 100%;
        height: 0;
        background: transparent;
    }
</style>
~~~

## 属性表格
### Footer
| 属性名称     |     属性描述     | 参数类型 | 要求 |
|---------|--------------------------|:-----:|:-----:|
| loadHeight | 触发加载高度     | () => number  | 必须 |
| footerFinishDuration      | 刷新完成延时     | () => number   |  必须 |
| isFooterFloat | 是否浮动     | (height: number) => bool  | 必须 |
| updateFooterHeight | 高度更新回调     | () => void | 必须 |
| onLoadStart | 开始加载回调     | () => void | 必须 |
| onLoadReady | 准备加载回调     | () => void | 必须 |
| onLoadRestore | 加载恢复回调     | () => void | 必须 |
| onLoading | 正在加载回调     | () => void | 必须 |
| onLoaded | 加载完成回调     | () => void | 必须 |
| onNoMore | 没有更多回调     | () => void | 必须 |
| onLoadEnd | 加载结束回调     | () => void | 必须 |
| onLoadClose | 加载关闭回调     | () => void | 必须 |

