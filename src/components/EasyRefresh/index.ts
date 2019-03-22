import EasyRefresh from './EasyRefresh.vue';

// @ts-ignore
EasyRefresh.install = function(Vue) {
    Vue.component(EasyRefresh.name, EasyRefresh);
};

export default EasyRefresh
