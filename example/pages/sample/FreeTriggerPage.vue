<template>
    <div class="free-trigger-page">
        <AppBar :title="$t('sample.freeTrigger')"/>
        <div class="free-trigger-list">
            <EasyRefresh
                    ref="easyRefresh"
                    :userSelect="false"
                    :onRefresh="onRefresh"
                    :loadMore="loadMore">
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
            </EasyRefresh>
        </div>
        <v-card class="free-trigger-btn-car">
            <v-layout row wrap>
                <v-flex xs6>
                    <v-btn text class="free-trigger-btn" @click.native="callRefresh">{{$t('comm.refresh')}}</v-btn>
                </v-flex>
                <v-flex xs6>
                    <v-btn text class="free-trigger-btn" @click="callLoadMore">{{$t('comm.loadMore')}}</v-btn>
                </v-flex>
            </v-layout>
        </v-card>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import AppBar from '../../components/AppBar.vue'
    import StripeList from '../../components/StripeList.vue'
    import EasyRefresh from '@/components/EasyRefresh'

    /**
     * 自由触发
     */
    @Component({
        components: {
            AppBar,
            StripeList,
        },
    })
    export default class FreeTriggerPage extends Vue {
        // EasyRefresh
        private easyRefresh!: EasyRefresh
        // 条目数量
        private itemCount: number = 20

        // 初始化
        private mounted() {
            this.easyRefresh = this.$refs.easyRefresh as EasyRefresh
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

        // 刷新
        private callRefresh() {
            this.easyRefresh.callRefresh()
        }

        // 加载
        private callLoadMore() {
            this.easyRefresh.callLoadMore()
        }
    }
</script>

<style lang="scss">
    .free-trigger-page {
        width: 100%;
        height: 100%;
        .free-trigger-list {
            width: 100%;
            height: calc(100% - 108px);
        }
        .free-trigger-btn-car {
            height: 48px;
            width: 100%;
            .free-trigger-btn {
                height: 48px;
                width: 100%;
                border-radius: 0;
            }
        }
    }
</style>
