<template>
    <div class="strip-list">
        <div v-for="num in count"
             class="list-row" :class="{'grey-bg': num % 2 === 1}">
            {{ num }}
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'

    /**
     * 条纹列表组件
     */
    @Component
    export default class StripeList extends Vue {
        // 数量
        @Prop({default: 0})
        private count!: number
    }
</script>

<style lang="scss">
    .strip-list {
        width: 100%;
        .list-row {
            display: flex;
            justify-content:center;
            align-items:Center;
            width: 100%;
            height: 50px;
            font-size: 15px;
            text-align: center;
            color: #444;
            background-color: #fff;
        }
        .grey-bg {
            background-color: #eee;
        }
    }
</style>
