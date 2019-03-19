// Footer状态
enum RefreshFooterStatus {
    NO_LOAD = 1,
    LOAD_START = 2,
    LOAD_READY = 3,
    LOADING = 4,
    LOADED = 5,
    LOAD_END = 6,
}

// Footer接口
export default interface FooterHeader {
    // 加载高度
    loadHeight(): number
    // 完成延时(ms)
    footerFinishDuration(): number
    // 是否浮动
    isFooterFloat(): boolean
    // 高度更新
    updateFooterHeight(height: number): void
    // 开始加载
    onLoadStart(): void
    // 准备加载
    onLoadReady(): void
    // 加载恢复
    onLoadRestore(): void
    // 正在加载
    onLoading(): void
    // 加载完成
    onLoaded(): void
    // 没有更多
    onNoMore(): void
    // 加载结束
    onLoadEnd(): void
    // 加载关闭
    onLoadClose(): void
}

export { FooterHeader as Footer, RefreshFooterStatus as FooterStatus }
