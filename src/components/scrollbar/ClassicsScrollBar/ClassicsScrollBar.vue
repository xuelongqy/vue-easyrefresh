<template>
    <div class="er-classic-scrollbar">
        <transition name="scroll-bar-fade">
            <div v-if="showBar" class="er-classic-scrollbar-background" :style="`width: ${width}px;${position !== 'left' ? 'right: 0;' : ''}background: ${bgColor};padding: 0 ${padding}px;`">
                <div class="er-classic-scroll-bar"
                     :style="`background: ${color};height: ${length}px;margin-top: ${top}px;border-radius: ${radius}px;`">
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
    import ScrollBar from '../scrollbar'

    @Component
    export default class ClassicsScrollBar extends Vue implements ScrollBar {
        @Prop({default: 'rgba(0, 0, 0, 0.5)'}) // 颜色
        private color!: string
        @Prop({default: 'transparent'}) // 背景颜色
        private bgColor!: string
        @Prop({default: 'right'}) // 位置
        private position!: string
        @Prop({default: 5}) // 宽度
        private width!: number
        @Prop({default: 2}) // 圆角
        private radius!: number
        @Prop({default: 0}) // 内边距(仅左右)
        private padding!: number
        @Prop({default: true}) // 自动隐藏
        private autoHide!: boolean
        @Prop({default: 2000}) // 自动隐藏延时
        private autoHideDuration!: number

        // 显示滚动条
        private showBar: boolean = false
        // 长度
        private length: number = 0
        // top偏移
        private top: number = 0
        // 滚动条计时器
        private scrollBarTimer!: number

        // 设置Content高度
        public setClientHeight(height: number): void {
            // todo nothing
        }
        // 滚动条更新
        public updateScrollBar(length: number, top: number, scale: number): void {
            this.showBar = length !== 0
            this.showBarChange()
            this.length = length
            this.top = top
        }
        // 监听滚动条显示
        @Watch('showBar')
        private showBarChange() {
            if (this.showBar && this.autoHide) {
                if (this.scrollBarTimer) {
                    clearTimeout(this.scrollBarTimer)
                }
                this.scrollBarTimer = setTimeout(() => {
                    this.showBar = false
                }, this.autoHideDuration)
            }
        }
    }
</script>

<style scoped lang="scss">
    .er-classic-scrollbar {
        .er-classic-scrollbar-background{
            position: absolute;
            height: 100%;
            .er-classic-scroll-bar {
                width: 100%;
            }
        }
        .scroll-bar-fade-enter-active, .scroll-bar-fade-leave-active {
            transition: opacity .5s
        }
        .scroll-bar-fade-enter, .scroll-bar-fade-leave-active {
            opacity: 0
        }
    }
</style>
