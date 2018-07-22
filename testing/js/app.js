import Vue from 'vue';
import LaraVue from  '../../src/js/index';

Vue.use(LaraVue);

new Vue({
	el: '#app',

	data: {
		navItems: [
			{
				title: true,
				name: 'Test Title',
			},
			{
				url: 'https://google.com',
				name: 'Google External',
				icon: 'mdi mdi-google-maps',
				attributes: {
					attrs: {
						target: '_blank'
					}
				}
			},
            {
                url: '#',
                name: 'Pages',
                icon: 'mdi mdi-google',
                children: [
                    {
                        name: 'Profile',
                        url: '/profile',
                        children: [
                            {
                                name: 'Profile 2',
                                url: '/lara-vue/testing/index.html'
                            }
                        ]
                    },
                    {
                        name: 'Profile 2',
                        url: '/profile',
                        children: [
                            {
                                name: 'Profile 2',
                                url: '/profile'
                            }
                        ]
                    }
                ]
            },
            {
                url: '#',
                name: 'Pages 2',
                icon: 'mdi mdi-google',
                children: [
                    {
                        name: 'Profile 2',
                        url: '/profile'
                    },
                    {
                        name: 'Profile 2',
                        url: '/profile'
                    }
                ]
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

    mounted () {
        for (let i = 0; i < 15; i++) {
            let item = {
                icon: 'mdi mdi-layers',
                url: '/profile',
                name: `Page ${i + 1}`,
                children: []
            };

            for (let x = 0; x < i + 1; x++) {
                item.children.push({
                    url: '/profile',
                    name: `Inner page ${x + 1}`
                });
            }

            this.navItems.push(item);
        }
    },

	methods: {

	},
});
