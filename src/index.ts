import EasyRefresh from './components/EasyRefresh.vue'
import BallPulseHeader from './components/header/BallPulseHeader.vue'
import BezierBounceHeader from './components/header/BezierBounceHeader.vue'
import BezierCircleHeader from './components/header/BezierCircleHeader.vue'
import ClassicsHeader from './components/header/ClassicsHeader.vue'
import MaterialHeader from './components/header/MaterialHeader.vue'
import EmptyHeader from './components/header/EmptyHeader.vue'
import BallPulseFooter from './components/footer/BallPulseFooter.vue'
import BezierBounceFooter from './components/footer/BezierBounceFooter.vue'
import ClassicsFooter from './components/footer/ClassicsFooter.vue'
import EmptyFooter from './components/footer/EmptyFooter.vue'
import MaterialFooter from './components/footer/MaterialFooter.vue'

const components = {
    EasyRefresh, BallPulseHeader, BezierBounceHeader,
    BezierCircleHeader, ClassicsHeader, MaterialHeader,
    EmptyHeader, BallPulseFooter, BezierBounceFooter,
    ClassicsFooter, EmptyFooter, MaterialFooter,
};

// 安装插件
// @ts-ignore
function install(Vue) {
    Object.keys(components).forEach((key) => {
        // @ts-ignore
        Vue.component(components[key].name, components[key])
        // @ts-ignore
        // Vue.use(components[key])
    })
}

// @ts-ignore
if (typeof window !== 'undefined' && window.Vue) { install(window.Vue) }

export {
    EasyRefresh, BallPulseHeader, BezierBounceHeader,
    BezierCircleHeader, ClassicsHeader, MaterialHeader,
    EmptyHeader, BallPulseFooter, BezierBounceFooter,
    ClassicsFooter, EmptyFooter, MaterialFooter,
}

export default {
    install,
    ...components,
}
