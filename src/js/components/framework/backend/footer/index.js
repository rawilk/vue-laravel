import BackendFooter from './backend-footer';
import { registerComponents, vueUse } from '../../../../utils/plugins';

const components = {
    BackendFooter
};

const VuePlugin = {
    install (Vue) {
        registerComponents(Vue, components);
    }
};

vueUse(VuePlugin);

export default VuePlugin;