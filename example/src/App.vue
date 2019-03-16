<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class App extends Vue {

}
</script>

<style lang="scss">
    $material-design-icons-font-path: '~material-design-icons-iconfont/dist/fonts/';
    @import '~material-design-icons-iconfont/src/material-design-icons';
    @import '~vuetify/dist/vuetify.min.css';

    body {
        margin: 0;
    }

    #app {
        position: fixed;
        margin: 0;
        width: 100%;
        height: 100%;
    }
</style>
