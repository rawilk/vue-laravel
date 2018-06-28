import BackendSidebar from './sidebar';
import { registerComponents, vueUse } from '../../../../utils/plugins';

const components = {
	BackendSidebar
};

const VuePlugin = {
	install (Vue) {
		registerComponents(Vue, components);
	}
};

vueUse(VuePlugin);

export default VuePlugin;