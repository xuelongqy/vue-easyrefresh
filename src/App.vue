<template>
  <div id="app">
    <EasyRefresh :userSelect="false">
      <div v-for="(item, index) in items"
           class="row" :class="{'grey-bg': index % 2 == 0}">
        {{ item }}
      </div>
    </EasyRefresh>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EasyRefresh from './components/EasyRefresh.vue';

@Component({
  components: {
    EasyRefresh,
  },
})
export default class App extends Vue {
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
