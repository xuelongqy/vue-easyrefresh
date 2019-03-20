<template>
    <div class="home-page">
        <div class="home-content">
            <router-view></router-view>
        </div>
        <v-bottom-navigation
            v-model="page"
            color="transparent"
            absolute
            grow>
            <v-btn color="black" text value="sample" @click.navite="page='sample'">
                <span>{{this.$t('home.sample')}}</span>
                <v-icon>dashboard</v-icon>
            </v-btn>

            <v-btn color="black" text value="style" @click.navite="page='style'">
                <span>{{this.$t('home.style')}}</span>
                <v-icon>style</v-icon>
            </v-btn>

            <v-btn color="black" text value="more" @click.navite="page='more'">
                <span>{{this.$t('home.more')}}</span>
                <v-icon>more_vert</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </div>
</template>

<script lang="ts">
import {Component, Watch, Vue} from 'vue-property-decorator'

@Component
export default class HomePage extends Vue {
    // 页面下标
    private page: string = 'sample'

    // 初始化
    public mounted() {
        // 获取当前路由跳转到指定页面
        this.page = this.$route.name as string
    }

    // 页面切换
    @Watch('page')
    private pageChange() {
        if (this.page === 'sample') {
            this.$router.push('/home/sample')
        } else if (this.page === 'style') {
            this.$router.push('/home/style')
        } else if (this.page === 'more') {
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
