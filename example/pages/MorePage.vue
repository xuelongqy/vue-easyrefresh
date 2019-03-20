<template>
    <div class="more-page">
        <AppBar :title="$t('home.more')" :showBack="false"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import ListItem from '../components/ListItem.vue'
    import AppBar from '../components/AppBar.vue'

    @Component({
        components: {
            ListItem,
            AppBar,
        },
    })
    export default class MorePage extends Vue {
    }
</script>

<style lang="scss">
    .more-page {

    }
</style>
