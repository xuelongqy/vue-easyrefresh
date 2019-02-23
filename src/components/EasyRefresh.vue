<template>
    <div class="v-easy-refresh">
        <div class="v-easy-refresh-body" :id="easyRefreshId"
             :class="{'er_user_select_none': !userSelect}"
             @touchstart="touchStart($event)"
             @touchmove="touchMove($event)"
             @touchend="touchEnd($event)"
             @mousedown="mouseDown($event)"
             @mousemove="mouseMove($event)"
             @mouseup="mouseUp($event)"
             @wheel="wheel($event)">
            <div :id="contentId">
                <div class="v-easy-refresh-float-offset" :style="'margin-top: ' + floatTop + 'px;'"></div>
                <slot></slot>
            </div>
        </div>
        <div class="v-easy-refresh-header" :style="'bottom: ' + headerBottom + 'px;'">
            <slot name="header">
                <ClassicsHeader ref="header"/>
            </slot>
        </div>
        <div class="v-easy-refresh-footer" :style="'top: ' + footerTop + 'px;'">
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
    private loadMore!: (done: (noMore: boolean) => void) => void
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
    // Header和Footer的位置
    private headerBottom: number = 0
    private footerTop: number = 0
    // 浮动布局的偏移
    private floatTop: number = 0
    // 是否正在刷新/加载
    private isRefresh: boolean = false
    // 没有更多数据
    private noMore: boolean = false

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
        // 初始化Header和Footer的top值
        this.headerBottom = -this.container!!.clientHeight
        this.footerTop = this.container!!.clientHeight
        window.addEventListener('resize', this.onResize)
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
        // 设置Header和Footer的位置
        if (this.onRefresh) {
            this.headerBottom = this.container!!.clientHeight + top
        }
        if (this.loadMore) {
            // 如果没有超过底部则显示在底部
            if (this.content!!.clientHeight < this.container!!.clientHeight) {
                this.footerTop = this.container!!.clientHeight - top
            } else {
                this.footerTop = -top + this.content!!.offsetHeight
            }
        }
        if (top < 0) {
            if (!this.onRefresh) { return }
            if (this.headerStatus === HeaderStatus.REFRESHING ||
                this.headerStatus === HeaderStatus.REFRESHED) { return }
            // 更新Header高度
            this.header.updateHeaderHeight(-top)
            // 判断是否为浮动布局
            if (this.header.isHeaderFloat()) {
                this.floatTop = top;
            }
            if (this.headerStatus === HeaderStatus.NO_REFRESH
                && this.userScrolling) {
                // 刷新开发
                this.header.onRefreshStart()
                this.headerStatus = HeaderStatus.REFRESH_START
            } else if (this.headerStatus === HeaderStatus.REFRESH_START &&
                -top > this.header.refreshHeight() &&
                this.userScrolling && !this.isRefresh) {
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
            if (this.footerStatus === FooterStatus.LOADING ||
                this.footerStatus === FooterStatus.LOADED) { return }
            if (top === 0) { return }
            // 列表可滚动的距离
            const scrollableDistance = this.content!!.offsetHeight - this.container!!.clientHeight
            let footerHeight = 0
            // 更新Footer高度，判断是否超过屏幕底部
            if (this.content!!.clientHeight < this.container!!.clientHeight) {
                footerHeight = top
            } else {
                footerHeight = top - scrollableDistance
            }
            // 判断是否为浮动布局
            if (this.footer.isFooterFloat() && !this.autoLoad) {
                this.floatTop = footerHeight
            }
            // 判断是否自动加载
            if (this.autoLoad && footerHeight > 0 && !this.noMore &&
                this.content!!.clientHeight >= this.container!!.clientHeight) {
                this.footer.updateFooterHeight(this.footer.loadHeight())
                this.footer.onLoading()
                this.footerStatus = FooterStatus.LOADING
                this.loadMore(this.callLoadMoreFinish)
                this.isRefresh = true
                return
            }
            this.footer.updateFooterHeight(footerHeight)
            if (this.noMore) { return }
            if (this.footerStatus === FooterStatus.NO_LOAD &&
                this.userScrolling) {
                // 开始加载
                this.footer.onLoadStart()
                this.footerStatus = FooterStatus.LOAD_START
            } else if (this.footerStatus === FooterStatus.LOAD_START &&
                footerHeight > this.footer.loadHeight() &&
                this.userScrolling && !this.isRefresh) {
                // 准备加载
                this.footer.onLoadReady()
                this.footerStatus = FooterStatus.LOAD_READY
            } else if (this.footerStatus === FooterStatus.LOAD_READY &&
                footerHeight < this.footer.loadHeight() &&
                this.userScrolling) {
                // 恢复加载
                this.footer.onLoadRestore()
                this.footerStatus = FooterStatus.LOAD_START
            }
        } else {
            // 刷新关闭
            if ((this.headerStatus === HeaderStatus.REFRESH_START
                || this.headerStatus === HeaderStatus.REFRESH_READY
                || this.headerStatus === HeaderStatus.REFRESHED
                || this.headerStatus === HeaderStatus.REFRESHEND)
                && this.onRefresh) {
                this.header.onRefreshClose()
                this.headerStatus = HeaderStatus.NO_REFRESH
            }
            // 加载关闭
            if ((this.footerStatus === FooterStatus.LOAD_START
                || this.footerStatus === FooterStatus.LOAD_READY
                || this.footerStatus === FooterStatus.LOADED
                || this.footerStatus === FooterStatus.LOADEND)
                && this.loadMore) {
                if (!this.noMore) {
                    this.footer.onLoadClose()
                }
                this.footerStatus = FooterStatus.NO_LOAD
            }
        }
    }
    // 刷新完成回调
    private callRefreshFinish() {
        this.scroller.triggerPullToRefresh(this.header.refreshHeight(), () => {
            this.userScrolling = false
            this.mousedown = false
            this.wheelScrolling = false
            this.headerStatus = HeaderStatus.REFRESHED
            this.header.onRefreshed()
            setTimeout(() => {
                this.header.onRefreshEnd()
                this.isRefresh = false
                this.headerStatus = HeaderStatus.REFRESHEND
                // 判断刷新过程中是否滑动到其他位置
                const {left, top, zoom} = this.scroller.getValues()
                if (-top !== this.header.refreshHeight()) {
                    this.header.onRefreshClose()
                    this.headerStatus = HeaderStatus.NO_REFRESH
                    this.header.updateHeaderHeight(0)
                }
                this.scroller.finishPullToRefresh()
            }, this.header.headerFinishDuration())
        })
    }
    // 加载完成回调
    private callLoadMoreFinish(noMore: boolean = false) {
        this.noMore = noMore
        // 判断刷新过程中是否滑动到其他位置
        this.scroller.triggerPushToLoad(this.footer.loadHeight(), (scroll) => {
            this.userScrolling = false
            this.mousedown = false
            this.wheelScrolling = false
            this.footerStatus = FooterStatus.LOADED
            if (noMore) {
                this.footer.onNoMore()
            } else {
                this.footer.onLoaded()
            }
            setTimeout(() => {
                if (!this.noMore) {
                    this.footer.onLoadEnd()
                }
                this.isRefresh = false
                this.footerStatus = FooterStatus.LOADEND
                if (scroll) {
                    this.scroller.finishPushToLoad()
                } else {
                    if (!this.noMore) {
                        this.footer.onLoadClose()
                    }
                    this.footerStatus = FooterStatus.NO_LOAD
                    this.footerTop = this.container!!.clientHeight
                    this.footer.updateFooterHeight(0)
                }
            }, this.footer.footerFinishDuration())
        }, noMore)
    }
    // 滚动动作结束(例如手指离开屏幕)
    private scrollActionEnd(e: UIEvent) {
        this.userScrolling = false
        if (this.isRefresh) {
            this.scroller.doTouchEnd(e.timeStamp, false)
            return
        }
        // 判断是否需要刷新
        if (this.onRefresh) {
            // 列表可滚动的距离
            const {left, top, zoom} = this.scroller.getValues()
            // 触发刷新
            if (this.headerStatus === HeaderStatus.REFRESH_READY
                && -top > this.header.refreshHeight()) {
                this.scroller.doTouchEnd(e.timeStamp, true)
                this.scroller.triggerPullToRefresh(this.header.refreshHeight(), () => {
                    this.header.onRefreshing()
                    this.noMore = false
                    this.headerStatus = HeaderStatus.REFRESHING
                    this.onRefresh(this.callRefreshFinish)
                })
                this.isRefresh = true
                return
            }
        }
        // 判断是否需要加载更多
        if (this.loadMore && !this.noMore) {
            // 列表可滚动的距离
            const scrollableDistance = this.content!!.offsetHeight - this.container!!.clientHeight
            const {left, top, zoom} = this.scroller.getValues()
            // 触发加载
            if (this.footerStatus === FooterStatus.LOAD_READY &&
                ((this.content!!.clientHeight >= this.container!!.clientHeight &&
                    top - scrollableDistance >= this.footer.loadHeight()) ||
                (this.content!!.clientHeight < this.container!!.clientHeight &&
                    top >= this.footer.loadHeight()))) {
                this.scroller.doTouchEnd(e.timeStamp, true)
                this.scroller.triggerPushToLoad(this.footer.loadHeight(), () => {
                    this.footer.onLoading()
                    this.footerStatus = FooterStatus.LOADING
                    this.loadMore(this.callLoadMoreFinish)
                }, true)
                this.isRefresh = true
                return
            }
        }
        this.scroller.doTouchEnd(e.timeStamp, false)
    }
    // 触摸开始事件
    private touchStart(e: TouchEvent) {
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
        this.scrollActionEnd(e)
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
            this.scrollActionEnd(e)
        }, 200)
    }
}
</script>

<style lang="scss">
    .v-easy-refresh {
        width: 100%;
        height: 100%;
        position: relative;
        .v-easy-refresh-body {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            overflow: hidden;
            .v-easy-refresh-float-header-offset, .v-easy-refresh-float-footer-offset {
                width: 100%;
            }
        }
        .v-easy-refresh-header {
            width: 100%;
            position: absolute;
        }
        .v-easy-refresh-footer {
            width: 100%;
            position: absolute;
        }
    }
    .er_user_select_none {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
        user-select: none;
    }
</style>
