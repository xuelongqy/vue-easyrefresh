<template>
    <div class="sample-page">
        <AppBar :title="$t('home.sample')" :showBack="false"></AppBar>
        <EasyRefresh :userSelect="false">
            <ListItem
                :title="$t('sample.basicUse')"
                :describe="$t('sample.basicUseDescribe')">
                <template v-slot:icon>
                    <v-icon size="25" color="orange">format_list_bulleted</v-icon>
                </template>
            </ListItem>
        </EasyRefresh>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import EasyRefresh from '../../../src/components/EasyRefresh.vue'
    import ListItem from '@/components/ListItem.vue'
    import AppBar from '@/components/AppBar.vue'

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
    }
</style>
