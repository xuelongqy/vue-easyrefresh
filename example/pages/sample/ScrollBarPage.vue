<template>
    <div class="sample-page">
        <AppBar :title="$t('sample.scrollBar')"/>
        <div class="sample-page-list">
            <EasyRefresh
                    :userSelect="false"
                    :onRefresh="onRefresh"
                    :loadMore="loadMore"
                    :showScrollBar="true">
                <template v-slot:header>
                    <ClassicsHeader
                            :refreshText="$t('comm.pullToRefresh')"
                            :refreshReadyText="$t('comm.releaseToRefresh')"
                            :refreshingText="$t('comm.refreshing')"
                            :refreshedText="$t('comm.refreshFinish')"
                            :moreInfo="$t('comm.updateAt')"
                            :showMore="true"/>
                </template>
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
                <!--你也可以不用写这个slot,会有默认的样式-->
                <template v-slot:scrollbar>
                    <ClassicsScrollBar
                            color="rgba(0, 0, 0, 0.5)"
                            bgColor="transparent"
                            width="5"
                            radius="2"/>
                </template>
            </EasyRefresh>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import AppBar from '../../components/AppBar.vue'
    import StripeList from '../../components/StripeList.vue'
    import ClassicsScrollBar from '@/components/scrollbar/ClassicsScrollBar/ClassicsScrollBar.vue'

    /**
     * 滚动条
     */
    @Component({
        components: {
            AppBar,
            StripeList,
            ClassicsScrollBar,
        },
    })
    export default class BasicPage extends Vue {
        // 条目数量
        private itemCount: number = 20
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
    }
</script>

<style lang="scss">
    .sample-page {
        width: 100%;
        height: 100%;
        .sample-page-list {
            width: 100%;
            height: calc(100% - 60px);
        }
    }
</style>
