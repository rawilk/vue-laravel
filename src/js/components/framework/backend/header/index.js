import BackendHeader from './backend-header';
import BackendHeaderDropdown from './backend-header-dropdown';
import { registerComponents, vueUse } from '../../../../utils/plugins';

const components = {
	BackendHeader,
    BackendHeaderDropdown
};

const VuePlugin = {
	install (Vue) {
		registerComponents(Vue, components);
	}
};

vueUse(VuePlugin);

export default VuePlugin;