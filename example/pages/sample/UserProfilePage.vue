<template>
    <div class="user-profile">
        <AppBar :title="$t('sample.userProfile')" elevation="0" titleColor="white"/>
        <div class="user-profile-list">
            <!--背景-->
            <div class="user-profile-background">
                <div class="user-profile-background-flex">
                    <div class="user-profile-background-flex-top"></div>
                    <div class="user-profile-background-flex-bottom"></div>
                </div>
            </div>
            <EasyRefresh :userSelect="false">
                <!--Header-->
                <div class="user-profile-header-box">
                    <div class="user-profile-header-background">
                        <div class="user-profile-header-flex-top"></div>
                        <div class="user-profile-header-flex-bottom" :style="`border-left: ${this.screenWidth}px solid transparent;`"></div>
                    </div>
                    <div class="user-profile-header-content">
                        <div class="user-profile-header-title">KnoYo</div>
                        <div class="user-profile-header-img-box">
                            <img :src="headerBase64" class="user-profile-header-img">
                        </div>
                    </div>
                </div>
                <!--Body-->
                <div class="user-profile-body">
                    <v-card color="blue" class="user-profile-card">
                        <ListItem
                                :title="$t('sample.qqGroup')"
                                describe="623262733"
                                titleColor="white"
                                describeColor="white"
                                @click.native="openQQGroup">
                            <template v-slot:icon>
                                <v-icon size="25" color="white">supervised_user_circle</v-icon>
                            </template>
                        </ListItem>
                        <ListItem
                                :title="$t('sample.github')"
                                describe="https://github.com/xuelongqy"
                                titleColor="white"
                                describeColor="white"
                                @click.native="openGithub">
                            <template v-slot:icon>
                                <v-icon size="25" color="white">http</v-icon>
                            </template>
                        </ListItem>
                    </v-card>
                    <v-card color="green" class="user-profile-card">
                        <ListItem
                                :title="$t('sample.name')"
                                describe="KnoYo"
                                titleColor="white"
                                describeColor="white">
                            <template v-slot:icon>
                                <v-icon size="25" color="white">person</v-icon>
                            </template>
                        </ListItem>
                        <ListItem
                                :title="$t('sample.old')"
                                :describe="$t('sample.noBald')"
                                titleColor="white"
                                describeColor="white">
                        </ListItem>
                        <ListItem
                                :title="$t('sample.city')"
                                :describe="$t('sample.hangzhou')"
                                titleColor="white"
                                describeColor="white">
                        </ListItem>
                    </v-card>
                    <v-card color="teal" class="user-profile-card">
                        <ListItem
                                :title="$t('sample.phone')"
                                describe="18888888888"
                                titleColor="white"
                                describeColor="white">
                            <template v-slot:icon>
                                <v-icon size="25" color="white">phone</v-icon>
                            </template>
                        </ListItem>
                        <ListItem
                                :title="$t('sample.email')"
                                describe="xuelongqy@foxmail.com"
                                titleColor="white"
                                describeColor="white"
                                @click.native="openMail">
                            <template v-slot:icon>
                                <v-icon size="25" color="white">email</v-icon>
                            </template>
                        </ListItem>
                    </v-card>
                </div>
            </EasyRefresh>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import AppBar from '../../components/AppBar.vue'
    import ListItem from '../../components/ListItem.vue'

    /**
     * 基础使用
     */
    @Component({
        components: {
            AppBar,
            ListItem,
        },
    })
    export default class UserProfilePage extends Vue {
        // 屏幕宽度
        private screenWidth: number = document.body.clientWidth

        // 头像图片
        // tslint:disable-next-line:max-line-length
        private headerBase64 = 'data:image/jpeg;base64,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'

        // 初始化
        private mounted() {
            // 监听屏幕大小改变
            window.addEventListener('resize', this.onResize)
        }

        // 大小改变
        private onResize() {
            this.screenWidth = document.body.clientWidth
        }

        // 打开项目地址
        private openGithub() {
            window.open('https://github.com/xuelongqy')
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

        // 打开邮箱
        private openMail() {
            window.open('mailto:xuelongqy@foxmail.com?subject=EasyRefresh&body=I found a bug')
        }
    }
</script>

<style lang="scss">
    .user-profile {
        width: 100%;
        height: 100%;
        .user-profile-list {
            width: 100%;
            height: calc(100% - 60px);
            .user-profile-background {
                position: absolute;
                width: 100%;
                height: 100%;
                background: #ff9800;
                .user-profile-background-flex {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                    .user-profile-background-flex-top {
                        flex: 1;
                        background: #ff9800;
                    }
                    .user-profile-background-flex-bottom {
                        flex: 1;
                        background: white;
                    }
                }
            }
            .user-profile-header-box {
                width: 100%;
                height: 200px;
                .user-profile-header-background {
                    position: fixed;
                    width: 100%;
                    height: 200px;
                    .user-profile-header-flex-top, .user-profile-header-flex-bottom {
                        width: 100%;
                        height: 100px;
                        background: #ff9800;;
                    }
                    .user-profile-header-flex-bottom {
                        border-bottom: 100px solid white;
                    }
                }
                .user-profile-header-content {
                    position: fixed;
                    z-index: 2;
                    width: 100%;
                    height: 200px;
                    .user-profile-header-title, .user-profile-header-img-box {
                        display: flex;
                        flex-direction: column;
                        justify-content:center;
                        align-items:Center;
                        width: 100%;
                        height: 100px;
                        color: white;
                        font-size: 22pt;
                    }
                    .user-profile-header-img {
                        width: 100px;
                        height: 100px;
                        border-radius: 100px;
                    }
                }
            }
            .user-profile-body {
                width: 100%;
                overflow: hidden;
                background: white;
                .user-profile-card {
                    margin: 20px;
                    padding: 10px;
                }
            }
        }
    }
</style>

