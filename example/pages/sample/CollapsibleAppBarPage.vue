<template>
    <div class="collapsible-app-bar-page">
        <!--背景-->
        <div class="collapsible-app-bar-background"></div>
        <!--AppBar-->
        <div class="collapsible-app-bar">
            <div class="collapsible-app-bar-back" @click="goBack">
                <div class="collapsible-app-bar-back-icon">
                    <v-btn text icon color="black">
                        <v-icon color="black">arrow_back</v-icon>
                    </v-btn>
                </div>
            </div>
        </div>
        <div class="collapsible-app-bar-list">
            <EasyRefresh
                    ref="easyRefresh"
                    :userSelect="false"
                    :onRefresh="onRefresh"
                    :loadMore="loadMore">
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
    import {Header} from '@/components/header/header'
    import EasyRefresh from '@/components/EasyRefresh.vue'

    /**
     * 折叠AppBar
     */
    @Component({
        components: {
            AppBar,
            StripeList,
            Header
        },
    })
    export default class CollapsibleAppBarPage extends Vue implements Header {
        // EasyRefresh
        private easyRefresh!: EasyRefresh

        // 条目数量
        private itemCount: number = 20

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
        // 返回
        private goBack() {
            this.$router.back()
        }

        headerFinishDuration(): number {
            return 1000;
        }

        isHeaderFloat(): boolean {
            return true;
        }

        onRefreshClose(): void {
        }

        onRefreshEnd(): void {
        }

        onRefreshReady(): void {
        }

        onRefreshRestore(): void {
        }

        onRefreshStart(): void {
        }

        onRefreshed(): void {
        }

        onRefreshing(): void {
        }

        refreshHeight(): number {
            return 0;
        }

        updateHeaderHeight(height: number): void {
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
            height: 160px;
            background: #ff9800;
        }
        .collapsible-app-bar {
            width: 100%;
            height: 60px;
            z-index: 1000;
            background: #ff9800;
            .collapsible-app-bar-back {
                display: inline-block;
                vertical-align: text-top;
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
        }
        .collapsible-app-bar-list {
            width: 100%;
            height: calc(100% - 60px);
            .collapsible-app-bar-content {
                width: 100%;
                height: 120px;
                background: #ff9800;
                z-index: 1000;
            }
        }
    }
</style>

