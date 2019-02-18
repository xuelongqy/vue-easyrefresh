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
            <slot name="header">
                <ClassicsHeader ref="header"/>
            </slot>
            <slot></slot>
            <slot name="footer">
                <ClassicsFooter ref="footer"/>
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import Scroller from '../module/core'
import getContentRender from '../module/render'
import ClassicsHeader from './header/ClassicsHeader.vue'
import ClassicsFooter from './footer/ClassicsFooter.vue'
import { Header, HeaderStatus } from './header/header'
import { Footer, FooterStatus } from './footer/footer'

@Component({
    components: {
        ClassicsHeader,
        ClassicsFooter,
    },
})
export default class EasyRefresh extends Vue {
    // Header
    public header!: Header
    // Footer
    public footer!: Footer

    @Prop() // 刷新回调
    private onRefresh!: (done: () => void) => void
    @Prop() // 加载回调
    private loadMore!: (done: () => void) => void
    @Prop({default: true}) // 是否复制选择
    private userSelect!: boolean
    @Prop({default: false}) // 是否自动触发加载
    private autoLoad!: boolean

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
    // Header状态
    private headerStatus: HeaderStatus = HeaderStatus.NO_REFRESH
    // Footer状态
    private footerStatus: FooterStatus = FooterStatus.NO_LOAD

    // 鼠标是否按下
    private mousedown: boolean = false
    // 用户是否滚动
    private userScrolling: boolean = false
    // 滚轮计时器
    private wheelTimer!: number
    // 滚轮滚动
    private wheelScrolling: boolean = false
    // 滚轮位置记录
    private wheelPageX: number = 0
    private wheelPageY: number = 0

    // 初始化
    public mounted() {
        // 获取Footer和Header
        for (const node of this.$children) {
            if (node.hasOwnProperty('refreshHeight') && !this.header) {
                this.header = (node as unknown) as Header
            } else if (node.hasOwnProperty('loadHeight') && !this.footer) {
                this.footer = (node as unknown) as Footer
            }
        }
        // 初始化EasyRefresh以及滚动组件
        this.container = document.getElementById(this.easyRefreshId)
        this.content = document.getElementById(this.contentId)
        const render = getContentRender(this.content, this.scrollerCallBack)
        this.scroller = new Scroller(render, {
            scrollingX: false,
            snapping: this.snapping,
            animating: this.animating,
            animationDuration: this.animationDuration,
            bouncing: this.bouncing,
        })
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
        this.scroller.triggerPullToRefresh(this.header.refreshHeight(), () => {
            this.header.onRefreshed()
            this.userScrolling = false
            this.mousedown = false
            this.wheelScrolling = false
            setTimeout(() => {
                this.header.onRefreshEnd()
                this.scroller.finishPullToRefresh()
                this.headerStatus = HeaderStatus.REFRESHED
            }, this.header.finishDuration())
        })
    }
    // 加载完成回调
    private callLoadMoreFinish() {
        this.scroller.triggerPushToLoad(this.footer.loadHeight(), () => {
            this.footer.onLoaded()
            this.userScrolling = false
            this.mousedown = false
            this.wheelScrolling = false
            setTimeout(() => {
                this.footer.onLoadEnd()
                this.scroller.finishPushToLoad()
                this.footerStatus = FooterStatus.LOADED
            }, this.footer.finishDuration())
        })
    }
    // 大小改变
    private onResize() {
        const container = this.container
        const content = this.content
        this.scroller.setDimensions(container!!.clientWidth, container!!.clientHeight,
            content!!.offsetWidth, content!!.offsetHeight)
    }
    // 滚动回调
    private scrollerCallBack(left: number, top: number, zoom: number) {
        if (top < 0) {
            if (!this.onRefresh) { return }
            if (this.headerStatus === HeaderStatus.REFRESHING) { return }
            // 更新Header高度
            this.header.updateHeaderHeight(top)
            if (this.headerStatus === HeaderStatus.NO_REFRESH && this.userScrolling) {
                // 刷新开发
                this.header.onRefreshStart()
                this.headerStatus = HeaderStatus.REFRESH_START
            } else if (this.headerStatus === HeaderStatus.REFRESH_START &&
                -top > this.header.refreshHeight() &&
                this.userScrolling) {
                // 准备刷新
                this.header.onRefreshReady()
                this.headerStatus = HeaderStatus.REFRESH_READY
            } else if (this.headerStatus === HeaderStatus.REFRESH_READY &&
                -top < this.header.refreshHeight() &&
                this.userScrolling) {
                // 刷新恢复
                this.header.onRefreshRestore()
                this.headerStatus = HeaderStatus.REFRESH_START
            }
        } else if (top > this.content!!.offsetHeight - this.container!!.clientHeight) {
            if (!this.loadMore) { return }
            if (this.footerStatus === FooterStatus.LOADING) { return }
            if (top === 0) { return }
            // 列表可滚动的距离
            const scrollableDistance = this.content!!.offsetHeight - this.container!!.clientHeight
            // 更新Footer高度
            this.footer.updateFooterHeight(top - scrollableDistance)
            if (this.footerStatus === FooterStatus.NO_LOAD &&
                this.userScrolling) {
                // 开始加载
                this.footer.onLoadStart()
                this.footerStatus = FooterStatus.LOAD_START
            } else if (this.footerStatus === FooterStatus.LOAD_START &&
                top - scrollableDistance > this.footer.loadHeight() &&
                this.userScrolling) {
                // 准备加载
                this.footer.onLoadReady()
                this.footerStatus = FooterStatus.LOAD_READY
            } else if (this.footerStatus === FooterStatus.LOAD_READY &&
                top - scrollableDistance < this.footer.loadHeight() &&
                this.userScrolling) {
                // 恢复加载
                this.footer.onLoadRestore()
                this.footerStatus = FooterStatus.LOAD_START
            }
        } else {
            // 刷新关闭
            if ((this.headerStatus === HeaderStatus.REFRESH_START
                || this.headerStatus === HeaderStatus.REFRESH_READY
                || this.headerStatus === HeaderStatus.REFRESHED)
                && this.onRefresh) {
                this.header.onRefreshClose()
                this.headerStatus = HeaderStatus.NO_REFRESH
            }
            // 加载关闭
            if ((this.footerStatus === FooterStatus.LOAD_START
                || this.footerStatus === FooterStatus.LOAD_READY
                || this.footerStatus === FooterStatus.LOADED)
                && this.loadMore) {
                this.footer.onLoadClose()
                this.footerStatus = FooterStatus.NO_LOAD
            }
        }
    }
    // 滚动动作结束(例如手指离开屏幕)
    private scrollActionEnd(e: UIEvent) {
        // 判断是否需要刷新
        if (this.onRefresh) {
            // if (this.headerStatus === HeaderStatus.REFRESHING
            //     || this.headerStatus === HeaderStatus.REFRESHED
            //     || this.footerStatus === FooterStatus.LOADING
            //     || this.footerStatus === FooterStatus.LOADED) {
            //     return
            // }
            // 列表可滚动的距离
            const {left, top, zoom} = this.scroller.getValues()
            // 触发刷新
            if (this.headerStatus === HeaderStatus.REFRESH_READY
                && -top > this.header.refreshHeight()) {
                this.scroller.doTouchEnd(e.timeStamp, true)
                this.scroller.triggerPullToRefresh(this.header.refreshHeight(), () => {
                    this.header.onRefreshing()
                    this.headerStatus = HeaderStatus.REFRESHING
                    this.onRefresh(this.callRefreshFinish)
                })
                return
            }
        }
        // 判断是否需要加载更多
        if (this.loadMore && !this.autoLoad) {
            // if (this.headerStatus === HeaderStatus.REFRESHING
            //     || this.headerStatus === HeaderStatus.REFRESHED
            //     || this.footerStatus === FooterStatus.LOADING
            //     || this.footerStatus === FooterStatus.LOADED) {
            //     return
            // }
            // 列表可滚动的距离
            const scrollableDistance = this.content!!.offsetHeight - this.container!!.clientHeight
            const {left, top, zoom} = this.scroller.getValues()
            // 触发加载
            if (this.footerStatus === FooterStatus.LOAD_READY &&
                top - scrollableDistance > this.footer.loadHeight()) {
                this.scroller.doTouchEnd(e.timeStamp, true)
                this.scroller.triggerPushToLoad(this.footer.loadHeight(), () => {
                    this.footer.onLoading()
                    this.footerStatus = FooterStatus.LOADING
                    this.loadMore(this.callLoadMoreFinish)
                })
                return
            }
        }
        this.scroller.doTouchEnd(e.timeStamp, false)
    }
    // 触摸开始事件
    private touchStart(e: TouchEvent) {
        // 如果为刷新(加载)完成则不触发事件
        // if (this.headerStatus === HeaderStatus.REFRESHED ||
        //     this.footerStatus === FooterStatus.LOADED) { return }
        // Don't react if initial down happens on a form element
        if ((e.target as HTMLElement).tagName.match(/input|textarea|select/i)) {
            return
        }
        this.scroller.doTouchStart(e.touches, e.timeStamp)
        this.userScrolling = true
        this.onResize()
    }
    // 滑动事件
    private touchMove(e: TouchEvent) {
        if (!this.userScrolling) { return }
        e.preventDefault()
        this.scroller.doTouchMove(e.touches, e.timeStamp)
    }
    // 触摸结束事件
    private touchEnd(e: TouchEvent) {
        // this.userScrolling = false
        // this.scroller.doTouchEnd(e.timeStamp)
        this.scrollActionEnd(e)
    }
    // 鼠标按下事件
    private mouseDown(e: MouseEvent) {
        if (this.userSelect) {return}
        // 如果为刷新(加载)完成则不触发事件
        // if (this.headerStatus === HeaderStatus.REFRESHED ||
        //     this.footerStatus === FooterStatus.LOADED) { return }
        // Don't react if initial down happens on a form element
        if ((e.target as HTMLElement).tagName.match(/input|textarea|select/i)) {
            return
        }
        this.scroller.doTouchStart([{
            pageX: e.pageX,
            pageY: e.pageY,
        }], e.timeStamp)
        this.mousedown = true
        this.userScrolling = true
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
    }
    // 鼠标释放事件
    private mouseUp(e: MouseEvent) {
        if (this.userSelect) {return}
        if (!this.mousedown) {
            return
        }
        this.mousedown = false
        // this.userScrolling = false
        // this.scroller.doTouchEnd(e.timeStamp)
        this.scrollActionEnd(e)
    }
    // 滚轮事件
    private wheel(e: WheelEvent) {
        // 如果为刷新(加载)完成则不触发事件
        // if (this.headerStatus === HeaderStatus.REFRESHED ||
        //     this.footerStatus === FooterStatus.LOADED) { return }
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
            this.userScrolling = true
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
            // this.userScrolling = false
            // this.scroller.doTouchEnd(e.timeStamp + 200)
            this.scrollActionEnd(e)
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
