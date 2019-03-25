# Custom Header
## Example
The example uses TypeScript, so it extend the Header. Using JavaScript only needs to include the methods in the Header.
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

## Props Table
### Header
| Attribute Name     |     Attribute Explain     | Parameter Type | Requirement |
|---------|--------------------------|:-----:|:-----:|
| refreshHeight | Trigger Refresh Height | () => number | Required |
| headerFinishDuration | Refresh Complete Delay | () => number | Required |
| isHeaderFloat | Whether to float | (height: number) => bool | Required |
| updateHeaderHeight | Height Update Callback | () => void | Required |
| onRefreshStart | Start refresh callback | () => void | Required |
| onRefreshReady | Prepare to refresh the callback | () => void | Required |
| onRefreshRestore | Refresh Recovery Callback | () => void | Required |
| onRefreshing | Refreshing callbacks | () => void | Required |
| onRefreshed | Refresh Completion Callback | () => void | Required |
| onRefreshEnd | Refresh End Callback | () => void | Required |
| onRefreshClose | Refresh Close Callback | () => void | Required |

# Custom Footer
## Example
The example uses TypeScript, so it extend the Footer. Using JavaScript only needs to include the methods in the Footer.
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

## Props Table
### Footer
| Attribute Name     |     Attribute Explain     | Parameter Type | Requirement |
|---------|--------------------------|:-----:|:-----:|
| loadHeight | trigger load height | () => number | Required |
| FooterFinishDuration | Refresh Completion Delay | () => number | Required |
| isFooterFloat | Whether to float | (height: number) => bool | Required |
| updateFooterHeight | Height Update Callback | () => void | Required | Required |
| onLoadStart | Start loading callbacks | () => void | Required |
| onLoadReady | Prepare to load callbacks | () => void | Required |
| onLoadRestore | Load Recovery Callback | () => void | Required |
| onLoading | Loading callbacks | () => void | Required |
| onLoaded | Load completed callback | () => void | Required |
| onNoMore | No more callbacks | () => void | Required |
| onLoadEnd | Load End Callback | () => void | Required |
| onLoadClose | Load Close Callback | () => void | Required |

