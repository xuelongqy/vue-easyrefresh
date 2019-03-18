<template>
    <div class="basic-page">
        <AppBar :title="$t('sample.basicUse')"/>
        <div class="basic-page-list">
            <EasyRefresh :userSelect="false">
                <StripeList :count="20"/>
            </EasyRefresh>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import EasyRefresh from '../../../../src/components/EasyRefresh.vue'
    import AppBar from '../../components/AppBar.vue'
    import StripeList from '../../components/StripeList.vue'

    /**
     * 基础使用
     */
    @Component({
        components: {
            AppBar,
            StripeList,
            EasyRefresh,
        },
    })
    export default class BasicPage extends Vue {
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
