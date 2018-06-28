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

		fields: ['last_name', 'first_name', 'age'],
		items: [
			{ isActive: true, age: 40, first_name: 'John', last_name: 'Smith' },
			{ isActive: false, age: 21, first_name: 'Jane', last_name: 'Doe' },
			{ isActive: false, age: 25, first_name: 'Geneva', last_name: 'Wilson' },
			{ isActive: true, age: 40, first_name: 'Jami', last_name: 'Carney', },
		],
	},

	methods: {
	    test (item) {
	        alert(item.first_name);
	    },

		onClick (data) {
		    console.log(data);
		},
	},
});