import EasyRefresh from './components/EasyRefresh'
import BallPulseHeader from './components/header/BallPulseHeader'
import BezierBounceHeader from './components/header/BezierBounceHeader'
import BezierCircleHeader from './components/header/BezierCircleHeader'
import ClassicsHeader from './components/header/ClassicsHeader'
import MaterialHeader from './components/header/MaterialHeader'
import EmptyHeader from './components/header/EmptyHeader'
import BallPulseFooter from './components/footer/BallPulseFooter'
import BezierBounceFooter from './components/footer/BezierBounceFooter'
import ClassicsFooter from './components/footer/ClassicsFooter'
import EmptyFooter from './components/footer/EmptyFooter'
import MaterialFooter from './components/footer/MaterialFooter'

const components = {
    EasyRefresh, BallPulseHeader, BezierBounceHeader,
    BezierCircleHeader, ClassicsHeader, MaterialHeader,
    EmptyHeader, BallPulseFooter, BezierBounceFooter,
    ClassicsFooter, EmptyFooter, MaterialFooter,
};

// 安装插件
// @ts-ignore
const install = function(Vue) {
    Object.keys(components).forEach((key) => {
        // @ts-ignore
        Vue.component(components[key].name, components[key])
        // @ts-ignore
        Vue.use(components[key])
    })
}

// @ts-ignore
if (typeof window !== 'undefined' && window.Vue) { install(window.Vue) }

export {
    EasyRefresh, BallPulseHeader, BezierBounceHeader,
    BezierCircleHeader, ClassicsHeader, MaterialHeader,
    EmptyHeader, BallPulseFooter, BezierBounceFooter,
    ClassicsFooter, EmptyFooter, MaterialFooter, install,
}

export default {
    install,
    ...components,
}
