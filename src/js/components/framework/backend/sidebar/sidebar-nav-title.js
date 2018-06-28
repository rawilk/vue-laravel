import { mergeData } from 'vue-functional-data-merge';
import { isObject } from '../../../../utils/typeChecks';

export default {
	functional: true,

	props: {
	    name: {
	    	type: String,
		    default: ''
	    },
		wrapper: {
	    	type: Object,
			default: () => ({})
		}
	},

	render (h, { props, data }) {
		let inner = h(false);
		let domProps = {};

		if (props.wrapper && props.wrapper.element) {
			const attributes = isObject(props.wrapper.attributes) ? props.wrapper.attributes : {};

			inner = h(
				props.wrapper.element,
				mergeData(attributes, {
					domProps: {
						innerText: props.name
					}
				})
			);
		} else {
			domProps.innerText = props.name;
		}

		return h(
			'li',
			mergeData(data, {
				staticClass: 'nav-small-cap',
				domProps
			}),
			[inner]
		)
	},
};