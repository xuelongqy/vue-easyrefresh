import {VueConstructor} from 'vue'
import {Header} from './src/components/header/header'
import {Footer} from './src/components/footer/footer'

export default class EasyRefresh {
    public static install: (Vue: VueConstructor) => void
    public setHeader: (header: Header) => void
    public setFooter: (footer: Footer) => void
    public callRefresh: () => void
    public callLoadMore: () => void
    public getContainer: () => HTMLElement
    public getContent: () => HTMLElement
}
