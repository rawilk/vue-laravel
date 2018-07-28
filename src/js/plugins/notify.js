import { Notify } from '../utils/class/notification';
import { vueUse } from '../utils/plugins';

const VuePlugin = {
    install (Vue) {
        Vue.prototype.$notify = new Notify();
    }
};

vueUse(VuePlugin);

export default VuePlugin;