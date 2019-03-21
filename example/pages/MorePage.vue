<template>
    <div class="more-page">
        <AppBar :title="$t('home.more')" :showBack="false"/>
        <div class="more-page-list">
            <EasyRefresh :userSelect="false">
                <!--加入讨论-->
                <ListItem
                        :title="$t('more.joinDiscussion')"
                        :describe="$t('more.joinDiscussionDescribe')"
                        @click.native="openQQGroup">
                    <template v-slot:icon>
                        <v-icon size="25" color="orange">supervised_user_circle</v-icon>
                    </template>
                </ListItem>
                <v-divider/>
                <!--项目地址-->
                <ListItem
                        :title="$t('more.projectAddress')"
                        describe="https://github.com/xuelongqy/vue-easyrefresh"
                        @click.native="openProjectAddress">
                    <template v-slot:icon>
                        <v-icon size="25" color="orange">http</v-icon>
                    </template>
                </ListItem>
                <v-divider/>
                <!--支持作者-->
                <ListItem
                        :title="$t('more.supportAuthor')"
                        :describe="$t('more.supportAuthorDescribe')"
                        @click.native="$router.push('/support-page')">
                    <template v-slot:icon>
                        <v-icon size="25" color="orange">star</v-icon>
                    </template>
                </ListItem>
                <v-divider/>
                <!--关于-->
                <ListItem
                        :title="$t('more.about')"
                        @click.native="openProjectAddress">
                    <template v-slot:icon>
                        <v-icon size="25" color="orange">info</v-icon>
                    </template>
                </ListItem>
            </EasyRefresh>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import ListItem from '../components/ListItem.vue'
    import AppBar from '../components/AppBar.vue'

    @Component({
        components: {
            ListItem,
            AppBar,
        },
    })
    export default class MorePage extends Vue {
        // 打开项目地址
        private openProjectAddress() {
            window.open('https://github.com/xuelongqy/vue-easyrefresh')
        }

        // 打开QQqun
        private openQQGroup() {
            if (navigator.platform.indexOf('Win') === 0 ||
                navigator.platform.indexOf('Mac') === 0 ||
                navigator.platform.indexOf('X11') === 0) {
                window.open('//shang.qq.com/wpa/qunwpa?' +
                    'idkey=4bdc6eb8aa3e91b32b990bf49fad178ca2579a9c12bb2bb431054c78f6a0b71f')
            } else if (!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                window.open('//shang.qq.com/wpa/qunwpa?' +
                    'idkey=4bdc6eb8aa3e91b32b990bf49fad178ca2579a9c12bb2bb431054c78f6a0b71f')
            } else {
                window.open('mqqopensdkapi://bizAgent/qm/qr?' +
                    'url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26k%3D')
            }
        }
    }
</script>

<style lang="scss">
    .more-page {
        width: 100%;
        height: 100%;

        .more-page-list {
            width: 100%;
            height: calc(100% - 116px);
        }
    }
</style>
