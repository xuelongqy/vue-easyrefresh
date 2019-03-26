/**
 * 进度条接口
 */
interface Progress {
    // 设置Content高度
    setClientHeight(height: number): void
    // 更新进度条(length进度条长度;top顶部偏移量;Scale进度比例) 注:并不一定根据指定参数设置
    updateProgress(length: number, top: number, scale: number): void
}

export default Progress
