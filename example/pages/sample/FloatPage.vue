<template>
    <div class="sample-page">
        <AppBar :title="$t('sample.autoLoad')"/>
        <div class="sample-page-list">
            <EasyRefresh
                    :userSelect="false"
                    :onRefresh="onRefresh"
                    :loadMore="loadMore">
                <template v-slot:header>
                    <ClassicsHeader
                            bgColor="orange"
                            textColor="white"
                            moreInfoColor="white"
                            :refreshText="$t('comm.pullToRefresh')"
                            :refreshReadyText="$t('comm.releaseToRefresh')"
                            :refreshingText="$t('comm.refreshing')"
                            :refreshedText="$t('comm.refreshFinish')"
                            :moreInfo="$t('comm.updateAt')"
                            :showMore="true"
                            :isFloat="true"/>
                </template>
                <StripeList :count="itemCount"/>
                <template v-slot:footer>
                    <ClassicsFooter
                            bgColor="orange"
                            textColor="white"
                            moreInfoColor="white"
                            :loadText="$t('comm.pushToLoad')"
                            :loadReadyText="$t('comm.releaseToLoad')"
                            :loadingText="$t('comm.loading')"
                            :noMoreText="$t('comm.noMore')"
                            :loadedText="$t('comm.loadFinish')"
                            :moreInfo="$t('comm.updateAt')"
                            :showMore="true"
                            :isFloat="true"/>
                </template>
            </EasyRefresh>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import AppBar from '../../components/AppBar.vue'
    import StripeList from '../../components/StripeList.vue'

    /**
     * 浮动视图
     */
    @Component({
        components: {
            AppBar,
            StripeList,
        },
    })
    export default class FloatPage extends Vue {
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
