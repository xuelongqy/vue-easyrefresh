<template>
    <div class="v-easy-refresh" :id="easyRefreshId"
         :class="{'er_user_select_none': !userSelect}"
         @touchstart="touchStart($event)"
         @touchmove="touchMove($event)"
         @touchend="touchEnd($event)"
         @mousedown="mouseDown($event)"
         @mousemove="mouseMove($event)"
         @mouseup="mouseUp($event)"
         @wheel="wheel($event)">
        <div :id="contentId">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Scroller from '../module/core'
import getContentRender from '../module/render'

@Component
export default class EasyRefresh extends Vue {
    @Prop() // 刷新回调
    private onRefresh!: (done: () => void) => void
    @Prop() // 加载回调
    private loadMore!: (done: () => void) => void
    @Prop({default: true}) // 是否复制选择
    private userSelect!: boolean

    @Prop({default: true}) // 动画
    private animating!: boolean
    @Prop({default: 250}) // 动画时长
    private animationDuration!: number
    @Prop({default: true}) // 回弹效果
    private bouncing!: boolean
    @Prop({default: false}) // 捕捉(条目大小,需设置)
    private snapping!: boolean
    @Prop({default: 100}) // 捕捉宽度
    private snapWidth!: number
    @Prop({default: 100}) // 捕捉高度
    private snapHeight!: number

    // EasyRefresh id
    private easyRefreshId: string = 'easy-refresh-' + Math.random().toString(36).substring(3, 8)
    private container!: HTMLElement | null
    // Content id
    private contentId: string = 'easy-refresh-content' + Math.random().toString(36).substring(3, 8)
    private content!: HTMLElement | null
    // scroller
    private scroller!: Scroller

    // 鼠标是否按下
    private mousedown: boolean = false
    // 滚轮计时器
    private wheelTimer!: number
    // 滚轮滚动
    private wheelScrolling: boolean = false
    // 滚轮位置记录
    private wheelPageX: number = 0
    private wheelPageY: number = 0
    // 重置大小计时器
    private resizeTimer!: number

    // 初始化
    public mounted() {
        // 初始化EasyRefresh以及滚动组件
        this.container = document.getElementById(this.easyRefreshId)
        this.content = document.getElementById(this.contentId)
        const render = getContentRender(this.content)
        this.scroller = new Scroller(render, {
            scrollingX: false,
            snapping: this.snapping,
            animating: this.animating,
            animationDuration: this.animationDuration,
            bouncing: this.bouncing,
        })
        // 开启刷新
        if (this.onRefresh) {
            this.scroller.activatePullToRefresh(60, () => {
                console.log('1')
            }, () => {
                console.log('2')
            }, () => {
                console.log('3')
                this.onRefresh(this.callRefreshFinish)
            })
        }
        // 开启加载
        if (this.loadMore) {
            console.log('')
        }
        // setup scroller
        const rect = this.container!!.getBoundingClientRect()
        this.scroller.setPosition(rect.left + this.container!!.clientLeft, rect.top + this.container!!.clientTop)
        // snapping
        if (this.snapping) {
            this.scroller.setSnapSize(this.snapWidth, this.snapHeight)
        }
        // 监听大小变化
        this.onResize()
        window.addEventListener('resize', this.onResize)
    }

    // 刷新完成回调
    private callRefreshFinish() {
        console.log('callRefreshFinish')
    }
    // 加载完成回调
    private callLoadMoreFinish() {
        console.log('callLoadMoreFinish')
    }

    // 大小改变
    private onResize() {
        const container = this.container
        const content = this.content
        this.scroller.setDimensions(container!!.clientWidth, container!!.clientHeight,
            content!!.offsetWidth, content!!.offsetHeight)
    }
    // 触摸开始事件
    private touchStart(e: TouchEvent) {
        // Don't react if initial down happens on a form element
        if ((e.target as HTMLElement).tagName.match(/input|textarea|select/i)) {
            return
        }
        this.scroller.doTouchStart(e.touches, e.timeStamp)
        this.onResize()
    }
    // 滑动事件
    private touchMove(e: TouchEvent) {
        e.preventDefault()
        this.scroller.doTouchMove(e.touches, e.timeStamp)
    }
    // 触摸结束事件
    private touchEnd(e: TouchEvent) {
        this.scroller.doTouchEnd(e.timeStamp)
    }
    // 鼠标按下事件
    private mouseDown(e: MouseEvent) {
        if (this.userSelect) {return}
        // Don't react if initial down happens on a form element
        if ((e.target as HTMLElement).tagName.match(/input|textarea|select/i)) {
            return
        }
        this.scroller.doTouchStart([{
            pageX: e.pageX,
            pageY: e.pageY,
        }], e.timeStamp)
        this.mousedown = true
        this.onResize()
    }
    // 鼠标移动事件
    private mouseMove(e: MouseEvent) {
        if (this.userSelect) {return}
        if (!this.mousedown) {
            return
        }
        this.scroller.doTouchMove([{
            pageX: e.pageX,
            pageY: e.pageY,
        }], e.timeStamp)
        this.mousedown = true
    }
    // 鼠标释放事件
    private mouseUp(e: MouseEvent) {
        if (this.userSelect) {return}
        if (!this.mousedown) {
            return
        }
        this.scroller.doTouchEnd(e.timeStamp)
        this.mousedown = false
    }
    // 滚轮事件
    private wheel(e: WheelEvent) {
        if (this.wheelScrolling) {
            // 清除上一次计时
            clearTimeout(this.wheelTimer)
        } else {
            // 开始滚动
            this.scroller.doTouchStart([{
                pageX: e.pageX,
                pageY: e.pageY,
            }], e.timeStamp)
            this.wheelPageX = e.pageX
            this.wheelPageY = e.pageY
            this.wheelScrolling = true
            this.onResize()
        }
        // 判断是否到达最大高度
        const scrollerValue = this.scroller.getValues()
        if (scrollerValue.top > - 60 - 50 &&
            scrollerValue.top < this.content!!.offsetHeight - this.container!!.clientHeight + 60 + 50 ) {
            // 计算偏移
            this.wheelPageX -= e.deltaX
            this.wheelPageY -= e.deltaY
            this.scroller.doTouchMove([{
                pageX: this.wheelPageX,
                pageY: this.wheelPageY,
            }], e.timeStamp)
        }
        // 设置计时器,结束滚动
        this.wheelTimer = setTimeout(() => {
            this.wheelScrolling = false
            this.wheelPageX = 0
            this.wheelPageY = 0
            this.scroller.doTouchEnd(e.timeStamp + 200)
        }, 200)
    }
}
</script>

<style lang="scss">
    .v-easy-refresh {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
    }
    .er_user_select_none {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
        user-select: none;
    }
</style>
