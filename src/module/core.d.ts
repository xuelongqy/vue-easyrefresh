export as namespace EasyRefreshLib
export = Scroller

declare class Scroller {
    constructor(render: (left: number, top: number, zoom: number) => void, options: object)
    public activatePullToRefresh(height: number, activateCallback: () => void, deactivateCallback: () => void, startCallback: () => void): void
    public getValues(): {left: number, top: number, zoom: number}
    public setPosition(left: number, top: number): void
    public setSnapSize(width: number, height: number): void
    public setDimensions(clientWidth: number, clientHeight: number, contentWidth: number, contentHeight: number): void
    public finishPullToRefresh(): void
    public triggerPullToRefresh(height: number, callBack: () => void): void
    public finishPushToLoad(): void
    public triggerPushToLoad(height: number, callBack: (scroll: boolean) => void, scroll: boolean): void
    public scrollTo(left: number, top: number, animate: boolean, zoom: number | null): void
    public scrollBy(left: number, top: number, animate: boolean): void
    public scrollPublishTo(left: number, top: number, animate: boolean): void
    public doTouchStart(touches: TouchList | object[], timeStamp: number): void
    public doTouchMove(touches: TouchList | object[], timeStamp: number): void
    public doTouchEnd(timeStamp: number, refreshActivate: boolean): void
    public computeScrollMax(): void
}
