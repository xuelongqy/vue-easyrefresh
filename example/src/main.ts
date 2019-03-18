import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'
import lang from './comm/lang/lang'
import colors from 'vuetify/es5/util/colors'

Vue.config.productionTip = false;

// 添加UI库
Vue.use(Vuetify)
// 添加国际化
Vue.use(VueI18n)
const i18n = lang.createI18n()

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
