export as namespace EasyRefreshLib
export = getContentRender

declare function getContentRender(content: HTMLElement | null, callBack: (left: number, top: number, zoom: number) => void): (left: number, top: number, zoom: number) => void
