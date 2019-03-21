import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/HomePage.vue'
import Sample from './pages/SamplePage.vue'
import Style from './pages/StylePage.vue'
import More from './pages/MorePage.vue'
import BasicPage from './pages/sample/BasicPage.vue'
import AutoLoadPage from './pages/sample/AutoLoadPage.vue'
import MaterialPage from './pages/style/MaterialPage.vue'
import BallPulsePage from './pages/style/BallPulsePage.vue'
import BezierCirclePage from './pages/style/BezierCirclePage.vue'
import BezierBouncePage from './pages/style/BezierBouncePage.vue'
import SupportPage from './pages/more/SupportPage.vue'
import FreeTriggerPage from './pages/sample/FreeTriggerPage.vue'
import FloatPage from './pages/sample/FloatPage.vue'
import UserProfilePage from './pages/sample/UserProfilePage.vue'
import CollapsibleAppBarPage from './pages/sample/CollapsibleAppBarPage.vue'

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
    {
      path: '/basic',
      name: 'basic',
      component: BasicPage,
    },
    {
      path: '/classic',
      name: 'classic',
      component: BasicPage,
    },
    {
      path: '/material',
      name: 'material',
      component: MaterialPage,
    },
    {
      path: '/ball-push',
      name: 'ball-push',
      component: BallPulsePage,
    },
    {
      path: '/bezier-circle',
      name: 'bezier-circle',
      component: BezierCirclePage,
    },
    {
      path: '/bezier-bounce',
      name: 'bezier-bounce',
      component: BezierBouncePage,
    },
    {
      path: '/support-page',
      name: 'support-page',
      component: SupportPage,
    },
    {
      path: '/auto-load',
      name: 'auto-load',
      component: AutoLoadPage,
    },
    {
      path: '/free-trigger',
      name: 'free-trigger',
      component: FreeTriggerPage,
    },
    {
      path: '/float',
      name: 'float',
      component: FloatPage,
    },
    {
      path: '/user-profile',
      name: 'user-profile',
      component: UserProfilePage,
    },
    {
      path: '/collapsible-app-bar',
      name: 'collapsible-app-bar',
      component: CollapsibleAppBarPage,
    },
  ],
});
