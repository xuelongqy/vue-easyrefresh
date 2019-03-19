<template>
    <div class="basic-page">
        <AppBar :title="$t('sample.basicUse')"/>
        <div class="basic-page-list">
            <EasyRefresh
                :userSelect="false"
                :onRefresh="onRefresh"
                :loadMore="loadMore">
                <!--<template v-slot:header>-->
                    <!--<ClassicsHeader-->
                        <!--:refreshText="$t('comm.pullToRefresh')"-->
                        <!--:refreshReadyText="$t('comm.releaseToRefresh')"-->
                        <!--:refreshingText="$t('comm.refreshing')"-->
                        <!--:refreshedText="$t('comm.refreshFinish')"/>-->
                <!--</template>-->
                <StripeList :count="itemCount"/>
                <!--<template v-slot:footer>-->
                    <!--<ClassicsFooter/>-->
                <!--</template>-->
            </EasyRefresh>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import EasyRefresh from '../../../../src/components/EasyRefresh.vue'
    import AppBar from '../../components/AppBar.vue'
    import StripeList from '../../components/StripeList.vue'
    import ClassicsHeader from '../../../../src/components/header/ClassicsHeader.vue'
    import ClassicsFooter from '../../../../src/components/footer/ClassicsFooter.vue'

    /**
     * 基础使用
     */
    @Component({
        components: {
            AppBar,
            StripeList,
            EasyRefresh,
            ClassicsHeader,
            ClassicsFooter,
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
    .basic-page {
        width: 100%;
        height: 100%;
        .basic-page-list {
            width: 100%;
            height: calc(100% - 60px);
        }
    }
</style>
