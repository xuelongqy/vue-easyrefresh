<template>
    <div id="app">
        <EasyRefresh
                ref="easyRefresh"
                :userSelect="false"
                :onRefresh="onRefresh"
                :loadMore="loadMore">
            <template v-slot:header>
                <BallPulseHeader/>
            </template>
            <div v-for="(item, index) in items"
                 class="row" :class="{'grey-bg': index % 2 == 0}">
                {{ item }}
            </div>
            <template v-slot:footer>
                <BallPulseFooter/>
            </template>
        </EasyRefresh>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import EasyRefresh from './components/EasyRefresh.vue'
import ClassicsHeader from './components/header/ClassicsHeader.vue'
import MaterialHeader from './components/header/MaterialHeader.vue'
import MaterialFooter from './components/footer/MaterialFooter.vue'
import BallPulseFooter from './components/footer/BallPulseFooter.vue'
import BallPulseHeader from './components/header/BallPulseHeader.vue'

@Component({
    components: {
        EasyRefresh,
        ClassicsHeader,
        MaterialHeader,
        MaterialFooter,
        BallPulseHeader,
        BallPulseFooter,
    },
})
export default class App extends Vue {
    // EasyRefresh
    private easyRefresh!: EasyRefresh
    // 数据
    private items: number[] = []

    // 初始化
    private mounted() {
        for (let i = 1; i <= 20; i++) {
            this.items.push(i)
        }
        this.easyRefresh = this.$refs.easyRefresh as EasyRefresh
    }

    // 刷新回调
    private onRefresh(done: () => void) {
        setTimeout(() => {
            this.items = []
            for (let i = 1; i <= 20; i++) {
                this.items.push(i)
            }
            done()
        }, 1000)
    }

    // 加载回调
    private loadMore(done: (noMore: boolean) => void) {
        setTimeout(() => {
            if (this.items.length >= 40) {
                done(true)
            } else {
                for (let i = 1; i <= 20; i++) {
                    this.items.push(i)
                }
                done(false)
            }
        }, 1000)
    }
}
</script>

<style lang="scss">
    body {
        margin: 0;
    }

    #app {
        position: fixed;
        margin: 0;
        width: 100%;
        height: 100%;

        .row {
            width: 100%;
            height: 30px;
            padding: 10px 0;
            font-size: 15px;
            line-height: 30px;
            text-align: center;
            color: #444;
            background-color: #fff;
        }

        .grey-bg {
            background-color: #eee;
        }
    }
</style>
