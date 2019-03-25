# 代码示例
~~~javascript
<template>
  ....
    <EasyRefresh
            :userSelect="false"
            :onRefresh="onRefresh"
            :loadMore="loadMore">
        <template v-slot:header>
            <MaterialHeader/>
        </template>
        <!-- List -->
        <template v-slot:footer>
            <MaterialFooter/>
        </template>
    </EasyRefresh>
  ....
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    @Component()
    export default class MaterialPage extends Vue {
        private itemCount: number = 20
        private onRefresh(done: () => void) {
            setTimeout(() => {
                this.itemCount = 20
                done()
            }, 1000)
        }
        private loadMore(done: (noMore: boolean) => void) {
            setTimeout(() => {
                if (this.itemCount >= 40) {
                    done(true)
                } else {
                    this.itemCount += 10
                    done(false)
                }
            }, 1000)
        }
    }
</script>

<style lang="scss">
  ....
</style>
~~~

# EasyRefresh

# 属性表格 - EasyRefresh
| 属性名称     |     属性描述     | 参数类型 | 默认值  | 要求 |
|---------|--------------------------|:-----:|:-----:|:-----:|
| onRefresh | 刷新回调     | (done: () => void) => void  | null | 可选(为null时不能刷新,done为停止回调) |
| loadMore      | 加载回调     | (done: (noMore: boolean) => void) => void   |   null |  可选(为null时不能加载,done为停止回调，noMore为是否没有更多数据) |
| onScroll | 列表滚动回调     | (top: number) => void  | null | 可选(top为偏移高度) |
| userSelect | 是否可复制选择     | bool | true | 可选(false可使用鼠标滑动列表) |
| autoLoad | 滑动到底部自动加载     | bool | false | 可选 |
| animating | 使用动画     | bool |true | 可选 |
| animationDuration | 动画时长     | number  | 250 | 可选 |
| bouncing | 回弹效果     | bool  | true | 可选 |
| snapping | item捕捉     | bool | false | 可选 |
| snapWidth | 捕捉宽度     | number | 100 | 可选 |
| snapHeight | 捕捉高度     | number | 100 | 可选 |
| updateHeaderHeight | Header高度更新     | (height: number) => void | null | 可选 |
| headerStatusChanged | Header状态改变     | (status: number) => void | null | 可选 |
| updateFooterHeight | Footer高度更新     | (height: number) => void | null | 可选 |
| footerStatusChanged | Footer状态改变     | (status: number) => void | null | 可选 |

## 方法表格 - EasyRefresh
| 属性名称     |     属性描述     | 参数类型 | 要求 |
|---------|--------------------------|:-----:|:-----:|
| setHeader      | 设置Header     | (header: Header) => void   |  不使用组件时自定义使用 |
| setFooter      | 设置Footer     | (footer: Footer) => void   |  不使用组件时自定义使用 |
| callRefresh      | 触发刷新     | () => void   |  没有刷新或加载时生效 |
| callLoadMore      | 触发加载     | () => void   |  没有刷新或加载时生效 |
| getContainer      | 获取容器     | () => HTMLElement   |  无 |
| getContent      | 获取内容     | () => HTMLElement   |  无 |

# Header
其他Header没有一一列举,请查看相关Header的@Prop属性 [Headers](https://github.com/xuelongqy/vue-easyrefresh/tree/master/src/components/header)

## 属性表格 - EmptyHeader(用于自由定义Header)
| 属性名称     |     属性描述     | 参数类型 | 默认值  | 要求 |
|---------|--------------------------|:-----:|:-----:|:-----:|
| height | 刷新高度     | number  | 70 | 可选 |
| finishDuration | 完成延时(ms)     | number | 1000 | 可选 |
| isFloat | 是否浮动     | bool | false | 可选 |

## 属性表格 - ClassicsHeader
| 属性名称     |     属性描述     | 参数类型 | 默认值  | 要求 |
|---------|--------------------------|:-----:|:-----:|:-----:|
| refreshText | 刷新提示文字     | string  | 'Pull to refresh' | 可选 |
| refreshReadyText      | 准备刷新文字     | string   |   'Release to refresh' |  可选 |
| refreshingText | 正在刷新文字     | string  | 'Refreshing...' | 可选 |
| refreshedText | 刷新完成文字     | string | 'Refresh finished' | 可选 |
| bgColor | 背景颜色     | string | 'transparent' | 可选 |
| textColor | 字体颜色     | string |'#616161' | 可选 |
| showMore | 显示更多信息     | bool  | false | 可选 |
| moreInfo | 更多信息     | string | 'Updated at %T' | 可选('%T'会替换为时间) |
| moreInfoColor | 更多信息颜色     | string | '#aaaaaa' | 可选 |
| height | 刷新高度     | number  | 70 | 可选 |
| finishDuration | 完成延时(ms)     | number | 1000 | 可选 |
| isFloat | 是否浮动     | bool | false | 可选 |

# Footer
其他Footer没有一一列举,请查看相关Footer的@Prop属性 [Footers](https://github.com/xuelongqy/vue-easyrefresh/tree/master/src/components/footer)

## 属性表格 - EmptyFooter(用于自由定义Footer)
| 属性名称     |     属性描述     | 参数类型 | 默认值  | 要求 |
|---------|--------------------------|:-----:|:-----:|:-----:|
| height | 加载高度     | number  | 70 | 可选 |
| finishDuration | 完成延时(ms)     | number | 1000 | 可选 |
| isFloat | 是否浮动     | bool | false | 可选 |

## 属性表格 - ClassicsHeader
| 属性名称     |     属性描述     | 参数类型 | 默认值  | 要求 |
|---------|--------------------------|:-----:|:-----:|:-----:|
| loadText | 加载提示文字     | string  | 'Push to load' | 可选 |
| loadReadyText      | 准备加载文字     | string   |   'Release to load' |  可选 |
| loadingText | 正在加载文字     | string  | 'Loading...' | 可选 |
| noMoreText | 没有更新文字     | string  | 'No more' | 可选 |
| loadedText | 加载完成文字     | string | 'Load finished' | 可选 |
| bgColor | 背景颜色     | string | 'transparent' | 可选 |
| textColor | 字体颜色     | string |'#616161' | 可选 |
| showMore | 显示更多信息     | bool  | false | 可选 |
| moreInfo | 更多信息     | string | 'Updated at %T' | 可选('%T'会替换为时间) |
| moreInfoColor | 更多信息颜色     | string | '#aaaaaa' | 可选 |
| height | 刷新高度     | number  | 70 | 可选 |
| finishDuration | 完成延时(ms)     | number | 1000 | 可选 |
| isFloat | 是否浮动     | bool | false | 可选 |
