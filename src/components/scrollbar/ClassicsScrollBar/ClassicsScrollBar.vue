<template>
    <div class="er-classic-scrollbar">
        <transition name="scroll-bar-fade">
            <div v-if="showBar" class="er-classic-scrollbar-background" :style="`width: ${width}px;${position !== 'left' ? 'right: 0;' : ''}background: ${bgColor};padding: 0 ${padding}px;`">
                <div class="er-classic-scroll-bar"
                     @touchstart="touchStart($event)"
                     @mousedown="mouseDown($event)"
                     :style="`background: ${color};height: ${length}px;margin-top: ${top}px;border-radius: ${radius}px;`">
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
    import ScrollBar from '../scrollbar'
    import Scroller from '@/module/core'
    import PagePosition from "./PagePosition"

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
        @Prop({default: true}) // 拖动滚动条
        private draggable!: boolean

        // 显示滚动条
        private showBar: boolean = false
        // 长度
        private length: number = 0
        // 内容可视高度
        private clientHeight: number = 0
        // top偏移
        private top: number = 0
        // 滚动条计时器
        private scrollBarTimer!: number
        // scroller
        private scroller!: Scroller
        // 是否按下
        private pressDown: boolean = false
        // 按下位置
        private pressPosition!: PagePosition | null
        // 按下top
        private pressTop!: number | null

        // 设置Scroller
        public setScroller(scroller: Scroller) {
            this.scroller = scroller
        }
        // 设置Content高度
        public setClientHeight(height: number): void {
            this.clientHeight = height
        }
        // 滚动条更新
        public updateScrollBar(length: number, top: number, scale: number): void {
            this.showBar = length !== 0
            this.showBarChange()
            this.length = length
            this.top = top
        }

        // 初始化
        private mounted() {
            // 监听鼠标移动
            document.addEventListener('mousemove', this.mouseMove)
            // 监听鼠标抬起事件
            document.addEventListener('mouseup', this.mouseUp)
            // 监听触摸移动
            document.addEventListener('touchmove', this.touchMove)
            // 监听触摸结束
            document.addEventListener('touchend', this.touchEnd)
        }
        // 销毁前
        private beforeDestroy() {
            document.removeEventListener('mousemove', this.mouseMove)
            document.removeEventListener('mouseup', this.mouseUp)
            document.removeEventListener('touchmove', this.touchMove)
            document.removeEventListener('touchend', this.touchEnd)
        }

        // 监听滚动条显示
        @Watch('showBar')
        private showBarChange() {
            if (this.showBar && this.autoHide) {
                if (this.scrollBarTimer) {
                    clearTimeout(this.scrollBarTimer)
                }
                this.scrollBarTimer = setTimeout(() => {
                    if (!this.pressDown) {
                        this.showBar = false
                    }
                }, this.autoHideDuration)
            }
        }

        // 触摸开始事件
        private touchStart(e: TouchEvent) {
            if (!this.draggable) {return}
            this.pressPosition = e.touches[0]
            this.pressTop = this.top
            this.scroller.doTouchStart(e.touches, e.timeStamp)
            this.pressDown = true
        }
        // 滑动事件
        private touchMove(e: TouchEvent) {
            if (!this.draggable) {return}
            if (!this.pressDown) { return }
            e.preventDefault()
            this.scrollActionMove(e.touches[0], e.timeStamp)
        }
        // 触摸结束事件
        private touchEnd(e: TouchEvent) {
            if (!this.draggable) {return}
            this.scrollActionEnd(e)
        }
        // 鼠标按下事件
        private mouseDown(e: MouseEvent) {
            if (!this.draggable) {return}
            this.pressPosition = {
                pageX: e.pageX,
                pageY: e.pageY,
            }
            this.pressTop = this.top
            this.scroller.doTouchStart([{
                pageX: e.pageX,
                pageY: e.pageY,
            }], e.timeStamp)
            this.pressDown = true
        }
        // 鼠标移动事件
        private mouseMove(e: MouseEvent) {
            if (!this.draggable) {return}
            if (!this.pressDown) {return}
            this.scrollActionMove({
                pageX: e.pageX,
                pageY: e.pageY,
            }, e.timeStamp)
        }
        // 鼠标释放事件
        private mouseUp(e: MouseEvent) {
            if (!this.draggable) {return}
            if (!this.pressDown) {
                return
            }
            this.pressDown = false
            this.scrollActionEnd(e)
        }
        // 处理滚动时间
        private scrollActionMove(position: PagePosition, timeStamp: number) {
            if (!this.pressPosition) {return}
            // 计算偏移量
            const offsetY = position.pageY - this.pressPosition!!.pageY
            // 计算滚动条与实际高度比例
            const offsetHeight = this.clientHeight * this.clientHeight / this.length
            const scale = (offsetHeight - this.clientHeight) / (this.clientHeight - this.length)
            // 计算滚动距离
            let scrollLength
            if (offsetY + this.pressTop!! > this.clientHeight - this.length) {
                scrollLength = -scale * (this.clientHeight - this.length - this.pressTop!!)
            } else if (-offsetY > this.pressTop!!) {
                scrollLength = scale * this.pressTop!!
            } else {
                scrollLength = -scale * offsetY
            }
            this.scroller.doTouchMove([{
                pageX: position.pageX,
                pageY: scrollLength,
            }], timeStamp)
        }
        // 处理滚动结束事件
        private scrollActionEnd(e: UIEvent) {
            if (!this.draggable) {return}
            this.pressPosition = null
            this.pressTop = null
            this.pressDown = false
            this.scroller.doTouchEnd(e.timeStamp, false)
            this.showBarChange()
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
