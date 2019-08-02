<template>
    <div class="style-page">
        <AppBar :title="$t('home.style')" :showBack="false"/>
        <div class="style-page-list">
            <EasyRefresh :userSelect="false">
                <!--经典样式-->
                <ListItem
                        title="Classic"
                        :describe="$t('style.classicDescribe')"
                        @click.native="$router.push('/classic')">
                    <template v-slot:icon>
                        <v-icon size="25" color="#FF9800">format_list_bulleted</v-icon>
                    </template>
                </ListItem>
                <v-divider/>
                <!--Material-->
                <ListItem
                    title="Material"
                    :describe="$t('style.classicDescribe')"
                    @click.native="$router.push('/material')">
                    <template v-slot:icon>
                        <v-icon size="25" color="#FF9800">android</v-icon>
                    </template>
                </ListItem>
                <v-divider/>
                <!--BallPulse-->
                <ListItem
                        title="BallPulse"
                        :describe="$t('style.ballPulseDescribe')"
                        @click.native="$router.push('/ball-push')">
                    <template v-slot:icon>
                        <v-icon size="25" color="#FF9800">lens</v-icon>
                    </template>
                </ListItem>
                <v-divider/>
                <!--BezierCircle-->
                <ListItem
                        title="BezierCircle"
                        :describe="$t('style.bezierCircleDescribe')"
                        @click.native="$router.push('/bezier-circle')">
                    <template v-slot:icon>
                        <v-icon size="25" color="#FF9800">radio_button_checked</v-icon>
                    </template>
                </ListItem>
                <v-divider/>
                <!--BezierBounce-->
                <ListItem
                        title="BezierBounce"
                        :describe="$t('style.bezierBounceDescribe')"
                        @click.native="$router.push('/bezier-bounce')">
                    <template v-slot:icon>
                        <v-icon size="25" color="#FF9800">timelapse</v-icon>
                    </template>
                </ListItem>
                <v-divider/>
                <!--更多样式-->
                <ListItem
                        :title="$t('style.moreStyle')"
                        :describe="$t('style.moreStyleDescribe')"
                        @click.native="openQQGroup">
                    <template v-slot:icon>
                        <v-icon size="25" color="#FF9800">style</v-icon>
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
    export default class StylePage extends Vue {
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
    .style-page {
        width: 100%;
        height: 100%;
        .style-page-list {
            width: 100%;
            height: calc(100% - 116px);
        }
    }
</style>
