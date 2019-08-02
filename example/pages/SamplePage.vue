<template>
    <div class="sample-page">
        <AppBar :title="$t('home.sample')" :showBack="false"/>
        <div class="sample-page-list">
            <EasyRefresh :userSelect="false">
                <!--基本使用-->
                <ListItem
                    :title="$t('sample.basicUse')"
                    :describe="$t('sample.basicUseDescribe')"
                    @click.native="$router.push('/basic')">
                    <template v-slot:icon>
                        <v-icon size="25" color="#FF9800">format_list_bulleted</v-icon>
                    </template>
                </ListItem>
                <v-divider/>
                <!--自动加载-->
                <ListItem
                        :title="$t('sample.autoLoad')"
                        :describe="$t('sample.autoLoadDescribe')"
                        @click.native="$router.push('/auto-load')">
                    <template v-slot:icon>
                        <v-icon size="25" color="#FF9800">autorenew</v-icon>
                    </template>
                </ListItem>
                <v-divider/>
                <!--自由触发-->
                <ListItem
                        :title="$t('sample.freeTrigger')"
                        :describe="$t('sample.freeTriggerDescribe')"
                        @click.native="$router.push('/free-trigger')">
                    <template v-slot:icon>
                        <v-icon size="25" color="#FF9800">gamepad</v-icon>
                    </template>
                </ListItem>
                <v-divider/>
                <!--浮动视图-->
                <ListItem
                        :title="$t('sample.floatView')"
                        :describe="$t('sample.floatViewDescribe')"
                        @click.native="$router.push('/float')">
                    <template v-slot:icon>
                        <v-icon size="25" color="#FF9800">layers</v-icon>
                    </template>
                </ListItem>
                <v-divider/>
                <!--个人中心-->
                <ListItem
                        :title="$t('sample.userProfile')"
                        :describe="$t('sample.userProfileDescribe')"
                        @click.native="$router.push('/user-profile')">
                    <template v-slot:icon>
                        <v-icon size="25" color="#FF9800">person</v-icon>
                    </template>
                </ListItem>
                <v-divider/>
                <!--折叠AppBar-->
                <ListItem
                        :title="$t('sample.collapsibleAppBar')"
                        :describe="$t('sample.collapsibleAppBarDescribe')"
                        @click.native="$router.push('/collapsible-app-bar')">
                    <template v-slot:icon>
                        <v-icon size="25" color="#FF9800">format_line_spacing</v-icon>
                    </template>
                </ListItem>
                <v-divider/>
                <!--滚动条-->
                <ListItem
                        :title="$t('sample.scrollBar')"
                        :describe="$t('sample.scrollBarDescribe')"
                        @click.native="$router.push('/scroll-bar')">
                    <template v-slot:icon>
                        <v-icon size="25" color="#FF9800">border_right</v-icon>
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
    export default class SamplePage extends Vue {
    }
</script>

<style lang="scss">
    .sample-page {
        width: 100%;
        height: 100%;
        .sample-page-list {
            width: 100%;
            height: calc(100% - 116px);
        }
    }
</style>
