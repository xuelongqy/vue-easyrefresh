<template>
    <svg t="1550718083010" class="icon" style="" viewBox="0 0 1024 1024" version="1.1"
         xmlns="http://www.w3.org/2000/svg" p-id="10970" xmlns:xlink="http://www.w3.org/1999/xlink" width="100"
         height="100">
        <defs></defs>
        <path d="M384 689.92L206.08 512l-60.373333 60.373333L384 810.666667l512-512-60.373333-60.373334z"
              :fill="color" p-id="10971"></path>
    </svg>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component
export default class Done extends Vue {
    // 颜色
    @Prop({default: '#000000'})
    private color!: string
}
</script>

<style scoped>

</style>
