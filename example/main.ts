import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'
import lang from './comm/lang/lang'
import Router from 'vue-router';

Vue.config.productionTip = false

// 添加UI库
Vue.use(Vuetify)
// 添加国际化
Vue.use(VueI18n)
const i18n = lang.createI18n()
// 设置路由回退
Router.prototype.back = function() {
  // @ts-ignore
  this.isBack = true
  this.go(-1)
}

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
