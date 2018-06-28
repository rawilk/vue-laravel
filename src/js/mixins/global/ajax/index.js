import ajax from './ajax';
import { registerMixins, vueUse } from '../../../utils/plugins';

const directives = {
	ajax
};

const VuePlugin = {
	install (Vue) {
		registerMixins(Vue, directives);
	}
};

vueUse(VuePlugin);

export default VuePlugin;