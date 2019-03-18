<template>
    <v-card class="app-bar"
        elevation="3"
        :color="color">
        <div v-if="showBack" class="app-bar-back" @click="goBack">
            <div class="app-bar-back-icon">
                <v-btn text icon color="black">
                    <v-icon>arrow_back</v-icon>
                </v-btn>
            </div>
        </div>
        <div class="app-bar-title">
            <div class="app-bar-title-box">
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
        @Prop({default: ""})
        private title!: string
        // 显示返回
        @Prop({default: true})
        private showBack!: boolean
        // 颜色
        @Prop({default: "orange"})
        private color!: string

        // 返回
        private goBack() {
            history.back()
        }
    }
</script>

<style lang="scss">
    .app-bar {
        width: 100%;
        height: 60px;
        border-radius: 0;
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
            }
        }
    }
</style>
