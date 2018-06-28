import * as components from './components';
import * as directives from './directives';
import * as mixins from './mixins/global';
import filters from './filters/filters';
import { vueUse } from './utils/plugins';

const VuePlugin = {
	install: function (Vue) {
		if (Vue._lara_vue_installed) {
			return;
		}

		Vue._lara_vue_installed = true;

		// Register component plugins
		for (let plugin in components) {
			Vue.use(components[plugin]);
		}

		// Register directive plugins
		for (let plugin in directives) {
			Vue.use(directives[plugin]);
		}

		// Register global mixins
		for (let plugin in mixins) {
			Vue.use(mixins[plugin]);
		}

		// Register global filters
		Vue.use(filters);
	}
};

vueUse(VuePlugin);

export default VuePlugin;