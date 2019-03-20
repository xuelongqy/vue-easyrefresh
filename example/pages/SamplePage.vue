<template>
    <div class="sample-page">
        <AppBar :title="$t('home.sample')" :showBack="false"/>
        <div class="sample-page-list">
            <EasyRefresh :userSelect="false">
                <ListItem
                    :title="$t('sample.basicUse')"
                    :describe="$t('sample.basicUseDescribe')"
                    @click.native="$router.push('/basicUse')">
                    <template v-slot:icon>
                        <v-icon size="25" color="orange">format_list_bulleted</v-icon>
                    </template>
                </ListItem>
            </EasyRefresh>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import EasyRefresh from '../../src/components/EasyRefresh.vue'
    import ListItem from '../components/ListItem.vue'
    import AppBar from '../components/AppBar.vue'

    @Component({
        components: {
            EasyRefresh,
            ListItem,
            AppBar,
        },
    })
    export default class SamplePage extends Vue {
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
