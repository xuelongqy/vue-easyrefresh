<template>
    <div class="sample-page">
        <EasyRefresh :userSelect="false">
            <div>Sample</div>
        </EasyRefresh>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import EasyRefresh from '../../../src/components/EasyRefresh.vue'

    @Component({
        components: {
            EasyRefresh,
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
