<template>
    <div class="collapsible-app-bar-page">
        <!--背景-->
        <div class="collapsible-app-bar-background"></div>
        <!--AppBar-->
        <div class="collapsible-app-bar" :class="{ 'elevation-3': showAppBarElevation }">
            <div class="collapsible-app-bar-back" @click="goBack">
                <div class="collapsible-app-bar-back-icon">
                    <v-btn text icon color="black">
                        <v-icon color="black">arrow_back</v-icon>
                    </v-btn>
                </div>
            </div>
            <div class="collapsible-app-bar-title" :style="`padding-top: ${titleTop}px;font-size: ${titleSize}pt;`">
                {{$t('sample.collapsibleAppBar')}}
            </div>
            <div v-if="progressValue !== 0" class="collapsible-app-bar-progress">
                <CircularProgress color="black" :value="progressValue"></CircularProgress>
            </div>
        </div>
        <div class="collapsible-app-bar-list">
            <EasyRefresh
                    ref="easyRefresh"
                    :userSelect="false"
                    :onRefresh="onRefresh"
                    :loadMore="loadMore"
                    :onScroll="onScroll">
                <template v-slot:header>
                    <EmptyHeader/>
                </template>
                <!--AppBar折叠部分-->
                <div class="collapsible-app-bar-content"></div>
                <StripeList :count="itemCount"/>
                <template v-slot:footer>
                    <ClassicsFooter
                            :loadText="$t('comm.pushToLoad')"
                            :loadReadyText="$t('comm.releaseToLoad')"
                            :loadingText="$t('comm.loading')"
                            :noMoreText="$t('comm.noMore')"
                            :loadedText="$t('comm.loadFinish')"
                            :moreInfo="$t('comm.updateAt')"
                            :showMore="true"/>
                </template>
            </EasyRefresh>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import AppBar from '../../components/AppBar.vue'
    import StripeList from '../../components/StripeList.vue'
    import {Header, HeaderStatus} from '@/components/header/header'
    import EasyRefresh from '@/components/EasyRefresh'
    import CircularProgress from '@/components/icon/CircularProgress.vue'

    /**
     * 折叠AppBar
     */
    @Component({
        components: {
            AppBar,
            StripeList,
            CircularProgress,
        },
    })
    export default class CollapsibleAppBarPage extends Vue implements Header {
        // EasyRefresh
        private easyRefresh!: EasyRefresh

        // 显示AppBar阴影
        private showAppBarElevation: boolean = false
        // 标题偏移量
        private titleTop: number = 128
        // 标题字体大小
        private titleSize: number = 20

        // Header的高度
        private defaultHeight: number = 100
        private headerHeight: number = this.defaultHeight
        // Header状态
        private headerStatus: HeaderStatus = HeaderStatus.NO_REFRESH
        // 进度值
        private progressValue: number | null = 0

        // 条目数量
        private itemCount: number = 20

        public headerFinishDuration(): number {
            return 1000;
        }

        public isHeaderFloat(): boolean {
            return true;
        }

        public onRefreshClose(): void {
            this.headerStatus = HeaderStatus.NO_REFRESH
            this.progressValue = 0
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
                }
            } else {
                this.headerHeight = this.defaultHeight
                if (this.headerStatus === HeaderStatus.REFRESH_START ||
                    this.headerStatus === HeaderStatus.NO_REFRESH ||
                    this.headerStatus === HeaderStatus.REFRESH_READY) {
                    this.progressValue = height / this.defaultHeight * 0.75
                    if (this.progressValue < 0.01) {
                        this.progressValue = 0
                    }
                }
            }
        }

        // 初始化
        private mounted() {
            this.easyRefresh = this.$refs.easyRefresh as EasyRefresh
            this.easyRefresh.setHeader(this)
        }

        // 刷新
        private onRefresh(done: () => void) {
            setTimeout(() => {
                this.itemCount = 20
                done()
            }, 1000)
        }
        // 加载更多
        private loadMore(done: (noMore: boolean) => void) {
            setTimeout(() => {
                if (this.itemCount >= 40) {
                    done(true)
                } else {
                    this.itemCount += 10
                    done(false)
                }
            }, 1000)
        }
        // 监听列表滚动
        private onScroll(top: number) {
            if (top > 120) {
                this.showAppBarElevation = true
                this.titleTop = 18
                this.titleSize = 14
            } else {
                this.showAppBarElevation = false
                const topTmp = 128 - 110 / 120 * top
                this.titleTop = topTmp < 128 ? topTmp : 128
                const sizeTmp = 20 - 6 / 120 * top
                this.titleSize = sizeTmp < 20 ? sizeTmp : 20
            }
        }
        // 返回
        private goBack() {
            this.$router.back()
        }
    }
</script>

<style lang="scss">
    .collapsible-app-bar-page {
        width: 100%;
        height: 100%;
        .collapsible-app-bar-background {
            position: fixed;
            width: 100%;
            height: 65px;
            background: #ff9800;
        }
        .collapsible-app-bar {
            position: fixed;
            width: 100%;
            height: 60px;
            z-index: 1000;
            background: #ff9800;
            .collapsible-app-bar-back {
                display: inline-block;
                vertical-align: top;
                width: 60px;
                height: 60px;
                .collapsible-app-bar-back-icon {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: Center;
                }
            }
            .collapsible-app-bar-title {
                display: inline-block;
                margin-left: 15px;
                margin-right: 15px;
            }
            .collapsible-app-bar-progress {
                float: right;
                vertical-align: top;
                display: flex;
                justify-content: center;
                align-items: Center;
                width: 60px;
                height: 60px;
            }
        }
        .collapsible-app-bar-list {
            width: 100%;
            height: calc(100% - 60px);
            margin-top: 60px;
            z-index: 1000;
            .collapsible-app-bar-content {
                width: 100%;
                height: 120px;
                background: #ff9800;
                z-index: 1000;
            }
        }
    }
</style>

