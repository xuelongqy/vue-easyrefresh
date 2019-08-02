<template>
    <v-card class="app-bar"
        :elevation="elevation"
        :color="color">
        <div v-if="showBack" class="app-bar-back" @click="goBack">
            <div class="app-bar-back-icon">
                <v-btn text icon color="black">
                    <v-icon :color="titleColor">arrow_back</v-icon>
                </v-btn>
            </div>
        </div>
        <div class="app-bar-title">
            <div class="app-bar-title-box" :style="`color:${titleColor};`">
                {{title}}
            </div>
        </div>
    </v-card>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'

    @Component
    export default class AppBar extends Vue {
        // 标题
        @Prop({default: ''})
        private title!: string
        // 显示返回
        @Prop({default: true})
        private showBack!: boolean
        // 标题颜色
        @Prop({default: '#000000'})
        private titleColor!: string
        // 颜色
        @Prop({default: '#FF9800'})
        private color!: string
        // 阴影
        @Prop({default: 3})
        private elevation!: number

        // 返回
        private goBack() {
            this.$router.back()
        }
    }
</script>

<style lang="scss">
    .app-bar {
        width: 100%;
        height: 60px;
        border-radius: 0;
        z-index: 1000;
        .app-bar-back {
            display: inline-block;
            vertical-align: text-top;
            width: 60px;
            height: 60px;
            .app-bar-back-icon {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: Center;
            }
        }
        .app-bar-title {
            display: inline-block;
            vertical-align: text-top;
            height: 60px;
            margin-left: 15px;
            margin-right: 15px;
            .app-bar-title-box {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: Start;
                color: black;
                font-size: 14pt;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                -o-user-select: none;
                user-select: none;
            }
        }
    }
</style>
