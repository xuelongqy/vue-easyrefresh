import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/HomePage.vue';
import Sample from './pages/SamplePage.vue';
import Style from './pages/StylePage.vue';
import More from './pages/MorePage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          redirect: 'sample',
        },
        {
          path: 'sample',
          name: 'sample',
          component: Sample,
        },
        {
          path: 'style',
          name: 'style',
          component: Style,
        },
        {
          path: 'more',
          name: 'more',
          component: More,
        },
      ],
    },
  ],
});
