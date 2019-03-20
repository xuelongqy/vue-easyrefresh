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
                        <v-icon size="25" color="orange">format_list_bulleted</v-icon>
                    </template>
                </ListItem>
                <!--Material-->
                <ListItem
                    title="Material"
                    :describe="$t('style.classicDescribe')"
                    @click.native="$router.push('/material')">
                    <template v-slot:icon>
                        <v-icon size="25" color="orange">android</v-icon>
                    </template>
                </ListItem>
                <!--BallPulse-->
                <ListItem
                        title="BallPulse"
                        :describe="$t('style.ballPulseDescribe')"
                        @click.native="$router.push('/ball-push')">
                    <template v-slot:icon>
                        <v-icon size="25" color="orange">lens</v-icon>
                    </template>
                </ListItem>
                <!--BezierCircle-->
                <ListItem
                        title="BezierCircle"
                        :describe="$t('style.bezierCircleDescribe')"
                        @click.native="$router.push('/bezier-circle')">
                    <template v-slot:icon>
                        <v-icon size="25" color="orange">radio_button_checked</v-icon>
                    </template>
                </ListItem>
                <!--BezierBounce-->
                <ListItem
                        title="BezierBounce"
                        :describe="$t('style.bezierBounceDescribe')"
                        @click.native="$router.push('/bezier-bounce')">
                    <template v-slot:icon>
                        <v-icon size="25" color="orange">timelapse</v-icon>
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
