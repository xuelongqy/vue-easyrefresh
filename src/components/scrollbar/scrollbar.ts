/**
 * 滚动条接口
 */
import Scroller from '@/module/core'

interface ScrollBar {
    // 设置Scroller(绑定滚动条)
    setScroller(scroller: Scroller): void
    // 设置Content高度
    setClientHeight(height: number): void
    // 更新滚动条(length滚动条长度;top顶部偏移量;Scale滚动比例) 注:并不一定根据指定参数设置
    updateScrollBar(length: number, top: number, scale: number): void
}

export default ScrollBar
