import EmptyHeader from './EmptyHeader.vue';

// @ts-ignore
EmptyHeader.install = function(Vue) {
    Vue.component(EmptyHeader.name, EmptyHeader)
};

export default EmptyHeader
