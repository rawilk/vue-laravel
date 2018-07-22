import { mergeData } from 'vue-functional-data-merge';
import { isObject } from '../../../../utils/typeChecks';
import { isUrlActive } from '../../../../utils/url';

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
        isChild: {
		    type: Boolean,
            default: false
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
		const attributes = isObject(props.attributes) ? props.attributes : {};

	    // Determine if this link is the current page.
        const active = isUrlActive(props.url);

		let icon = h(false);
		if (props.icon && props.icon.length) {
		    icon = h(
		       'i',
                { staticClass: props.icon }
            );
        }

        const navText = h(
            'span',
            { staticClass: props.isChild ? null : 'hide-menu' },
            props.name
        );

		return h(
		    'a',
            mergeData(attributes, {
                staticClass: 'nav-link',
                class: {
                    'active': active
                },
                attrs: {
                    href: props.url
                }
            }),
            [icon, navText]
        );
	}
};