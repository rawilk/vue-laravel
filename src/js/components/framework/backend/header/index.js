import BackendHeader from './backend-header';
import { registerComponents, vueUse } from '../../../../utils/plugins';

const components = {
	BackendHeader
};

const VuePlugin = {
	install (Vue) {
		registerComponents(Vue, components);
	}
};

vueUse(VuePlugin);

export default VuePlugin;