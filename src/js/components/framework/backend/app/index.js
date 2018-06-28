import BackendApp from './backend-app';
import { registerComponents, vueUse } from '../../../../utils/plugins';

const components = {
	BackendApp
};

const VuePlugin = {
	install (Vue) {
		registerComponents(Vue, components);
	}
};

vueUse(VuePlugin);

export default VuePlugin;