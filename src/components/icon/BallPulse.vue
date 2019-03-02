<template>
    <div>
        <div class="ball ball-one" :style="ballStyle"></div>
        <div class="ball ball-two" :style="ballStyle"></div>
        <div class="ball ball-three" :style="ballStyle"></div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component
export default class BallPulse extends Vue {
    // 颜色
    @Prop({default: '#000000'})
    private color!: string
    // 大小
    @Prop({default: 18.0})
    private size!: number

    // 计算样式
    private get ballStyle(): string {
        return `background: ${this.color};height: ${this.size}px;width: ${this.size}px;margin: ${this.size / 8}px;`
    }
}
</script>

<style scoped lang="scss">
    @keyframes ball-one-animation {
        0%{
            transform: scale(1);
        }
        50%{
            transform: scale(0.5);
        }
        100%{
            transform: scale(1);
        }
    }
    @keyframes ball-two-animation {
        0%{
            transform: scale(0.75);
        }
        25%{
            transform: scale(1);
        }
        50%{
            transform: scale(0.75);
        }
        75%{
            transform: scale(0.5);
        }
        100%{
            transform: scale(0.75);
        }
    }
    @keyframes ball-three-animation {
        0%{
            transform: scale(0.5);
        }
        50%{
            transform: scale(1);
        }
        100%{
            transform: scale(0.5);
        }
    }
    .ball {
        display: inline-block;
        border-radius: 50%;
    }
    .ball-one {
        animation-name: ball-one-animation;
        animation-iteration-count: infinite;
        animation-duration: 0.8s;
    }
    .ball-two {
        animation-name: ball-two-animation;
        animation-iteration-count: infinite;
        animation-duration: 0.8s;
    }
    .ball-three {
        animation-name: ball-three-animation;
        animation-iteration-count: infinite;
        animation-duration: 0.8s;
    }
</style>
