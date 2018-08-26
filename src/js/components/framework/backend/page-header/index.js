import PageHeader from './page-header';
import { registerComponents, vueUse } from '../../../../utils/plugins';

const components = {
    PageHeader
};

const VuePlugin = {
    install (Vue) {
        registerComponents(Vue, components);
    }
};

vueUse(VuePlugin);

export default VuePlugin;