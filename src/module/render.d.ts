export as namespace ScrollerRenderLib
export = getContentRender

declare function getContentRender(content: HTMLElement | null): (left: number, top: number, zoom: number) => void
