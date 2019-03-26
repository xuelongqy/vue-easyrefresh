# Example
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

# Props Table - EasyRefresh
| Attribute Name     |     Attribute Explain     | Parameter Type | Default Value  | Requirement |
|---------|--------------------------|:-----:|:-----:|:-----:|
| onRefresh | Refresh callback     | (done: () => void) => void  | null | Optional (cannot be refreshed when null, done is to stop callback) |
| loadMore      | Load callback     | (done: (noMore: boolean) => void) => void   |   null |  Optional (cannot be loaded when null, done to stop callback, noMore is no more data) |
| onScroll | List scroll callback     | (top: number) => void  | null | Optional (top is offset height) |
| userSelect | Is it possible to copy the selection?     | bool | true | Optional (false can use the mouse to slide the list) |
| autoLoad | Swipe to the bottom to load automatically     | bool | false | Optional |
| animating | Using animation     | bool |true | Optional |
| animationDuration | Animation duration     | number  | 250 | Optional |
| bouncing | Rebound effect     | bool  | true | Optional |
| snapping | Item snap     | bool | false | Optional |
| snapWidth | Snap width     | number | 100 | Optional |
| snapHeight | Snap height     | number | 100 | Optional |
| updateHeaderHeight | Header height update     | (height: number) => void | null | Optional |
| headerStatusChanged | Header status change     | (status: number) => void | null | Optional |
| updateFooterHeight | Footer height update     | (height: number) => void | null | Optional |
| footerStatusChanged | Footer status change     | (status: number) => void | null | Optional |

## Methods Table - EasyRefresh
| Method Name     |     Method Explain     | Method Type | Requirement |
|---------|--------------------------|:-----:|:-----:|
| setHeader      | Set Header     | (header: Header) => void   |  Custom use when not using components |
| setFooter      | Set Footer     | (footer: Footer) => void   |  Custom use when not using components |
| callRefresh      | Trigger refresh     | () => void   |  Does not take effect when refreshed or loaded |
| callLoadMore      | Trigger loading     | () => void   |  Does not take effect when refreshed or loaded |
| getContainer      | Get container     | () => HTMLElement   |  none |
| getContent      | Get content     | () => HTMLElement   |  none |
| scrollTo      | Scroll to the specified location     | (top: number, animate: boolean) => void   |  Top is height offset, animate is scrolling animation |

# Header
Other Headers are not listed one by one, please check the related Header @Prop properties [Headers](https://github.com/xuelongqy/vue-easyrefresh/tree/master/src/components/header)

## Props Table - EmptyHeader(For free definition of Header)
| Attribute Name     |     Attribute Explain     | Parameter Type | Default Value  | Requirement |
|---------|--------------------------|:-----:|:-----:|:-----:|
| height | Refresh height     | number  | 70 | Optional |
| finishDuration | Completion delay(ms)     | number | 1000 | Optional |
| isFloat | Whether it floats     | bool | false | Optional |

## Props Table - ClassicsHeader
| Attribute Name     |     Attribute Explain     | Parameter Type | Default Value  | Requirement |
|---------|--------------------------|:-----:|:-----:|:-----:|
| refreshText | Refresh prompt text     | string  | 'Pull to refresh' | Optional |
| refreshReadyText      | Ready to refresh text     | string   |   'Release to refresh' |  Optional |
| refreshingText | Refreshing text     | string  | 'Refreshing...' | Optional |
| refreshedText | Refresh completed text     | string | 'Refresh finished' | Optional |
| bgColor | background color     | string | 'transparent' | Optional |
| textColor | text color     | string |'#616161' | Optional |
| showMore | Show more information     | bool  | false | Optional |
| moreInfo | More information     | string | 'Updated at %T' | Optional('%T' will be replaced with time) |
| moreInfoColor | More information color     | string | '#aaaaaa' | Optional |
| height | Refresh height     | number  | 70 | Optional |
| finishDuration | Completion delay(ms)     | number | 1000 | Optional |
| isFloat | Whether it floats     | bool | false | Optional |

# Footer
Other Footers are not listed one by one, please check the related Footer @Prop properties [Footers](https://github.com/xuelongqy/vue-easyrefresh/tree/master/src/components/footer)

## Props Table - EmptyFooter(For free definition of Footer)
| Attribute Name     |     Attribute Explain     | Parameter Type | Default Value  | Requirement |
|---------|--------------------------|:-----:|:-----:|:-----:|
| height | Loading height     | number  | 70 | Optional |
| finishDuration | Completion delay(ms)     | number | 1000 | Optional |
| isFloat | Whether it floats     | bool | false | Optional |

## Props Table - ClassicsHeader
| Attribute Name     |     Attribute Explain     | Parameter Type | Default Value  | Requirement |
|---------|--------------------------|:-----:|:-----:|:-----:|
| loadText | Load prompt text     | string  | 'Push to load' | Optional |
| loadReadyText      | Ready to load text     | string   |   'Release to load' |  Optional |
| loadingText | Loading text     | string  | 'Loading...' | Optional |
| noMoreText | No more text     | string  | 'No more' | Optional |
| loadedText | Load completed text     | string | 'Load finished' | Optional |
| bgColor | background color     | string | 'transparent' | Optional |
| textColor | text color     | string |'#616161' | Optional |
| showMore | Show more information     | bool  | false | Optional |
| moreInfo | More information     | string | 'Updated at %T' | Optional('%T' will be replaced with time) |
| moreInfoColor | More information color     | string | '#aaaaaa' | Optional |
| height | Loading height     | number  | 70 | Optional |
| finishDuration | Completion delay(ms)     | number | 1000 | Optional |
| isFloat | Whether it floats     | bool | false | Optional |
