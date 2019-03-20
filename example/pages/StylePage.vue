<template>
    <div class="style-page">
        <AppBar :title="$t('home.style')" :showBack="false"/>
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
    export default class StylePage extends Vue {
    }
</script>

<style lang="scss">
    .style-page {

    }
</style>
