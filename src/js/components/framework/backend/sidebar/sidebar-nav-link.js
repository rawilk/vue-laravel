import { mergeData } from 'vue-functional-data-merge';
import { isObject } from '../../../../utils/typeChecks';

export default {
	functional: true,

	props: {
		attributes: {
			type: Object,
			default: () => ({})
		},
		icon: {
		    type: String,
			default: ''
		},
	    name: {
	        type: String,
		    default: ''
	    },
		url: {
		    type: String,
			default: ''
		},
	},

	render (h, { props }) {
		const isExternalLink = props.url.substring(0, 4) === 'http';
		const attributes = isObject(props.attributes) ? props.attributes: {};


		// link children
		let linkChildren = [];
		if (props.icon && props.icon.length) {
			linkChildren.push(h(
				'i',
				{ staticClass: props.icon }
			));
		}

		linkChildren.push(h(
			'span',
			{
				staticClass: 'hide-menu',
				domProps: { innerText: props.name }
			}
		));

		let link = h(false);
		if (isExternalLink) {
			link = h(
				'a',
				mergeData(attributes, {
					staticClass: 'nav-link',
					attrs: {
						href: props.url,
					}
				}),
				linkChildren
			);
		}

		return link;

		return h(
			'span',
			{},
			[link]
		);
	}
};