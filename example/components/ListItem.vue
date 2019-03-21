<template>
    <div v-ripple class="list-item">
        <div class="list-item-left">
            <div class="list-item-icon">
                <slot name="icon"></slot>
            </div>
        </div>
        <div class="list-item-content">
            <div class="list-item-content-box">
                <div class="list-item-title" :style="`color: ${titleColor};`">{{title}}</div>
                <div v-if="describe !== null" class="list-item-describe" :style="`color: ${describeColor};`">{{describe}}</div>
            </div>
        </div>
        <div class="list-item-right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'

    /**
     * 列表项
     */
    @Component
    export default class ListItem extends Vue {
        // 标题
        @Prop({default: ''})
        private title!: string
        @Prop({default: '#000000'})
        private titleColor!: string
        // 描述
        @Prop({default: null})
        private describe!: string | null
        @Prop({default: '#9E9E9E'})
        private describeColor!: string
    }
</script>

<style lang="scss">
    .list-item {
        width: 100%;
        height: 60px;
        .list-item-left {
            display: inline-block;
            vertical-align: text-top;
            max-height: 100%;
            width: 60px;
            height: 100%;
            .list-item-icon {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: Center;
            }
        }
        .list-item-content {
            display: inline-block;
            vertical-align: text-top;
            height: 100%;
            .list-item-content-box {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: Start;
                .list-item-title {
                    font-size: 11pt;
                    font-weight: bold;
                    line-height: 14pt;
                }
                .list-item-describe {
                    font-size: 9pt;
                    line-height: 14pt;
                }
            }
        }
        .list-item-right {
            display: inline-block;
            vertical-align: text-top;
            float: right;
            height: 100%;
            width: 60px;
            margin-right: 15px;
        }
    }
</style>
