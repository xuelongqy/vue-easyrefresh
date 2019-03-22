import MaterialHeader from './MaterialHeader.vue';

// @ts-ignore
MaterialHeader.install = function(Vue) {
    Vue.component(MaterialHeader.name, MaterialHeader)
};

export default MaterialHeader
