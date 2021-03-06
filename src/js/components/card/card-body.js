import { mergeData } from 'vue-functional-data-merge';
import { prefixPropName } from '../../utils/strings';
import copyProps from '../../utils/copyProps';
import { assign } from '../../utils/object';
import cardMixin from '../../mixins/card';

export const props = assign(
	{},
	copyProps(cardMixin.props, prefixPropName.bind(null, 'body')),
	{
		bodyClass: {
			type: [String, Object, Array],
			default: null
		},
		collapsed: {
			type: Boolean,
			default: null
		},
		title: {
			type: String,
			default: null
		},
		titleTag: {
			type: String,
			default: 'h4'
		},
		subTitle: {
			type: String,
			default: null
		},
		subTitleTag: {
			type: String,
			default: 'h6'
		},
		overlay: {
			type: Boolean,
			default: false
		}
	}
);

export default {
	functional: true,

	props,

	render (h, { props, data, slots }) {
		let cardBodyChildren = [];

		if (props.title) {
			cardBodyChildren.push(
				h(props.titleTag, {
					staticClass: 'card-title',
					domProps: { innerHTML: props.title }
				})
			);
		}

		if (props.subTitle) {
			cardBodyChildren.push(
				h(props.subTitleTag, {
					staticClass: 'card-subtitle mb-2 text-muted',
					domProps: { innerHTML: props.subTitle }
				})
			);
		}
		cardBodyChildren.push(slots().default);

		return h(
			props.bodyTag,
			mergeData(data, {
				staticClass: 'card-body',
				class: [
					{
						'card-img-overlay': props.overlay,
						[`bg-${props.bodyBgVariant}`]: !! props.bodyBgVariant,
						[`border-${props.bodyBorderVariant}`]: !! props.bodyBorderVariant,
						[`text-${props.bodyTextVariant}`]: !! props.bodyTextVariant,
						['d-none']: !! props.collapsed
					},
					props.bodyClass || {}
				]
			}),
			cardBodyChildren
		);
	}
};