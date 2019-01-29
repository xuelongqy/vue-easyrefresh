<template>
    
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import RefreshHeader from './header'

@Component
export default class ClassicsHeader extends Vue implements RefreshHeader {
    refreshHeight(): number {
        return 0;
    }

    finishDuration(): number {
        return 0;
    }

    onRefreshEnd(): void {
    }

    onRefreshReady(): void {
    }

    onRefreshRestore(): void {
    }

    onRefreshStart(): void {
    }

    onRefreshed(): void {
    }

    onRefreshing(): void {
    }

    updateHeaderHeight(height: number): void {
    }

}
</script>

<style scoped>

</style>
