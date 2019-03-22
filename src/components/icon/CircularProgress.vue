<template>
    <div class="circular-progress">
        <div v-if="value !== null">
            <div class="circleProgress_wrapper" :class="size">
                <div class="wrapper right" :class="size">
                    <div class="circleProgress rightcircle" :class="size" :style="'transform: rotate(' + rightRotate + 'deg);' + 'border-top-color: ' + color + ';' + 'border-right-color: ' + color + ';'"></div>
                </div>
                <div class="wrapper left" :class="size">
                    <div class="circleProgress leftcircle" :class="size" :style="'transform: rotate(' + leftRotate + 'deg);' + 'border-bottom-color: ' + color + ';' + 'border-left-color: ' + color + ';'"></div>
                </div>
            </div>
        </div>
        <div v-else class="preloader-wrapper active" :class="size">
            <div :style="'border-color: ' + color + ';'" class="spinner-layer">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div>
                <div class="gap-patch">
                    <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component
export default class CircularProgress extends Vue {
    // 颜色
    @Prop({default: '#000000'})
    private color!: string
    // 进度值
    @Prop({default: null})
    private value!: number
    // 大小
    @Prop({default: 'small'})
    private size!: string

    // 获取旋转度
    get rightRotate(): number {
        if (this.value <= 0) {
            return -135
        } else if (this.value <= 0.5) {
            return -135 + 360 * this.value
        } else {
            return 45
        }
    }
    get leftRotate(): number {
        if (this.value <= 0.5) {
            return -135
        } else if (this.value < 1) {
            return -135 + 360 * (this.value - 0.5)
        } else {
            return 45
        }
    }
}
</script>

<style scoped lang="scss">
    .circular-progress {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content:center;
        align-items:Center;
    }

    .circleProgress_wrapper {
        width: 22px;
        height: 22px;
        position: relative;

        &.small {
            width: 22px;
            height: 22px;
        }

        &.middle {
            width: 32px;
            height: 32px;
        }

        &.big {
            width: 40px;
            height: 40px;
        }
    }
    .wrapper{
        width: 11px;
        height: 22px;
        position: absolute;
        top:0;
        overflow: hidden;

        &.small {
            width: 11px;
            height: 22px;
        }

        &.middle {
            width: 16px;
            height: 32px;
        }

        &.big {
            width: 20px;
            height: 40px;
        }
    }
    .right{
        right:0;
    }
    .left{
        left:0;
    }
    .circleProgress{
        width: 20px;
        height: 20px;
        border:2px solid transparent;
        border-radius: 50%;
        position: absolute;
        top:0;

        &.small {
            width: 22px;
            height: 22px;
        }

        &.middle {
            width: 32px;
            height: 32px;
        }

        &.big {
            width: 40px;
            height: 40px;
        }
    }
    .rightcircle{
        border-top-width:2px;
        border-right-width:2px;
        border-top-style: solid;
        border-right-style: solid;
        right:0;
        animation: circleProgressLoad_right 5s linear infinite;
        transform: rotate(45deg);
    }
    .leftcircle{
        border-bottom-width:2px;
        border-left-width:2px;
        border-bottom-style: solid;
        border-left-style: solid;
        left:0;
        animation: circleProgressLoad_left 5s linear infinite;
        transform: rotate(-135deg);
    }

    .preloader-wrapper {
        display: inline-block;
        position: relative;
        width: 40px;
        height: 40px;

        &.small {
            width: 22px;
            height: 22px;
        }

        &.middle {
            width: 32px;
            height: 32px;
        }

        &.big {
            width: 40px;
            height: 40px;
        }

        &.active {
            /* duration: 360 * ARCTIME / (ARCSTARTROT + (360-ARCSIZE)) */
            -webkit-animation: container-rotate 1568ms linear infinite;
            animation: container-rotate 1568ms linear infinite;
        }
    }

    @-webkit-keyframes container-rotate {
        to {
            -webkit-transform: rotate(360deg)
        }
    }

    @keyframes container-rotate {
        to {
            transform: rotate(360deg)
        }
    }

    .spinner-layer {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        border-color: #000000;
    }

    .active .spinner-layer {
        /* durations: 4 * ARCTIME */
        opacity: 1;
        -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0.0, 0.2, 1) infinite both;
        animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0.0, 0.2, 1) infinite both;
    }

    @-webkit-keyframes fill-unfill-rotate {
        12.5% {
            -webkit-transform: rotate(135deg);
        }
        /* 0.5 * ARCSIZE */
        25% {
            -webkit-transform: rotate(270deg);
        }
        /* 1   * ARCSIZE */
        37.5% {
            -webkit-transform: rotate(405deg);
        }
        /* 1.5 * ARCSIZE */
        50% {
            -webkit-transform: rotate(540deg);
        }
        /* 2   * ARCSIZE */
        62.5% {
            -webkit-transform: rotate(675deg);
        }
        /* 2.5 * ARCSIZE */
        75% {
            -webkit-transform: rotate(810deg);
        }
        /* 3   * ARCSIZE */
        87.5% {
            -webkit-transform: rotate(945deg);
        }
        /* 3.5 * ARCSIZE */
        to {
            -webkit-transform: rotate(1080deg);
        }
        /* 4   * ARCSIZE */
    }

    @keyframes fill-unfill-rotate {
        12.5% {
            transform: rotate(135deg);
        }
        /* 0.5 * ARCSIZE */
        25% {
            transform: rotate(270deg);
        }
        /* 1   * ARCSIZE */
        37.5% {
            transform: rotate(405deg);
        }
        /* 1.5 * ARCSIZE */
        50% {
            transform: rotate(540deg);
        }
        /* 2   * ARCSIZE */
        62.5% {
            transform: rotate(675deg);
        }
        /* 2.5 * ARCSIZE */
        75% {
            transform: rotate(810deg);
        }
        /* 3   * ARCSIZE */
        87.5% {
            transform: rotate(945deg);
        }
        /* 3.5 * ARCSIZE */
        to {
            transform: rotate(1080deg);
        }
        /* 4   * ARCSIZE */
    }

    /**
     * Patch the gap that appear between the two adjacent div.circle-clipper while the
     * spinner is rotating (appears on Chrome 38, Safari 7.1, and IE 11).
     */
    .gap-patch {
        position: absolute;
        top: 0;
        left: 45%;
        width: 10%;
        height: 100%;
        overflow: hidden;
        border-color: inherit;
    }

    .gap-patch .circle {
        width: 1000%;
        left: -450%;
    }

    .circle-clipper {
        display: inline-block;
        position: relative;
        width: 50%;
        height: 100%;
        overflow: hidden;
        border-color: inherit;

        .circle {
            width: calc(200%);
            height: calc(100%);
            border-width: 2px; /* STROKEWIDTH */
            border-style: solid;
            border-color: inherit;
            border-bottom-color: transparent !important;
            border-radius: 50%;
            -webkit-animation: none;
            animation: none;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
        }

        &.left .circle {
            left: 0;
            border-right-color: transparent !important;
            -webkit-transform: rotate(129deg);
            transform: rotate(129deg);
        }

        &.right .circle {
            left: -100%;
            border-left-color: transparent !important;
            -webkit-transform: rotate(-129deg);
            transform: rotate(-129deg);
        }
    }


    .active .circle-clipper.left .circle {
        /* duration: ARCTIME */
        -webkit-animation: left-spin 1333ms cubic-bezier(0.4, 0.0, 0.2, 1) infinite both;
        animation: left-spin 1333ms cubic-bezier(0.4, 0.0, 0.2, 1) infinite both;
    }

    .active .circle-clipper.right .circle {
        /* duration: ARCTIME */
        -webkit-animation: right-spin 1333ms cubic-bezier(0.4, 0.0, 0.2, 1) infinite both;
        animation: right-spin 1333ms cubic-bezier(0.4, 0.0, 0.2, 1) infinite both;
    }

    @-webkit-keyframes left-spin {
        from {
            -webkit-transform: rotate(130deg);
        }
        50% {
            -webkit-transform: rotate(-5deg);
        }
        to {
            -webkit-transform: rotate(130deg);
        }
    }

    @keyframes left-spin {
        from {
            transform: rotate(130deg);
        }
        50% {
            transform: rotate(-5deg);
        }
        to {
            transform: rotate(130deg);
        }
    }

    @-webkit-keyframes right-spin {
        from {
            -webkit-transform: rotate(-130deg);
        }
        50% {
            -webkit-transform: rotate(5deg);
        }
        to {
            -webkit-transform: rotate(-130deg);
        }
    }

    @keyframes right-spin {
        from {
            transform: rotate(-130deg);
        }
        50% {
            transform: rotate(5deg);
        }
        to {
            transform: rotate(-130deg);
        }
    }

    #spinnerContainer.cooldown {
        /* duration: SHRINK_TIME */
        -webkit-animation: container-rotate 1568ms linear infinite, fade-out 400ms cubic-bezier(0.4, 0.0, 0.2, 1);
        animation: container-rotate 1568ms linear infinite, fade-out 400ms cubic-bezier(0.4, 0.0, 0.2, 1);
    }

    @-webkit-keyframes fade-out {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    @keyframes fade-out {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
</style>
