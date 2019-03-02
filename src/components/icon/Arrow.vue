<template>
    <svg t="1550565891853" :class="arrowClass" class="arrow" style="" viewBox="0 0 1024 1024" version="1.1"
         xmlns="http://www.w3.org/2000/svg" p-id="10970" xmlns:xlink="http://www.w3.org/1999/xlink" width="100"
         height="100">
        <defs></defs>
        <path d="M853.333333 512l-60.16-60.16L554.666667 689.92V170.666667h-85.333334v519.253333L231.253333 451.413333 170.666667 512l341.333333 341.333333 341.333333-341.333333z"
              :fill="color" p-id="10971"></path>
    </svg>
</template>

<script lang="ts">
import {Component, Prop, Watch, Vue} from 'vue-property-decorator'

@Component
export default class Arrow extends Vue {
    // 指向
    @Prop({default: 'down'})
    private direction!: string
    // 旋转
    @Prop({default: false})
    private rotate!: boolean
    // 颜色
    @Prop({default: '#000000'})
    private color!: string

    // Arrow的class
    private arrowClass: string = 'down'

    // 初始化
    public mounted() {
        // 初始化显示文字
        this.arrowClass = this.direction
    }

    // 监听旋转
    @Watch('rotate')
    private onRotate(val: boolean, oldVal: boolean) {
        if (val) {
            if (this.direction === 'down') {
                this.arrowClass = 'up'
            } else {
                this.arrowClass = 'down'
            }
        } else {
            this.arrowClass = this.direction
        }
    }
}
</script>

<style scoped lang="scss">
    .arrow {
        transition: transform .2s linear;
        -webkit-transition: -webkit-transform .2s linear;
        -moz-transition: -webkit-transform .2s linear;
        -o-transition: -webkit-transform .2s linear;
    }

    .up {
        transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
        -o-transform: rotate(180deg);
    }

    .down {
        transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
    }
</style>
