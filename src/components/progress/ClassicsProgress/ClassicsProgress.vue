<template>
    <div class="er-classic-progress" :style="'height: ' + headerHeight + 'px;'"></div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'
    import Progress from '@/components/progress/progress'

    @Component
    export default class ClassicsProgress extends Vue implements Progress {
        // 设置Content高度
        public setClientHeight(height: number): void {
        }
        // 进度条更新
        public updateProgress(length: number, top: number, scale: number): void {
        }
    }
</script>

<style scoped>
    .er-classic-progress {
        width: 100%;
        height: 0;
        background: transparent;
    }
</style>

