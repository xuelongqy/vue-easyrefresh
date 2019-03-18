<template>
    <div class="home-page">
        <div class="home-content">
            <router-view></router-view>
        </div>
        <v-bottom-nav
            :active.sync="pageIndex"
            :value="true"
            color="transparent"
            absolute>
            <v-btn color="black" text>
                <span>{{this.$t('home.sample')}}</span>
                <v-icon>dashboard</v-icon>
            </v-btn>

            <v-btn color="black" text>
                <span>{{this.$t('home.style')}}</span>
                <v-icon>style</v-icon>
            </v-btn>

            <v-btn color="black" text>
                <span>{{this.$t('home.more')}}</span>
                <v-icon>more_vert</v-icon>
            </v-btn>
        </v-bottom-nav>
    </div>
</template>

<script lang="ts">
import {Component, Watch, Vue} from 'vue-property-decorator'

@Component
export default class HomePage extends Vue {
    // 页面下标
    private pageIndex: number = 0

    // 页面切换
    @Watch('pageIndex')
    private pageChange() {
        if (this.pageIndex === 0) {
            this.$router.push('/home/sample')
        } else if (this.pageIndex === 1) {
            this.$router.push('/home/style')
        } else if (this.pageIndex === 2) {
            this.$router.push('/home/more')
        } else {
            this.$router.push('/home')
        }
    }
}
</script>

<style lang="scss">
    .home-page {
        width: 100%;
        height: 100%;
        .home-content {
            width: 100%;
            height: calc(100% - 56px);
        }
    }
</style>
