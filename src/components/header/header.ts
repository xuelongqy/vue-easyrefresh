// Header状态
enum RefreshHeaderStatus {
    NO_REFRESH = 1,
    REFRESH_START = 2,
    REFRESH_READY = 3,
    REFRESHING = 4,
    REFRESHED = 5,
    REFRESH_END = 6,
}

// Header接口
interface RefreshHeader {
    // 刷新高度
    refreshHeight(): number
    // 完成延时(ms)
    headerFinishDuration(): number
    // 是否浮动
    isHeaderFloat(): boolean
    // 高度更新
    updateHeaderHeight(height: number): void
    // 开始刷新
    onRefreshStart(): void
    // 准备刷新
    onRefreshReady(): void
    // 刷新恢复
    onRefreshRestore(): void
    // 正在刷新
    onRefreshing(): void
    // 刷新完成
    onRefreshed(): void
    // 刷新结束
    onRefreshEnd(): void
    // 刷新关闭
    onRefreshClose(): void
}

export { RefreshHeader as Header, RefreshHeaderStatus as HeaderStatus }
