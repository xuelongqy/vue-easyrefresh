<template>
    <div class="v-easy-refresh">
        <div class="v-easy-refresh-body" :id="easyRefreshId"
             :class="{'er_user_select_none': !userSelect}"
             @touchstart="touchStart($event)"
             @mousedown="mouseDown($event)"
             @wheel="wheel($event)">
            <div :id="contentId">
                <div class="v-easy-refresh-float-offset" :style="'margin-top: ' + floatTop + 'px;'"></div>
                <slot></slot>
                <div v-if="autoLoad" class="v-easy-auto-load-offset" :style="'height: ' + footerOffset + 'px;'"></div>
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
        <div :style="`showScrollBar ? '':'display:none;'`">
            <slot name="scrollbar">
                <ClassicsScrollBar ref="progress"/>
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
    import Scroller from '../../module/core'
    import getContentRender from '../../module/render'
    import ClassicsHeader from '../header/ClassicsHeader'
    import ClassicsFooter from '../footer/ClassicsFooter'
    import { Header, HeaderStatus } from '../header/header'
    import { Footer, FooterStatus } from '../footer/footer'
    import ScrollBar from '@/components/scrollbar/scrollbar'
    import ClassicsScrollBar from '@/components/scrollbar/ClassicsScrollBar/ClassicsScrollBar.vue'

    // Header回调状态
    enum HeaderCallBackStatus {
        START = 1,
        READY = 2,
        REFRESHING = 3,
        REFRESHED = 4,
        RESTORE = 5,
        END = 6,
        CLOSE = 7,
    }
    // Footer回调状态
    enum FooterCallBackStatus {
        START = 1,
        READY = 2,
        LOADING = 3,
        LOADED = 4,
        NO_MORE = 5,
        RESTORE = 6,
        END = 7,
        CLOSE = 8,
    }

    @Component({
        components: {
            ClassicsHeader,
            ClassicsFooter,
            ClassicsScrollBar,
        },
    })
    export default class EasyRefresh extends Vue {
        // Header
        private header!: Header
        // Footer
        private footer!: Footer
        // ScrollBar
        private scrollBar!: ScrollBar

        @Prop() // 刷新回调
        private onRefresh!: (done: () => void) => void
        @Prop() // 加载回调
        private loadMore!: (done: (noMore: boolean) => void) => void
        @Prop() // 滚动回调
        private onScroll!: (top: number) => void
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
        @Prop({default: null}) // Header高度更新
        private updateHeaderHeight!: (height: number) => void
        @Prop({default: null}) // Header状态改变
        private headerStatusChanged!: (status: number) => void
        @Prop({default: null}) // Footer高度更新
        private updateFooterHeight!: (height: number) => void
        @Prop({default: null}) // Footer状态改变
        private footerStatusChanged!: (status: number) => void
        @Prop({default: false}) // 显示滚动条
        private showScrollBar!: boolean

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
        // Header和Footer的位置
        private headerBottom: number = 0
        private footerTop: number = 0
        // 浮动布局的偏移
        private floatTop: number = 0
        // 底部偏移量
        private footerOffset: number = 0
        // 是否正在刷新/加载
        private isRefresh: boolean = false
        // 没有更多数据
        private noMore: boolean = false

        // 设置Header和Footer
        public setHeader(header: Header) {
            this.header = header
        }
        public setFooter(footer: Footer) {
            this.footer = footer
            this.footerOffset = footer.loadHeight()
        }
        // 设置ScrollBar
        public setScrollBar(scrollBar: ScrollBar) {
            this.scrollBar = scrollBar
            // 绑定滚动条
            this.scrollBar.setScroller(this.scroller)
        }

        // 触发刷新
        public callRefresh() {
            if (this.isRefresh) { return }
            this.header.onRefreshStart()
            this.header.onRefreshReady()
            this.scroller.triggerPullToRefresh(this.header.refreshHeight() + 30, () => {
                this.scroller.triggerPullToRefresh(this.header.refreshHeight(), () => {
                    this.header.onRefreshing()
                    this.changeHeaderStatus(HeaderCallBackStatus.REFRESHING)
                    if (this.noMore) {
                        this.noMore = false
                        this.footer.onLoadClose()
                    }
                    this.headerStatus = HeaderStatus.REFRESHING
                    this.onRefresh(this.callRefreshFinish)
                })
            })
            this.isRefresh = true
        }
        // 触发加载
        public callLoadMore() {
            if (this.isRefresh || this.noMore) { return }
            this.footer.onLoadStart()
            this.footer.onLoadReady()
            this.scroller.triggerPushToLoad(this.footer.loadHeight() + 30, () => {
                this.scroller.triggerPushToLoad(this.footer.loadHeight(), () => {
                    this.footer.onLoading()
                    this.changeFooterStatus(FooterCallBackStatus.LOADING)
                    this.footerStatus = FooterStatus.LOADING
                    this.loadMore(this.callLoadMoreFinish)
                }, true)
            }, true)
            this.isRefresh = true
        }

        // 获取container
        public getContainer(): HTMLElement {
            return this.container as HTMLElement
        }
        // 获取content
        public getContent(): HTMLElement {
            return this.content as HTMLElement
        }

        // 改变Header状态
        private changeHeaderStatus(status: HeaderCallBackStatus) {
            if (this.headerStatusChanged) {
                this.headerStatusChanged(status)
            }
        }
        // 改变Footer状态
        private changeFooterStatus(status: FooterCallBackStatus) {
            if (this.footerStatusChanged) {
                this.footerStatusChanged(status)
            }
        }

        // 滚动到指定位置
        private scrollTo(top: number, animate: boolean) {
            this.scroller.scrollTo(0, top, animate, null)
        }
        private scrollPublishTo(top: number, animate: boolean) {
            this.scroller.scrollPublishTo(0, top, animate)
        }

        // 初始化
        private mounted() {
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
            // 获取Footer,Header和ScrollBar
            for (const node of this.$children) {
                if (node.hasOwnProperty('refreshHeight') && !this.header) {
                    this.setHeader((node as unknown) as Header)
                } else if (node.hasOwnProperty('loadHeight') && !this.footer) {
                    this.setFooter((node as unknown) as Footer)
                } else if (node.hasOwnProperty('updateScrollBar') && !this.scrollBar) {
                    this.setScrollBar((node as unknown) as ScrollBar)
                }
            }
            // 监听大小变化
            this.onResize()
            // 初始化Header和Footer的top值
            this.headerBottom = -this.container!!.clientHeight
            this.footerTop = this.container!!.clientHeight + 1000
            window.addEventListener('resize', this.onResize)
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

        // 大小改变
        private onResize() {
            const container = this.container
            const content = this.content
            this.scroller.setDimensions(container!!.clientWidth, container!!.clientHeight,
                content!!.offsetWidth, content!!.offsetHeight)
            // 如果不需要加载更多，则计算footer位置
            if (this.loadMore) {
                this.footerTop = this.container!!.clientHeight
            }
            // 计算滚动条
            this.scrollBar.setClientHeight(container!!.clientHeight)
            const {left, top, zoom} = this.scroller.getValues()
            this.updateScrollBar(top)
        }

        // 监听是否正在刷新
        @Watch('isRefresh')
        private onRefreshChange() {
            // 如果刷新结束,则重新计算列表大小
            if (!this.isRefresh) {
                const container = this.container
                const content = this.content
                this.scroller.setDimensions(container!!.clientWidth, container!!.clientHeight,
                    content!!.offsetWidth, content!!.offsetHeight)
                this.scroller.computeScrollMax()
                // 更新滚动条
                const {left, top, zoom} = this.scroller.getValues()
                this.updateScrollBar(top)
            }
        }

        // 更新滚动条
        private updateScrollBar(top: number) {
            if (!this.showScrollBar) { return }
            // 超出长度
            let exceededLength
            // 顶部距离
            let topOffset = 0
            // 滚动条长度
            let scrollBarLength = 0
            // 滚动比例
            let scrollBarScale = 0
            // 列表可滚动的距离
            const scrollableDistance = this.content!!.offsetHeight - this.container!!.clientHeight
            if (this.container!!.clientHeight > this.content!!.offsetHeight) {
                scrollBarLength = 0
                return
            } else if (top < 0) {
                exceededLength = -top
                scrollBarLength = this.container!!.clientHeight *
                    this.container!!.clientHeight / (this.content!!.offsetHeight + exceededLength)
                topOffset = 0
                scrollBarScale = 0
            } else if (top > scrollableDistance) {
                exceededLength = top - scrollableDistance
                scrollBarLength = this.container!!.clientHeight *
                    this.container!!.clientHeight / (this.content!!.offsetHeight + exceededLength)
                topOffset = this.container!!.clientHeight - scrollBarLength
                scrollBarScale = 1
            } else {
                // exceededLength = 0
                scrollBarLength = this.container!!.clientHeight *
                    this.container!!.clientHeight / this.content!!.offsetHeight
                scrollBarScale = top / (this.content!!.offsetHeight - this.container!!.clientHeight)
                topOffset = scrollBarScale * (this.container!!.clientHeight - scrollBarLength)
            }
            this.scrollBar.updateScrollBar(scrollBarLength, topOffset, scrollBarScale)
        }

        // 滚动回调
        private scrollerCallBack(left: number, top: number, zoom: number) {
            // 更新滚动条
            this.updateScrollBar(top)
            // 调用滚动回调
            if (this.onScroll) {
                this.onScroll(top)
            }
            if (!this.header || !this.footer) { return }
            // 设置Header和Footer的位置
            if (this.onRefresh) {
                this.headerBottom = this.container!!.clientHeight + top
            }
            if (this.loadMore) {
                // 如果没有超过底部则显示在底部
                if (this.content!!.clientHeight < this.container!!.clientHeight) {
                    this.footerTop = this.container!!.clientHeight - top
                } else {
                    // 判断是否自动加载
                    if (this.autoLoad && this.footer) {
                        this.footerTop = -top + this.content!!.offsetHeight - this.footer.loadHeight()
                    } else {
                        this.footerTop = -top + this.content!!.offsetHeight
                    }
                }
            }
            // 列表可滚动的距离
            let scrollableDistance
            if (this.autoLoad && this.footer) {
                scrollableDistance = this.content!!.offsetHeight - this.container!!.clientHeight - this.footer.loadHeight()
            } else {
                scrollableDistance = this.content!!.offsetHeight - this.container!!.clientHeight
            }
            if (top < 0) { // 显示Header
                if (!this.onRefresh) { return }
                // 更新Header高度
                this.header.updateHeaderHeight(-top)
                if (this.updateHeaderHeight) {
                    this.updateHeaderHeight(-top)
                }
                // 判断是否为浮动布局
                if (this.header.isHeaderFloat()) {
                    this.floatTop = top;
                }
                if (this.headerStatus === HeaderStatus.NO_REFRESH
                    && this.userScrolling) {
                    // 刷新开始
                    this.header.onRefreshStart()
                    this.changeHeaderStatus(HeaderCallBackStatus.START)
                    this.headerStatus = HeaderStatus.REFRESH_START
                } else if (this.headerStatus === HeaderStatus.REFRESH_START &&
                    -top > this.header.refreshHeight() &&
                    this.userScrolling && !this.isRefresh) {
                    // 准备刷新
                    this.header.onRefreshReady()
                    this.changeHeaderStatus(HeaderCallBackStatus.READY)
                    this.headerStatus = HeaderStatus.REFRESH_READY
                } else if (this.headerStatus === HeaderStatus.REFRESH_READY &&
                    -top < this.header.refreshHeight() &&
                    this.userScrolling) {
                    // 刷新恢复
                    this.header.onRefreshRestore()
                    this.changeHeaderStatus(HeaderCallBackStatus.RESTORE)
                    this.headerStatus = HeaderStatus.REFRESH_START
                }
            } else if (top > 0 && top > scrollableDistance) { // 显示Footer
                if (!this.loadMore) { return }
                if (top === 0) { return }
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
                    if (this.updateFooterHeight) {
                        this.updateFooterHeight(this.footer.loadHeight())
                    }
                    this.footer.onLoading()
                    this.changeFooterStatus(FooterCallBackStatus.LOADING)
                    this.footerStatus = FooterStatus.LOADING
                    if (!this.isRefresh) {
                        this.loadMore(this.callLoadMoreFinish)
                        this.isRefresh = true
                    }
                    return
                }
                this.footer.updateFooterHeight(footerHeight)
                if (this.updateFooterHeight) {
                    this.updateFooterHeight(footerHeight)
                }
                if (this.noMore) { return }
                if (this.footerStatus === FooterStatus.NO_LOAD &&
                    this.userScrolling) {
                    // 开始加载
                    this.footer.onLoadStart()
                    this.changeFooterStatus(FooterCallBackStatus.START)
                    this.footerStatus = FooterStatus.LOAD_START
                } else if (this.footerStatus === FooterStatus.LOAD_START &&
                    footerHeight > this.footer.loadHeight() &&
                    this.userScrolling && !this.isRefresh) {
                    // 准备加载
                    this.footer.onLoadReady()
                    this.changeFooterStatus(FooterCallBackStatus.READY)
                    this.footerStatus = FooterStatus.LOAD_READY
                } else if (this.footerStatus === FooterStatus.LOAD_READY &&
                    footerHeight < this.footer.loadHeight() &&
                    this.userScrolling) {
                    // 恢复加载
                    this.footer.onLoadRestore()
                    this.changeFooterStatus(FooterCallBackStatus.RESTORE)
                    this.footerStatus = FooterStatus.LOAD_START
                }
            } else {
                // 刷新关闭
                if ((this.headerStatus === HeaderStatus.REFRESH_START
                    || this.headerStatus === HeaderStatus.REFRESH_READY
                    || this.headerStatus === HeaderStatus.REFRESHED
                    || this.headerStatus === HeaderStatus.REFRESH_END)
                    && this.onRefresh) {
                    this.header.onRefreshClose()
                    this.changeHeaderStatus(HeaderCallBackStatus.CLOSE)
                    this.headerStatus = HeaderStatus.NO_REFRESH
                }
                // 加载关闭
                if ((this.footerStatus === FooterStatus.LOAD_START
                    || this.footerStatus === FooterStatus.LOAD_READY
                    || this.footerStatus === FooterStatus.LOADED
                    || this.footerStatus === FooterStatus.LOAD_END)
                    && this.loadMore) {
                    if (!this.noMore && this.isRefresh) {
                        this.isRefresh = false
                        // 判断Footer是否浮动
                        if (this.footer.isFooterFloat()) {
                            this.floatTop = 0;
                            this.scroller.scrollBy(0, top, false)
                        }
                        this.footer.onLoadClose()
                        this.changeFooterStatus(FooterCallBackStatus.CLOSE)
                    }
                    this.footerStatus = FooterStatus.NO_LOAD
                }
            }
        }
        // 刷新完成回调
        private callRefreshFinish() {
            // 注释以去掉刷新后回调顶部
            // this.scroller.triggerPullToRefresh(this.header.refreshHeight(), () => {})
            this.userScrolling = false
            this.mousedown = false
            this.wheelScrolling = false
            this.headerStatus = HeaderStatus.REFRESHED
            this.header.onRefreshed()
            this.changeHeaderStatus(HeaderCallBackStatus.REFRESHED)
            setTimeout(() => {
                this.header.onRefreshEnd()
                this.changeHeaderStatus(HeaderCallBackStatus.END)
                this.isRefresh = false
                this.headerStatus = HeaderStatus.REFRESH_END
                // 判断刷新过程中是否滑动到其他位置
                const {left, top, zoom} = this.scroller.getValues()
                if (-top !== this.header.refreshHeight()) {
                    this.header.onRefreshClose()
                    this.changeHeaderStatus(HeaderCallBackStatus.CLOSE)
                    this.headerStatus = HeaderStatus.NO_REFRESH
                    this.header.updateHeaderHeight(0)
                    if (this.updateHeaderHeight) {
                        this.updateHeaderHeight(0)
                    }
                }
                this.scroller.finishPullToRefresh()
            }, this.header.headerFinishDuration())
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
                    this.changeFooterStatus(FooterCallBackStatus.NO_MORE)
                } else {
                    this.footer.onLoaded()
                    this.changeFooterStatus(FooterCallBackStatus.LOADED)
                }
                setTimeout(() => {
                    if (this.footerStatus === FooterStatus.NO_LOAD) {
                        return
                    }
                    if (!this.noMore) {
                        this.footer.onLoadEnd()
                        this.changeFooterStatus(FooterCallBackStatus.END)
                    }
                    this.isRefresh = false
                    this.footerStatus = FooterStatus.LOAD_END
                    if (scroll) {
                        this.scroller.finishPushToLoad()
                    } else {
                        if (!this.noMore) {
                            this.floatTop = 0;
                            this.footer.onLoadClose()
                            this.changeFooterStatus(FooterCallBackStatus.CLOSE)
                        }
                        this.footerStatus = FooterStatus.NO_LOAD
                        this.footerTop = this.container!!.clientHeight
                        if (this.updateFooterHeight) {
                            this.updateFooterHeight(0)
                        }
                    }
                }, this.autoLoad || !noMore ? 0 : this.footer.footerFinishDuration())
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
                        this.changeHeaderStatus(HeaderCallBackStatus.REFRESHING)
                        if (this.noMore) {
                            this.noMore = false
                            this.footer.onLoadClose()
                        }
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
                        this.changeFooterStatus(FooterCallBackStatus.LOADING)
                        this.footerStatus = FooterStatus.LOADING
                        this.loadMore(this.callLoadMoreFinish)
                    }, true)
                    this.isRefresh = true
                    return
                }
            }
            // 如果是滚轮则归位
            if (e instanceof  WheelEvent) {
                this.scrollTo(this.scroller.getValues().top, true);
                return
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
            if (!this.mousedown) {return}
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
            if (this.wheelScrolling || this.isRefresh) {
                // 清除上一次计时
                clearTimeout(this.wheelTimer)
            } else {
                this.wheelScrolling = true
                this.userScrolling = true
                this.onResize()
            }
            // 判断是否到达最大高度
            const scrollerValue = this.scroller.getValues()
            // 列表可滚动的距离
            const scrollableDistance = this.content!!.offsetHeight - this.container!!.clientHeight
            if (scrollerValue.top > - 60 - 50 &&
                ((scrollableDistance >= 0 && scrollerValue.top < scrollableDistance + 60 + 50) ||
                ((scrollableDistance < 0 && scrollerValue.top < 60 + 50)))) {
                this.scrollPublishTo(scrollerValue.top + e.deltaY, false);
            }
            // 设置计时器,结束滚动
            this.wheelTimer = setTimeout(() => {
                this.wheelScrolling = false
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
        overflow: hidden;
        touch-action: none;
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
