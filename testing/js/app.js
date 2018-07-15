import Vue from 'vue';
import LaraVue from  '../../src/js/index';

Vue.use(LaraVue);

import { VueContext} from 'vue-context';

new Vue({
	el: '#app',

	components: {
	    VueContext
	},

	data: {
		navItems: [
			{
				title: true,
				name: 'Test Title',
			},
			{
				divider: true,
			},
			{
				url: 'https://google.com',
				name: 'Google',
				icon: 'fa fa-user',
				attributes: {
					attrs: {
						target: '_blank'
					}
				}
			}
		],
		headerFixed: true,
        selected: 'b',
        options: [
            { value: null, text: 'Please select an option' },
            { value: 'a', text: 'This is First option' },
            { value: 'b', text: 'Selected Option' },
            { value: {'C': '3PO'}, text: 'This is an option with object value' },
            { value: 'd', text: 'This one is disabled', disabled: true }
        ],
	},

	methods: {

	},
});
