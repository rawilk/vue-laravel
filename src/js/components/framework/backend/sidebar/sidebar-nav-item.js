import { mergeData } from 'vue-functional-data-merge';

export default {
	functional: true,

	render (h, { data, slots }) {
		return h(
			'li',
			mergeData(data, {
				staticClass: 'nav-item'
			}),
			[slots().default]
		);
	}
};