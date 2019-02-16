<template>
  <div id="app">
    <EasyRefresh
        ref="easyRefresh"
        :userSelect="false"
        :onRefresh="onRefresh"
        :loadMore="loadMore">
      <template v-slot:header>
        <ClassicsHeader/>
      </template>
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

@Component({
  components: {
    EasyRefresh,
    ClassicsHeader,
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
    done()
  }

  // 加载回调
  private loadMore(done: () => void) {
    done()
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
