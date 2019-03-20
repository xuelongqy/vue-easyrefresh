<template>
    <div class="support-page">
        <AppBar :title="$t('more.supportAuthor')"/>
        <div class="support-page-list">
            <EasyRefresh :userSelect="false">
                <!--Star项目-->
                <ListItem
                        :title="$t('more.star')"
                        @click.native="openProjectAddress">
                    <template v-slot:icon>
                        <v-icon size="25" color="orange">star</v-icon>
                    </template>
                </ListItem>
                <!--支付宝-->
                <ListItem
                        :title="$t('more.aliPay')"
                        @click.native="openProjectAddress">
                    <template v-slot:icon>
                        <AliPay class="list-icon"/>
                    </template>
                </ListItem>
                <!--微信-->
                <ListItem
                        :title="$t('more.weiXinPay')"
                        @click.native="$router.push('/ball-push')">
                    <template v-slot:icon>
                        <WeiXin class="list-icon"/>
                    </template>
                </ListItem>
                <!--QQ支付-->
                <ListItem
                        :title="$t('more.qqPay')"
                        @click.native="openProjectAddress">
                    <template v-slot:icon>
                        <QQ class="list-icon"/>
                    </template>
                </ListItem>
                <!--PayPal-->
                <ListItem
                        :title="$t('more.payPal')"
                        @click.native="openPayPal">
                    <template v-slot:icon>
                        <PayPal class="list-icon"/>
                    </template>
                </ListItem>
            </EasyRefresh>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import ListItem from '../../components/ListItem.vue'
    import AppBar from '../../components/AppBar.vue'
    import AliPay from '../../icon/AliPay.vue'
    import WeiXin from '../../icon/WeiXin.vue'
    import QQ from '../../icon/QQ.vue'
    import PayPal from '../../icon/PayPal.vue'

    @Component({
        components: {
            ListItem,
            AppBar,
            AliPay,
            WeiXin,
            QQ,
            PayPal,
        },
    })
    export default class SupportPage extends Vue {
        // 打开项目地址
        private openProjectAddress() {
            window.open('https://github.com/xuelongqy/vue-easyrefresh')
        }
        // 打开PayPal
        private openPayPal() {
            window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=334PPRBZTY3J8&source=url')
        }
    }
</script>

<style lang="scss">
    .support-page {
        width: 100%;
        height: 100%;
        .support-page-list {
            width: 100%;
            height: calc(100% - 60px);
            .list-icon {
                width: 25px;
                height: 25px;
            }
        }
    }
</style>
