<template>
  <div id="app">
    <EasyRefresh
        :userSelect="false"
        :instance="easyRefreshInstance"
        :header="header">
      <ClassicsHeader slot="header" :instance="headerInstance"/>
      <div v-for="(item, index) in items"
           class="row" :class="{'grey-bg': index % 2 == 0}">
        {{ item }}
      </div>
    </EasyRefresh>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EasyRefresh from './components/EasyRefresh.vue'
import ClassicsHeader from './components/header/ClassicsHeader.vue'
import { Header } from './components/header/header'
import { Footer } from './components/footer/footer'

@Component({
  components: {
    EasyRefresh,
    ClassicsHeader,
  },
})
export default class App extends Vue {
  // EasyRefresh
  private easyRefresh!: EasyRefresh
  // Header
  private header: Header | null = null
  // 数据
  private items: number[] = []

  // 初始化
  private mounted() {
    for (let i = 1; i <= 20; i++) {
      this.items.push(i)
    }
  }

  // 刷新方法
  private onRefresh(done: () => void) {
    done()
  }

  // EasyRefresh实例
  private easyRefreshInstance(obj: EasyRefresh) {
    this.easyRefresh = obj
  }
  // Header实例
  private headerInstance(obj: Header) {
    this.header = obj
  }
}
</script>

<style lang="scss">
  #app {
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
